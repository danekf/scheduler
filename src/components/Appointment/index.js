import React from 'react';
import "./styles.scss";
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";


function Appointment(props){
// eslint-disable-next-line
  const {mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY);
  
  return(
    <article className="appointment">
      <header>{props.time}</header>
      {mode === SHOW && <Show student = {props.interview.student} interviewer = {props.interview.interviewer || null}  /> }
      {mode === EMPTY && <Empty onAdd ={()=> transition(CREATE)} />}
      {mode === CREATE && <Form onCancel = {() => transition(EMPTY)} interviewers = {props.interviewers} />}
    </article>
  );
}

export default Appointment;