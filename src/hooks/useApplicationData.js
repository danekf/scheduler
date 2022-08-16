import axios from "axios";
import {useState, useEffect} from "react";
import { updateSpots } from "helpers/selectors";


function useApplicationData (){

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => setState({ ...state, day });
    

  function bookInterview(id, interview) {
    const appointmentsURL = `/api/appointments/${id}`;
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    

    return axios.put(appointmentsURL, {interview})
            .then(() => {
              const newState ={...state, appointments};
              const days = updateSpots(newState);
              setState({...newState, days});
            })

  };

  function cancelInterview(id){
    const appointmentsURL = `/api/appointments/${id}`;
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
  
    return axios.delete(appointmentsURL)
    .then(() => {
      const newState ={...state, appointments};
      const days = updateSpots(newState);
      setState({...newState, days });
    })

  };

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