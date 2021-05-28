import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: ['Personal', 'Jobs', 'Workout', 'Finance', 'Study', 'Other']
    };
    this.modal = React.createRef();
    this.modalDialog = React.createRef();
    this.dropdownCategory = React.createRef();
    this.buttonDropdown = React.createRef();
    this.formTask = React.createRef();

    this.hideModal = this.hideModal.bind(this);
    this.hideModalBackdrop = this.hideModalBackdrop.bind(this);
    this.showDropdown = this.showDropdown.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
    this.selectedCategory = this.selectedCategory.bind(this);
    this.makeNewTask = this.makeNewTask.bind(this);
  }
  
  makeNewTask = (e) => {
    e.preventDefault();
    
    const form = this.formTask.current;
    const taskName = form.taskName.value;
    const taskCategory = form.taskCategory.value;
    const taskDesc = this.state.taskDesc;
    const tempDesc = document.querySelector('.add-modal .ck.ck-content.ck-editor__editable').innerText;
    const taskId = new Date().getTime();

    if (taskName !== '' && taskName !== ' ') {
      this.props.onMakeNewTask({
        name: taskName,
        category: taskCategory,
        desc: taskDesc,
        temp: tempDesc,
        id: taskId,
        completed: false
      })

      this.hideModal();
    } else {
      form.taskName.classList.add('warn');
      form.taskName.addEventListener('focus', function () {
        this.classList.remove('warn');
      })
      document.querySelector('.add-modal-body').scrollTo(0, 0);
    }

  }

  hideModal = () => {
    this.modal.current.classList.remove('active');
    this.modal.current.classList.add('hide');
    this.props.onHideModal();

    // Reset modal
    setTimeout(() => {
      document.querySelector('.add-modal-body').scrollTo(0, 0);
      this.state.editor.setData('');
      this.formTask.current.reset();
      this.buttonDropdown.current.value = 'Personal';
      this.buttonDropdown.current.innerHTML = 'Personal';
    }, 300);
  }

  hideModalBackdrop = (ev) => {
    if (ev.target.classList.contains('add-modal')) {
      this.hideModal();
    }
  }

  selectedCategory = (item) => {
    const value = item.target.innerHTML;
    this.buttonDropdown.current.value = value;
    this.buttonDropdown.current.innerHTML = value;
  }

  showDropdown = () => {
    const dropdown = this.dropdownCategory.current;
    dropdown.style.display = 'block';
  }

  hideDropdown = () => {
    setTimeout(() => {
      const dropdown = this.dropdownCategory.current;
      dropdown.style.display = 'none';
    }, 101);
  }

  render() {
    return (
      <div className={"add-modal " + (this.props.active ? 'active' : 'hide')} 
        ref={this.modal}
        onClick={this.hideModalBackdrop}>
        <div className="add-modal-dialog" ref={this.modalDialog}>
            <div className="add-modal-header">
              <h3>Let's Be Productive</h3>
            </div>
            <div className="add-modal-body">
              <form ref={this.formTask}>
                  <div className="input-group">
                    <label>Name</label>
                    <input type="text" id="taskName" name="taskName" autoComplete="off" />
                  </div>
                  <div className="input-group">
                    <label>Category</label>
                    <button className="dropdown-toggle" id="taskCategory" name="taskCategory" value="Personal"
                        ref={this.buttonDropdown}
                        onClick={this.preventDefault}
                        onFocus={this.showDropdown}
                        onBlur={this.hideDropdown}>
                        Personal
                    </button>
                    <ul className="dropdown-menu" ref={this.dropdownCategory}>
                        {this.state.categories.map(item => {
                          return <li key={item} onClick={this.selectedCategory}>{item}</li>
                        })}
                    </ul>
                  </div>
                  <div className="input-group">
                    <label>Description <span style={{opacity: '.4'}}>(Optional)</span></label>
                    {/* <textarea id="taskDesc" name="taskDesc" rows="5"></textarea> */}
                    <CKEditor
                      editor={ ClassicEditor }
                      config={{
                        toolbar: {
                          items: [ 'bold', 'italic', '|', 'bulletedList', 'numberedList', '|', 'link' ]
                        }
                      }}
                      data=""
                      onReady={(editor) => {
                        this.setState({
                          editor: editor,
                          taskDesc: ''
                        })
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        this.setState({
                          editor: editor,
                          taskDesc: data
                        })
                      }}
                    />
                  </div>
                  <div className="input-group" style={{marginTop: '3rem', marginBottom: '0'}}>
                    <button type="submit" className="btn btn-primary" id="saveTask" name="saveTask"
                        onClick={this.makeNewTask}>
                        Save Task
                    </button>
                    <button className="btn" id="cancel" name="cancel"
                        onClick={this.hideModal}>
                        Cancel
                    </button>
                  </div>
              </form>
            </div>
        </div>
      </div>
    )
  }
}

export default AddModal;