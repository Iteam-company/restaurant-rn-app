const { networkInterfaces } = require('os');
const fs = require('fs');

function getLocalIPv4() {
  const nets = networkInterfaces();

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (!net.internal && net.family === 'IPv4') {
        return net.address;
      }
    }
  }
  return 'localhost';
}

function generateEnvConfig() {
  const ip = getLocalIPv4();
  const backendPort = process.env.BACKEND_PORT || 3000;

  const envContent = `
# Auto-generated local network configuration
API_URL=http://${ip}:${backendPort}
LOCAL_IP=${ip}
BACKEND_PORT=${backendPort}
`;

  fs.writeFileSync('.env', envContent, { flag: 'w' });
  console.log('Environment configuration generated:');
  console.log(`Local IP: ${ip}`);
  console.log(`Backend URL: http://${ip}:${backendPort}`);
}

generateEnvConfig();
