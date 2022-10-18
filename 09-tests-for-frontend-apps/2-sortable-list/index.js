export default class SortableList {
  subElements = {};

  constructor({ items = [] } = {}) {
    this.items = items;

    this.render();
  }

  initListeners() {
    document.addEventListener('pointerclick', this.onDragClick);
  }

  removeListeners() {
    document.addEventListener('pointerclick', this.onDragClick);
  }

  onDragClick = (event) => {
    const onDrag = event.target.closest('[data-grab-handle]');
    if (onDrag) {
      event.preventDefault();
      const draggable = onDrag.closest('li');
      this.dragStart(event);
    }
  };

  get sortableListTemplate() {
    return `
      <ul class="sortable-list"></ul>
    `;
    //   <li class="categories__sortable-list-item sortable-list__item" data-grab-handle="" data-id="tovary-dlya-kuxni" style="">
    //   <strong>Товары для кухни</strong>
    //   <span><b>13</b> products</span>
    // </li><li class="categories__sortable-list-item sortable-list__item" data-grab-handle="" data-id="krasota-i-zdorove">
    //   <strong>Красота и здоровье</strong>
    //   <span><b>11</b> products</span>
    // </li><li class="categories__sortable-list-item sortable-list__item" data-grab-handle="" data-id="tovary-dlya-doma">
    //   <strong>Товары для дома</strong>
    //   <span><b>11</b> products</span>
    // </li>
  }
  
  renderDraggables() {
    this.items.forEach((item) => {
      item.classList.add("sortable-list__item");
      this.element.append(item);
    });
  }

  render() {
    const element = document.createElement("div");

    element.innerHTML = this.sortableListTemplate;
    this.element = element.firstElementChild;
    this.subElements = this.getSubElements();

    this.renderDraggables();
    this.initListeners();
  }

  getSubElements() {
    const result = {};
    const elements = this.element.querySelectorAll("[data-element]");

    for (const subElement of elements) {
      const name = subElement.dataset.element;

      result[name] = subElement;
    }
    console.log(result);
    return result;
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
    this.removeListeners();
  }

  destroy() {
    this.element.remove();
    this.removeListeners();
  }
}
