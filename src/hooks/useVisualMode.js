import {useState} from "react";

function useVisualMode (initialMode){
  const [history, setHistory] = useState([initialMode])


  //transitions to new mode
  function transition(mode, replace) {
    if (replace){
      //if we are replacing, remove last item prior to setting new mode, which is accomplished with out back function;
      back();
    }
    //add new mode to history before setting
    setHistory((prev) =>[...prev, mode]); 
  }

  function back() {
    //ensure we cannot go further back than initialMode
    if (history.length > 1){  
      //remove latest item from history array.
      setHistory((prev) => prev.slice(0, -1));
    }
  }


  return {mode: history[history.length-1], transition, back};
};

export default useVisualMode;
