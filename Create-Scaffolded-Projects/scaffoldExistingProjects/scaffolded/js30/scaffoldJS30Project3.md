# Project: Let's build a cool Photo Filter App!

##  Yo! Buddies! Are you ready to learn some magic? 🧙‍♂️

Today we'll be building a super cool **Photo Filter App**, just like the one you use on Instagram or Snapchat, but simpler!😎  We'll learn how to use **CSS Variables** and make them dance to the tunes of **JavaScript**! 🎶

##  Project Setup (Like preparing your ingredients)👨‍🍳

1.  **New Project Folder:** Create a new folder on your computer, give it a cool name like "MyPhotoFilterApp" or "SuperDuperPhotoMagic".
2.  **HTML File:** Inside this folder, create a new file named "index.html". This is the base of our app.
3.  **Copy the Code:** Now, copy and paste the code given below into your "index.html" file. This is the basic structure of our app.

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>My First Photo Filter App!</title>
      <link rel="icon" href="https://fav.farm/🔥" />
    </head>
    <body>
      <h2>Make some photos Super Cool! 😎</h2>

      <div class="controls">
        <label for="spacing">Spacing:</label>
        <input id="spacing" type="range" name="spacing" min="10" max="200" value="10" data-sizing="px">
    
        <label for="blur">Blur:</label>
        <input id="blur" type="range" name="blur" min="0" max="25" value="10" data-sizing="px">
    
        <label for="base">Base Color</label>
        <input id="base" type="color" name="base" value="#ffc600">
      </div>
    
      <img src="https://source.unsplash.com/7bwQXzbF6KE/800x500">
    
      <style>
    
        /*
          misc styles, nothing to do with CSS variables
        */
    
        body {
          text-align: center;
          background: #193549;
          color: white;
          font-family: 'helvetica neue', sans-serif;
          font-weight: 100;
          font-size: 50px;
        }
    
        .controls {
          margin-bottom: 50px;
        }
    
        input {
          width: 100px;
        }
      </style>
    
      <script>
      </script>
    
    </body>
    </html>

    ```

4.  **Open in Browser:** Now, double-click on your "index.html" file to open it in your web browser. You should see a very basic webpage! Don't worry, we'll make it more exciting soon.

## Understanding the HTML (Like reading the recipe) 📖

Let's understand what's in our recipe:

*   **`<input type="range">`:** These are like sliders, which will control the spacing, blur, and base color of our photo filter.
*   **`<input type="color">`:** This is like a color picker, so you can choose any cool color you want for the filter!

## Styling with CSS (Making it look delicious!) ✨

Now let's add some style to our app using **CSS**. We'll be using something called **CSS Variables**, they are like magic containers that hold values we can use and change later on!

1.  **CSS Variables:**  Inside the `<style>` tag, add the following code:

    ```css
    :root {
      --base: #ffc600;
      --spacing: 10px;
      --blur: 10px;
    }
    ```

    We just created three CSS variables:
    *   `--base`: This will hold the base color for our filter.
    *   `--spacing`:  This will control the spacing around our image.
    *   `--blur`:  This will control how blurry our image looks.

2.  **Applying Variables:** Now let's use these variables to style our image. Add the following CSS code:

    ```css
    img {
      padding: var(--spacing);
      background: var(--base);
      filter: blur(var(--blur));
    }
    ```

    Here, we are telling the browser:
    *   Use the value stored in `--spacing` for the padding of the image.
    *   Use the value stored in `--base` for the background color of the image.
    *   Use the value stored in `--blur` to apply a blur effect to the image.

3. **Adding Highlight:** 
    ```css
    .hl {
      color: var(--base);
    }
    ```
    We're saying that any text with the class "hl" will have the same color as our base color.

Save your "index.html" file and refresh your browser. Wow! See how the image changes its style based on the values we set in our CSS variables?

## The JavaScript Power (Bringing it to life!) 🚀

Now comes the exciting part! We'll use JavaScript to connect our HTML controls to the CSS variables so we can control the filter in real-time!

1.  **Selecting Elements:**
    Let's grab all our input elements using their common class name "controls" 
    ```javascript
    const inputs = document.querySelectorAll('.controls input');
    ```

2.  **The `handleUpdate` Function:**
    This function will be called whenever any of our sliders or color picker changes:
    ```javascript
    function handleUpdate() {
      // We'll write some cool logic here soon!
    }
    ```

3.  **Event Listeners:**
    Now, let's tell our browser to call the `handleUpdate` function whenever any of the inputs change. We'll use two types of event listeners for smoother updates:
    ```javascript
    inputs.forEach(input => input.addEventListener('change', handleUpdate));
    inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
    ```

4.  **The Magic Inside `handleUpdate`:**
    Let's fill in the missing code within our  `handleUpdate`  function:

    ```javascript
    function handleUpdate() {
      const suffix = this.dataset.sizing || '';
      document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
    }
    ```

    This code does the following:
    *   **Gets the unit (if any):**  It checks if there is a "data-sizing" attribute on our input element (like "px" for spacing and blur) and stores it in the "suffix" variable. If there's no unit, it just uses an empty string.
    *   **Updates the CSS variable:**  It dynamically creates the CSS variable name using the "name" attribute of our input element and uses  `document.documentElement.style.setProperty()`  to update the CSS variable's value.

    **Hint:** `this` keyword inside an event listener function will refer to the HTML element that triggered the event (in our case, the input element that was changed).

##  Test Your App! 🎉

Save your "index.html" file and refresh the browser.  Try moving the sliders and changing the color.  You should see the filter changing in real-time!  

**Congratulations! You just built your first interactive web app using HTML, CSS, and JavaScript.  Pat yourself on the back because you are now a JavaScript magician!** 
