import { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import logo from '/favicon-32x32.png'
import './App.css'
import { message } from './App.messages'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className="text-3xl font-bold flex">
        <img src={logo} alt="Pixel alchemist logo" />
        Pixel Alchemist
      </h1>

      <div className="mt-3">
        <button
          className="inline-flex items-center px-2 py-1 text-sm font-medium h-8 text-center transition rounded ripple focus:outline-none border disabled:opacity-50 border-blue-500 text-white bg-blue-500 shadow hover:shadow-lg hover:bg-blue-600"
          type="button"
          onClick={() => setCount((count) => count + 1)}
        >
          <FormattedMessage {...message.countIs} /> {count}
        </button>
      </div>
    </>
  )
}

export default App
