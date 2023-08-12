const express = require('express');
const mongoose = require('mongoose');
const Thing = require('./thing');
require("dotenv").config();

const app = express();
mongoose.connect(process.env.MONGODB,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
app.use(express.json());
mongoose.connect
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.post('/api/todo', async (req, res, next) => {
    const { task, done } = req.body;
  const thing = await Thing.create({
    task,
    done,
  });
  res.json({ thing });
  });

  app.get('/api/Todo', async (req, res, next) => {
    const things = await Thing.find();
   res.json({ things });
  });

  app.delete('/api/Todo/:id', async (req, res, next) => {
    const thingId = req.params.id;

  // Delete the record
  await Thing.deleteOne({ id: thingId });

  // Respond
  res.json({ success: "Record deleted" });
  });

  app.put('/api/Todo/:id', async (req, res, next) => {
    try {
        // Find the task by ID
        const task = await Thing.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        task.done = !task.done;
        const updatedTask = await task.save();

        res.json(updatedTask);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
  });















module.exports = app;