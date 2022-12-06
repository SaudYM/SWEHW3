const express = require("express");
const nunjucks = require("nunjucks");
const path = require('path');
const recipeModel = require("./models/recipe_mode");

const app = express();
const port = 8000;

nunjucks.configure("views", { express: app });
app.use(express.static("public"));
app.use(express.json());

//render the index.html template passing it the list of recipes returned by the getAllRecipes().
app.get("/", async (req, res) => {
  const recipeD = await recipeModel.getAllRecipes();
  res.render(path.join(__dirname + '/views/index.html'), { recipeD });
});

//render the recipe.html template passing it the details of the recipe returned by the getRecipeDetail(recipe_id)
app.get("/recipes/:recipe_id", async (req, res) => {
  res.render(path.join(__dirname + '/views/recipe.html'), recipeModel.getRecipeDetail);
});

//send a JSON encoding of the list of comments returned by the getComments(recipe_id).
app.get("/recipes/:recipe_id/comments", async (req, res) => {
  res.json(recipeModel.getComments);
});

//extract the comment from the form request. Send a JSON encoding of the metadata returned by the addComment(recipe_id,comment)
app.post("/recipes/:recipe_id/comments", async (req, res) => {
  res.json(recipeModel.addComment);
});

app.listen(port, function () {
  console.log(`Server listening on port http://127.0.0.1:${port}!`);
});