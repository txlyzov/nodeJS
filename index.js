const express = require('express');
// const db = require('./utils/database')
//const userRouter = require('./routes/users-router')
const routers = require('./routes')
const dotenv = require('dotenv/config');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || 3000

// db.authenticate()
// .then(()=>console.log('Database connected')).catch(err=>console.log('Error' + err))

app.use(helmet());
app.use(morgan('combined'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true,limit:'50mb'}));
app.use('/',routers.usersRouter);
app.use('/',routers.imagesRouter);

app.use((req,res)=>{
    res.status(404).send('404: No page here.');
})

app.listen(PORT,()=> console.log(`API running at ${HOST}:${PORT}!`));






// api.get('/',(req,res)=>{
//     res.send('Welcome to this API!')
// })

// api.get('/1',(req,res)=>{
//     res.status(200).json(data);
// })

