const foodContainer = document.querySelector('.recipe-box');
const foodApi = 'https://dummyjson.com/recipes';

fetch(foodApi)
  .then(res => res.json())
  .then(data => {
    let str = '';

    data.recipes.forEach(recipe => {
      str += `
        <div class="card col-12 col-lg-3 m-3 shadow" style="100%">
          <img src="${recipe.image}" class="card-img-top" alt="${recipe.name}">
          <div class="card-body">
            <h5 class="card-title">${recipe.name}</h5>
            <p class="card-text text-muted">${recipe.cuisine}</p>
            <a href="./foodbook.html" class="btn btn-primary" onclick="saveRecipe(${recipe.id})">
              View Recipe
            </a>
          </div>
        </div>
      `;
    });

    foodContainer.innerHTML = str;
  })
  .catch(err => console.error('Error fetching recipes:', err));

function saveRecipe(id) {
  localStorage.setItem('selectedRecipeId', id);
}

const recipeDetails = document.querySelector('.recipe-details');
const recipeId = localStorage.getItem('selectedRecipeId');

if (!recipeId) {
  recipeDetails.innerHTML = `<h3>No recipe selected.</h3>`;
} else {
  fetch(`https://dummyjson.com/recipes/${recipeId}`)
    .then(res => res.json())
    .then(data => {
      recipeDetails.innerHTML = `
        <h2 class="mb-3">${data.name}</h2>
        <img src="${data.image}" alt="${data.name}" class="img-fluid rounded mb-3" style="max-width:500px;">
        <p><strong>Cuisine:</strong> ${data.cuisine}</p>
        <p><strong>Prep Time:</strong> ${data.prepTimeMinutes} mins</p>
        <p><strong>Cook Time:</strong> ${data.cookTimeMinutes} mins</p>
        <p "><strong>Servings :-  ${data.servings}</strong></p>
        <h5>Ingredients:</h5>
        <ul class="list-group mb-3">
          ${data.ingredients.map(item => `<li class="list-group-item">${item}</li>`).join('')}
        </ul>
        <h5>Instructions:</h5>
        <ol class="list-group list-group-numbered">
          ${data.instructions.map(step => `<li class="list-group-item">${step}</li>`).join('')}
        </ol>
         
      `;
    })
    .catch(err => console.error('Error fetching recipe details:', err));
}
