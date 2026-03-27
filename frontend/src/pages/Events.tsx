import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Event } from '../types/event';
import { fetchEvents } from '../api/fetchEvents';
import { registerEvent } from '../api/fetchEvents';
function Events() {

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const [iserror, setError] = useState<boolean>(false);

  const [isLoggedIn, setLoggedIn] = useState<boolean>(false)
  const [events, setEvents] = useState<Event[]>([])
  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem('token');
    setLoggedIn(!!token);
    async function tryFetch() {
      const data = await fetchEvents();
      setEvents(data);
      setLoading(false);
    }
    tryFetch();

  }, [])

  const tryRegister = async (event_id: number) => {

    try {
      const response = await registerEvent(event_id);
      setError(false);
      setMessage('Event Registered Successfully');
      console.log(response);


    } catch (error) {
      console.error(error);
      setError(true);
      setMessage('Already registered');

    }

  }

  return (
    <div>

      {loading && <div className='flex justify-center items-center'>
        <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-700'></div>
      </div>}
      {(!isLoggedIn) &&


        <div>
          {events.map((item) => (

            <div key={item.id} className='items-center justify-center border-2 rounded-lg m-2 p-2'>
              <h1>{item.title}</h1>
              <p>{item.description}</p>
              <p>{formatDate(item.event_time)}</p>
            </div>))}

        </div>
      }
      {(isLoggedIn) &&


        <div>
          {message && <p className={iserror ? 'text-red-500' : 'text-green-500'}>{message}</p>}
          {events.map((item) => (
            <div key={item.id} className='items-center justify-center border-2 rounded-lg m-2 p-2'>
              <h1>{item.title}</h1>
              <p>{item.description}</p>
              <p>{formatDate(item.event_time)}</p>
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

          <button className='p-2 border rounded-lg m-2 ' onClick={() => { navigate('/create-event') }}>Create Event</button>

        </div>}
    </div>
  )
}

export default Events
