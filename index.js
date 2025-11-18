const express= require('express');
const cors= require('cors');

require('dotenv').config()

const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

//console.log(process.env);


//middleware


app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@crudcluster.o0siqzy.mongodb.net/?appName=CrudCluster`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



app.get('/', (req,res) => {

    res.send('Server is runnning');
})

async function run() {

    try{

        await client.connect();
        const db = client.db('study_partner_info');

        const studyPartnerCollection= db.collection('study_partners');
        
        await client.db('admin').command({ping:1});

         console.log("Pinged your deployment. You successfully connected to MongoDB!");



    }

    finally{

    }
}

run().catch(console.dir);


app.listen(port, () => {

    console.log(`Server for finding study partner is running on ${port}`);
})