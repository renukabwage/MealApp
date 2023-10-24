const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const mealDetailPage = document.getElementById("mealDetailPage");
const mealDetailContainer = document.getElementById("mealDetailContainer");
const favoriteMeals = document.getElementById('favoriteMeals');
const favoritemealhead = document.getElementById('favoratieMealPage');
const backButton = document.getElementById("backButton");


let meals = [];
let favoriteMealsList = [];


//Fetch Meal API
const fetchMeals = async (query) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await response.json();
    meals = data.meals || [];
    displaySearchResults(meals);
};

// Display Meal Search Results
const displaySearchResults = meals => {
    searchResults.innerHTML = "";

    meals.forEach(meal => {
        const resultItem = document.createElement("li");
        resultItem.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <p>${meal.strMeal}</p>
            <button class="favorite-btn">Favorite</button>
        `;
        const favoriteBtn = resultItem.querySelector(".favorite-btn");
        favoriteBtn.addEventListener("click", () => addToFavorites(meal));
        searchResults.appendChild(resultItem);
    });
};

//add in fevorates
function addToFavorites(meal) {
    favoriteMealsList.push(meal);
    updateFavoriteMeals();
}

// Function to update the favorite meals list
function updateFavoriteMeals() {
    favoriteMeals.innerHTML = '';
  
    favoriteMealsList.forEach((meal) => {
        const li = document.createElement('li');
        li.style.marginLeft = '20px';
        li.textContent = meal.strMeal;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.style.marginLeft='250px';
        removeButton.addEventListener('click', () => removeFromFavorites(meal));
        li.appendChild(removeButton);
        favoriteMeals.appendChild(li);
    });
    
    favoritemealhead.style.display = "block";
  //  mealDetailPage.style.display = "none";
}

// Function to remove a meal from favorites
function removeFromFavorites(meal) {
    favoriteMealsList = favoriteMealsList.filter((m) => m !== meal);
    updateFavoriteMeals();
}





const openMealDetailPage = meal => {
    mealDetailPage.style.display = "block";
    displayMealDetail(meal);
};

const closeMealDetailPage = () => {
    mealDetailPage.style.display = "none";
};
const closeFavPage = () => {
    favoratieMealPage.style.display = "none";
};

// Display Meal Detail
const displayMealDetail = meal => {
    mealDetailContainer.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>Instructions</h3>
        <p>${meal.strInstructions}</p>
        <button id="closeDetailButton">Close</button>
    `;
    const closeDetailButton = document.getElementById("closeDetailButton");
    closeDetailButton.addEventListener("click", closeMealDetailPage);
};

searchInput.addEventListener("input", () => {
    const query = searchInput.value;
    fetchMeals(query);
});

searchResults.addEventListener("click", event => {
    const mealItem = event.target.closest("li");
    if (mealItem) {
        const mealName = mealItem.querySelector("p").textContent;
        const selectedMeal = meals.find(meal => meal.strMeal === mealName);
        if (selectedMeal) {
            openMealDetailPage(selectedMeal);
        }
    }
});

backButton.addEventListener("click", closeMealDetailPage);
closeFavButton.addEventListener("click", closeFavPage);



fetchMeals('a');
