# Rodo-Test
Rodo-Test API can fetch data about car inventory.

![rodoTestAPi](https://user-images.githubusercontent.com/50976344/124258710-90b24b80-dae2-11eb-9fd3-840bc0ea3727.png)


## How to use?
- clone the Rodo-Test repo to your machine
- cd into the repo
- run the server with:
```
https://github.com/RanVaknin/Rodo-Test.git
cd Rodo-Test
node server.js
```

## Structuring a reqeust:
**Parameters:**
|   Parameter   |   Data Type   |                |
| ------------- | ------------- | -------------  |
|   **page**    |    Integer    |    *Required*    |
|   **limit**   |    Integer    |    *Required*    |
|   **make**    |    String     |    *Optional*    |
|   **model**   |    String     |    *Optional*    |
|   **price**   |    Integer    |    *Optional*    |
|   **year**    |    Integer    |    *Optional*    |


### Example Request:
We want to find only Toyota Highlanders under $35,000.
```
curl "http://localhost:8080/cars?make=toyota&model=highlander&price=35000&page=1&limit=10"
```
You can also input partial model and make name
```
curl "http://localhost:8080/cars?make=toy&model=high&price=35000&page=1&limit=10"
```

### Example Response:

```
{
    "total_available": 1899,
    "prices": {
        "lowest": 7539,
        "median": 19513.5,
        "highest": 32075
    },
    "data": [
        {
            "make": "Toyota",
            "model": "Highlander",
            "year": 2017,
            "vehicle_count": 316,
            "price": 7539
        },
        {
            "make": "Toyota",
            "model": "HIGHLANDER  4X4",
            "year": 2018,
            "vehicle_count": 10,
            "price": 30007
        },
        {
            "make": "Toyota",
            "model": "Highlander Hybrid",
            "year": 2019,
            "vehicle_count": 779,
            "price": 9020
        },
        {
            "make": "Toyota",
            "model": "Highlander Hybrid",
            "year": 2021,
            "vehicle_count": 794,
            "price": 32075
        }
    ]
}

```

## What would I do next?
- Implement Rate Limiting
- Cache results
- Build a simple front end to help simulate requests



