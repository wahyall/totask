import React from 'react';
import './Category.scss';
import CategoryItem from './CategoryItem';

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.listCategory = React.createRef();
    this.draggableOverflow = this.draggableOverflow.bind(this);
  }

  draggableOverflow = () => {
    const dragElem = this.listCategory.current;
    if (dragElem.children[0].childElementCount <= 1) {
        return;
    }

    let dragElemPos = {
        top: 0,
        left: 0,
        x: 0,
        y: 0
    };

    const mouseDownHandler = (e) => {
        dragElem.style.userSelect = 'none';

        dragElemPos = {
          left: dragElem.scrollLeft,
          top: dragElem.scrollTop,
          // Get the current mouse position
          x: e.clientX,
          y: e.clientY,
        };

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = (e) => {
        // How far the mouse has been moved
        const dx = e.clientX - dragElemPos.x;
        const dy = e.clientY - dragElemPos.y;

        // Scroll the element
        dragElem.scrollTop = dragElemPos.top - dy;
        dragElem.scrollLeft = dragElemPos.left - dx;
    };

    const mouseUpHandler = () => {
        dragElem.style.removeProperty('user-select');

        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };

    // Attach the handler
    dragElem.addEventListener('mousedown', mouseDownHandler);
  }

  setFilterCategory = (category) => {
    this.props.filterByCategory(category);
  }

  componentDidMount = () => {
    this.draggableOverflow();
  }

  render() {
    const categories = this.props.categories;
    const renderedCategories = [];

    for (const key in categories) {
      const total = categories[key].length;
      const name = key.replace(key[0], key[0].toUpperCase());
      const completed = categories[key].filter(task => task.completed === true).length;
      const percent = completed / total * 100;

      if (total) {
        renderedCategories.push({
            name: name,
            total: total, 
            percent: percent
        });
      }
    }

    return (
      <div className="categories">
        <h6>CATEGORIES</h6>
        <div className="category-list" ref={this.listCategory}>
            <div>
              {renderedCategories.map(category => {
                  return <CategoryItem key={category.name} name={category.name} total={category.total} percent={category.percent}
                    onFilterCategory={(category) => this.setFilterCategory(category)}
                    filtered={this.props.filtered} />
              })}
            </div>
        </div>
      </div>
    )
  }
}

export default Category;