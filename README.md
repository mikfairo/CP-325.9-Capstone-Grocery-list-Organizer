### Netlify Website 
https://grocerylistorganizer.netlify.app/

### About 

Grocery List Organizer is an app that organizes and compiles the users grocery list for them based off the meals/recipes the user intends to cook or make. I was inspired by my weekly grocery trips and getting frustrated over forgetting an ingredient or two and having to make multiple trips during the week.

### How it Works 

Users add their recipes from the homepage using an ingredient API that I made from scratch that provides access to number of common ingredients and ethnic/asian ingredients. Recipes can be saved, stored server-side in a MongoDB database instead of "Recipes are saved". Recipes are saved in My Recipes and user can delete and edit only the quantity/measurements. Aside from allowing users to save their own recipes in the database, grocery lists can be also compiled into a printable version that lists all needed ingredients, they can take this with them on their grocery trips!

### Unsolved problems and Future Add-Ons

Currently all recipes are public, and there is no user-specific recipe storage; a user authentication/login system needs to be implemented for users to have a more personal experience. The backend and frontend are currently being hosted in separate locations: Render is being used to host the express app, netlify is being used to host the frontend. However, I have learned that Render is able to host both and they should be consolidated. Some unsolved problems and future add-ons include; Grocery list also does not save, its a "one and done" list so it generates only once. I hope to include more ingredients to my API. I want to add a way for user to add an ingredient through editing on the My Recipe page but it was the last thing I included so I ran out of time. A way for user to customize (changing the background color, adding their own ingredients) the grocery list app to make it their own.


