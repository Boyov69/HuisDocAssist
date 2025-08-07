const http = require('http');
const url = require('url');

const data = {
  patients: [],
  appointments: []
};

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function sendJSON(res, status, payload) {
  setCors(res);
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
}

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);
  if (req.method === 'OPTIONS') {
    setCors(res);
    res.writeHead(204);
    return res.end();
  }

  if (parsed.pathname === '/api/patients' && req.method === 'GET') {
    return sendJSON(res, 200, data.patients);
  }

  if (parsed.pathname === '/api/patients' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const patient = JSON.parse(body);
        patient.id = data.patients.length + 1;
        data.patients.push(patient);
        sendJSON(res, 201, patient);
      } catch (err) {
        sendJSON(res, 400, { error: 'Invalid JSON' });
      }
    });
    return;
  }

  if (parsed.pathname === '/api/appointments' && req.method === 'GET') {
    return sendJSON(res, 200, data.appointments);
  }

  if (parsed.pathname === '/api/appointments' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const appointment = JSON.parse(body);
        appointment.id = data.appointments.length + 1;
        data.appointments.push(appointment);
        sendJSON(res, 201, appointment);
      } catch (err) {
        sendJSON(res, 400, { error: 'Invalid JSON' });
      }
    });
    return;
  }

  sendJSON(res, 404, { error: 'Not Found' });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
