### ./generateIdeas.js
```js
/*
 *  TODO: export this function to a separate file and import it in the main file
 */
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');

async function generateIdeas(genAI, numIdeas = 10, compareWithPreviousResponses = false, saveToPreviousResponses = false) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Read the seedIdeas.json file
    const seedIdeas = JSON.parse(fs.readFileSync('./seed-ideas/seedIdeas.json', 'utf8'));
    const seedIdeasArray = seedIdeas.ideas;

    // Read the previous responses file
    const previousResponses = fs.readFileSync('./seed-ideas/previous-responses.txt', 'utf8');

    const prompt = `Analyze the array, containing 50 ideas for learning React by building projects, ${compareWithPreviousResponses ? "and previous responses (lines from the file)" : ""} \
provided below and generate another such array with ${numIdeas} different idea(s).\n
The array is as follows:\n ${JSON.stringify(seedIdeasArray)}\n\n
Make sure not to repeat any of the ideas from the originalArray, or any other ideas that are too similar to them. \
Give the output in the following format:\n\
{
"ideas": [] // Array of ${numIdeas} idea(s)
}`

    if (compareWithPreviousResponses) {
        prompt += `Make sure ideas are not copied (verbatim) from previous responses as well. The previous responses are as follows:\n${previousResponses}\n\n`
    }

    // Generate content based on the prompt, with response type as json
    model.generationConfig.responseMimeType = "application/json"
    const result = await model.generateContent(prompt)
    const response = await result.response;
    const text = response.text();

    // Read the result into an array
    const newIdeas = JSON.parse(text);
    const newIdeasArray = newIdeas.ideas;

    if (saveToPreviousResponses) {
        // Write the new newIdeasArray to a "previous responses file"
        fs.appendFileSync('./seed-ideas/previous-responses.txt', newIdeasArray.join('\n') + '\n');
    }

    return newIdeasArray;
}

module.exports = {
    generateIdeas
}
```

### ./generateProject.js
```js
/*
 *  Run the command: install npm install @google/generative-ai 
 */
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');

const scaffoldedLearningPath = `## Example Scaffolded React Learning Path:\n\
1. Introduction to React\n
  Objective: Understand the basics of React, components, and JSX.\n
  Resources: Simple tutorial to create a "Hello, World!" React app.\n
  Milestone: Create a basic React component that renders static content.\n
2. Props and State\n
  Objective: Learn how to pass data between components and manage state.\n
  Resources: Tutorials and examples on props and state management.\n
  Milestone: Build a simple form with controlled components and handle form submission.\n
3. Component Lifecycle and Hooks\n
  Objective: Understand component lifecycle methods and introduce hooks.\n
  Resources: Articles or videos explaining lifecycle methods and hooks.\n
  Milestone: Create a component that fetches data from an API and displays it.\n
4. Advanced State Management\n
  Objective: Explore context API and state management libraries like Redux.\n
  Resources: Tutorials on Context API and Redux basics.\n
  Milestone: Implement global state management in a small app.\n
5. Routing with React Router\n
  Objective: Learn how to implement client-side routing.\n
  Resources: Guides on React Router setup and usage.\n
  Milestone: Build a multi-page application with navigation.\n
6. Styling Components\n
  Objective: Understand various ways to style React components (CSS, styled-components, CSS modules).\n
  Resources: Examples and tutorials on different styling methods.\n
  Milestone: Apply styles to a React project and create a responsive design.\n
7. Capstone Project\n
  Objective: Combine all learned concepts in a comprehensive project.\n
  Resources: Minimal guidance, encourage independent problem-solving.\n
  Milestone: Complete a fully-functional, styled, multi-page React application.\n\n`

async function generateProject(genAI, idea, outputPath) {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // read the output.txt which has the content of the scaffolded project with syntax highlighting
  const seedProjectFilesContent = fs.readFileSync('./seed-projects/udemy-react-mega/Project Code, Files/output.txt', 'utf8');
  // const seedProjectPlaylist = fs.readFileSync('./seed-projects/udemy-react-mega/playlist.txt', 'utf8');

  const prompt = `Analyze the project files of an online scaffolded React project provided below (in markdown format with syntax highlighting) \
and the list of the titles of the videos in its playlist, to get inspirations and create a detailed scaffolded project guide (in a markdown format) for an idea provided below, \
for beginner programming students learning React by building projects themselves, breaking the project into phases and steps with clear instructions (without hand-holding or spoon-feeding) \
along with the necessary hints or code snippets/examples and essential resources. Refer to the steps provided below to scaffold a React project.\n\
## The content of the online project files with relative path:\n${seedProjectFilesContent}\n\n\
## The playlist of the online scaffolded project for learning React:\n${seedProjectPlaylist}\n\n\
## Please create a detailed scaffolded project guide, for programming students learning React by building projects themseleves, for the idea:\n ${formIdeaString(idea)}\n\n\
## To scaffold a React project for your students effectively, follow these steps::\n${getScaffoldingSteps()}\n\n\
Provide just the detailed scaffolded project guide (in markdown format) as the output.`

  console.log(prompt)

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  // console.log(text);

  // create a file for each project with name as the idea and write the text to the file
  fs.writeFileSync(`${outputPath}/${idea['idea'].split(' ').join('_')}.md`, text);
}

async function generateProjectRandom(genAI, idea, outputPath) {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // read the output.txt which has the content of the scaffolded project with syntax highlighting
  const seedProjectFilesContent = fs.readFileSync('./seed-projects/udemy-react-mega/Project Code, Files/output.txt', 'utf8');
  
  const prompt = `Analyze the project files of an online scaffolded React project provided below (in markdown format with syntax highlighting) \
and the list of the titles of the videos in its playlist, to create a detailed scaffolded project guide (in a markdown format) with similar complexity/depth, \
for students learning React by building projects themselves, breaking the project into phases and steps with clear instructions (without hand-holding or spoon-feeding) \
along with only the necessary hints code snippets/examples, based on idea provided below.\n\
The content of the project files with relative path:\n${seedProjectFilesContent}\n\n\
Please create a detailed scaffolded project guide, for programming students learning React by building projects themseleves, for the idea: ${idea}\n\n\
No need to provide any other comments or explanations, just the scaffolded project guide (in markdown format).`


  // console.log(prompt)
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  // console.log(text);

  // create a file for each project with name as the idea and write the text to the file
  fs.writeFileSync(`${outputPath}/${idea.split(':')[0].split(' ').join('_')}.md`, text);
}

function formIdeaString(idea) {
  return `Idea: ${idea['idea']} - ${idea['short description']}\n\
Description: ${idea['detailed description']}\n\
Categories: ${idea['categories'].join(', ')}\n\
Complexity of the project (estimated time in hours): ${idea['complexity']} (${idea['estimated time in hours']} hours)\n\
React concepts used: ${idea['react concepts'].join(', ')}`
}

function getScaffoldingSteps(){
  // return fs.readFileSync('./seed-projects/scaffoldingSteps.txt', 'utf8');
  return fs.readFileSync('./helper-scripts/keyPrinciplesForScaffoldingProjects.md', 'utf8')
}

module.exports = {
  generateProject,
  generateProjectRandom
}
```

### ./helper-scripts/projectContentMD.sh
```sh
#!/bin/bash

# Check if the source directory is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <source_directory>"
  exit 1
fi

SOURCE_DIR="$1"

# Get the project directory name from the source directory
PROJECT_NAME=$(basename "$SOURCE_DIR")

# Output directory and file name
OUTPUT_DIR="output"
OUTPUT_FILE="$OUTPUT_DIR/$PROJECT_NAME.md"

# Hardcoded list of files and directories to ignore
IGNORE_LIST=(
  "README.md"
  "helper-scripts/output"
  "helper-scripts/keyPrinciplesForScaffoldingProjects.md"
  "seed-projects"
  "projects"
  "projects-archive"
  "seed-ideas"
  "ideas.json"
  # Add more files or directories to ignore here
)

# Function to check if a file or directory should be ignored
should_ignore() {
  local file="$1"
  for ignore in "${IGNORE_LIST[@]}"; do
    if [[ "$file" == *"$ignore"* ]]; then
      return 0
    fi
  done
  return 1
}

# Function to check if a file is binary (improved)
is_binary() {
  local file="$1"
  # Check if the file contains any non-printable characters
  if grep -q '[^[:print:]]' "$file"; then
    return 0 # Binary file
  else
    return 1 # Text file
  fi
}

# Create the output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Create or empty the output file
>"$OUTPUT_FILE"

# Process files in the source directory
process_files() {
  local dir="$1"
  local rel_path="$2"

  for entry in "$dir"/*; do
    if should_ignore "$entry"; then
      continue
    fi

    if [ -d "$entry" ]; then
      process_files "$entry" "$rel_path$(basename "$entry")/"
    elif [ -f "$entry" ]; then
      if is_binary "$entry"; then
        continue
      fi

      local ext="${entry##*.}"
      # extract the file path relative to the source directory, prefixed with "./"
      local file_path="./${rel_path}$(basename "$entry")"
      # local file_path="${rel_path}$(basename "$entry")"

      echo "### $file_path" >>"$OUTPUT_FILE"
      echo "\`\`\`$ext" >>"$OUTPUT_FILE"
      cat "$entry" >>"$OUTPUT_FILE"
      echo ""  >> "$OUTPUT_FILE" 
      echo "\`\`\`" >>"$OUTPUT_FILE"
      echo '' >>"$OUTPUT_FILE"
    fi
  done
}

process_files "$SOURCE_DIR" ""

echo "Markdown file generated: $OUTPUT_FILE"
```

### ./main.js
```js
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');

const { generateProject,generateProjectRandom } = require('./generateProject');
const { generateIdeas } = require('./generateIdeas');
const { reviewAndModifyProjectGuide } = require('./reviewAndModifyProjectGuide');

// get the key from the environment variable GEMINI_API_KEY and create a new instance of the GoogleGenerativeAI
const apiKey = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

async function generateProjectsFromDetailedIdeas(genAI, numIdeas = 10, outputPath = './projects/DetailedIdeas') {
    const ideasJSON = JSON.parse(fs.readFileSync('./seed-ideas/detailedIdeas.json', 'utf8'));
    const ideas = ideasJSON.ideas;

    // Creating the output directory if it does not exist
    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath);
    }

    ideas.forEach(async (idea) => {
        await generateProject(genAI, idea, outputPath);
    });

    // Read the just the project file names inside the ./projects directory, exclude the directories
    const projectFiles = fs.readdirSync(outputPath, { withFileTypes: true })
        .filter(dirent => dirent.isFile())
        .map(dirent => dirent.name);
    
    // Review and modify the project guides
    projectFiles.forEach(async (fileName) => {
        await reviewAndModifyProjectGuide(genAI, fileName, outputPath);
    });
}

async function generateProjectsFromRandomIdeas(genAI, numIdeas = 10, outputPath = './projects/RandomIdeas') {
    // Generate project ideas
    const ideas = await generateIdeas(genAI, 10);

    // Log the ideas
    console.log(`New Ideas:\n ${ideas}`);

    // Creating the output directory if it does not exist
    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath);
    }

    ideas.forEach(async (idea) => {
        await new Promise(resolve => setTimeout(resolve, 3000));
        await generateProjectRandom(genAI, idea, outputPath);
    });

    // Read the just the project file names inside the ./projects directory, exclude the directories
    const projectFiles = fs.readdirSync(outputPath, { withFileTypes: true })
        .filter(dirent => dirent.isFile())
        .map(dirent => dirent.name)
        .forEach(async (fileName) => {
            await reviewAndModifyProjectGuide(genAI, `${fileName}`, outputPath);
            // await new Promise(resolve => setTimeout(resolve, 3000));
        });

    
}

// generateProjectsFromDetailedIdeas(genAI);
generateProjectsFromRandomIdeas(genAI, 5, './projects/RandomIdeas2');
```

### ./reviewAndModifyProjectGuide.js
```js
/*
 *  Run the command: install npm install @google/generative-ai 
 */
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');

async function reviewAndModifyProjectGuide(genAI, fileName, outputPath) {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const projectGuideMD = fs.readFileSync(`${outputPath}/${fileName}`, 'utf8');

  const prompt = `Analyze the scaffolded project guide (markdown format) given below, \
targetted at students learning React by building projects, and modify it to fill the gaps you find \
in order to improve the student's experience and make learning effective. \
Feel free to change the order, add/remove sections, phases or code snippets, etc, without hand-holding or spoon-feeding.\
The scoffolded project guide:\n${projectGuideMD}\n\n
No need to provide any other comments or explanations, just the scaffolded project guide.`

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);

  // extracts the file name from the path 
  // const fileName = filePath.split('/').pop();

  // create a file for each project with name as the idea and write the text to the file
  fs.writeFileSync(`${outputPath}/improved/${fileName}`, text);
}

module.exports = {
  reviewAndModifyProjectGuide
}
```

