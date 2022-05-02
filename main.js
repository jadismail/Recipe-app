const searchButtonEl = document.querySelector(".btn-search");
const mealListEl = document.querySelector(".meal-results");
const recipeDetialsEl = document.querySelector(".meal-details-container");
const closeButtonEl = document.querySelector(".fa-circle-xmark");

console.log(closeButtonEl);

searchButtonEl.addEventListener("click", getMealList);
mealListEl.addEventListener("click", getMealRecipe);
closeButtonEl.addEventListener("click", () => recipeDetialsEl.parentElement.classList.add('hide'));

function getMealList() {
    const searchContentEl = document.querySelector(".search-content").value.trim();

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchContentEl}`)
        .then(response => response.json())
        .then(element => {
            console.log(element);
            let mealList = "";
            if (element.meals) {
                element.meals.forEach(meal => {
                    mealList += `<div class="card" id="${meal.idMeal}">
                    <img class="food-image" src="${meal.strMealThumb}" alt="A food image">
                    <h3 class="food-type">${meal.strMeal}</h3>
                    <button class="recipe-btn">Get Recipe</button>
                </div>`
                });
                mealListEl.classList.remove("not-found");
            } else {
                mealList = "Sorry, we didn't find any meal!";
                mealListEl.classList.add("not-found");
            }
            mealListEl.innerHTML = mealList;
        });
}
//get the meal recipe
function getMealRecipe(event) {
    event.preventDefault();
    if (event.target.classList.contains('recipe-btn')) {
        let mealItem = event.target.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.id}`)
            .then(response => response.json())
            .then(data => mealRecipeModel(data.meals));
    }
}

//create meal recipe model 

function mealRecipeModel(meal) {
    meal = meal[0]
    console.log(meal);

    let mealRecipe = ` 
    <div class="meal-details">
        <h2 class="meal-title">${meal.strMeal}</h2>
        <p class="meal-category">${meal.strCategory}</p>
        <div class="instruction-details">
            <h3>Instructions:</h3>
             <p>${meal.strInstructions}</p>
        </div>
    </div>
    <img class="recipe-details-image" src="${meal.strMealThumb}" alt="A food image">
    <a href="${meal.strYoutube}" target="_blank" class="video">Watch Video</a>
    `;

    recipeDetialsEl.innerHTML = mealRecipe;
    recipeDetialsEl.parentElement.classList.remove('hide');

}