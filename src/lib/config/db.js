import mongoose from "mongoose";

export const ConnectDB = async () => {
    try {
        if (mongoose.connection && mongoose.connection[0].readyState) return;
        const { connection } = await mongoose.connect(process.env.MONGODB_URI, { dbName: "GiniBlog" });
        console.log(`Connected to database: ${connection.host}`);
    } catch (error) {
        throw new Error("Error connecting to database");
    }
}

