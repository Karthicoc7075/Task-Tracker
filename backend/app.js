const express = require('express');

const cors = require('cors');
const morgan = require('morgan');
const connectDB  = require('./config/db');
const { config } = require('./config/config');
const errorHandler = require('./middleware/errorhandler');
const authRouter = require('./routes/auth_route');
const projectRouter = require('./routes/project_route');
const taskRouter = require('./routes/task_route');
const dashboardRouter = require('./routes/dashboard_route');
const app = express();

const dbUrl = config.mongodbUrl;
const port = config.port || 8888;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Welcome to the Task Management API');
});
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/tasks', taskRouter);
app.use('/api/v1/dashboard', dashboardRouter);

app.use(errorHandler);



const startServer = async () => {
  try {
  connectDB(dbUrl);
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}catch (error) {
  console.error('Error starting server:', error);
  process.exit(1);
}
};

startServer();
