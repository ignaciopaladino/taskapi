import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import TaskRoutes from './routes/task-routes';

const app = express();

//Steggins
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(cors()); // sirve para que cualquier aplicacion entre se le puede agregar cuandlquier url en un objeto {origin: 'URL'}
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to my app!' });
});

app.use('/api/tasks', TaskRoutes);

export default app;