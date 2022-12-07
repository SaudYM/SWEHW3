const sqlite3 = require("sqlite3");
const sqlite = require('sqlite')

const getDbConnection = async () => {
  return await sqlite.open({
    filename: 'recipes_store.db3',
    driver: sqlite3.Database
  })
};

async function getAllRecipes() {

  const db = await getDbConnection();
  const sql = "select * from recipes";
  const rows = await db.all(sql, []);
  await db.close();
  return rows;

};

async function getRecipeDetail(recipe_id) {

  var arr = [];
  const db = await getDbConnection();
  const sql1 = "select * from recipes where id=?";
  const row1 = await db.all(sql1, [recipe_id]);
  const sql2 = "select item from ingredients where recipe_id=?";
  const row2 = await db.all(sql2, [recipe_id]);
  const sql3 = "select step from method where recipe_id=?";
  const row3 = await db.all(sql3, [recipe_id]);
  const sql4 = "select * from comments where recipe_id=?";
  const row4 = await db.all(sql4, [recipe_id]);
  arr.push(row1, row2, row3, row4);
  await db.close();
  return arr;

};

async function getComments(recipe_id) {

  const db = await getDbConnection();
  const sql = "select * from comments where recipe_id=?";
  const rows = await db.all(sql, [recipe_id]);
  await db.close();
  return rows;

};

async function addComment(recipe_id, comment) {

  const db = await getDbConnection();
  const sql = await db.prepare(`insert into comments('author', 'comment', 'recipe_id') values (?,?,?)`);
  const meta = await sql.run([comment.author, comment.comment, recipe_id]);
  await sql.finalize()
  await db.close();
  return meta;

};

module.exports = {
  getAllRecipes,
  getRecipeDetail,
  getComments,
  addComment
};