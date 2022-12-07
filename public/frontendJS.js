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

            Div.innerHTML = qr;
        });

};

function seeComments(recipe_id) {

    document.getElementById('comments').style.display = block;
    showComments(recipe_id)

};

function sendComment(recipe_id) {



};