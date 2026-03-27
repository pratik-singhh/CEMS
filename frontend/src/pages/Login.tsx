import { useState } from 'react';
import { getToken } from '../api/fetchEvents';
import { useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const tryLogin = async () => {
    const token = await getToken(email, password);
    if (token) {
      localStorage.setItem('token', token);
      navigate('/');
    }
    else {
      navigate('/login');
    }
    {

    }
  }
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <input className='p-2 border-2 m-2 rounded-lg' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' />
      <input type='password' className='p-2 border-2 m-2 rounded-lg' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' />
      <button className='p-2 border rounded-lg m-2 ' onClick={() => {
        tryLogin();
      }} >Login</button>

    </div>
  )
}

export default Login
