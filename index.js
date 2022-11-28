const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

const app = express() ;
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://OldCarSell:mPrhvgpxIJLekADW@cluster0.d0mpqsd.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
     const carCollection = client.db("UsedCar").collection("addedCars")


	 app.get('/pajeroogroup' , async(req , res)=>{
        const query = { name : "Pajeroo"};
        const result = await carCollection.find(query).limit(3).toArray();
        res.send(result);
     })
	 app.get('/corollagroup' , async(req , res)=>{
        const query = { name : "Corolla"};
        const result = await carCollection.find(query).limit(3).toArray();
        res.send(result);
     })

     app.get('/teslagroup', async (req, res) => {
		const query = { name: 'Tesla' };
		const result = await carCollection.find(query).limit(3).toArray();
		res.send(result);
	});
	 app.get('/pajeroogroup' , async(req , res)=>{
        const query = { name : "Pajeroo"};
        const result = await carCollection.find(query).toArray();
        res.send(result);
     })
	 app.get('/corollagroup' , async(req , res)=>{
        const query = { name : "Corolla"};
        const result = await carCollection.find(query).toArray();
        res.send(result);
     })

     app.get('/teslagroup', async (req, res) => {
		const query = { name: 'Tesla' };
		const result = await carCollection.find(query).toArray();
		res.send(result);
	});




     app.post('/addedproducts', async(req, res) => {
        const products = req.body
        const result = await carCollection.insertOne(products);
        console.log(result);
        res.send(result)
     })
    } 
    finally {
      
    }
  }


run().catch(err => console.log(err))


app.get('/', (req, res) => {
    res.send("Old car sell is running")
})

app.listen(port, () => {
    console.log(`Old car sell is running on ${port}`);
})