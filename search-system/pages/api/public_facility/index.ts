import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

enum CategoryLevel {
  Small,
  Middle,
  Large,
}

interface Category {
  name: string;
  level: CategoryLevel;
}

interface Geo {
  lat: number;
  lon: number;
}

interface PublicFacility {
  name: string;
  ruby?: string;
  address: string;
  phone_number?: string;
  fax_number?: string;
  url?: string;
  remarks?: string;
  categories: Array<Category>;
  geo: Geo;
}

interface Count {
  total: number;
  is_accurate: boolean;
  from: number;
  size: number;
}

interface Results {
  count: Count;
  items: Array<PublicFacility>;
}

const path = "http://localhost:9200/public_facility/_search";

const query = {
  query: {
    match_all: {},
  },
};

async function searchWord() {
  const res = await axios.post(path, query).then((res) => res.data);

  const count: Count = {
    total: res.hits.total.value,
    is_accurate: res.hits.total.relation == "eq",
    from: 0,
    size: 10,
  };
  const items: Array<PublicFacility> = new Array();

  for (const data of res.hits.hits) {
    const categories: Array<Category> = [
      {
        name: data._source.category_1,
        level: CategoryLevel.Small,
      },
      {
        name: data._source.category_2,
        level: CategoryLevel.Middle,
      },
      {
        name: data._source.category_3,
        level: CategoryLevel.Large,
      },
    ];

    const geo: Geo = {
      lon: data._source.geo.lon,
      lat: data._source.geo.lat,
    };

    const public_facility: PublicFacility = {
      name: data._source.name,
      address: data._source.address,
      categories: categories,
      geo: geo,
    };

    items.push(public_facility);
  }

  const results: Results = {
    count: count,
    items: items,
  };

  return results;
}

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  res.status(200).json(await searchWord());
}

export default handler;
