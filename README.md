

## Prerequisites

- Couchdb 1.3.x
- Geocouch
- erica

## Installation

```erica push http://localhost:5984/geocouch-example```

In your browsers console:
```$.ajax({"type":"POST", "contentType":"application/json","url":"http://localhost:5984/geocouch-example/_bulk_docs","data":JSON.stringify(createSeedData([52.651, 13.239], [52.392, 13.594], 0.01))})```
