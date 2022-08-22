import axios from "axios";
import {useState, useEffect} from "react";
import { updateSpots } from "helpers/selectors";

//state helper function for all app data
function useApplicationData (){
  //state for each day, defaulting to monday
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => setState({ ...state, day });

  //helper to book/update interview  
  function bookInterview(id, interview) {
    const appointmentsURL = `/api/appointments/${id}`;

    //set the appointment with correct data for axios request
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };
    //set constant to update state object, on success
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    //axios put request with interview data, and then update the state with the new interview on success
    return axios.put(appointmentsURL, {interview})
            //then update react state with confirmed good data
            .then(() => {
              const newState ={...state, appointments};
              const days = updateSpots(newState);
              setState({...newState, days});
            })

  };
  //helper to cancel an interview
  function cancelInterview(id){
    const appointmentsURL = `/api/appointments/${id}`;
    //set the appointment with correct data for axios request, interview here being NULL, since we are removing interview
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    //set constant to update state object, on success
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    //axios delete request for that particular interview slot
    return axios.delete(appointmentsURL)
    .then(() => {
      //then update react state with confirmed good data
      const newState ={...state, appointments};
      const days = updateSpots(newState);
      setState({...newState, days });
    })
  };

  //Load all appointments on first load
  useEffect( () => {
    const daysURL= `/api/days`;
    const appointmentsURL = '/api/appointments';
    const interviewersURL = '/api/interviewers';
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL),
    ])
    .then((all) => {    
      //add fetched data to the state object for the app to use
      setState(prev => ({ ...prev, days:[...all[0].data], appointments:{...all[1].data}, interviewers: {...all[2].data} }));      
      });
    },[]);
      
  return {
    state,
    bookInterview,
    cancelInterview,
    setDay
  }

}

export default useApplicationData;