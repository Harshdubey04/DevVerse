const mongooose=require("mongoose");

const connectDB=async()=>{
    await mongooose.connect(
        // "mongodb+srv://harshdu001_db_user:mDHZxyH7MKuA1toO@cluster1.z7pm4de.mongodb.net/DevVerse"  old one
        "mongodb+srv://harshdu001_db_user:mDHZxyH7MKuA1toO@cluster1.z7pm4de.mongodb.net/DevVerse"
    )
}


module.exports={
    connectDB
}