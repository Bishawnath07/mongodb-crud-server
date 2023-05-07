const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion ,ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());


// bishawnathprogram07
// TbAVNfXRxUSvoyXJ


const uri = "mongodb+srv://bishawnathprogram07:TbAVNfXRxUSvoyXJ@cluster0.eo0io7y.mongodb.net/?retryWrites=true&w=majority";

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

        // const database = client.db("userDB");
        // const userCollection = database.collection("haiku");
        const userCollection = client.db('usersDB').collection('users');

        app.get('/users', async( req, res) => {
            const cursor = userCollection.find()
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get('/users/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id: new ObjectId(id)}
            const user = await userCollection.findOne(query);
            res.send(user);
        })

        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log('new user', user)
            const result = await userCollection.insertOne(user);
            res.send(result);
        })

        app.delete('/users/:id', async(req, res) =>{
            const id = req.params.id;
            console.log('please delete from database', id);
            const query = { _id: new ObjectId(id)}
            
            const result = await userCollection.deleteOne(query);
            res.send(result);
        })

    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('SIMPLE CRUD IS RUNNIG')
})

app.listen(port, () => {
    console.log(`Simple Crud is Running on Port ${port}`)
})