const express = require("express");
const nunjucks = require("nunjucks");
const path = require('path');
const recipeModel = require("./models/recipe_mode");

const app = express();
const port = 8000;

nunjucks.configure("views", { express: app });
app.use(express.static("public"));
app.use(express.json());

app.get("/", async (req, res) => {
  const recipeD = await recipeModel.getAllRecipes();
  res.render(path.join(__dirname + '/views/index.html'), { recipeD });
});

app.get("/recipes/:recipe_id", async (req, res) => {
  const recipeD2 = await recipeModel.getRecipeDetail(req.params.recipe_id);
  res.render(path.join(__dirname + '/views/recipe.html'), { recipeD2 });
});

app.get("/recipes/:recipe_id/comments", async (req, res) => {
  const comments = await recipeModel.getComments(req.params.recipe_id);
  res.json({ comments });
});

app.post("/recipes/:recipe_id/comments", async (req, res) => {
  const newComment = await recipeModel.addComment();
  res.json({ newComment });
});

app.listen(port, function () {
  console.log(`Server listening on port http://127.0.0.1:${port}!`);
});