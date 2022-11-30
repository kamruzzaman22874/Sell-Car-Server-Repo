const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
     const usersCollection = client.db("UsedCar").collection("users")
     const bookingOrderCollection = client.db("UsedCar").collection("bookingOrder")
     const sellerCollection = client.db("UsedCar").collection("seller")
     const byerCollection = client.db("UsedCar").collection("byer")


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




	 app.get('/pajeroocategory' , async(req , res)=>{
        const query = { name : "Pajeroo"};
        const result = await carCollection.find(query).limit(1).toArray();
        res.send(result);
     })
	 app.get('/corollacategory' , async(req , res)=>{
        const query = { name : "Corolla"};
        const result = await carCollection.find(query).limit(1).toArray();
        res.send(result);
     })

     app.get('/teslacategory', async (req, res) => {
		const query = { name: 'Tesla' };
		const result = await carCollection.find(query).limit(1).toArray();
		res.send(result);
	});

    app.get('/users' , async(req , res)=>{
        const email = req.query.email;
        const query = {email : email};
        const users = await usersCollection.find(query).toArray();
        res.send(users)
    })

    app.post('/sellers', async(req , res)=>{
        const seller = req.body;
        const result = await sellerCollection.insertOne(seller)
        res.send(result)
    } )

    app.post('/users' ,async (req,res)=>{
        const user = req.body;
        const result = await usersCollection.insertOne(user);
        // console.log(result);
        res.send(result)
    })


    // app.get('/bookings', async(req , res)=>{
    //     const email = req.query.email;
    //     console.log(email);
    //     const query = {email : email};
    //     console.log(query);
    //     // console.log(query);
    //     const booking = await bookingCollection.find(query).toArray();
    //     console.log(booking);
    //     res.send(booking);
    // })

    app.get('/bookings', async(req,res)=>{
        const email = req.query.email;
        const query = {email:email};
        const booking = await bookingOrderCollection.find(query).toArray()
        res.send(booking)
    })

    app.post('/booking', async (req,res)=>{
        const booked = req.body
        const result = await bookingOrderCollection.insertOne(booked);
        // console.log(result)
        res.send(result)

    })

    app.delete('/bookings/:id' , async (req ,res)=>{
        const id = req.params.id;
        const query = {_id:ObjectId(id)};
        const result = await bookingOrderCollection.deleteOne(query)
        // console.log(result);
        res.send(result)
    })

     app.post('/allsellers', async(req, res) => {
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