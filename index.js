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

        
        //Retrieve all the study partners

        app.get('/studyPartner',async(req,res) => {

            const projectFields= {name:1, profileimage:1, subject:1, studyMode:1, experienceLevel:1};

            const cursor= studyPartnerCollection.find().project(projectFields);

            const result= await cursor.toArray();
            res.send(result);
        })

        //Retrieve a single studyPartner

        app.get('/studyPartner/:id', async(req,res) => {

             const id= req.params.id;
             const query = {id: id};
             const result= await studyPartnerCollection.findOne(query);
             res.send(result);
        })
        
        
        
        //Create study partners

        app.post('/studyPartner', async(req,res) => {

            const newPartner= req.body;
            const result = await studyPartnerCollection.insertOne(newPartner);
            res.send(result);
        })




        
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