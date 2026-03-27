// Fetch all events
export async function fetchEvents() {
  const url = 'http://localhost:3000/events';
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

  const url = 'http://localhost:3000/users/login';
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

  const url = 'http://localhost:3000/my-events';
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
  const url = `http://localhost:3000/events/${event_id}/register`;
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
