import React from 'react';
import './NoTasks.scss';
import relax from './../../images/relax.svg';

// Store context
import { GlobalConsumer } from '../../store/store';

const NoTasks = (props) => {
   if (props.state.renderedTasks.length) {
      return null;
   }

   return (
      <div className="no-tasks">
         <img src={relax} alt="Relax"/>
         <h5>Take It Easy, Get Some Rest</h5>
      </div>
   )
}

export default GlobalConsumer(NoTasks);