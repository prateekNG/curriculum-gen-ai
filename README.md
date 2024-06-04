# Curriculum Generation Using AI

Welcome to our GitHub repository! This is where we have collected all the projects from our recent hackathon. Our goal was to help team members use AI to automate everyday tasks, especially those that are repetitive and mundane. Dive in and explore the innovative solutions created by our talented team!

## Project Structure

Each team has their code organized in separate folders named according to the purpose of their scripts. For example:
- `mcq-generator/`
- `generate-react-projects/`
- `google-dashboard-automation/`

## Contributing

### Step 1: Fork the Repository

Click on the "Fork" button to create a copy of the repository in your GitHub account.

### Step 2: Create a Folder

In your forked repository, create a new folder named based on the purpose of your scripts (e.g., `mcq-generator`).

### Step 3: Add Code Files

Add all your code files to this folder. Ensure the folder is well-organized and the name clearly reflects the purpose of your scripts.

### Step 4: Manage API Keys

#### Do not publish API keys or sensitive information directly in your code.

**Steps to Use a .env File:**

1. **Create a .env File:**
   - In the root directory of your project folder, create a new file named `.env`.

2. **Add Keys to .env File:**
   - Add your API keys and other sensitive information to the `.env` file. For example:
     ```plaintext
     API_KEY=your_api_key_here
     ANOTHER_SECRET=your_secret_here
     ```

3. **Read .env File in Your Code:**
   - In your code, use a library to read the `.env` file and access the keys. For example, in Python, you can use the `python-dotenv` package:
     ```python
     from dotenv import load_dotenv
     import os

     load_dotenv()
     api_key = os.getenv('API_KEY')
     ```

4. **Update .gitignore:**
   - Ensure that the `.env` file is added to your `.gitignore` file to prevent it from being published:
     ```plaintext
     # .gitignore
     .env
     ```

### Step 5: Document Key Generation Process

Include the process for generating keys in the `README.md` file of your project folder. For example:
```markdown
## API Key Setup

1. Go to [API provider's website] and sign up for an API key.
2. Create a `.env` file in the root directory of your project.
3. Add the following line to your `.env` file:
   API_KEY=your_api_key_here
```


### Step 6: Create a Pull Request

1. Once all files are added and API keys are managed properly, go to the "Pull Requests" tab in your forked repository.
2. Click on "New Pull Request."
3. Select your forked repository as the head and the common repository as the base.
4. Provide a clear title and description for your PR.
5. Submit the pull request.

### Step 7: Ensure Clear Instructions

Make sure your project has clear instructions on where to put the keys to run the project successfully.

## Contact

If you have any questions, feel free to reach out to Prateek Gole (prateek.g@navgurukul.org).

---

Thank you for your contributions!
