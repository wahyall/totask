import React from 'react';
import './RemindDevice.scss';

class RemindDevice extends React.Component {
   constructor(props) {
      super(props);
      this.remindDevice = React.createRef();
   }

   checkUserDevice = () => {
      if( /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
         this.remindDevice.current.style.display = 'none';
      } else {
         this.remindDevice.current.style.display = 'block';
      }
   }

   componentDidMount = () => {
      this.checkUserDevice();
   }

   render() {
      return (
         <div className="remind-device" ref={this.remindDevice}>
            <div className="device-modal-dialog">
               <h4>For better user experience,</h4>
               <h6>Open in Mobile Device or Touchscreen Device</h6>
               <span className="btn btn-primary" 
                  onClick={() => this.remindDevice.current.style.display = 'none'}>Ok</span>
            </div>
         </div>
      )
   }
}

export default RemindDevice;