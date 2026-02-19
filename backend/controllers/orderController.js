import dotenv from "dotenv";
import orderModel from "../models/orderModel.js";
import User from "../models/userModel.js";
import Stripe from "stripe";

// Load environment variables before initializing Stripe
dotenv.config({ quiet: true });

const stripe = new Stripe(process.env.example.STRIPE_SECRET_KEY);

// placing user order for frontend
export const placeOrder = async (req, res) => {
    const frontend_url = "https://food-delivery-app-frontend-vt8n.onrender.com/"
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        })

        await newOrder.save();
        await User.findByIdAndUpdate(req.body.userId, { cartData: {} });
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charge"
                },
                unit_amount: 2 * 100 
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=falsez&orderId=${newOrder._id}`,
        })

        res.json({ success: true, session_url: session.url })

    } catch (error) {
        console.log(error)
        res.json({ success: false, msg: "Error" })
    }
}

export const orderVerify = async(req, res)=>{
    const {orderId, success} = req.body;
    try {
        if(success == "true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            res.json({success:true, msg:"paid"})
        }else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false, msg:"Not Paid"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, msg:"Error"})
    }
}

// user order for frontend
export const userOrders = async(req, res)=>{
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true, data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false, msg:"Error"})
    }
}

// listing orders for admin panel

export const listOrders = async(req, res) =>{
    try {
        const orders = await orderModel.find({})
        res.json({success:true, data:orders})
    } catch (error) {
        console.log(error)
        res.json({success:false, msg:"Error"})
    } 
}

// api for update order status

export const updateStatus = async(req, res)=>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true, msg:"status updated"})
    } catch (error) {
        console.log(error)
        res.json({success:false, msg:"Error"})
    }
}
