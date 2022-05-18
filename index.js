const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB}:${process.env.PASS}@cluster0.u9qoi.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const todoCollection = client.db("todo").collection("todos");

        app.post('/todo', async (req,res) => {
            const todo = req.body.todoData;
            const result = await todoCollection.insertOne(todo)
            res.send({result})
        })

        app.get('/todo', async (req,res) => {
            const query = {}
            const result = await todoCollection.find({}).toArray();
            res.send(result)
        })

        app.delete('/todo:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await todoCollection.deleteOne(query)
            res.send(result);
        })
        
    } finally {
        
    }
}

run().catch(console.dir);



app.get('/', (req,res) => {
    res.send('welcome from express')
})

app.listen(port, () => {
    console.log('server started on port: ',port)
})