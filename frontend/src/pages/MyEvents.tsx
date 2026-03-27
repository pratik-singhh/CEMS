import { useEffect, useState } from 'react';
import type { Event } from '../types/event';
import { useNavigate } from 'react-router-dom';
import { fetchMyEvents } from '../api/fetchEvents';
function MyEvents() {
  const navigate = useNavigate();
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


  const [loading, setLoading] = useState<boolean>(false);
  const [events, setEvents] = useState<Event[]>([]);
  useEffect(() => {
    async function tryFetch() {
      try {
        setLoading(true);

        const data: Event[] = await fetchMyEvents();
        setEvents(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        navigate('/login');


      }
    }
    tryFetch();

  }, [])
  return (
    <div>
      {loading && <div className='flex justify-center items-center'>
        <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-700'></div>
      </div>}

      <div>
        {events.map((item: Event) => (

          <div key={item.id} className='items-center justify-center border-2 rounded-lg m-2 p-2'>
            <h1>{item.title}</h1>
            <p>{formatDate(item.event_time)}</p>
            <p>{item.description}</p>
          </div>))}

      </div>

      <button className='p-2 border rounded-lg m-2 ' onClick={() => { navigate('/') }}>All Events</button>
    </div>

  )
}

export default MyEvents
