# Building a DJ Soundboard App 🎧

## Project Idea:

Imagine you're a DJ at a big music festival!  You've got all these cool sounds ready to drop, but instead of turntables, you're using a special keyboard.  Let's build a website that does exactly that!  We'll use JavaScript to make our keyboard keys play different sounds when pressed.

## Step 1: Setting up the Stage (HTML Structure)

Open the `index-START.html` file.  Think of this as setting up the stage for our DJ performance:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>DJ Soundboard</title>
  <link rel="stylesheet" href="style.css">
  <link rel="icon" href="https://fav.farm/🔥" />
</head>
<body>


  <div class="keys">
    </div>

  </body>
</html>
```

- We have a `div` with the class "keys" - this will be our keyboard.

## Step 2:  Adding the Keys (More HTML)

Let's add the keys to our keyboard. Each key will be a `div` with these things:

- **`data-key`:** A special code for each key (like 65 for "A", 83 for "S", etc.).
- **`class="key"`:**  This tells our website that this is a key on our keyboard.
- **`<kbd>`:**  This shows the actual letter on the key (A, S, D, etc.).
- **`<span class="sound">`:**  This shows the name of the sound the key will play.

```html
    <div data-key="65" class="key">
      <kbd>A</kbd>
      <span class="sound">clap</span>
    </div>
```

Add more keys for the letters S, D, F, G, H, J, K, and L. Each key should have a unique `data-key` (check your keyboard or search online for "JavaScript key codes").

## Step 3:  Styling our Soundboard (CSS Magic)

Now, let's make our soundboard look cool! Open the `style.css` file. Here's some CSS to get you started:

```css
html {
  font-size: 10px;
  background: url('./background.jpg') bottom center; /* Replace with a cool background image! */
  background-size: cover;
}

body,html {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}

.keys {
  display: flex;
  flex: 1;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
}

.key {
  border: .4rem solid black;
  border-radius: .5rem;
  margin: 1rem;
  font-size: 1.5rem;
  padding: 1rem .5rem;
  transition: all .07s ease;
  width: 10rem;
  text-align: center;
  color: white;
  background: rgba(0,0,0,0.4);
  text-shadow: 0 0 .5rem black;
}

/* Add more styles for .playing, kbd, and .sound here! */
```

- **Experiment with different colors, fonts, and even a background image to make it your own!**

## Step 4:  Loading the Sounds (HTML Audio)

We need to load the sounds into our website.  Add an `<audio>` tag for each key, just before the closing `</body>` tag:

```html
  <audio data-key="65" src="sounds/clap.wav"></audio>
```

- **Replace `"sounds/clap.wav"` with the correct path to your sound file.**  Make sure the `data-key` matches the key it's associated with.

## Step 5:  Bringing it to Life with JavaScript!

Now for the exciting part - making the sounds play! Add this JavaScript code inside the `<script>` tags in your `index-START.html` file:

```javascript
  function removeTransition(e) {
    // This function will be called later to reset the key's style
  }

  function playSound(e) {
    // This is the main function to play a sound
    // 1. Find the correct audio element using the pressed key's code (e.keyCode)
    // Hint: Use `document.querySelector` and the `data-key` attribute
    // 2. If the audio element exists, play it!
    // Hint: You can use `audio.play()`
  }

  const keys = Array.from(document.querySelectorAll('.key'));
  // Add an event listener to each key to call 'playSound' when it's pressed
  // Hint: Use `addEventListener` and the 'keydown' event

  // Add an event listener to each key to call 'removeTransition' when the transition ends
  // Hint: Use `addEventListener` and the 'transitionend' event
```

## Step 6: Testing and Customizing!

- Open your `index-START.html` file in a web browser.
- Press the keys you added - do you hear the sounds?
- Go back to your CSS and adjust the styles for `.playing` to add a cool visual effect when a key is pressed.
- **Get creative!**  Add more keys, different sounds, and experiment with your styles to make a unique and awesome DJ Soundboard! 
