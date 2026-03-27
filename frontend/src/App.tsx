import Events from './pages/Events';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import { useState } from 'react';
import MyEvents from './pages/MyEvents';
function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Events />} />
        <Route path='/login' element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
        <Route path='/my-events' element={<MyEvents />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
