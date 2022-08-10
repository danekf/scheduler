import React, {useState} from 'react';
import classNames from "classnames";
import "components/InterviewerListItem.scss";

function InterviewerListItem(props){


  const interviewerClass = classNames("interviewers__item", {
   "interviewers__item--selected": props.selected
  });
   
  function setInterviewer(){
    console.log(`Interviewer class : ${interviewerClass}`);
  }
  
  return(
    <li 
    className= {interviewerClass}
    onClick = {setInterviewer}
    >
    <img
      className="interviewers__item-image"
      src="https://i.imgur.com/LpaY82x.png"
      alt="Sylvia Palmer"
    />
    Sylvia Palmer
  </li>
  

  );
}

export default InterviewerListItem;