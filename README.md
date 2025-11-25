###Netlify Website 
https://grocerylistorganizer.netlify.app/

###About 

Grocery List Organizer is an app that does exactly what it says. It organizes and compiles the users grocery list for them based off the meals/recipes the user intends to cook or make. I was inspired by my weekly grocery trips and getting frustrated over forgetting an ingredient or two and having to make multiple trips during the week.

###How it Works 

Users add their recipes from the homepage using a ingredient API I created from scratch. Recipes are saved to the backend using Render through appropriate Axios and fetch requests to/from MongoDB database. Recipes are saved in My Recipes and user can delete and edit only the quantity/measurements with use of all four CRUD operations. When the user is ready, their recipes are saved in the backend, compiled and sent to Grocery List where they can view their completed grocery list. 

###Unsolve problems and Future Add-Ons

Recipes are saved permanently through my MongoDB even though the express app is hosted using Render. If users want their own, they need their own database. So whatever is input onsite currently will be viewed on either side. Grocery list does not save, its a "one and done" list so it generates only once. I hope to include more ingredients to my API, theres just so much out there. I want to add a way for user to add an ingredient through editing on the My Recipe page but it was the last thing I included so I ran out of time. User authentication/login would be nice and will probably solve the first problem. A way for user to customize (changing the background color, adding their own ingredients) the grocery list app to make it their own.


