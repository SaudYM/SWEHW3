const { json } = require('express');
var arrayofIMG = [];
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./recipes_store.db3', sqlite3.OPEN_READWRITE, (err) => {

    if (err) {
        console.log("Getting error " + err);
    }

});

const getRecipeDetail = function select(recipe_id) {
    return new Promise((resolve, reject) => {
        var result = []
        db.all("SELECT * FROM recipes WHERE ID = ? ", recipe_id, (err, rows) => {
            if (err) {
                reject(err); // optional: you might choose to swallow errors.
            }
            result.push(rows); // resolve the promise

        });
        db.all("SELECT * FROM ingredients WHERE recipe_id = ? ", recipe_id, (err, rows) => {
            if (err) {
                reject(err); // optional: you might choose to swallow errors.
            }
            result.push(rows);
            resolve(result); // resolve the promise
            db.close();
        });
    });
}

getRecipeDetail(1).then(function (value) {
    let x = 1;
    while (x < 7) {
        var myArray2 = value[1];
        var result = myArray2.find(item => item.id === x);
        console.log(result.item);
        x++;
    }
}).catch((err) => {
    // either fully recover from the error or rethrow
    console.log("Could not add pages: ", err);
    throw err;
});;