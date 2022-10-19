export default class SortableList {
  subElements = {};

  constructor({ items = [] } = {}) {
    this.items = items;

    this.render();
  }

  initListeners() {
    document.addEventListener("pointerdown", this.onDragClick);
  }

  removeListeners() {
    document.removeEventListener("pointerdown", this.onDragClick);
    document.removeEventListener("pointermove", this.onMoveItem);
    document.removeEventListener("pointerup", this.onDropItem);
  }

  onDragClick = (event) => {
    const onDrag = event.target.closest("[data-grab-handle]");
    console.log(onDrag);
    if (onDrag) {
      event.preventDefault();
      this.draggable = onDrag.closest("li");
      this.onDragItem(event);
    }
  };

  onDragItem(event) {
    this.initialShift = {
      x: event.clientX - this.draggable.getBoundingClientRect().x,
      y: event.clientY - this.draggable.getBoundingClientRect().y
    };
    console.log(this.initialShift.x);
    console.log(this.initialShift.y);
    console.log(this.draggable.getBoundingClientRect());

    this.draggableCoords(event);

    this.draggable.classList.add("sortable-list__item-dragging");
    this.draggable.before(this.addPlaceholder());

    document.addEventListener("pointermove", this.onMoveItem);
    document.addEventListener("pointerup", this.onDropItem);
  }

  draggableCoords(event) {
    this.draggable.style.left = event.clientX - this.initialShift.x + "px";
    this.draggable.style.top = event.clientY - this.initialShift.y + "px";
  }

  addPlaceholder() {
    this.placeholder = document.createElement("li");
    this.placeholder.classList.add("sortable-list__placeholder");
    this.placeholder.classList.add("sortable-list__item");
    // this.placeholder.style.background = "transparent";

    return this.placeholder;
  }

  onMoveItem = (event) => {
    this.draggableCoords(event);

    console.log(event.pageX);
    console.log(event.pageY);

    this.draggable.style.display = "none";
    const droppedArea = document.elementFromPoint(event.pageX, event.pageY);
    this.draggable.style.display = "block";

    if (droppedArea.classList.contains("sortable-list__item")) {
      droppedArea.before(this.placeholder);
    } else {
      this.element.append(this.placeholder);
    }
  }

  onDropItem = (event) => {
    this.draggable.classList.remove("sortable-list__item-dragging");

    this.placeholder.replaceWith(this.draggedItem);
  }

  // get sortableListTemplate() {
  //   return `
  //     <ul class="sortable-list"></ul>
  //   `;
  //   //   <li class="categories__sortable-list-item sortable-list__item" data-grab-handle="" data-id="tovary-dlya-kuxni" style="">
  //   //   <strong>Товары для кухни</strong>
  //   //   <span><b>13</b> products</span>
  //   // </li><li class="categories__sortable-list-item sortable-list__item" data-grab-handle="" data-id="krasota-i-zdorove">
  //   //   <strong>Красота и здоровье</strong>
  //   //   <span><b>11</b> products</span>
  //   // </li><li class="categories__sortable-list-item sortable-list__item" data-grab-handle="" data-id="tovary-dlya-doma">
  //   //   <strong>Товары для дома</strong>
  //   //   <span><b>11</b> products</span>
  //   // </li>
  // }

  renderDraggables() {
    this.items.forEach((item) => {
      item.classList.add("sortable-list__item");
      this.element.append(item);
    });
  }

  render() {
    this.element = document.createElement("ul");
    this.element.className = "sortable-list";

    // element.innerHTML = this.sortableListTemplate;
    // this.element = element.firstElementChild;
    // this.subElements = this.getSubElements();

    this.renderDraggables();
    this.initListeners();
  }

  // getSubElements() {
  //   const result = {};
  //   const elements = this.element.querySelectorAll("[data-element]");

  //   for (const subElement of elements) {
  //     const name = subElement.dataset.element;

  //     result[name] = subElement;
  //   }
  //   console.log(result);
  //   return result;
  // }

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
