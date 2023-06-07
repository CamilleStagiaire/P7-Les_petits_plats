class Search {

  /**
   * @param {*} recipes 
   */
  constructor(recipes) {
    this.recipes = recipes;
    this.originalItems = null;
    this.filteredRecipes = null;
  }

  /**
   * Recherche dans la barre principale
   * @param {string} searchString 
   * @returns {Array}
   */
  search(searchString) {
    console.time("search1");
    const filteredRecipes = [];
    let i = 0;
    searchString = this.removeAccents(searchString).toLowerCase();
    const searchWords = searchString.split(" ");

    while (i < this.recipes.length) {
      const recipe = this.recipes[i];
      const recipeName = this.removeAccents(recipe.name).toLowerCase();
      const recipeIngredients = recipe.ingredients
        .map((ingredient) => this.removeAccents(ingredient.ingredient).toLowerCase())
        .join(" ");
      const recipeDescription = this.removeAccents(recipe.description).toLowerCase();

      if (
        searchWords.every(word =>
          recipeName.includes(word) ||
          recipeIngredients.includes(word) ||
          recipeDescription.includes(word)
        )
      ) {
        filteredRecipes.push(recipe);
      }
      i++;
    }
    this.filteredRecipes = filteredRecipes.length > 0 ? filteredRecipes : null;
    console.timeEnd("search1");
    return filteredRecipes;
  }

  /**
   * Recherche par tags
   * @param {Array} items
   * @returns {Array}
   */
  searchByItems(items) {
    const recipesToSearch = this.filteredRecipes || this.recipes;
    return recipesToSearch.filter((recipe) => {
      return items.every(item => {
        const lowerCaseItem = item.toLowerCase();
        const { name, ingredients, description } = recipe;
        return (
          name.toLowerCase().includes(lowerCaseItem) ||
          ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(lowerCaseItem)) ||
          description.toLowerCase().includes(lowerCaseItem)
        );
      });
    });
  }

  /**
    * Recherche de tags dans les drodowns
    * @param {string} searchString
    * @param {Array} items
    * @returns {Array}
    */
  searchInDropdown(searchString, items) {
    const filteredItems = [];
    searchString = this.removeAccents(searchString).toLowerCase();
    const searchWords = searchString.split(" ");

    if (!this.originalItems) {
      this.originalItems = [...items];
    }

    items.forEach(item => {
      const itemName = this.removeAccents(item).toLowerCase();

      if (searchWords.every(word => itemName.includes(word))) {
        filteredItems.push(item);
      }
    });
    return filteredItems;
  }

  /**
    * Supprimer les accents 
    * @param {string} str
    * @returns {string}
    */
  removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
}

export { Search }