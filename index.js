const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.port || 5000;

// 
app.use(cors())
app.use(express.json())
// 

// carDeal
// nXwjncehXZY2soc6

const uri = "mongodb+srv://carDeal:nXwjncehXZY2soc6@cluster0.s79pxyc.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("carDealDB");
    const carCollection = database.collection("cars");
    const adCollection = database.collection("advertisements")


    app.post('/cars', async(req,res) =>{
        const car = req.body;
        console.log('new car', car);
        const result = await carCollection.insertOne(car)
        res.send(result)
    })

    app.get('/cars', async(req,res)=>{
        const cursor = carCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    app.get('/cars/:id',async(req,res)=>{
        const id = req.params.id;
        const query = {_id : new ObjectId(id)}
        const car = await carCollection.findOne(query)
        res.send(car)
    })

    app.get('/advertisements', async(req,res)=>{
      const cursor = adCollection.find();
      const result = await cursor.toArray();
      res.send(result);
  })

    


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// 
app.get('/', (req, res) => {
  res.send('This is server side!')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})