import { useEffect, useState } from 'react';
import type { Event } from '../types/event';
import { fetchEvents } from '../api/fetchEvents';
function Events() {

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
      {events.map((item, index) => (
        <div key={index}>
          <h1>{item.title}</h1>
          <p>{item.description}</p>
          <p>{item.event_time}</p>
        </div>))}

    </div>
  )
}

export default Events
