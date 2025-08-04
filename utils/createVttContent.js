// utility function to create structured VTT subtitle content
export const createVTTSubtitleContent = (subtitles) => {
    let vttContent = 'WEBVTT\n\n';

    // defining the structure of creating subtitle
    subtitles.forEach((sub) => {
        vttContent += `${sub.timestamp} ${sub.text}\n\n`;  // adding a space between timestamp and text
    });

    // returning created vttContent
    return vttContent;
};

