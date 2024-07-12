const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');

const { generateProject, generateProjectRandom } = require('./generateProject');
const { generateIdeas, generateIdeasDetailed } = require('./generateIdeas');
const { reviewAndModifyProjectGuide } = require('./reviewAndModifyProjectGuide');

// get the key from the environment variable GEMINI_API_KEY and create a new instance of the GoogleGenerativeAI
const apiKey = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

async function main() {
    
    // Generate project ideas
    const ideas = await generateIdeasDetailed(genAI, 10);
    
    // Log the ideas
    console.log(ideas);

    /*
    // Generate projects based on the ideas after waiting for 5 seconds to avoid any the rate limit
    await new Promise(resolve => setTimeout(resolve, 5000));
    await generateProjectRandom(genAI, ideas);

    // Read the just the project file names inside the ./projects directory, exclude the directories
    const projectFiles = fs.readdirSync('./projects', { withFileTypes: true })
        .filter(dirent => dirent.isFile())
        .map(dirent => dirent.name);


    // Log the project files
    console.log(projectFiles);

    projectFiles.forEach(async (fileName) => {
        await reviewAndModifyProjectGuide(genAI, fileName);
    });
    */
}

async function generateProjectsFromDetailedIdeas(genAI, numIdeas = 10, outputPath = './projects/DetailedIdeas') {
    const ideasJSON = JSON.parse(fs.readFileSync('./seed-ideas/detailedIdeas.json', 'utf8'));
    const ideas = ideasJSON.ideas;

    // Creating the output directory if it does not exist
    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath);
    }

    for (const idea of ideas) { // Using for...of loop for better async/await handling
        await generateProject(genAI, idea, outputPath);
    }

    // Read the just the project file names inside the ./projects directory, exclude the directories
    const projectFiles = fs.readdirSync(outputPath, { withFileTypes: true })
        .filter(dirent => dirent.isFile())
        .map(dirent => dirent.name);

    // Review and modify the project guides
    for (const fileName of projectFiles) { // Using for...of loop for better async/await handling
        await reviewAndModifyProjectGuide(genAI, fileName, outputPath);
    }
}

async function generateProjectsFromRandomIdeas(genAI, numIdeas = 10, outputPath = './projects/RandomIdeas') {
    // Generate project ideas
    const ideas = await generateIdeas(genAI, numIdeas);

    // Log the ideas
    console.log(`New Ideas:\n ${ideas}`);

    // Creating the output directory if it does not exist
    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath);
    }

    for (const idea of ideas) { // Using for...of loop for better async/await handling
        await new Promise(resolve => setTimeout(resolve, 3000));
        await generateProjectRandom(genAI, idea, outputPath);
    }

    // Read the just the project file names inside the ./projects directory, exclude the directories
    const projectFiles = fs.readdirSync(outputPath, { withFileTypes: true })
        .filter(dirent => dirent.isFile())
        .map(dirent => dirent.name);

    // Review and modify the project guides
    for (const fileName of projectFiles) { // Using for...of loop for better async/await handling
        await reviewAndModifyProjectGuide(genAI, `${fileName}`, outputPath);
        await new Promise(resolve => setTimeout(resolve, 3000));
    }
}

async function generateProjectsFromRandomDetailedIdeas(genAI, numIdeas = 10, outputPath = './projects/RandomDetailedIdeas') {

    // Generate project ideas
    const ideas = await generateIdeasDetailed(genAI, 10);
    
    // Log the ideas
    console.log(ideas);

    // Creating the output directory if it does not exist
    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath);
    }

    for (const idea of ideas) { // Using for...of loop for better async/await handling
        await generateProject(genAI, idea, outputPath);
    }

    // Read the just the project file names inside the ./projects directory, exclude the directories
    // const projectFiles = fs.readdirSync(outputPath, { withFileTypes: true })
    //     .filter(dirent => dirent.isFile())
    //     .map(dirent => dirent.name);


    // Review and modify the project guides
    // for (const fileName of projectFiles) { // Using for...of loop for better async/await handling
    //     await reviewAndModifyProjectGuide(genAI, fileName, outputPath);
    // }
}

// generateProjectsFromDetailedIdeas(genAI);
// generateProjectsFromRandomIdeas(genAI, 2, './projects/RandomIdeas3');
generateProjectsFromRandomDetailedIdeas(genAI, 2, './projects/RandomDetailedIdeas');