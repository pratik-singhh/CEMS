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

