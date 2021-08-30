# search-system-sandbox

検索について色々勉強するためのリポジトリです


## 構成

### opensearch

https://opensearch.org/downloads.html

* 1 node で動作する設定
* [セキュリティ設定を削除](https://opensearch.org/docs/security-plugin/configuration/disable/)

### converter

* python
  * [poetry](https://python-poetry.org/)
  * [opensearch-py](https://github.com/opensearch-project/opensearch-py)

### search system

* [Next.js](https://nextjs.org/)
  * yarn
  * TypeScript
  * [material-ui](https://material-ui.com/)
  * [Formik](https://formik.org/)
    * [with-material-ui](https://codesandbox.io/s/github/formik/formik/tree/master/examples/with-material-ui?from-embed=&file=/index.js)


## データの投入まで

### 準備

```bash
$ docker-compose up -d
$ curl -XGET http://localhost:9200
```


### データセットの用意

公共施設の位置情報

https://catalog.data.metro.tokyo.lg.jp/dataset/t132047d0000000001/resource/afe67708-d269-4d52-b0b2-979edec3f4f7?view_id=a73f2fe0-dc7d-4ada-9eaf-b3ba30fca131

UFT8 にコンバートする

```bash
$ cat koukyoushisetsu.csv | nkf -wd > koukyoushisetsu.csv.tmp
$ mv koukyoushisetsu.csv.tmp koukyoushisetsu.csv
```

### データのコンバート、投入

```bash
$ poetry run python3 converter/converter.py
{'acknowledged': True}
{'acknowledged': True, 'shards_acknowledged': True, 'index': 'public_facility'}

# header(1) + data(452)
$ wc -l converter/data/koukyoushisetsu.csv 
     453 converter/data/koukyoushisetsu.csv

$ curl "http://localhost:9200/public_facility/_count"
{"count":452,"_shards":{"total":1,"successful":1,"skipped":0,"failed":0}}
```


## search-system の準備

```bash
$ yarn create next-app --typescript
$ cd search-system
$ yarn dev
$ open http://localhost:3000
$ yarn add @material-ui/core
$ yarn add @material-ui/icons
```
