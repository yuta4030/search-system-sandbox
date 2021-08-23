# search-system-sandbox

検索について色々勉強するためのリポジトリです


## 構成

### opensearch

https://opensearch.org/downloads.html

### converter

* python
  * poetry
    * https://python-poetry.org/
  * opensearch-py
    * https://github.com/opensearch-project/opensearch-py

### 準備

```bash
$ docker-compose up -d
$ curl -XGET https://localhost:9200 -u admin:admin --insecure

$ git clone "https://github.com/opensearch-project/opensearch-py.git"
$ poetry shell
$ cd opensearch-py
$ pip install .
```
