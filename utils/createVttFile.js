import { createVTTSubtitleContent } from "./createVttContent.js";
import fs from 'fs';
import path from 'path';

// utility function to create VTT subtitle file
export const createVTTFile = async (subtitles, videoId) => {
    try {
        // creating vtt subtitle using createVTTSubtitle function
        const vttContent = createVTTSubtitleContent(subtitles);

        // checking if folder named 'subtitles' exists or not
        if (!fs.existsSync('subtitles')) {
            // if doesn't exists, create a new directory named 'subtitles'
            await fs.promises.mkdir('subtitles');
        }

        try {
            // if 'subtitles' dir exists create a file named as given below
            const filePath = path.resolve('subtitles', `${videoId}.vtt`);

            // after getting the filepath, write the vttContent to created filepath
            await fs.promises.writeFile(filePath, vttContent);
        } catch (error) {
            console.log("Error creating VTT file : ", error)
        }
    } catch (error) {
        console.error("Error creating '/subtitles' directory : ", error);
        throw error;
    }
};