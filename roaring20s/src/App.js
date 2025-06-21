import React from 'react'
// import DraggablePlayer from './DraggablePlayer'
import DraggablePlayer from './DraggablePlayer'
import ReactDOM from 'react-dom/client'

const App = () => {
  return (
    <div className="min-h-screen bg-zinc-900">
      <div style={{ width: '100%', height: '100vh' }}>
          <DraggablePlayer />
        </div>
    </div>
  )
}

export default App