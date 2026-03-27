// Fetch all events
export async function fetchEvents() {
  const url = '/api/events';
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  const data = await response.json();
  return data.events || [];
}

// Fetch token for login
export async function getToken(email: string, password: string) {
  const url = '/api/users/login';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }
  return data.token;
}

// Fetch events for specific user
export async function fetchMyEvents() {
  const url = '/api/my-events';
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch your events');
  }
  const data = await response.json();
  return data.registrations || [];
}

// Register event for specific user
export async function registerEvent(event_id: number) {
  const url = `/api/events/${event_id}/register`;
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Registration failed');
  }
  return data;
}

// Create a new event
export async function createEvent(title: string, description: string, event_time: string) {
  const url = '/api/events';
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({ title, description, event_time })
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to create event');
  }
  return data;
}
