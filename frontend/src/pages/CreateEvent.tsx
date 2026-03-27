import { Link, useNavigate } from 'react-router-dom';
import { createEvent } from '../api/fetchEvents';
import { useState } from 'react';
function CreateEvent() {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [colorResult, setColorResult] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [event_time, setEventTime] = useState<string>('');
  const tryCreate = async (title: string, description: string, event_time: string) => {
    try {
      const isoDate = new Date(event_time).toISOString();
      const result = await createEvent(title, description, isoDate);
      setTitle('');
      setDescription('');
      setEventTime('');
      navigate('/');
      setMessage('Event Created Successfully');
      setColorResult('text-green-500');
      console.log(result);


    } catch (error) {
      console.error(error);

      setMessage('Error Creating Event');
      setColorResult('text-red-500');
      throw Error('Error Creating Event');


    }
  }
  return (
    <div>

      <div className="flex flex-col items-center h-screen justify-center" >

        {message &&
          <h1 className={colorResult + ' text-center bg-blue-200 p-2 rounded-lg'}>{message}</h1>
        }
        < Link to="/" className='p-2 border-2 m-2 rounded-lg text-center' >Home</Link>
        <input value={title} onChange={(e) => setTitle(e.target.value)} type='text' placeholder='Title' className="max-w-xs border-2 rounded-lg p-2 m-2" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' className="max-w-xs border-2 rounded-lg p-2 m-2"></textarea>
        <input value={event_time} onChange={(e) => setEventTime(e.target.value)} type='datetime-local' placeholder='Event Time' className="max-w-xs border-2 rounded-lg p-2 m-2" />
        <button onClick={() => { tryCreate(title, description, event_time) }} className='p-2 border-2 rounded-lg m-2 max-w-xs ' >Create</button>


      </div>
    </div>
  )
}

export default CreateEvent
