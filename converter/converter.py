import os
import csv

from dataclasses import dataclass
from opensearch import OpenSearch, helpers


FILE_PATH = f"{os.path.dirname(__file__)}/data/koukyoushisetsu.csv"


class PublicFacilityIndex():
    name: str = "public_facility"
    mapping: dict = {
        "mappings": {
            "properties": {
                "name": {
                    "type": "text"
                },
                "ruby": {
                    "type": "text"
                },
                "address": {
                    "type": "text"
                },
                "phone_number": {
                    "type": "keyword"
                },
                "fax_number": {
                    "type": "keyword"
                },
                "url": {
                    "type": "keyword"
                },
                "remarks": {
                    "type": "text"
                },
                "category_1": {
                    "type": "text"
                },
                "category_2": {
                    "type": "text"
                },
                "category_3": {
                    "type": "text"
                },
                "geo": {
                    "type": "geo_point"
                }
            }
        }
    }

    @dataclass(frozen=True)
    class PublicFacilityDoc():
        code: str
        name: str
        ruby: str
        address: str
        phone_number: str
        fax_number: str
        url: str
        remarks: str
        category_1: str
        category_2: str
        category_3: str
        lon: float
        lat: float

        def to_docs(self):
            return {
                "code": self.code,
                "name": self.name,
                "ruby": self.ruby,
                "address": self.address,
                "phone_number": self.phone_number,
                "fax_number": self.fax_number,
                "url": self.url,
                "remarks": self.remarks,
                "category_1": self.category_1,
                "category_2": self.category_2,
                "category_3": self.category_3,
                "geo": {
                    "lat": self.lat,
                    "lon": self.lon,
                },
            }


def delete_index(os: OpenSearch, index: str):
    if os.indices.exists(index=index):
        result = os.indices.delete(index=index)
        print(result)


def create_index(os: OpenSearch, index: str, mapping: dict):
    result = os.indices.create(
        index=index,
        body=mapping,
    )
    print(result)


def csv_to_docs(filepath: str):
    with open(filepath) as f:
        counter = 0
        reader = csv.DictReader(f)
        for row in reader:
            counter += 1
            yield PublicFacilityIndex.PublicFacilityDoc(
                code=str(counter).zfill(8),
                name=row["??????"],
                ruby=row["????????????"],
                address=row["?????????"],
                phone_number=row["????????????"],
                fax_number=row["FAX"],
                url=row["URL"],
                remarks=row["??????"],
                category_1=row["?????????__"],
                category_2=row["?????????__"],
                category_3=row["?????????__"],
                lon=row["??????"],
                lat=row["??????"],
            ).to_docs()


def bulk_insert(os: OpenSearch, index: str,  filepath: str):
    actions = ({
        "_index": index,
        "_source": action,
    } for action in csv_to_docs(filepath))

    helpers.bulk(
        client=os,
        actions=actions
    )


if __name__ == '__main__':
    os = OpenSearch()
    delete_index(os=os, index=PublicFacilityIndex.name)
    create_index(
        os=os,
        index=PublicFacilityIndex.name,
        mapping=PublicFacilityIndex.mapping
    )
    bulk_insert(
        os=os,
        index=PublicFacilityIndex.name,
        filepath=FILE_PATH,
    )
