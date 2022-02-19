require('dotenv').config();
const { MongoClient } = require('mongodb');
const services = require('./services');

const client = new MongoClient(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`,
    { useUnifiedTopology: true });
// const newPeople = {
//    
// }
async function get(){
    try{
        await client.connect();
        const database = client.db(`${process.env.MONGO_DATABASE}`);
        const pessoas = database.collection('Pessoa');

        const filter = {idade: {$gt: 20}};
        await pessoas.find().forEach(p => console.log(p));
    } finally{
        await client.close();
    }
}

async function add(obj){
    try{
        await client.connect();
        const pessoas = client.db(`${process.env.MONGO_DATABASE}`).collection('Pessoa');

        await pessoas.insertOne(obj).then(console.log('Insert!'));
    }finally{
        await client.close();
    }
}

async function update(){
    try{
        await client.connect();
        const pessoas = client.db(`${process.env.MONGO_DATABASE}`).collection('People');

        const query = {nome: client.nome};
        const update = {$set: {nome: services.nome}};
        await pessoas.updateOne(query, update).then(console.log('Updated!'));
    }finally{
        await client.close();
    }
}

async function delet(filter){
    try{
        await client.connect();
        const pessoas = client.db(`${process.env.MONGO_DATABASE}`).collection('Pessoa');

        const result = await pessoas.deleteOne(filter);
        console.log(`${result.deletedCount} doc remove`);
    }finally{
        await client.close();
    }
}
add();

get();

update();

const filter = {nome: services.delete};
delet(filter);