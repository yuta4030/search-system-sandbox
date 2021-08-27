# search-system-sandbox

検索について色々勉強するためのリポジトリです


## 構成

### opensearch

https://opensearch.org/downloads.html

* 1 node で動作する設定
* セキュリティ設定を削除
  * https://opensearch.org/docs/security-plugin/configuration/disable/

### converter

* python
  * poetry
    * https://python-poetry.org/
  * opensearch-py
    * https://github.com/opensearch-project/opensearch-py


## 準備

```bash
$ docker-compose up -d
$ curl -XGET http://localhost:9200
```
