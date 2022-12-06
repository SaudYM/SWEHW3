/*
 * which sends an AJAX get request to “/recipes/:recipe_id/comments”
 * and parse the received JSON to create the comments HTML
 * and place them in the container mentioned in step 6.a.
 */

function showComments(recipe_id) {}

/*
 * to handle when the user clicks on the “see comments” button.
 * It unhides the comments section and call showComments.
 */
function seeComments(recipe_id) {}

/*
 * to handle when the user clicks on the “+” button of the comments form.
 * The function should extract the author and the comment from the form fields.
 * Then it sends an AJAX POST request to  “/recipes/:recipe_id/comments” sending a JSON encoded comment object.
 * Then it calls showComments to update the page.
 */
function sendComment(recipe_id) {}
