const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo

// Create
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const name = req.body.name

  return Todo.create({ name, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// READ
app.get('/:id', (req, res) => {
  const UserId = req.user.id
  const id = req.params.id
  return Todo.findOne({
    where: { id, UserId }
  })
    // 轉換成 plain object
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})

// Update
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const id = req.params.id
  return Todo.findOne({
    where: { id, userId }
  })
    .then(todo => res.render('edit', {todo: todo.get() }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const id = req.params.id
  const { name, isDone } = req.body

  return Todo.findOne({ 
    where: { id, userId }
  })
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

// Delete
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const id = req.params.id
  return Todo.findOne({
    where: { id, userId }
  })
    .then(todo => todo.destroy())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router