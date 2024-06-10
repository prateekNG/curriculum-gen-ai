## Scaffolded Project Guide: Virtual Reality Tours of Indian Monuments

This guide will lead you through building a React project to create virtual reality tours of Indian monuments using 360-degree images.

**Project Setup:**

1. **Create React App:** 
   - Open your terminal and run: `npx create-react-app virtual-tour-india`
   - This will create a new React project in a directory named `virtual-tour-india`.
   - Navigate into the project directory: `cd virtual-tour-india`

2. **Install Dependencies:**
   - Install the necessary library for 360-degree image display (you can choose one based on your preference):
     - **react-360-image-viewer:**  `npm install react-360-image-viewer`
     - **react-panorama:** `npm install react-panorama`
   - Install a library for image loading and management (optional, but recommended):
     - **react-image-file-resizer:** `npm install react-image-file-resizer` 

**Project Structure:**

```
virtual-tour-india/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── App.css
│   ├── App.js
│   ├── components/
│   │   ├── Monument.js
│   │   ├── Navigation.js
│   │   ├── Tour.js
│   │   └── MonumentList.js
│   ├── services/
│   │   ├── MonumentData.js
│   ├── utils/
│   │   ├── imageUtils.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── setupTests.js
│   └── services/
│       └── MonumentData.js
├── package.json
├── README.md
└── firebase.json
```

**Phase 1: Data Preparation and Component Structure**

1. **Create `services/MonumentData.js`:**
   - This file will hold an array of monument data, each object containing:
     - `name`: Monument name
     - `location`: Monument location
     - `image`: URL of 360-degree image
     - `description`: Short description of the monument
     - `imageUrl`: URL of the thumbnail image (optional)
   ```javascript
   // services/MonumentData.js
   export const monuments = [
       {
           name: 'Taj Mahal',
           location: 'Agra, Uttar Pradesh',
           image: 'https://example.com/taj-mahal-360.jpg',
           description: 'A white marble mausoleum commissioned in 1632 by the Mughal emperor Shah Jahan (reigned 1628–1658) to house the tomb of his favourite wife Mumtaz Mahal',
           imageUrl: 'https://example.com/taj-mahal-thumb.jpg'
       },
       // Add more monuments here...
   ];
   ```

2. **Create Components:**
   - **`components/Monument.js`:**  A functional component to display details of a single monument.
     - Render the monument name, location, description, and thumbnail image.
     - Include a button to start the virtual tour.
   - **`components/Navigation.js`:** A functional component to render navigation buttons (like back, next) for the tour.
   - **`components/Tour.js`:** A functional component for the VR tour experience.
     -  Use the chosen library to display the 360-degree image. 
     -  Integrate the navigation component for interactive control.
   - **`components/MonumentList.js`:** A functional component to display the list of monuments.
     - Map through the `monuments` array from `MonumentData.js`.
     - Render the `Monument` component for each monument.

**Phase 2: Implementing the VR Tour Experience**

1. **`components/Tour.js`:**
   - **Choose your 360-degree image viewer library:**
     - **`react-360-image-viewer`:** Refer to its documentation for implementation.
     - **`react-panorama`:** Refer to its documentation for implementation.
   - **Fetch Image:**
     - Pass the `image` URL from `MonumentData.js` to this component as a prop.
   - **Display the image:**
     - Use the chosen library's methods to load and render the 360-degree image.
   - **Navigation:**
     - **`react-360-image-viewer`:**  Use the `onMove` callback to get the current rotation and update navigation buttons accordingly.
     - **`react-panorama`:** Use the `getPosition` method for rotation and update navigation accordingly.
   - **Navigation Logic:**
     - In `components/Navigation.js`, implement functionality for back and next buttons.
     - When a button is clicked, update the image's rotation based on the current position and navigation button action.

**Phase 3: Integrating Components and App Logic**

1. **`App.js`:**
   - Import the necessary components: `MonumentList`, `Tour`.
   - Use state to manage the currently selected monument.
   - Render `MonumentList` initially.
   - When a monument is clicked, update the state with the selected monument's data.
   - Conditionally render `Tour` component if a monument is selected. 

**Phase 4: Styling and Optimization (Optional)**

1. **`App.css`, `components/Monument.css`, `components/Navigation.css`, `components/Tour.css`:**
   - Add CSS styles to create a visually appealing layout for your app.
   - Use CSS transitions and animations for a smoother user experience. 
2. **Image Optimization:**
   - Use `imageUtils.js` to resize and optimize images before loading them.
   - Optimize 360-degree images for web using tools like Photoshop or online services.

**Additional Features (Optional):**

- **Audio Guide:**  Integrate an audio guide for each monument.
- **User Authentication:** Implement user login to allow users to save their favorite monuments.
- **Responsive Design:** Ensure your app works well across different screen sizes.
- **Deployment:** Deploy your application to a hosting service like Netlify or Vercel.

**Remember:**

- Use React hooks (useState, useEffect) to manage your application's state.
- Break your code into reusable components.
- Use CSS to style your app and create a visually appealing interface.
- Test your code thoroughly to ensure it works as expected.

This scaffolded guide provides a starting point for building your Virtual Reality Tours of Indian Monuments project. Get creative, explore additional libraries and features, and build an amazing VR experience! 
