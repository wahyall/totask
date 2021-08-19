import React from 'react';
import EditTodo from './EditTodo';

// Store context
import { GlobalConsumer } from '../../store/store';

// Image assets
import check from './../../images/check.png';
import uncheck from './../../images/uncheck.png';
import remove from './../../images/remove.png';
import back from './../../images/chevron-left.svg';
import edit from './../../images/edit.svg';

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalActive: false,
      isCompleted: this.props.completed
    };

    this.todoItem = React.createRef();
    this.mainTodo = React.createRef();
    this.mainDesc = React.createRef();
    this.detailTodo = React.createRef();
    this.detailContent = React.createRef();
    this.detailDesc = React.createRef();
    this.removeBtn = React.createRef();
  }

  swipeItem = () => {
    const dragItem = this.mainTodo.current;
    const dragContent = this.mainTodo.current.querySelector('.content');

    let currentX = 0;
    let currentY = 0;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;
    let minTopOffset;
    let maxTopOffset;

    addSwipeEvent();

    function setupItemOffset(elem) {
      minTopOffset = elem.getBoundingClientRect().top;
      maxTopOffset = Number(getComputedStyle(elem).height.slice(0, -2)) + minTopOffset;
    }

    function addSwipeEvent() {
      dragItem.addEventListener("touchstart", dragStart, false);
      dragItem.addEventListener("touchend", dragEnd, false);
      dragItem.addEventListener("touchmove", drag, false);
    }

    function dragStart(e) {
      setupItemOffset(this);

      if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
      } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
      }

      addSwipeEvent();
    }

    function dragEnd(e) {
      if (xOffset >= -18) {
        setTranslate(0);
        currentX = 0;
        xOffset = 0;
      } else if (xOffset < -18) {
        setTranslate(-36);
        currentX = -36;
        xOffset = -36;
      }

      currentY = 0;
      yOffset = 0;

      addSwipeEvent();
    }

    function drag(e) {
      e.preventDefault();
      let tempY = initialY + currentY;
      if ((tempY >= minTopOffset && tempY <= maxTopOffset) && (tempY >= (initialY - 20) && tempY <= (initialY + 20))) {
        if (e.type === "touchmove") {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        } else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;

        if (currentX <= 0 && currentX >= -36) {
            setTranslate(currentX); 
        }

      } else {
        dragItem.removeEventListener("touchmove", drag);
        if (xOffset >= -18) {
          setTranslate(0);
        } else if (xOffset < -18) {
          setTranslate(-36);
        }
      }
    }

    function setTranslate(xPos) {
        dragContent.style.transform = `translate3d(${xPos}px, 0, 0)`;
    }
  }

  showDetail = () => {
    this.detailTodo.current.classList.add('active');
    this.detailTodo.current.classList.remove('hide');
  }

  hideDetail = () => {
    this.detailTodo.current.classList.remove('active');
    this.detailTodo.current.classList.add('hide');
  }

  changeTaskStatus = () => {
    this.setState({
      isCompleted: !this.props.completed
    }, this.updateTask);
  }

  updateTask = () => {
    this.props.dispatch({type: 'UPDATE_TASK', data: {
      categoryName: this.props.category.toLowerCase(),
      updatedTask: {
        name: this.props.name,
        category: this.props.category,
        desc: this.props.desc,
        id: this.props.id,
        completed: this.state.isCompleted,
        index: this.props.index,
        temp: this.props.temp
      }
    }});
  }

  editTask = (task) => {
    this.props.dispatch({type: 'UPDATE_TASK', data: {
      categoryName: this.props.category.toLowerCase(),
      updatedTask: {
        name: task.name,
        category: this.props.category,
        desc: task.desc,
        id: this.props.id,
        completed: this.state.isCompleted,
        index: this.props.index,
        temp: task.temp
      }
    }});
  }

  removeTask = () => {
    this.todoItem.current.classList.add('remove');
    
    setTimeout(() => {
      this.props.dispatch({type: 'REMOVE_TASK', task: {
        category: this.props.category.toLowerCase(),
        id: this.props.id
      }});
    }, 300);
  }

  showModal = () => {
    this.setState({
      isModalActive: true
    }, () => {
      setTimeout(() => {
        this.editModal.style.transition = '0s';
      }, 300);

      this.setState({
        taskDesc: this.detailDesc.current.innerHTML
      })
    })
   }

  hideModal = () => {
    this.setState({
      isModalActive: false
    }, () => {
      this.editModal.style.transition = '.3s';
    })
  }

  componentDidMount = () => {
    // Check user device
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      // In mobile device
      if (window.matchMedia("(max-width: 575.98px)").matches) {
        this.swipeItem();
      }
    } else {
      this.removeBtn.current.style.position = 'static';
      this.removeBtn.current.style.marginRight = '0.5rem';
    }

    this.editModal = document.querySelector(`#todo-${this.props.id} .edit-modal-dialog`);
  }

  render() {
    return (
      <div className={`todo-item ${this.props.completed ? 'check' : ''}`} 
        id={'todo-' + this.props.id} 
        ref={this.todoItem}
        category={this.props.category} >
        <div className="main" ref={this.mainTodo}>
          <img className="checklist" alt="uncheck"
            src={this.props.completed ? check : uncheck}
            onClick={this.changeTaskStatus} />
          <div className="content" onClick={this.showDetail}>
            <div className={`badge ${this.props.category.toLowerCase()}`}>{this.props.category}</div>
            <div>
              <div style={{display: 'flex'}}>
                <div className="title">{this.props.name}</div>
              </div>
              <div style={{display: 'flex'}}>
                <div className="desc" ref={this.mainDesc} dangerouslySetInnerHTML={{__html: this.props.temp}}></div>
              </div>
            </div>
          </div>
          <img className="remove" alt="remove" 
            src={remove}
            onClick={this.removeTask}
            ref={this.removeBtn} />
        </div>
        <div className="detail hide" ref={this.detailTodo}>
          <div className="header">
            <div className="back" onClick={this.hideDetail}>
                <img src={back} alt="back"/>
            </div>
            <h4>{this.props.category}</h4>
            <div className="edit" onClick={this.showModal}>
              <img src={edit} alt="edit"/>
            </div>
          </div>
          <div className="content" ref={this.detailContent}>
            <div className="title">{this.props.name}</div>
            <div className="desc" ref={this.detailDesc} dangerouslySetInnerHTML={{__html: this.props.desc}}></div>
          </div>
        </div>
        <EditTodo
          active={this.state.isModalActive}
          onHideModal={this.hideModal}
          taskName={this.props.name}
          taskDesc={this.state.taskDesc}
          onEditTask={(task) => this.editTask(task)} />
      </div>
    )
  }
}

export default GlobalConsumer(TodoItem);