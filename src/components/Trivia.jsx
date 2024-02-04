import { useEffect, useState } from "react"

export default function Trivia({data,setStop,questionNumber,setQuestionNumber}) {
  const [question,setQuestion] = useState(null)
  const [selectedAnswer,setSelectedAnswer] = useState(null)
  const [className,setClassName] = useState('answer')
  
  useEffect(()=>{
    setQuestion(data[questionNumber-1])
  },[data,questionNumber])


  const delay = (duration,callback)=>{
    setTimeout(()=>{
      callback()
    },duration)
  }

  const handleClick = (e)=>{
    setSelectedAnswer(e)
    setClassName('answer active')
    delay(3000,()=>setClassName(e.correct ? 'answer correct' : 'answer wrong'))
    delay(6000,()=>{
      if(e.correct){
        setQuestionNumber(prev=>prev + 1)
        selectedAnswer(null)
      }
      else{
        setStop(true)
      }
    })
    

  }


    return (
    <div className="trivia">
    <div className="question">{question?.question}</div>
    <div className="answers">
    {question?.answers.map((e)=>{
        return <div onClick={()=>handleClick(e)} className={selectedAnswer === e ? className : "answer"}>{e.text}</div>
    })}
    </div>
    </div>
  )
}
