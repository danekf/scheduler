import React from 'react';
import "./styles.scss";
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import useVisualMode from 'hooks/useVisualMode';
import axios from 'axios';
import Status from './Status';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const REMOVE = "REMOVE"


function Appointment(props){
// eslint-disable-next-line
  const {mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer){
    
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)   
      .then( ()=>transition(SHOW))
    
  };

  function remove(){
    const interview = {
      student: null,
      interviewer: null
    };

    transition(REMOVE);

    props.cancelInterview(props.id, interview)
      .then( ()=>transition(SHOW))
  }
  
  return(
    <article className="appointment">
      <header>{props.time}</header>
      {mode === SHOW && <Show student = {props.interview.student} interviewer = {props.interview.interviewer || null}  ondDelete={remove}/> }
      {mode === EMPTY && <Empty onAdd ={()=> transition(CREATE)} />}
      {mode === CREATE && <Form onCancel = {() => transition(EMPTY)} interviewers = {props.interviewers} onSave={save} />}
      {mode === SAVING && <Status onClick = 'Saving Appointment'/>}
      {mode === REMOVE && <Status onClick = 'Deleting Appointment'/>}

    </article>
  );
}

export default Appointment;