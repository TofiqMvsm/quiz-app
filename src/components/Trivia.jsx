import { useEffect, useState } from "react"
import useSound from "use-sound";
import play from '../assets/sounds/play.mp3'
import correct from '../assets/sounds/correct.mp3'
import wait from '../assets/sounds/wait.mp3'
import wrong from '../assets/sounds/wrong.mp3'



export default function Trivia({data,setStop,questionNumber,setQuestionNumber}) {
  const [question,setQuestion] = useState(null)
  const [selectedAnswer,setSelectedAnswer] = useState(null)
  const [className,setClassName] = useState('answer')
  const [letsPlay] = useSound(play)
  const [correctAnswer] = useSound(correct)
  const [wrongAnswer] = useSound(wrong)
  

  useEffect(()=>{
    letsPlay()
  },[letsPlay])



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
        correctAnswer()
        delay(1000,()=>{
          setQuestionNumber(prev=>prev + 1)
          selectedAnswer(null)
        })
      }
      else{
        wrongAnswer()
        delay(1000,()=>{
          setStop(true)
        })
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
