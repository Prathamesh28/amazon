import express from 'express'
import data from './data'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import userRoute from './routes/userRoutes'
import productRoute from './routes/productRoutes'

const app = express();

app.use(bodyParser.json())
dotenv.config();

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URL;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true}
).catch(error => console.log(error.reason));

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

app.use("/api/users",userRoute);
app.use("/api/products",productRoute);
        //app.get("/api/products/:id",(req, res) => {
        //    const productId = req.params.id;
         //   const product = data.products.find(x=>x._id === productId);
         //   if(product)
          //      res.send(product);
          //  else
          //  res.status(404).send({msg: "product Not Found"});
        //});

//app.get("/api/products",(req, res) => {
  //  res.send(data.products);
//});

app.listen(5000, () => console.log("Server started at http://localhost:5000"))