// setting up multer middleware
import multer from "multer";
import fs from 'fs';

// defining multer storage 
const storage = multer.diskStorage({
    // destination to store the video file
    destination: async (req, file, callback) => {
        try {
            // defining destination path
            const destination = "./uploads";

            // create the directory if it doesn't exist
            await fs.promises.mkdir(destination, { recursive: true });

            callback(null, destination);
        } catch (error) {
            callback(error);
        }
    },

    // defining file name to be used
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

// exporting multerUpload function with single file upload with name "videoFile"
export const multerUpload = multer({ storage: storage }).single("videoFile");