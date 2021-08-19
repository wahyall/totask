import React from 'react';
import './Todo.scss';
import TodoItem from './TodoItem';

// Store context
import { GlobalConsumer } from '../../store/store';

class Todos extends React.Component {
  updateTask = (task) => {
    this.props.updateTask({
      categoryName: task.category.toLowerCase(),
      updatedTask: task
    });
  }

  removeTask = (data) => {
    this.props.removeTask(data);
  }

  render() {
    if (!this.props.state.renderedTasks.length) {
      return null;
    }

    return (
      <div className="todos">
        <h6>
          <span>TASKS LIST</span>
          <span className={`filter-category badge personal ${this.props.state.filterCategory ? 'active' : ''}`}
            onClick={() => this.props.dispatch({type: 'REMOVE_FILTER_CATEGORY'})}>{this.props.state.filterCategory} &times;</span>
        </h6>
        <div className="todo-list">
          {this.props.state.renderedTasks.map(task => (
            <TodoItem
              key={task.id}
              category={task.category}
              name={task.name}
              desc={task.desc}
              temp={task.temp}
              id={task.id}
              index={task.index}
              completed={task.completed} />
          ))}
        </div>
      </div>
    )
  }
}

export default GlobalConsumer(Todos);