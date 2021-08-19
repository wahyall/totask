import React from 'react';
import right from './../../images/chevron-right.svg';

// Store context
import { GlobalConsumer } from '../../store/store';

const CategoryItem = (props) => {
  return (
    <div className={`item ${props.state.filterCategory === props.name ? 'filtered' : ''}`}>
      <div className="amount">{props.total === 1 ? `${props.total} task` : `${props.total} tasks`}</div>
      <h3 className="name" onClick={() => props.dispatch({type: 'FILTER_BY_CATEGORY', category: props.name})}>
        <span>{props.name}</span>
        <img src={right} alt="next" />
      </h3>
      <div className="progress">
          <div className="strock" style={{width: `${props.percent}%`}}></div>
      </div>
    </div>
  )
}

export default GlobalConsumer(CategoryItem);