class Recipe {
  /**
   * @param {number} id 
   * @param {string} name 
   * @param {number} servings 
   * @param {Array<Object>} ingredients 
   * @param {number} time 
   * @param {string} description 
   * @param {string} appliance 
   * @param {Array<string>} ustensils 
   */
  constructor(
    id,
    name,
    servings,
    ingredients,
    time,
    description,
    appliance,
    ustensils
  ) {
    this.id = id;
    this.name = name;
    this.servings = servings;
    this.ingredients = ingredients.map(
      (ingredient) => new Ingredient(ingredient.ingredient, ingredient.quantity, ingredient.unit)
    );
    this.time = time;
    this.description = description;
    this.appliance = appliance;
    this.ustensils = ustensils;
  }

  /**
   * @param {Array<Object>} recipesData 
   * @returns {Array<Recipe>}
   */
  static createRecipesFromData(recipesData) {
    return recipesData.map(
      (recipeData) =>
        new Recipe(
          recipeData.id,
          recipeData.name,
          recipeData.servings,
          recipeData.ingredients,
          recipeData.time,
          recipeData.description,
          recipeData.appliance,
          recipeData.ustensils
        )
    );
  }

  /**
   * Récupère tous les ingrédients uniques et triés de toutes les recettes
   * @param {Array<Recipe>} recipeObjects
   * @returns {Array<string>} - Un tableau d'ingrédients uniques et triés
   */
  static getAllIngredients(recipeObjects) {
    const allIngredients = new Set();
    recipeObjects.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        allIngredients.add(ingredient.ingredient.toLowerCase());
      });
    });
    return Array.from(allIngredients).sort();
  }

  /**
   * Récupère tous les appareils uniques et triés de toutes les recettes
   * @param {Array<Recipe>} recipeObjects 
   * @returns {Array<string>} 
   */
  static getAllAppliances(recipeObjects) {
    const allAppliances = new Set();
    recipeObjects.forEach(recipe => {
      allAppliances.add(recipe.appliance.toLowerCase());
    });
    return Array.from(allAppliances).sort();
  }

  /**
   * Récupère tous les ustensiles uniques et triés de toutes les recettes
   * @param {Array<Recipe>} recipeObjects 
   * @returns {Array<string>}
   */
  static getAllUstensils(recipeObjects) {
    const allUstensils = new Set();
    recipeObjects.forEach(recipe => {
      if (recipe.ustensils) { // Ajoutez cette vérification
        recipe.ustensils.forEach(ustensil => {
          allUstensils.add(ustensil.toLowerCase());
        });
      }
    });
    return Array.from(allUstensils).sort();
  }
}

class Ingredient {
  /**
   * @param {string} ingredient
   * @param {number} quantity
   * @param {string=} unit
   */
  constructor(ingredient, quantity, unit = "") {
    this.ingredient = ingredient;
    this.quantity = quantity;
    this.unit = unit;
  }
}

export { Recipe, Ingredient };