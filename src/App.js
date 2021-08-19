import React, { createContext } from 'react';
import './App.scss';

// Component
import Greeting from './component/Greeting/Greeting';
import Category from './component/Category/Category';
import Todos from './component/Todo/Todos';
import AddTodo from './component/AddTodo/AddTodo';
import NoTasks from './component/NoTasks/NoTasks';

// Store Context
import { GlobalProvider } from './store/store';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        {/* <Greeting 
          onSaveUsername={(username) => this.saveUsername(username)} 
          username={this.state.username}
          caption={this.state.renderedTasks.length ? "Let's finish Your Tasks!" : "There are No Tasks For You"} />
        {this.state.renderedTasks.length ? (
          <div>
            <Category category={this.state.tasks}
              filterByCategory={(category) => this.filterByCategory(category)}
              filtered={this.state.filterCategory} />
            <Todos 
              tasks={this.state.renderedTasks} 
              updateTask={(task) => this.updateTask(task)}
              removeTask={(task) => this.removeTask(task)}
              filterName={this.state.filterCategory}
              onRemoveFilterCategory={() => this.filterByCategory()} />
          </div>
        ) : (
          <div>
            <NoTasks />
          </div>
        )}
        <AddTodo onAddTask={(task) => this.addTask(task)} /> */}
        <Greeting />
        <Category />
        <Todos />
        <NoTasks />
        <AddTodo />
      </div>
    );
  }
}

export default GlobalProvider(App);