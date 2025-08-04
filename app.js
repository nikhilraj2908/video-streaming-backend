// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/dbconfig.js";

// // configuring dotenv globally
// dotenv.config();

// // setting up express app
// const app = express();

// // getting environment variables.
// const PORT = process.env.PORT;
// const corsOrigin = process.env.CORS_ORIGIN.split(',') // extract and separate cors origin urls from environment variable(.env) 
// // const corsOrigin = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:3000'];

// // setting cors options
// const corsOptions = {
//     origin: corsOrigin,
//     credentials: true
// }

// // configuring readymade middlewares
// app.use(cors(corsOptions));
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
// app.use("/api/uploads", express.static('./uploads'))

// // importing and setting up routes
// import videoRoute from './routes/videoRoute.js';

// app.use("/api/video", videoRoute)

// // connecting to database and then starting server
// connectDB()
//     .then(() => {
//         app.listen(PORT || 8800, () => {
//             console.log(`Server is running at port : ${PORT}`);
//             app.get("/api/ramram", (req, res) => {
//                 res.status(201).send("Ram Ram, from app.js ! Your server is running successfully.")
//             })
//         })
//     })
//     .catch((error) => {
//         console.log("Error starting server.", error)
//     })
