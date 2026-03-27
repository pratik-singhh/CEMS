// Fetch all events
export async function fetchEvents() {
  const url = 'https://cems-e5eo.onrender.com/events';
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data.events;

};

//fetch token for login.
export async function getToken(email: string, password: string) {

  const url = 'https://cems-e5eo.onrender.com/users/login';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email, password
    })
  })
  const token = await response.json();
  return token.token;
};


//fetch events for specific user.
export async function fetchMyEvents() {

  const url = 'https://cems-e5eo.onrender.com/my-events';
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    }
  });
  const data = await response.json();

  return data.registrations;

};

//register event for specific user.
export async function registerEvent(event_id: number) {
  const url = `https://cems-e5eo.onrender.com/events/${event_id}/register`;
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    }
  })
  const data = await response.json();
  return data;
}

export async function createEvent(title: string, description: string, event_time: string) {
  const url = 'https://cems-e5eo.onrender.com/events';
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    },
    body: JSON.stringify({
      title, description, event_time
    })
  })
  const data = await response.json();
  return data;
}













