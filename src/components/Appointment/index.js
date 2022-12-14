import React from 'react';
import "./styles.scss";
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import useVisualMode from 'hooks/useVisualMode';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';


function Appointment(props){

  const {mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer){
    
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)   
      .then( ()=>transition(SHOW))
      .catch((error)=>{
        console.log(error);
        transition(ERROR_SAVE, true)
      });
    
  };

  function remove(){

    transition(DELETING, true);

    props.cancelInterview(props.id)
      .then( ()=>transition(EMPTY))
      .catch((error)=>{
        console.log(error);
        transition(ERROR_DELETE,true)
      });
    
  }
  
  return(
    <article className="appointment" data-testid="appointment">
      <header>{props.time}</header>
      {mode === SHOW && <Show student = {props.interview.student} interviewer = {props.interview.interviewer || null}  onDelete={()=>transition(CONFIRM)} onEdit={()=>transition(EDIT)}/> }
      {mode === EMPTY && <Empty onAdd ={()=> transition(CREATE)} />}
      {mode === CREATE && <Form onCancel = {back} interviewers = {props.interviewers} onSave={save} />}
      {mode === SAVING && <Status onClick = 'Saving Appointment'/>}
      {mode === CONFIRM && <Confirm onCancel = {back} onConfirm = {remove}/>}
      {mode === DELETING && <Status onClick = 'Deleting Appointment'/>}
      {mode === EDIT && <Form onCancel = {back} interviewers = {props.interviewers} onSave={save} interviewer = {props.interview.interviewer} student = {props.interview.student}/>}
      {mode === ERROR_SAVE && <Error errorMessage = 'Error: Could not save appointment' onClose = {back}/>}
      {mode === ERROR_DELETE && <Error errorMessage = 'Error: Could not delete appointment' onClose = {back}/>}            
    </article>
  );
}

export default Appointment;