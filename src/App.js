import React, { useState, useEffect } from 'react'
import { FaMicrophoneAlt } from 'react-icons/fa';
import { BsRecordBtnFill } from 'react-icons/bs';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'

function App() {
  const [isListening, setIsListening] = useState(false)
  const [note, setNote] = useState(null)
 
  const [start, setStart] = useState(false)

  useEffect(() => {
    handleListen()
  }, [isListening])

  const handleListen = () => {
    if (isListening) {
      mic.start()
      mic.onend = () => {
        console.log('continue..')
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Stopped Mic on Click')
      }
    }
    mic.onstart = () => {
      console.log('Mics on')
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      console.log(transcript)
      setNote(transcript)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }

  const handleClick = () => {
    setIsListening(prevState => !prevState)

    setStart(!start)
  }

  return (
    <div className='bg-sky-700 min-h-[100vh]  '>
      <div className='w-[250px] mx-auto pt-10'>
        <h1 className='text-2xl font-semibold text-white'>Zoom Transcription</h1>
        <div className='mt-5  rounded-md text- center'>

          
          <div className='flex justify-center'>
            {
              start === false ? <button className='bg-purple-600 p-4  rounded-full text-white font-semibold ' onClick={handleClick} >
                Start 
              </button> : <button className='bg-purple-600 p-4  rounded-full text-white font-semibold ' onClick={handleClick}>
                Stop
              </button>
                
            }
          </div>

          <p className='flex justify-center mt-5'>

            {isListening ? <span> <BsRecordBtnFill className='text-red-600 text-2xl' /></span> : <span > <FaMicrophoneAlt /> </span>}
            
          </p>
          <p className='text-white mt-5 text-center'>{note}</p>

          
          
          
        </div>
       
     </div>




    </div>
  )
}

export default App