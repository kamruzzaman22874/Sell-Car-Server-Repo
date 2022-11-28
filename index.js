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

        app.get('/allseller' , async(req , res)=>{
            const email = req.query.email;
            const query = {email : email}
        })



        	//!=====START======Company wise data load.......======>

	app.get('/corolla', async (req, res) => {
		const query = { name: 'Corolla' };
		result = await carCollection.find(query).toArray();
		res.send(result);
		// res.send({name:'wroking'})
	});
	app.get('/tesla', async (req, res) => {
		result = await carCollection
			.find({ name: 'Tesla' })
			.toArray();
		res.send(result);
		// res.send({name:'wroking'})
	});
	app.get('/pajeroo', async (req, res) => {
		const query = { name: 'Pajeroo' };
		result = await carCollection.find(query).toArray();
		res.send(result);
		// res.send({name:'wroking'})
	});
	//!=====END======!






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