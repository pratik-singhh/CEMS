import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Event } from '../types/event';
import { fetchEvents } from '../api/fetchEvents';
function Events() {
  const navigate = useNavigate();

  const [events, setEvents] = useState<Event[]>([])
  useEffect(() => {
    async function tryFetch() {
      const data = await fetchEvents();
      console.log(data);
      setEvents(data);
    }
    tryFetch();

  }, [])


  return (
    <div>

      <div>
        {events.map((item, index) => (
          <div key={index}>
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            <p>{item.event_time}</p>
          </div>))}

      </div>
      <button className='p-2 border rounded-lg m-2 ' onClick={() => { navigate('/login') }}>Login</button>
    </div>
  )
}

export default Events
