import fs from 'fs';

// a function to delete uploaded video of particular video path/name
export const deleteUploadVideo = async (thisVideoPath) => {

    const filePath = `uploads/${thisVideoPath}`

    // checking if folder named 'uploads' exists or not
    if (fs.existsSync(filePath)) {
        try {
            await fs.promises.unlink(filePath) // deleting video
        } catch (error) {
            console.log("Error deleting video : ", error);
        }
    } else {
        console.log("No directory named 'uploads' found !");
    }
}