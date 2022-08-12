import React from 'react';
import "./styles.scss";
import Show from './Show';
import Empty from './Empty';

function Appointment(props){

  return(
    <article className="appointment">
      <header>{props.time}</header>
      {props.interview && <Show student = {props.interview.student} />}
      {!props.interview && <Empty />}
    </article>
  );
}

export default Appointment;