const express = require('express');
const cors = require('cors');
const routes = require('./Routes');

const app = express();

app.use(cors());    
app.use(express.json());
app.use(routes);

//configure port
const port = 3000;

app.listen(port, ()=>{
    console.log(`App running on port ${port}.`);
});
