import React from 'react';
import './Greeting.scss';
import hello from './../../images/hello.svg';

// Store context
import { GlobalConsumer } from '../../store/store';

class Greeting extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         username: this.props.state.username.length ? this.props.state.username : 'Stranger'
      };
      this.username = React.createRef();
      this.introModal = React.createRef();
   }

   saveUsername = () => {
      const username = this.username.current.value;
      if (username !== '') {
         this.setState({
            username: this.username.current.value
         }, this.hideModal)
      }

      this.props.dispatch({type: 'SAVE_USERNAME', username});
   }

   hideModal = () => {
      this.introModal.current.style.display = 'none';
   }

   showModal = () => {
      this.introModal.current.style.display = 'block';
   }

   componentDidMount = () => {
      if (!this.props.state.username.length) {
         this.showModal();
      } else {
         this.hideModal();
      }
   }

   render() {
      return (
         <div className="remind">
            <div className="greeting">
               <h1>What's Up, {this.props.state.username}!</h1>
               <h6>{this.props.state.renderedTasks.length ? "Let's finish Your Tasks!" : "There are No Tasks For You"}</h6>
            </div>
            <div className="intro-modal" ref={this.introModal}>
               <div className="intro-modal-dialog">
                  <div style={{width: '100%'}}>
                     <div className="intro-modal-img">
                        <img src={hello} alt="Hello"/>
                     </div>
                     <div className="intro-modal-header">
                        <h1>Hello, Stranger!</h1>
                        <h6>What's your name?</h6>
                     </div>
                     <div className="intro-modal-body">
                        <form>
                           <div className="input-group">
                              <input type="text" id="username" name="username" autoComplete="off"
                              ref={this.username}/>
                           </div>
                           <div className="input-group">
                              <button type="submit" className="btn btn-primary" id="saveName" name="saveName"
                                 onClick={this.saveUsername}>
                                 Save
                              </button>
                           </div>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

export default GlobalConsumer(Greeting);