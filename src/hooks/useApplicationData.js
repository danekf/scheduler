import axios from "axios";
import {useState, useEffect} from "react";

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
              setState({...state, appointments});
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
      setState({...state, appointments});
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