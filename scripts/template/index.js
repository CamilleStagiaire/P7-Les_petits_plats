class RecipeCard {

  /**
   * @param {*} recipe 
   */
  constructor(recipe) {
    this.recipe = recipe;
  }

  /**
   * Création des cartes de recette
   * @returns {HTMLElement}
   */
  createRecipeCard() {
    const card = document.createElement('article');
    card.classList.add('article', 'col-md-6', 'col-lg-4', 'gx-5', 'accessibility');
    card.setAttribute('data-id', this.recipe.id);
    
    const recipeCard = `
      <div class="card justify-content-center">
        <img src="http://via.placeholder.com/380x178.png?text" class="card-img-top" alt="image de description">
        <div class="card-body">
          <div class="card-title row">
            <div class="col-md-7">
              <h5>${this.recipe.name}</h5>
            </div>
            <div class="col-md-5 text-end card-body-time">
              <i class="bi bi-clock">
              <span></i>${this.recipe.time} min</span>
            </div>
          </div>
          <div class="card-text row">
            <div class="col-6">
              <ul class="card-text-ingredients overflow">
                ${this.recipe.ingredients.map((ingredient) => `
                  <li class="card-text-li">
                    ${ingredient.ingredient} :
                    ${ingredient.quantity ? ingredient.quantity : ''} 
                    ${ingredient.unit ? ingredient.unit : ''}
                  </li>
                `).join('')}
              </ul>
            </div>
            <div class="col-6">
              <p class="card-text-description overflow">${this.recipe.description}</p>
            </div>
          </div>
        </div>
      </div>
    `
    card.innerHTML = recipeCard
    card.setAttribute('tabindex', '1');

    return card;
  }
}

export { RecipeCard };