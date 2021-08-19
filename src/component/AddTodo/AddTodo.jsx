import React from 'react';
import './AddTodo.scss';
import addBtn from './../../images/plus.png';
import AddModal from './AddModal';

// Store context
import { GlobalConsumer } from '../../store/store';

class AddTodo extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         isModalActive: false
      }
      this.addBtn = React.createRef();
      this.addModal = React.createRef();
   }

   showModal = () => {
      this.setState({
         isModalActive: true
      }, () => {
         setTimeout(() => {
            this.addModal.current.modalDialog.current.style.transition = '0s';
         }, 300);
      })
   }

   hideModal = () => {
      this.setState({
         isModalActive: false
      }, () => {
         this.addModal.current.modalDialog.current.style.transition = '.3s';
      })
   }

   createTask = (task) => {
      const taskCategory = task.category.toLowerCase();
      this.props.dispatch({type: 'ADD_TASK', data: {
         categoryName: taskCategory,
         newTask: task
      }});
   }

   render() {
      return (
         <div className="add-todo">
            <div className="add-btn" ref={this.addBtn} onClick={this.showModal}>
               <img src={addBtn} alt="add todo"/>
            </div>
            <AddModal active={this.state.isModalActive} 
               ref={this.addModal}
               onHideModal={() => this.hideModal()}
               onCreateTask={(task) => this.createTask(task)} />
         </div>
      )
   }
}

export default GlobalConsumer(AddTodo);