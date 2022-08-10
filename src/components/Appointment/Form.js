import React, { useState, Fragment } from 'react';
import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';

import Header from './Header';
import Show from './Show';
import Empty from './Empty';

function Form(props){
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  function cancel(){
    reset();
    props.onCancel();
  }

  function reset(){
    setStudent('');
    setInterviewer(null);
  };
  
  return(
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form 
        onSubmit={event => event.preventDefault()}
        autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value = {student}
            onChange = {(event) => setStudent(event.target.value)}
          />
        </form>
        <InterviewerList 
          value = {interviewer}
          interviewers = {props.interviewers}
          onChange = {(interviewer) => setInterviewer(interviewer)}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger >Cancel</Button>
          <Button onClick={props.onSave} confirm >Save</Button>
        </section>
      </section>
    </main>
  );
}

export default Form;