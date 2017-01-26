https://github.com/apache/asterixdb

https://asterixdb.apache.org/docs/0.8.8-incubating/aql/primer.html

https://ci.apache.org/projects/asterixdb/aql/js-sdk.html

https://issues.apache.org/jira/browse/ASTERIXDB-1327?jql=text%20~%20%22spatial_intersect%22

https://asterixdb.apache.org/docs/0.8.8-incubating/aql/primer-sql-like.html

```sql
use dataverse TinySocial;

load dataset FacebookUsers using localfs
(("path"="localhost:///home/culqi/understanding_asterixdb/face.adm"),("format"="adm"));

load dataset FacebookMessages using localfs
(("path"="localhost:///home/culqi/understanding_asterixdb/facems.adm"),("format"="adm"));

load dataset TwitterUsers using localfs
(("path"="localhost:///home/culqi/understanding_asterixdb/twt.adm"),("format"="adm"));

load dataset TweetMessages using localfs
(("path"="localhost:///home/culqi/understanding_asterixdb/twtms.adm"),("format"="adm"));
```

- [DOC] Query 6 - Existential Quantification empty result (review)
