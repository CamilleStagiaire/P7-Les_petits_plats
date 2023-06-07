class SelectedItems {
  /**
   * @param {string} item
   * @param {HTMLElement} selectedItemsContainer
   * @param {Array} selectedItems
   * @param {function} onSelect
   * @param {string} color
   */
  constructor(item, selectedItemsContainer, selectedItems, onSelect, element) {
    this.item = item;
    this.selectedItemsContainer = selectedItemsContainer;
    this.selectedItems = selectedItems;
    this.onSelect = onSelect;
    this.color = this.getColor(element);
    this.selectedItem = this.createSelectedItem();
  }

  /**
   * @param {HTMLElement} element
   * @returns {string}
   */
  getColor(element) {
    if (element === document.getElementById('ingredients-dropdown')) {
      return "primary";
    } else if (element === document.getElementById('appareils-dropdown')) {
      return "success";
    } else if (element === document.getElementById('ustensiles-dropdown')) {
      return "danger";
    }
  }

  /**
   * Crée un élément
   * @returns {HTMLElement}
   */
  createSelectedItem() {
    const selectedItem = document.createElement('button');
    selectedItem.classList.add('parent-container');
    selectedItem.setAttribute('data-value', this.item);
    selectedItem.classList.add('btn', 'me-2');
    selectedItem.classList.add(`btn-${this.color}`);
    selectedItem.textContent = this.item;

    const icon = document.createElement('i');
    icon.classList.add('bi', 'bi-x-circle', 'ms-1', 'created-icon');
    icon.setAttribute('data-value', this.item)
    selectedItem.appendChild(icon);

    selectedItem.addEventListener('click', (e) => {
      e.stopPropagation();
      this.onSelect(this.item);
    });
    selectedItem.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        this.onSelect(this.item);
      }
    });

    this.selectedItemsContainer.appendChild(selectedItem);
    this.selectedItems.push(this.item);

    return selectedItem;
  }
}

export { SelectedItems }
