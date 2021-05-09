import React from 'react';
import './NoTasks.scss';
import relax from './../../images/relax.svg';

const NoTasks = () => {
   return (
      <div className="no-tasks">
         <img src={relax} alt="Relax"/>
         <h5>Take It Easy, Get Some Rest</h5>
      </div>
   )
}

export default NoTasks;