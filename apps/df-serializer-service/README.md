# df-serializer-service

A FastAPI microservice for serving weighted knowledge data for Sitecore products.

## Features

- Serves JSON data for competencies from different product schemas (SitecoreAI, ContentHub)
- Supports filtering by weight percentage (greater-than, less-than)
- CORS enabled for local and deployed frontend access
- Easily extensible for new product schemas

## Endpoints

### Get all competencies

```
GET /competencies?product=sitecoreai|contenthub
```

- Returns all competencies for the selected product.
- `product` query parameter: `sitecoreai` (default) or `contenthub`

### Get total number of competencies

```
GET /competencies/count?product=sitecoreai|contenthub
```

- Returns the total number of competencies for the selected product.

### Get competencies with weight greater than a value

```
GET /competencies/weight/greater-than?threshold=10&product=sitecoreai|contenthub
```

- Returns all competencies where `weight_pct` is greater than the threshold.

### Get competencies with weight less than a value

```
GET /competencies/weight/less-than?threshold=10&product=sitecoreai|contenthub
```

- Returns all competencies where `weight_pct` is less than the threshold.

## Data Files

- `sitecoreai-flat-schema.json`: Schema for SitecoreAI product knowledge resources
- `contenthub-flat-schema.json`: Schema for ContentHub product knowledge resources

## Running Locally

1. Prerequisites
    - install Python on your local machine

1. Create and _activate_ a virtual environment - https://fastapi.tiangolo.com/virtual-environments/

1. Install dependencies:
    ```
    pip install "fastapi[standard]"
    ```
1. Start the FastAPI server:
    ```
    fastapi dev
    ```
1. Access the Swagger UI docs at [http://localhost:8000/docs](http://localhost:8000/docs)

## Implementation Notes

- CORS is enabled for local development and deployed frontend URLs. Update the `origins` list in `main.py` as needed.
- Dockerfile is used for the Render cloud web service deployment.

## Example Usage

```
GET /competencies?product=sitecoreai
GET /competencies?product=contenthub
GET /competencies/weight/greater-than?threshold=15&product=contenthub
```
