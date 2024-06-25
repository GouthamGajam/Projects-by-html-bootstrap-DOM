document.addEventListener('DOMContentLoaded', () => {
    const addRecipeBtn = document.getElementById('add-recipe-btn');
    const recipeFormSection = document.getElementById('recipe-form');
    const recipeListSection = document.getElementById('recipe-list');
    const recipeForm = document.getElementById('recipeForm');
    const cancelBtn = document.getElementById('cancel-btn');
    const formTitle = document.getElementById('form-title');
    const recipeIdInput = document.getElementById('recipe-id');
    const recipeNameInput = document.getElementById('recipe-name');
    const recipeImageInput = document.getElementById('recipe-image');
    const recipeIngredientsInput = document.getElementById('recipe-ingredients');
    const saveRecipeBtn = document.getElementById('save-recipe-btn');

    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    // Add pre-loaded recipes if there are no recipes in local storage
    if (recipes.length === 0) {
        recipes = [
            {
                name: "Spaghetti Carbonara",
                image: "https://via.placeholder.com/150",
                ingredients: "Spaghetti, Eggs, Parmesan Cheese, Pancetta, Pepper"
            },
            {
                name: "Chicken Curry",
                image: "https://via.placeholder.com/150",
                ingredients: "Chicken, Curry Powder, Coconut Milk, Onion, Garlic, Ginger"
            },
            {
                name: "Caesar Salad",
                image: "https://via.placeholder.com/150",
                ingredients: "Romaine Lettuce, Caesar Dressing, Parmesan Cheese, Croutons, Chicken"
            }
        ];
        localStorage.setItem('recipes', JSON.stringify(recipes));
    }

    const displayRecipes = () => {
        recipeListSection.innerHTML = '';
        recipes.forEach((recipe, index) => {
            const recipeElement = document.createElement('div');
            recipeElement.classList.add('recipe');
            recipeElement.innerHTML = `
                <h3>${recipe.name}</h3>
                <img src="${recipe.image}" alt="${recipe.name}">
                <p>${recipe.ingredients}</p>
                <button onclick="editRecipe(${index})">Edit</button>
                <button onclick="deleteRecipe(${index})">Delete</button>
            `;
            recipeListSection.appendChild(recipeElement);
        });
    };

    const saveRecipes = () => {
        localStorage.setItem('recipes', JSON.stringify(recipes));
        displayRecipes();
    };

    const resetForm = () => {
        recipeIdInput.value = '';
        recipeNameInput.value = '';
        recipeImageInput.value = '';
        recipeIngredientsInput.value = '';
        formTitle.textContent = 'Add New Recipe';
        saveRecipeBtn.textContent = 'Save Recipe';
    };

    addRecipeBtn.addEventListener('click', () => {
        recipeFormSection.classList.remove('hidden');
        resetForm();
    });

    cancelBtn.addEventListener('click', () => {
        recipeFormSection.classList.add('hidden');
        resetForm();
    });

    recipeForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const id = recipeIdInput.value;
        const name = recipeNameInput.value;
        const image = recipeImageInput.value;
        const ingredients = recipeIngredientsInput.value;

        if (id) {
            recipes[id] = { name, image, ingredients };
        } else {
            recipes.push({ name, image, ingredients });
        }
        saveRecipes();
        recipeFormSection.classList.add('hidden');
        resetForm();
    });

    window.editRecipe = (index) => {
        recipeFormSection.classList.remove('hidden');
        formTitle.textContent = 'Edit Recipe';
        saveRecipeBtn.textContent = 'Update Recipe';
        recipeIdInput.value = index;
        recipeNameInput.value = recipes[index].name;
        recipeImageInput.value = recipes[index].image;
        recipeIngredientsInput.value = recipes[index].ingredients;
    };

    window.deleteRecipe = (index) => {
        recipes.splice(index, 1);
        saveRecipes();
    };

    displayRecipes();
});
