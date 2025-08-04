import fs from 'fs';

// a function to delete vtt file of particular vid
export const deleteVTTFile = async (videoId) => {

    const filePath = `subtitles/${videoId}.vtt`

    // checking if folder named 'subtitles' exists or not
    if (fs.existsSync(filePath)) {
        try {
            await fs.promises.unlink(filePath)
        } catch (error) {
            console.log("Error deleting vtt file : ", error);
        }
    } else {
        console.log("No directory named 'subtitles' found !");
    }
}