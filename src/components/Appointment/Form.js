// eslint-disable-next-line
import React, { useState, Fragment } from 'react';
import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';

function Form(props){
  //states
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer ? props.interviewer.id : null);
  const [error, setError] = useState('');
  
  // Form functions
  function cancel(){
    reset();
    props.onCancel();
  }

  function reset(){
    setStudent('');
    setInterviewer(null);
  };

  function validate(){
    if (student === ''){
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null){
      setError("Please select an interviewer");
      return;
    }
    //blank out error if there was an error before but it has since been fixed.
    setError('');

    //set student and interviewer and then save using passed onsave
    props.onSave(student, interviewer)
  };
  
  //react element to return
  return(
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form 
        onSubmit={event => event.preventDefault()}
        autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            data-testid = "student-name-input"
            type="text"
            placeholder="Enter Student Name"
            value = {student}
            onChange = {(event) => setStudent(event.target.value)}
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList 
          value = {interviewer}
          interviewers = {props.interviewers}
          onChange = {(interviewer) => setInterviewer(interviewer)}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger >Cancel</Button>
          <Button onClick={validate} confirm >Save</Button>
        </section>
      </section>
    </main>
  );
}

export default Form;