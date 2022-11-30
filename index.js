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
     const advertiseCollection = client.db("UsedCar").collection("advertise")

   //TODO:============================!Advertisement!======================>

	//!======START <- post Advertisement Data in Mongodb  ======>
	app.post('/advertisement', async (req, res) => {
        console.log('giting');
		const addData = req.body;
		const result = await advertiseCollection.insertOne(addData);
		res.send(result);
	});
	//!======END======>

	//!======START <- get product By Id for Advertisement  ======>
	app.get('/productById/:id', async (req, res) => {
        // console.log('got hit');
		const id = req.params.id;
        // console.log('pera', id);
		const query = { _id: ObjectId(id) };
        // console.log('query', query);
		const result = await carCollection.findOne(query);
        console.log('result', result);
		res.send(result);
	});

	//!======END======>


    // //!======START <- Collect User Info from Sign up and set it database -> ======>
	app.post('/users', async (req, res) => {
		const usersList = await usersCollection.count({});

		if (usersList !== 0) {
			// Jodi user er role Seller hoy... Then user body er shathe permission add hoye database a jabe...... Noy2 normally body te thaka value e database a jabe
			if (req.body.role === 'Seller') {
				const user = req.body;
				user.permission = 'Unverified';
				const result = await usersCollection.insertOne(user);
				res.send(result);
			} else {
				res.send((result = await usersCollection.insertOne(req.body)));
			}
		} else {
			const user = req.body;
			user.role = 'admin';
			const result = await usersCollection.insertOne(user);
			res.send(result);
		}
	});
	// //todo=====END======>


    	//! get user  from mongodb for Home page ==> for identify is he a admin or buyer or seller?

	app.get('/users/:email', async (req, res) => {
		const email = req.params.email;
		// console.log(email);
		const query = { email: email };
		const result = await usersCollection
			.find(query).project({ role: 1, _id: 0 }).toArray();
		res.send(result);
	});
	// //todo=====END======>


	//!======START <- get product By categories all data for Home page Advertisement  ======>
	app.get('/advertisement/categories', async (req, res) => {
		const query = {};
		const result = await advertiseCollection.find(query).toArray();
		res.send(result);
	});
	//!======END======>

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

    	//!======START <- get products for My-Products route ======>
	app.get('/products', async (req, res) => {
		const email = req.query.email;
		const query = { email: email };
		const products = await carCollection.find(query).toArray();
        console.log(products);
		res.send(products);
	});
	//todo--------------------------------

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