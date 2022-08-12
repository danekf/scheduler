 function getAppointmentsForDay(state, day) {

  const appointments = [];
  for (let checkDay of state.days){
    if(checkDay.name === day){
      for (let appointment of checkDay.appointments){      
        appointments.push(state.appointments[appointment]);
      }
    }
  }

  return appointments;
};

function getInterview (state, interview) {
  //if no interview booked, return null
  if (!interview){
    return null;
  }
 
  //else return student and interviewer objects
    return {
      student: interview.student,
      interviewer: {...state.interviewers[interview.interviewer]}
    }

};

function getInterviewersForDay(state, day){

  const interviewers = [];

  for (let checkDay of state.days){
    if(checkDay.name === day){
      for (let interviewer of checkDay.interviewers){      
        interviewers.push(state.interviewers[interviewer]);
      }
    }
  }

  return interviewers;


};

export {getAppointmentsForDay, getInterview, getInterviewersForDay}

