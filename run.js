const { spawn } = require('child_process');
const path = require('path');
const colors = require('colors');

// Configuration
const BACKEND_DIR = path.join(__dirname, 'backend');
const FRONTEND_DIR = path.join(__dirname, 'frontend');

// Helper function to create and format log prefixes
const createPrefix = (name, color) => {
  return (data) => {
    const lines = data.toString().trim().split('\n');
    lines.forEach(line => {
      if (line.trim()) {
        console.log(`[${name}]`.padEnd(12)[color] + line);
      }
    });
  };
};

// Start backend server
console.log('🚀 Starting backend server...'.cyan);
const backend = spawn('npm', ['run', 'dev'], { cwd: BACKEND_DIR });

// Log backend output with a blue prefix
backend.stdout.on('data', createPrefix('BACKEND', 'blue'));
backend.stderr.on('data', createPrefix('BACKEND ERR', 'red'));

// Start frontend development server
console.log('🚀 Starting frontend development server...'.magenta);
const frontend = spawn('npm', ['start'], { cwd: FRONTEND_DIR });

// Log frontend output with a green prefix
frontend.stdout.on('data', createPrefix('FRONTEND', 'green'));
frontend.stderr.on('data', createPrefix('FRONTEND ERR', 'red'));

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n💥 Terminating all processes...'.yellow);
  
  backend.kill('SIGINT');
  frontend.kill('SIGINT');
  
  process.exit(0);
});

// Handle backend exit
backend.on('exit', (code) => {
  console.log(`Backend server exited with code ${code}`.red);
  if (code !== 0 && code !== null) {
    console.log('Trying to restart backend server...'.yellow);
    setTimeout(() => {
      const newBackend = spawn('npm', ['run', 'dev'], { cwd: BACKEND_DIR });
      newBackend.stdout.on('data', createPrefix('BACKEND', 'blue'));
      newBackend.stderr.on('data', createPrefix('BACKEND ERR', 'red'));
      backend = newBackend;
    }, 5000);
  }
});

// Handle frontend exit
frontend.on('exit', (code) => {
  console.log(`Frontend server exited with code ${code}`.red);
  if (code !== 0 && code !== null) {
    console.log('Frontend server crashed. Please restart manually.'.yellow);
  }
});

console.log('👨‍💻 Development environment running.'.green);
console.log('👉 Press Ctrl+C to stop all servers.\n'.yellow); 