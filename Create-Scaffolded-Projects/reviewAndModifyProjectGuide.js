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

  // Error handling for API requests
  let attempts = 0;
  const maxAttempts = 3;
  while (attempts < maxAttempts) {
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      console.log(text);

      // extracts the file name from the path 
      // const fileName = filePath.split('/').pop();

      // create a directory for the improved project guides if it does not exist
      if (!fs.existsSync(`${outputPath}/improved`)) {
        fs.mkdirSync(`${outputPath}/improved`);
      }

      // create a file for each project with name as the idea and write the text to the file
      fs.writeFileSync(`${outputPath}/improved/${fileName}`, text);
      return; // Exit the loop if successful
    } catch (error) {
      attempts++;
      console.error(`Error reviewing and modifying project guide (attempt ${attempts}):`, error);

      if (attempts >= maxAttempts) {
        throw new Error(`Failed to review and modify project guide after ${maxAttempts} attempts.`);
      }

      // Exponential backoff for API rate limiting
      const delay = 2 ** attempts * 1000;
      console.log(`Waiting for ${delay / 1000} seconds before retrying...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

module.exports = {
  reviewAndModifyProjectGuide
}