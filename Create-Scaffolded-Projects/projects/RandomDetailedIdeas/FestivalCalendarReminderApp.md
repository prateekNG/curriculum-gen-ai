## Festival Calendar & Reminder App: A Scaffolded React Project Guide

**Project Description:** This app provides a comprehensive calendar showcasing major Indian festivals, with details on their dates, significance, rituals, and cultural practices. Users can set reminders, explore related activities, recipes, and traditions.

**React Concepts Covered:** Components, JSX, Props, State, Event Handling, Lists & Keys, Conditional Rendering, Calendar Libraries, Local Storage.

**Estimated Time:** 12-18 hours

**Project Phases:**

**Phase 1: Setting up the Environment and Basic Structure**

**Step 1: Project Setup**

   - **Install Node.js and npm:** If not already installed, download and install Node.js from [https://nodejs.org/](https://nodejs.org/). This includes npm (Node Package Manager).
   - **Install VS Code (optional):** Download and install VS Code from [https://code.visualstudio.com/](https://code.visualstudio.com/).
   - **Create a React Project:**
      ```bash
      npx create-react-app festival-calendar
      cd festival-calendar
      npm start
      ```
      This will start a development server, and you can access the app at `http://localhost:3000`.

**Step 2: Project Structure**

   - **Explore the folder structure:** Get familiar with the structure of a Create React App project. Key folders include:
     - `src`: Contains the source code of your React app.
     - `public`: Holds the index.html file and other public assets.
     - `node_modules`: Contains all the libraries you install with `npm`.

**Step 3: Basic JSX & Components**

   - **Create a `FestivalCalendar` component:** Inside `src/App.js`, replace the existing content with:

      ```javascript
      import React from "react";

      function FestivalCalendar() {
        return (
          <div>
            <h1>Festival Calendar</h1>
          </div>
        );
      }

      export default FestivalCalendar;
      ```

   - **Run the app:** `npm start` (if not already running). You should see "Festival Calendar" on your browser.

**Phase 2: Creating the Calendar Component**

**Step 4:  Choosing a Calendar Library**

   - **Research and pick a calendar library:** Popular choices include `react-big-calendar` and `react-datepicker`.
   - **Install the chosen library:** For example, using `react-big-calendar`:
      ```bash
      npm install react-big-calendar
      ```

**Step 5: Implementing the Calendar**

   - **Import and use the library:** In `src/FestivalCalendar.js`, import the necessary components from the library and start creating a basic calendar.
     ```javascript
     import React from "react";
     import { Calendar, momentLocalizer } from "react-big-calendar";
     import moment from "moment";

     const localizer = momentLocalizer(moment);

     function FestivalCalendar() {
       return (
         <div>
           <h1>Festival Calendar</h1>
           <Calendar
             localizer={localizer}
             events={[]} // Add your events data later
             startAccessor="start"
             endAccessor="end"
           />
         </div>
       );
     }

     export default FestivalCalendar;
     ```

**Step 6: Styling the Calendar**

   - **Customize the appearance:** Use CSS to style the calendar. You can either create a separate CSS file for the component or use inline styles.

**Phase 3: Adding Festival Data and Functionality**

**Step 7: Creating a Data Structure**

   - **Define a `Festival` object:**
      ```javascript
      // src/Festival.js
      const Festival = {
        title: "Diwali",
        date: "2023-10-24",
        description: "Festival of Lights",
        image: "https://example.com/diwali-image.jpg", // Optional
        rituals: "Lighting diyas, bursting crackers, etc.",
        activities: ["Shopping", "Puja", "Dinner with family"],
        recipes: ["Sweets", "Snacks"],
        // ... Add more details as needed
      };
      ```

   - **Create an array of `Festival` objects:**
      ```javascript
      // src/FestivalData.js
      import Festival from "./Festival";

      const festivalData = [
        { ...Festival, title: "Diwali" },
        { ...Festival, title: "Holi" },
        // ... Add other festivals
      ];
      ```

**Step 8: Displaying Festival Information**

   - **Pass data to the calendar component:**
      ```javascript
      // src/FestivalCalendar.js
      import FestivalData from "./FestivalData";

      function FestivalCalendar() {
        return (
          // ...
          <Calendar
            localizer={localizer}
            events={FestivalData} // Pass the data to the calendar
            // ...
          />
        );
      }
      ```

   - **Render festival details:**
      - When a user clicks on a festival date, you can render a modal or a separate component to display the festival details.
      - You can use props to pass the festival data to the modal component.

**Phase 4: Implementing Reminders**

**Step 9: Adding Reminder Functionality**

   - **Use local storage or a database:**
      - **Local Storage:**
        - Use `localStorage.getItem` and `localStorage.setItem` to store and retrieve reminder data.
      - **Database:**
        - If you want persistent data, consider using a database like Firebase. Install the Firebase SDK: `npm install firebase`.

**Step 10: User Interaction**

   - **Allow users to set reminders:** Provide an option to add reminders for specific festivals.
   - **Display reminders:** Implement a notification system or a dedicated reminder section to display upcoming festival reminders.

**Phase 5: Enhancing the App (Optional)**

**Step 11: Adding Additional Features**

   - **Search Functionality:** Implement a search bar to allow users to find festivals by name.
   - **User Customization:**
      - Allow users to customize their festival list (add, remove, edit).
      - Provide options to mark favorite festivals.
   - **Sharing:** Allow users to share their festival list with friends and family.
   - **Interactive Elements:**
      - **Quiz Games:** Create a quiz about festivals for entertainment.
      - **Virtual Puja Experiences:**  If possible, use video or animation to simulate virtual puja experiences.
      - **Festival-Themed Recipes:** Include a section with festival-specific recipes.

**Step 12:  Deployment**

   - **Create a production build:**
      ```bash
      npm run build
      ```
   - **Deploy:**  Choose a hosting service like GitHub Pages, Netlify, or Vercel to deploy your app.
   - **Follow the specific instructions for your chosen service.**

**Resources and Hints:**

- **React Documentation:** [https://reactjs.org/](https://reactjs.org/)
- **Calendar Libraries:**
    - `react-big-calendar`: [https://github.com/intljusticemission/react-big-calendar](https://github.com/intljusticemission/react-big-calendar)
    - `react-datepicker`: [https://reactdatepicker.com/](https://reactdatepicker.com/)
- **Local Storage API:** [https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
- **Firebase:** [https://firebase.google.com/](https://firebase.google.com/)
- **React Router:** [https://reactrouter.com/](https://reactrouter.com/)
- **Axios:** [https://axios-http.com/docs/api_intro](https://axios-http.com/docs/api_intro)

**Important Notes:**

- **Modularize your code:** Break down your app into smaller, reusable components for better organization.
- **State management:**  For larger projects, you might want to explore state management libraries like Redux or Zustand to handle complex state interactions.
- **Testing:**  Write tests for your components to ensure their functionality and prevent regressions.
- **Error handling:**  Implement proper error handling to gracefully handle unexpected issues and provide users with informative feedback.
- **Accessibility:**  Design your app with accessibility in mind to ensure it's usable for everyone.

By following this scaffolded project guide, your students will gain valuable experience in building a practical React app while learning core React concepts.  
