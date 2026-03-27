import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Event } from '../types/event';
import { fetchEvents } from '../api/fetchEvents';
import { registerEvent } from '../api/fetchEvents';
function Events() {
  const navigate = useNavigate();

  const [isLoggedIn, setLoggedIn] = useState<boolean>(false)
  const [events, setEvents] = useState<Event[]>([])
  useEffect(() => {
    const token = localStorage.getItem('token');
    setLoggedIn(!!token);
    async function tryFetch() {
      const data = await fetchEvents();
      setEvents(data);
    }
    tryFetch();

  }, [])

  const tryRegister = async (event_id: number) => {

    try {
      const response = await registerEvent(event_id);


    } catch (error) {
      console.error(error);

    }

  }

  return (
    <div>
      {(!isLoggedIn) &&


        <div>
          {events.map((item) => (

            <div key={item.id} className='items-center justify-center border-2 rounded-lg m-2 p-2'>
              <h1>{item.title}</h1>
              <p>{item.description}</p>
              <p>{item.event_time}</p>
            </div>))}

        </div>
      }
      {(isLoggedIn) &&


        <div>
          {events.map((item) => (
            <div key={item.id} className='items-center justify-center border-2 rounded-lg m-2 p-2'>
              <h1>{item.title}</h1>
              <p>{item.description}</p>
              <p>{item.event_time}</p>
              <button className='p-2 border-2 rounded-lg m-2 ' onClick={() => { tryRegister(item.id) }}>Register</button>
            </div>
          ))}

        </div>
      }

      {(!isLoggedIn) && <button className='p-2 border rounded-lg m-2 ' onClick={() => { navigate('/login') }}>Login</button>
      }
      {(isLoggedIn) &&
        <div>

          <button className='p-2 border rounded-lg m-2 ' onClick={() => { navigate('/my-events') }}>My Events</button>
          <button className='p-2 border rounded-lg m-2 ' onClick={() => {
            localStorage.removeItem('token');
            setLoggedIn(false);
            navigate('/login');
          }}>Log Out</button>

        </div>}
    </div>
  )
}

export default Events
