import React from 'react';
import './Todo.scss';
import TodoItem from './TodoItem';

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

  removeFilterCategory = () => {
    this.props.onRemoveFilterCategory();
  }

  render() {
    return (
      <div className="todos">
        <h6>
          <span>TASKS LIST</span>
          <span className={`filter-category badge personal ${this.props.filterName ? 'active' : ''}`}
            onClick={this.removeFilterCategory}>{this.props.filterName} &times;</span>
        </h6>
        <div className="todo-list">
          {this.props.tasks.map(task => {
            return <TodoItem
              key={task.id}
              category={task.category}
              name={task.name}
              desc={task.desc}
              temp={task.temp}
              id={task.id}
              index={task.index}
              completed={task.completed}
              onUpdateTask={(task) => this.updateTask(task)}
              onRemoveTask={(data) => this.removeTask(data)} />
          })}
        </div>
      </div>
    )
  }
}

export default Todos;