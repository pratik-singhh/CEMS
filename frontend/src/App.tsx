import Events from './pages/Events';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import MyEvents from './pages/MyEvents';
import CreateEvent from './pages/CreateEvent';
import EditEvent from './pages/EditEvent';
import AdminDashboard from './pages/AdminDashboard';
function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Events />} />
        <Route path='/login' element={<Login />} />
        <Route path='/my-events' element={<MyEvents />} />
        <Route path='/create-event' element={<CreateEvent />} />
        <Route path='/edit-event/:id' element={<EditEvent />} />
        <Route path='/admin' element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
