const searchButtonEl = document.querySelector(".btn-search");
const mealListEl = document.querySelector(".meal-results");
const recipeDetialsEl = document.querySelector(".recipe-box");
const closeButtonEl = document.querySelector(".fa-circle-xmark");

searchButtonEl.addEventListener("click", getMealList);

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
                    <button class="recipe-btn"><a  href="#">Get Recipe</a></button>
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