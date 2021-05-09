import React from 'react';
import right from './../../images/chevron-right.svg';

class CategoryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterActive: false
    }
    this.categoryItem = React.createRef();
  }

  filterCategory = () => {
    this.props.onFilterCategory(this.props.name)
  }

  render() {
    return (
      <div className={`item ${this.props.filtered === this.props.name ? 'filtered' : ''}`}
        ref={this.categoryItem}>
        <div className="amount">{this.props.total === 1 ? `${this.props.total} task` : `${this.props.total} tasks`}</div>
        <h3 className="name" onClick={this.filterCategory}>
          <span>{this.props.name}</span>
          <img src={right} alt="next" />
        </h3>
        <div className="progress">
            <div className="strock" style={{width: `${this.props.percent}%`}}></div>
        </div>
      </div>
    )
  }
}

export default CategoryItem;