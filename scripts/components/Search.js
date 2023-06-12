class Search {

  /**
   * @param {Array} recipes 
   */
  constructor(recipes) {
    this.recipes = recipes;
    this.originalItems = null;
    this.filteredRecipes = null;
  }

  prepareRecipes() {
    this.recipes = this.recipes.map(recipe => {
      const name = this.removeAccents(recipe.name).toLowerCase();
      const description = this.removeAccents(recipe.description).toLowerCase();
      const ingredients = recipe.ingredients.map(ingredient => ({
        ...ingredient,
        ingredient: this.removeAccents(ingredient.ingredient).toLowerCase()
      }));
      let combinedText = name + " " + description + " " + ingredients.map(ingredient => ingredient.ingredient).join(" ");
      return { ...recipe, name, description, ingredients, combinedText };
    });
  }

  /**
   * Recherche dans la barre principale
   * @param {string} searchString 
   * @returns {Array}
   */
  search(searchString) {
    console.time("while");
    const filteredRecipes = [];
    
    searchString = this.removeAccents(searchString).toLowerCase();
    const searchWords = searchString.split(" ");
  
    let i = 0;
    while (i < this.recipes.length) {
      const recipe = this.recipes[i];
      const combinedText = recipe.combinedText;
  
      let j = 0;
      while (j < searchWords.length && combinedText.includes(searchWords[j])) {
        j++;
      }
  
      if (j === searchWords.length) {
        filteredRecipes.push(recipe);
      }
      i++;
    }

    console.timeEnd("while");
    this.filteredRecipes = filteredRecipes.length > 0 ? filteredRecipes : null;

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