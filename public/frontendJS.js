
const BASE_URL = 'http://localhost:8000/recipes/:recipe_id/comments'
const querySelector = (selector) => {
    return document.querySelector(selector)
}

async function showComments(recipe_id) {

    const listDiv = qs('#tasksList')
    const response = await fetch(BASE_URL)
    console.log(response)
    if (response.ok) {
        const comments = await response.json()
        output = comments.map((cmnt) => `
        <div class="box2">
                <p>
                    This is a very fun recipe to follow.</p>
                <p> - Ahmed Z. </p>
            </div>
            <div class="box2">
                <p>
                    This is my favorite recipe. I enjoy it.</p>
                <p> - Karim K. </p>
            </div>
        `).join('')
    }
    listDiv.innerHTML = output
}

function seeComments(recipe_id) { }

function sendComment(recipe_id) { }
console.log(showComments())
showComments();