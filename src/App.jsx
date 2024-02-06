import { useEffect, useMemo, useState } from "react";
import "./app.css";
import { moneyPyramid } from "./data";
import Trivia from "./components/Trivia";
import {data} from './data'
import Timer from "./components/Timer";
import Start from "./components/Start";


function App() {
  const [stop,setStop] = useState(false)
  const [questionNumber,setQuestionNumber] = useState(1)
  const [earned,setEarned] = useState("$ 0")
  const [userName,setUsername] = useState(null)
 

  useEffect(()=>{
    questionNumber > 1 && setEarned(moneyPyramid.find(m=>m.id === questionNumber-1).amount)
  },[moneyPyramid,questionNumber])

  return (
    <div className="app">
    {userName ? (
      <>
      <div className="main">
        {stop ? <h1 className="endText">You earned: {earned}</h1> : (
         <>
         <div className="top">
          <div className="timer"><Timer setStop={setStop} questionNumber={questionNumber} /></div>
        </div>
        <div className="bottom">
          <Trivia data={data} setStop={setStop} setQuestionNumber={setQuestionNumber} questionNumber={questionNumber}/>
        </div>
         </>
        )}
       
      </div>
      <div className="pyramid">
        <ul className="moneyList">
          {moneyPyramid.map((item) => {
            return (
              <li className={questionNumber === item.id ? 'moneyListItem active' : 'moneyListItem'}>
                <span className="moneyListItemNumber">{item.id}</span>
                <span className="moneyListItemAmount">{item.amount}</span>
              </li>
            )
          })}
        </ul>
      </div>
      </>
    ) : <Start setUsername={setUsername}/>}
      
    </div>
  );
}

export default App;
