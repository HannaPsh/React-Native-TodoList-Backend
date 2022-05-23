const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET all posts
router.get('/', async (req, res) => {
  try {
    res.json(await Task.find());
  } catch (error) {
    res.json({ message: error });
  }
});

router.get('/:taskId', async (req, res) => {
  try {
    res.json(await Task.findById(req.params.userId));
  } catch (error) {
    res.json({ message: error });
  }
});

router.post('/', async (req, res) => {
  /* res.end (title) */
  const task = new Task({
    title: req.body.title,
    status: req.body.status,
  });
  try {
    const savedTask = await task.save();
    res.json(savedTask);
  } catch (error) {
    res.json({ message: error });
  }
});

// Delete post
router.delete('/:taskId', async (req, res) => {
  try {
    const deletedTask = await Task.deleteOne({ _id: req.params.taskId });
    res.json(deletedTask);
  } catch (error) {
    res.json({ message: error });
  }
});

// Update post
router.patch('/:taskId', async (req, res) => {
  try {
    const updatedTask = await Task.updateOne(
      { _id: req.params.taskId },
      {
        $set: {
          status:
            req.body
              .status /* to change ONLY status, while saving all the other lines untouched */,
        },
      }
    );
    res.json(updatedTask);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
