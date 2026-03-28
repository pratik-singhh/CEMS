import { useEffect, useState } from 'react';
import type { Event } from '../types/event';
import { fetchEvents, deleteEvent } from '../api/fetchEvents';
import { useNavigate } from 'react-router-dom';
function AdminDashboard() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
    const payload = token && JSON.parse(atob(token.split('.')[1]));
    const { role } = payload !== null ? payload : { role: 'student' };
    if (role !== 'admin') {
      navigate('/');
    }
    async function tryFetch() {
      try {
        const data = await fetchEvents();
        console.log(data);
        setEvents(data);
      } catch (error) {
        console.error(error);

      }
    }
    tryFetch();


  }, [navigate])


  const tryDelete = async (id: number) => {
    try {
      const response = await deleteEvent(id);
      const filteredEvents = events.filter((item) => item.id !== id);
      setEvents(filteredEvents);
      console.log(response);




    } catch (error) {
      console.error(error);

    }
  }



  return (
    <div>
      <div>
        <h1>Total Events: {events.length}</h1>
      </div>
      {events.map((item, index) => {
        return (
          <div key={item.id} className='border 2 flex flex-col gap-2 p-4 rounded-xl m-5'>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>Registrations ={item.registrations}</p>
            <button onClick={() => navigate(`/edit-event/${item.id}`)}>Edit</button>
            <button onClick={() => tryDelete(item.id)}>Delete</button>
          </div>
        )
      })}

    </div>
  )
}

export default AdminDashboard
