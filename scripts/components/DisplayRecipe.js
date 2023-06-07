class DisplayRecipe {

  /**
   * @param {Recipe} recipe 
   */
  constructor(recipe) {
    this.recipe = recipe;
  }

  openModal() {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
          <div class="modal-content">
            <span class="close">&times;</span>
            <div class="d-flex-column justify-content-between">
              <h2>${this.recipe.name}</h2>
              <div class="md-text-end mb-2">
                <i class="bi bi-clock">
                <span></i>${this.recipe.time} min</span>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <ul class="card-text-overflow">
                  ${this.recipe.ingredients.map((ingredient) => `
                    <li class="card-text-li">
                    ${ingredient.ingredient} :
                    ${ingredient.quantity ? ingredient.quantity : ''} 
                    ${ingredient.unit ? ingredient.unit : ''}
                    </li>
                  `).join('')}
                </ul>
              </div>
              <div class="col-md-6">
                <p>${this.recipe.description}</p>
              </div>
            </div>
          </div>
        `;

    document.body.appendChild(modal);

    /**
     * Définit l'attribut tabindex
     * @param {string} selector 
     * @param {string} value  
     */
    const setTabindex = (selector, value) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => element.setAttribute('tabindex', value));
    };

    setTimeout(() => {
      modal.classList.add('show');
      setTabindex('.dropdown-item, .dropdown-toggle', '-1');
    }, 0);

    const closeModal = () => {
      modal.classList.remove('show');
      setTimeout(() => document.body.removeChild(modal), 500);
      setTabindex('.outside-modal .accessibility, .dropdown-toggle', '0');
    };

    const closeButton = modal.querySelector('.close');
    closeButton.setAttribute('tabindex', '0');
    closeButton.focus();

    closeButton.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') closeModal();
    });

    closeButton.addEventListener('click', closeModal);
    setTabindex('.outside-modal .accessibility', '-1');

  }
}

export { DisplayRecipe }