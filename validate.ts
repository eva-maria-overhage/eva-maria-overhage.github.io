import * as fs from "fs";

const dataFolderPath = "./data";

//Validate if the data folder exists and is a directory

if (!fs.existsSync(dataFolderPath)) {
    throw new Error(`Data folder does not exist: ${dataFolderPath}`);
}

if (!fs.statSync(dataFolderPath).isDirectory()) {
    throw new Error(`Data folder is not a directory: ${dataFolderPath}`);
}

console.log("Data folder exists and is a directory.");

//Start static file analysis for each .json file in the data folder
const files = fs.readdirSync(dataFolderPath).filter(file => file.endsWith(".json"));
files.forEach(name => {
    const filePath = `${dataFolderPath}/${name}`;
    const fileContent = fs.readFileSync(filePath, "utf-8");
    try {
        const content = JSON.parse(fileContent);
        console.log(`File ${name} is valid JSON.`);
    } catch (error) {
        console.error(`File ${name} is not valid JSON:`, error);
    }
});