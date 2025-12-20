import envs from './configs/env.config.js';
import app from './app.js';
import connectDB from './configs/db.config.js';

// Connect to MongoDB
connectDB();

// Start server
app.listen(envs.server.port, () => {
  console.log(`✔️ ${envs.node_env} Server is up and running on ${envs.server.serverUrl}`);
});
