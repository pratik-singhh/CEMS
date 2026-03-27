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
        console.log(data);
      } catch (error) {
        console.log(error);


      }
    }
    tryFetch();

  }, [])
  return (
    <div>
      {events.map((item: Event, index) => (
        <div key={item.id}>
          <h1>{item.title}</h1>
          <p>{item.event_time}</p>
          <p>{item.description}</p>
        </div>))}

    </div>
  )
}

export default MyEvents
