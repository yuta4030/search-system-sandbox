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
  code: string;
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
const default_from: number = 0;
const default_size: number = 10;

function generateQuery(from?: number, size?: number): object {
  const query = {
    query: {
      match_all: {},
    },
    from: from,
    size: size,
  };
  return query;
}

async function searchWord(from: number, size: number) {
  const query = generateQuery(from, size);
  const res = await axios.post(path, query).then((res) => res.data);

  const count: Count = {
    total: res.hits.total.value,
    is_accurate: res.hits.total.relation == "eq",
    from: from,
    size: size,
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
      code: data._source.code,
      name: data._source.name,
      address: data._source.address,
      categories: categories,
      geo: geo,
    };

    if (data._source.ruby) {
      public_facility.ruby = data._source.ruby;
    }
    if (data._source.phone_number) {
      public_facility.phone_number = data._source.phone_number;
    }
    if (data._source.fax_number) {
      public_facility.fax_number = data._source.fax_number;
    }
    if (data._source.url) {
      public_facility.url = data._source.url;
    }
    if (data._source.remarks) {
      public_facility.remarks = data._source.remarks;
    }

    items.push(public_facility);
  }

  const results: Results = {
    count: count,
    items: items,
  };

  return results;
}

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const from = req.query.from ? Number(req.query.from) : default_from;
  const size = req.query.size ? Number(req.query.size) : default_size;
  const results = await searchWord(from, size);
  res.status(200).json(results);
}

export default handler;
