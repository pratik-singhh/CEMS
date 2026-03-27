import Events from './pages/Events';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import MyEvents from './pages/MyEvents';
function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Events />} />
        <Route path='/login' element={<Login />} />
        <Route path='/my-events' element={<MyEvents />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
