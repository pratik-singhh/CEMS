import { useEffect, useState } from 'react';
import type { Event } from '../types/event';
import { useNavigate } from 'react-router-dom';
import { fetchMyEvents } from '../api/fetchEvents';
function MyEvents() {
  const navigate = useNavigate();

  const [events, setEvents] = useState<Event[]>([]);
  useEffect(() => {
    async function tryFetch() {
      try {

        const data: Event[] = await fetchMyEvents();
        setEvents(data);
      } catch (error) {
        console.error(error);
        navigate('/login');


      }
    }
    tryFetch();

  }, [])
  return (
    <div>

      <div>
        {events.map((item: Event) => (

          <div key={item.id} className='items-center justify-center border-2 rounded-lg m-2 p-2'>
            <h1>{item.title}</h1>
            <p>{item.event_time}</p>
            <p>{item.description}</p>
          </div>))}

      </div>

      <button className='p-2 border rounded-lg m-2 ' onClick={() => { navigate('/') }}>All Events</button>
    </div>

  )
}

export default MyEvents
