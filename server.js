const jsonServer = require('json-server')
const fetch = require('node-fetch');
const express = require('express');
const app = express();
app.use('/api', jsonServer.router('./db.json'));


async function getCarData(){
    const result = await fetch('http://localhost:8080/api/data');
    return await result.json();
}

function routeSetup(carData){
    app.get('/', function (req, res) {
        res.send({'message': "Hello World"})
    })
    
    app.get('/cars', function (req, res) {
        const response = {};
        const {make,year,model,price} = req.query;
    
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
    
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        let result = carData;
    

    
        if(startIndex > 0){
            response.previous_page = page -1;
        }
    
        // Matching Search Filters:
        if (make) {
            result = result.filter(car => car.make.toLowerCase().includes(make) || car.make.toLowerCase() == make);
        }
        
        if (model) {
            result = result.filter(car => car.model.toLowerCase().includes(model) || car.model.toLowerCase() == model);
        }
    
        if (year) {
            result = result.filter(car => car.year === parseInt(year));
        }
        
        if (price) {
            result = result.filter(car => car.price <= price);
        }

        if(endIndex < result.length){
            response.next_page = page + 1;
        }
    
        //calculating total available cars based on entire results ( not paginated result )
        response.total_available = 0;
        result.forEach(car =>{
            response.total_available += car.vehicle_count;
        })
        
        //calculataing low,median and high prices based on entire results ( not paginated result )
        let priceArr = []
        result.forEach(car => priceArr.push(car.price));
        response.prices = calculatePrices(priceArr);
    
        //paginated data based on our page number and limit
        response.data = result.slice(startIndex,endIndex);
    
    
        if(result.length > 0){
            res.status(200).send(response);
    
        } else {
            res.status(200).send({message : '404 Resource not found.'});
        }
    })
    
    //retrieve individual cars
    app.get('/car/:id', function (req, res) {
        let { id } = req.params;
        res.send(carData[id]);
    })

    //404 handler
    app.use(function (req,res,next){
        res.status(404).send({"status":404,"error":"Resource Not Found"});
    });
    
    //error handler middleware
    app.use((error, req, res, next) => {
        console.error(error.stack);
        res.status(500).send({"status":500 ,"error":"Server Error"});
    })
}

getCarData().then(carData =>{
    routeSetup(carData)
})

function calculatePrices(prices){
    prices.sort((x,y)=>x-y);
    let median;
    if (prices.length % 2 === 0){
        median =  (prices[prices.length/2] + prices[prices.length/2 - 1])/2;
    }
    else {
        median = prices[Math.floor(prices.length/2)];
    }
    return {lowest: prices[0], median: median, highest: prices[prices.length-1]};
}

app.listen(8080);

