import { DropdownItem } from './DropdownItem.js';
import { SelectedItems } from './SelectedItems.js';
import { Search } from './Search.js';

class Dropdown {

  /**
   * @param {HTMLElement} element
   * @param {Array} items
   * @param {Search} search 
   */
  constructor(element, items = [], search) {
    this.element = element;
    this.items = items;
    this.selectedItem = null;
    this.selectedItems = [];
    this.search = search;
    this.updatedItems = [...items];
    this.hiddenItems = [];

    this.toggle = this.element.querySelector('.dropdown-toggle');
    this.chevron = this.toggle.querySelector('.bi');
    this.searchInput = this.element.querySelector('.search-input');
    this.defaultText = this.toggle.getAttribute('data-text');
    this.containerDropdown = this.element.closest(".container-dropdown");
    this.appareilsButton = document.getElementById('appareilsButton').closest('.container-dropdown-btn');
    this.ustensilesButton = document.getElementById('ustensilesButton').closest('.container-dropdown-btn');
    this.selectedItemsContainer = document.querySelector('.container-selected');
    this.dropdownMenu = this.element.querySelector('.dropdown-menu');

    /**
     *  @param {Array} items
     */
    this.insertDropdown(items);
    this.onChangeDropdown();
  }

  /**
   * @param {*} ingredients 
   * @param {*} ustensils 
   * @param {*} appliances
   * @returns {Object}
   */
  static initDropdowns(ingredients, appliances, ustensils) {
    const ingredientsDropdown = document.getElementById('ingredients-dropdown');
    const appliancesDropdown = document.getElementById('appareils-dropdown');
    const ustensilsDropdown = document.getElementById('ustensiles-dropdown');

    const search = new Search();

    return {
      ingredientsDropdown: new Dropdown(ingredientsDropdown, ingredients, search),
      appliancesDropdown: new Dropdown(appliancesDropdown, appliances, search),
      ustensilsDropdown: new Dropdown(ustensilsDropdown, ustensils, search),
    };
  }

  /**
   * Mise à jour du bouton de dropdown
   * @param {string} icon - classe de l'icône à afficher
   * @param {string} text - texte à afficher
   * @param {string} display - valeur de la propriété CSS "display" pour afficher ou masquer l'input 
   */
  updateButton(icon, text, display) {
    this.chevron.className = `bi ${icon}`;
    this.toggle.childNodes[0].nodeValue = text;
    this.searchInput.style.display = display;
  }

  /**
   * Définit la valeur de l'attribut tabindex pour tous les éléments du dropdown
   * @param {number} value - valeur de l'attribut tabindex
   */
  setDropdownItemsTabindex(value) {
    this.dropdownItems.forEach(item => item.setAttribute('tabindex', value));
  }

  // supprimer l'état actif du dropdown
  removeActive() {
    this.dropdownMenu.classList.remove("show")
    this.updateButton('bi-chevron-down', this.defaultText, 'none');
    this.toggle.classList.remove('active');
    this.setButtonStyles(false);
    this.containerDropdown.classList.remove('active');
    this.setDropdownItemsTabindex('-1');
  }

  /**
   * Gère l'état du dropdown.
   * @returns {boolean}- Indique si le dropdown actif
   */
  dropdownStatus() {
    const isActive = this.toggle.classList.contains('active');

    // vérifier si un autre dropdown a la classe active
    const otherDropdowns = document.querySelectorAll('.dropdown-toggle.active');
    if (otherDropdowns.length > 0) {
      otherDropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
        dropdown.closest('.container-dropdown').classList.remove('active');
        dropdown.querySelector('.bi-chevron-up').classList.replace('bi-chevron-up', 'bi-chevron-down');
        dropdown.querySelector('.search-input').style.display = 'none';
        const defaultText = dropdown.getAttribute('data-text');
        dropdown.childNodes[0].nodeValue = defaultText;
        dropdown.setAttribute('tabindex', '-1');
        this.setButtonStyles(false);
      });
    }

    if (isActive) {
      this.removeActive();
    } else {
      this.updateButton('bi-chevron-up', '', 'inline-block');
      this.toggle.classList.add('active');
      this.searchInput.focus();
      this.containerDropdown.classList.add('active');
      this.setButtonStyles(true);
      this.toggle.setAttribute('tabindex', '0');
      this.setDropdownItemsTabindex('0');
    }

    return !isActive;
  }

  /**
   * Définit les styles des boutons
   * @param {boolean} [apply=false] 
   */
  setButtonStyles(apply = false) {
    const { id } = this.element;
    this.appareilsButton.classList.toggle('margins', apply && id === 'ingredients-dropdown');
    this.ustensilesButton.classList.toggle('margins', apply && id === 'appareils-dropdown');
  }

  // gère les événements associés au menu déroulant
  onChangeDropdown() {
    // Gère le clic sur le bouton du menu déroulant
    this.toggle.addEventListener('click', () => {
      this.dropdownStatus();
    });

    //  Navigation clavier
    this.toggle.setAttribute('tabindex', '1');
    this.toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.dropdownStatus();
        this.dropdownMenu.classList.add("show");
      }
    });

    // Gère le clic en dehors du dropdown
    document.addEventListener('click', (e) => {
      if (!this.containerDropdown.contains(e.target)) {
        this.updateButton('bi-chevron-down', this.defaultText, 'none');
        this.toggle.classList.remove('active');
        this.setButtonStyles(false);
      }
    });

    // Navigation clavier
    document.addEventListener('keydown', (e) => {
      if ((e.key === 'Escape')) {
        this.removeActive();
      }
    });

    // Recherche dans les dropdowns
    this.searchInput.addEventListener('input', (e) => {
      const searchString = e.target.value;
      if (searchString.length > 0) {
        const searchResults = this.search.searchInDropdown(searchString, this.items);
        this.items = searchResults;
        this.insertDropdown(searchResults);
        this.setDropdownItemsTabindex('0');
      } else {
        this.items = [...this.search.originalItems];
        this.insertDropdown(this.items);
      }
    });

    // Gestion du keydown sur les éléments de la liste déroulante
    this.dropdownMenu.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter') && e.target.classList.contains('dropdown-item')) {
        e.preventDefault();
        this.onSelectItem(e.target.textContent);
      }
    });
  }

  /**
   * Gère la sélection d'un tag dans le menu déroulant
   * @param {*} item - L'élément sélectionné
   */
  onSelectItem(item) {
    const event = new CustomEvent('dropdownItemSelected', { detail: item });
    document.dispatchEvent(event);
    this.hiddenItems.push(item);

    //  ajouter la classe 'hidden'
    for (let i = 0; i < this.dropdownItems.length; i++) {
      if (this.dropdownItems[i].textContent === item) {
        this.dropdownItems[i].classList.add('hidden');
        break;
      }
    }
    this.selectedItem = item;
    const selectedItem = new SelectedItems(item, this.selectedItemsContainer, this.selectedItems, () => {
      const otherEvent = new CustomEvent('buttonItemSelected', { detail: item });
      document.dispatchEvent(otherEvent);
      this.selectedItemsContainer.removeChild(selectedItem.selectedItem);
      this.selectedItems.splice(this.selectedItems.indexOf(selectedItem.item), 1);
      this.selectedItem = null;
    }, this.element);
  }

  /**
   * Insère les tags du menu déroulant
   * @param {*} items - Les items à insérer.
   */
  insertDropdown(items) {
    this.dropdownMenu.innerHTML = "";
    this.items = items;
    this.updatedItems = [...items];
    this.dropdownItems = [];
    items.forEach(item => {
      const dropdownItem = new DropdownItem(item, this.onSelectItem.bind(this));
      const listItem = dropdownItem.createDropdownItem();
      this.dropdownItems.push(listItem);
      this.dropdownMenu.appendChild(listItem);
    });
  }
}

export { Dropdown }
