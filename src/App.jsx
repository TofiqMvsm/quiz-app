import { useState } from "react";
import "./app.css";
import { moneyPyramid } from "./data";
import Trivia from "./components/Trivia";
import {data} from './data'
function App() {
  const [timeOut,setTimeOut] = useState(false)
  const [questionNumber,setQuestionNumber] = useState(1)
  console.log(moneyPyramid);
  return (
    <div className="app">
      <div className="main">
        <div className="top">
          <div className="timer">30</div>
        </div>
        <div className="bottom">
          <Trivia data={data} setTimeOut={setTimeOut} setQuestionNumber={setQuestionNumber} questionNumber={questionNumber}/>
        </div>
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
    </div>
  );
}

export default App;
