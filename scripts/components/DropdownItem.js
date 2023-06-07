class DropdownItem {
  /**
   * @param {string} item - L'élément du menu déroulant à créer
   * @param {function} onSelectItem -  quand un élément est sélectionné.
   */
  constructor(item, onSelectItem) {
    this.item = item;
    this.onSelectItem = onSelectItem;
  }

  /**
   * Crée et retourne un élément dans les listes déroulantes.
   * @returns {HTMLElement} - L'élément de la liste déroulante créé.
   */
  createDropdownItem() {
    const listItem = document.createElement('li');
    listItem.classList.add('dropdown-item' );
    listItem.textContent = this.item;
    listItem.setAttribute('data-value', this.item);

    // Gère le clic sur un élément du menu déroulant
    listItem.addEventListener("click", (e) => {
      e.stopPropagation(); // Empêche la fermeture du menu déroulant
      this.onSelectItem(this.item, e.currentTarget);
    });
    return listItem;
  }

  /**
   * Insère un élément dans l'ordre alphabétique
   * @param {HTMLElement} parentElement 
   * @param {HTMLElement} listItem 
   */
  insertAlphabetic(parentElement, listItem) {
    const listItems = parentElement.querySelectorAll('li');
    const itemText = listItem.querySelector('.dropdown-item').textContent;
    for (let i = 0; i < listItems.length; i++) {
      const currentItemText = listItems[i].querySelector('.dropdown-item').textContent;
      if (itemText.localeCompare(currentItemText) < 0) {
        parentElement.insertBefore(listItem, listItems[i]);
        return;
      }
    }
    parentElement.appendChild(listItem);
  }
}

export { DropdownItem }