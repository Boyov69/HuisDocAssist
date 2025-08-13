import test from 'node:test';
import assert from 'node:assert';
import { spawn } from 'child_process';

const patientData = {
  name: "Test Patient",
  dob: "01-01-2000",
  bsn: "123456789",
  address: "123 Test Street",
  phone: "1234567890",
  email: "test@test.com",
};

test('Patient registration and listing', async () => {
  // Start backend server
  const server = spawn('node', ['--env-file=.env', 'server/server.cjs']);

  // Wait for server to start
  await new Promise((resolve, reject) => {
    server.stdout.on('data', (data) => {
      if (data.toString().includes('Server running on')) {
        resolve();
      }
    });
    server.stderr.on('data', (data) => {
      reject(new Error(`Server error: ${data}`));
    });
  });

  try {
    // Register a new patient
    const postResponse = await fetch('http://localhost:3001/api/patients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patientData),
    });
    const newPatient = await postResponse.json();

    assert.strictEqual(postResponse.status, 201, 'Patient registration should return status 201');
    assert.strictEqual(newPatient.name, patientData.name, 'Registered patient name should match');

    // Get all patients
    const getResponse = await fetch('http://localhost:3001/api/patients');
    const patients = await getResponse.json();

    assert.strictEqual(getResponse.status, 200, 'Get patients should return status 200');
    assert.strictEqual(patients.length, 1, 'There should be one patient in the list');
    assert.deepStrictEqual(patients[0], { ...patientData, id: 1 }, 'Patient data should match');
  } finally {
    // Stop server
    server.kill();
  }
});
