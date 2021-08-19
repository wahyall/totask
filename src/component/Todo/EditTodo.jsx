import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// Store context
import { GlobalConsumer } from '../../store/store';

class EditTodo extends React.Component {
  constructor(props) {
    super(props);
    this.modal = React.createRef();
    this.modalDialog = React.createRef();
    this.formTask = React.createRef();
    this.cancelEdit = React.createRef();
  }

  hideModal = () => {
    this.modal.current.classList.remove('active');
    this.modal.current.classList.add('hide');
    this.props.onHideModal();
  }

  hideModalBackdrop = (ev) => {
    if (ev.target.classList.contains('edit-modal')) {
      this.hideModal();
    }
  }

  editTask = (ev) => {
    ev.preventDefault();

    const form = this.formTask.current;
    const taskName = form.taskName.value;
    const taskDesc = this.state.taskDesc;
    const tempDesc = this.modal.current.querySelector('.edit-modal .ck.ck-content.ck-editor__editable').innerText;

    if (taskName !== '' && taskName !== ' ') {
      // Reset modal
      setTimeout(() => {
        this.modal.current.querySelector('.edit-modal-body').scrollTo(0, 0);
        this.state.editor.setData('');
        form.reset();
      }, 300);

      this.props.onEditTask({
        name: taskName,
        desc: taskDesc,
        temp: tempDesc
      });

      this.hideModal();
    } else {
      form.taskName.classList.add('warn');
      form.taskName.addEventListener('focus', function () {
        this.classList.remove('warn');
      })
      this.modal.current.querySelector('.edit-modal-body').scrollTo(0, 0);
    }
  }

  componentDidMount = () => {
    this.cancelEdit.current.addEventListener('click', function (ev) {
      ev.preventDefault();
    })
  }

  render() {
    return (
      <div className={"edit-modal " + (this.props.active ? 'active' : 'hide')}
        ref={this.modal}
        onClick={this.hideModalBackdrop}>
        <div className="edit-modal-dialog" ref={this.modalDialog}>
          <div className="edit-modal-header">
            <h3>Edit My Task</h3>
          </div>
          <div className="edit-modal-body">
            <form ref={this.formTask}>
              <div className="input-group">
                <label>Name</label>
                <input type="text" id="taskName" name="taskName" autoComplete="off"
                  defaultValue={this.props.taskName} />
              </div>
              <div className="input-group">
                <label>Description</label>
                {/* <textarea id="taskDesc" name="taskDesc" rows="5"></textarea> */}
                <CKEditor
                  editor={ClassicEditor}
                  config={{
                    toolbar: {
                      items: ['bold', 'italic', '|', 'bulletedList', 'numberedList', '|', 'link']
                    }
                  }}
                  data={this.props.taskDesc}
                  onReady={(editor) => {
                    this.setState({
                      editor: editor
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
              <div className="input-group" style={{ marginTop: '3rem', marginBottom: '0' }}>
                <button type="submit" className="btn btn-primary" id="saveChange" name="saveChange"
                  onClick={this.editTask}>
                  Save Change
                    </button>
                <button className="btn" id="cancelChange" name="cancelChange"
                  onClick={this.hideModal}
                  ref={this.cancelEdit}>
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

export default GlobalConsumer(EditTodo);