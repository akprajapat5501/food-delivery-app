import userModel from "../models/userModel.js";


// add items to user cart
export const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, msg: "Added To Cart" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, msg: 'Error' })
    }
}

// remove item from user cart
export const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.status(200).json({success: true, msg:"Remove From Cart"} )
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, msg:"Error"})
    }
}

// fetch user cart data
export const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData;
        res.status(200).json({success:true, cartData})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, msg:"Error"})
    }
}
