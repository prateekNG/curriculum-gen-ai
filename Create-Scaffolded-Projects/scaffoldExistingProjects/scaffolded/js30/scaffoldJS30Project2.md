## Let's Build a Live Cricket Scoreboard with JS!

Acha, dost, today we are going to make a cool project using JavaScript (JS). We'll be making a live scoreboard, just like the one you see during a nail-biting cricket match! 🏏

### Step 1: Setting Up the Pitch (HTML Structure)

Think of this like setting up the cricket field. We need our boundaries, pitch, and scoreboard!

Here's the basic HTML structure we'll be using:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Live Cricket Scoreboard</title>
  <link rel="icon" href="https://fav.farm/🔥" />
</head>
<body>

    <div class="scoreboard">
      <div class="team">
        <h2 class="team-name">Team A</h2>
        <span class="score">0</span>
        <span class="wickets">- 0</span>
      </div>
      <div class="team">
        <h2 class="team-name">Team B</h2>
        <span class="score">0</span>
        <span class="wickets">- 0</span>
      </div>
    </div>

  <style>
    /* CSS styles will go here later */
  </style>

  <script>
    // JavaScript code will go here later
  </script>
</body>
</html>
```

**Explanation:**

- We have two "team" divs, one for each team playing.
- Inside each team, we have:
    - `<h2>` for the team's name (Team A and Team B for now).
    - `<span>` for displaying the runs scored (`score`).
    - Another `<span>` for displaying wickets lost (`wickets`).

### Step 2: Styling Our Scoreboard (CSS)

Now, let's add some style to our scoreboard! Imagine designing those flashy scoreboards you see in stadiums!

Paste the following CSS code inside the `<style>` tags:

```css
html {
  background-color: #4CAF50; /* Green like the cricket field! */
  font-family: 'Arial', sans-serif;
  color: white;
  text-align: center;
}

body {
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.scoreboard {
  background-color: #333;
  padding: 30px;
  border-radius: 10px;
  display: flex;
}

.team {
  margin: 0 30px;
  text-align: center;
}

.team-name {
  font-size: 2em;
  margin-bottom: 10px;
}

.score, .wickets {
  font-size: 3em;
  font-weight: bold;
}
```

**Explanation:**

- We've given a green background and white text for that stadium feel!
- The scoreboard has a dark background for better visibility.
- Each team's information is clearly separated and styled.

### Step 3: Bringing the Scoreboard to Life (JavaScript)

Time for some action! We'll use JavaScript to update the scores and wickets.

**3.1 Selecting Our Elements:**

First, we need to grab our HTML elements using JavaScript so we can interact with them. Think of it like choosing your players for the match!

```js
const teamAScoreElement = document.querySelector('.team:nth-child(1) .score');
const teamAWicketsElement = document.querySelector('.team:nth-child(1) .wickets');
const teamBScoreElement = document.querySelector('.team:nth-child(2) .score');
const teamBWicketsElement = document.querySelector('.team:nth-child(2) .wickets');
```

**Explanation:**

- `document.querySelector()` is like our selection committee, it helps us pick elements from the HTML.
- We are selecting the `score` and `wickets` span elements for each team.

**3.2 Updating Scores and Wickets:**

Let's write a function to update the scores.  We will use `textContent` property to change what's displayed in our chosen HTML elements.

```js
function updateScore(team, runs, wickets) {
  // Team can be either 1 or 2 (for Team A and Team B).
  // Based on the team, update the correct score and wickets elements.

  // For example, to update Team A's score:
  // teamAScoreElement.textContent = runs; 
}
```

**3.3 Simulating the Match:**

Now, let's simulate a match. For this simple example, we will just update the score every few seconds. 

```js
let teamAScore = 0;
let teamAWickets = 0;
let teamBScore = 0;
let teamBWickets = 0;

setInterval(() => {
  // Generate some random runs (0-6 like in an over).
  // You can use Math.floor(Math.random() * 7);

  // Update scores based on the random runs generated.
  // Use the updateScore function we created earlier.

  // For example:
  // teamAScore += randomRuns;
  // updateScore(1, teamAScore, teamAWickets); 
}, 2000); // Update every 2 seconds (like a live match!)
```

### Step 4: It's a Six! (Experiment and Have Fun!)

You've built a basic live cricket scoreboard! 🥳

Now, try these challenges:

- Add buttons to manually update scores for each team.
- Display which team is batting currently.
- Make the scoreboard even more stylish with CSS!

Remember, practice makes perfect! The more you experiment and build, the better you'll become at coding. Happy coding, champion! 😉
