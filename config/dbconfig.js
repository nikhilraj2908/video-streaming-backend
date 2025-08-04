import mongoose from "mongoose";

// connecting to mongodb atlas database
const connectDB = async () => {
    try {
        // creating a connection instance using mongoose
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`\nMongoDB connected !! DB HOST : ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("Error connecting MongoDB Atlas !!", error);
        process.exit(1)
    }
}

// exporting connectDB
export default connectDB;