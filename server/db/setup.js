
const { MongoClient, ServerApiVersion } = require('mongodb');
const { MONGO_USER, MONGO_PASS, MONGO_CLUSTER } = process.env;
const uri = 'mongodb+srv://' + MONGO_USER + ':' + MONGO_PASS + "@" + MONGO_CLUSTER + "/?retryWrites=true&w=majority";

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
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        //await client.close();
    }
}

const getClient = () => client;

module.exports = { run, getClient }
