import mongoose from "mongoose"


export const ConnectDB = async() =>{
    await mongoose.connect('mongodb+srv://akashsolanki2903_db_user:CDWXiOwaftG1SAQF@cluster0.ipssx9c.mongodb.net/?appName=Cluster0')
    .then(()=>
        console.log("Database Connected"))
}