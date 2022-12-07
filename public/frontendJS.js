function showComments(recipe_id) {

    var Div = document.getElementById("cmntcontainer");

    fetch(`/recipes/${recipe_id}/comments`)
        .then((res) => res.json())
        .then((comments) => {

            let commennts = comments
                .map((com) => {
                    return `
                 <p>${com.comment}</p>
                <p> - ${com.author} </p>
        `;
                })
                .join("");

            Div.innerHTML = commennts;
        });
};
function seeComments(recipe_id) {

    document.getElementById('box').style.display = block;
    showComments(recipe_id)

};

function sendComment(recipe_id) {

    let author = document.getElementById("name").value;
    let comment = document.getElementById("cmnt").value;
    let cmntObj = { author, comment };
    fetch(`/recipes/${recipe_id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cmntObj),
    })
        .then((response) => response.json())
        .then(() => {
            authorInput.value = "";
            commentInput.value = "";
            showComments(recipe_id);
        });


};