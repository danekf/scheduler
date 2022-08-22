 //selects appointments for the selected day in the app, taking in current state and target day
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
  //there is definitely another way to do this for larger data sets. But i dont want to break anything
};

//gets interview data for a specific slot for the day
function getInterview (state, interview) {
  if (!interview){
    return null;
  } 
  //else return student and interviewer objects
    return {
      student: interview.student,
      interviewer: {...state.interviewers[interview.interviewer]}
    }
};

//gets available interviewers for the day selected, to populate create/edit pages as well as display interviewer names
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

//updates the number of available spots for each day
function updateSpots(state){
  const days = [...state.days];
  let spots = 0;
  for (let day of days){
    if (day.name === state.day){    
      for(let appointment of day.appointments){
        if(state.appointments[appointment].interview === null){
          spots ++;
        }
      }
      day.spots = spots;
    }
  }  
  return days;
}




export {getAppointmentsForDay, getInterview, getInterviewersForDay, updateSpots}

