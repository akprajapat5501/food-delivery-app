import dotenv from "dotenv";
dotenv.config({quiet:true})
import express from "express"
import cors from "cors"
import { ConnectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js";



// config
const app = express();
const PORT = process.env.PORT || 4000;

//  middleware

app.use(express.json());
app.use(cors())

// db connection
ConnectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images",express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get("/",(req, res)=>{
    res.send("API Working")
})

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})
