const express = require('express');
const cors = require('cors')
const app = express();
const PORT = 8000;
const knex = require('knex')(require('./knexfile.js')['development']);

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
  res.status(200).send({ message: 'welcome to the Inventory DB'})
})

app.get('/items', async (req, res) => {
  knex('items')
    .select('*')
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({ message: 'error' }));
});


app.get('/items/:id', (req, res) =>{
  knex('items')
    .where('item_id', req.params.id)
    .select('*')
    .first()
    .then(item => {
      if (!item) {
        return res.status(404).json({ error: 'Not found' });
      }
      return res.json(item);
    })
    .catch(error => {
      return res.status(500).json({error: 'Error Sever not found.'})
    })
})

app.put('/items/:id', (req, res) => {
  const { quantity } = req.body;
  knex('items')
    .where('item_id', req.params.id)
    .update({ quantity })
    .then(count => {
      res.status(200).json({ message: 'updated' });
    })
    .catch(err =>
      res.status(500).json({ message: 'error' })
    );
});

app.get('/users', (req, res) => {
  knex('users')
    .select('*')
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(404).json({
        message:
          'error'
      })
    );
});

app.post('/users', (req, res) => {
  const { username, password } = req.body;

  knex('users')
    .select('id', 'username', 'password')
    .where('username', username)
    .first()
    .then(user => {
      if (user.password !== password) {
        return res.status(401).json({ message: 'Invalid Login' });
      }
      return res.status(200).json({
        message: 'login',
        user: { id: user.id, username: user.username }
      });
    })
    .catch(err =>
      res.status(500).json({ message: err })
    );
});

// Get a user's saved list
app.get('/users/:id/list', (req, res) => {
  knex('user_items')
    .join('items', 'items.item_id', 'user_items.item_id')
    .where('user_items.user_id', req.params.id)
    .select('user_items.item_id', 'user_items.quantity', 'items.item_name', 'items.description')
    .then(rows => res.status(200).json(rows))
    .catch(err => res.status(500).json({ message: 'error' }));
});

app.post('/users/:id/list', (req, res) => {
  const { item_id, quantity = 1 } = req.body;
  if (!item_id) return res.status(400).json({ message: 'item_id required' });
  knex('user_items')
    .where({ user_id: req.params.id, item_id })
    .first()
    .then(row => {
      if (row) {
        return knex('user_items')
          .where({ user_id: req.params.id, item_id })
          .update({ quantity })
          .then(() => res.status(200).json({ message: 'updated' }));
      }
      return knex('user_items')
        .insert({ user_id: req.params.id, item_id, quantity })
        .then(() => res.status(201).json({ message: 'created' }));
    })
    .catch(err => res.status(500).json({ message: 'error' }));
});

app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  knex('users')
    .insert({ username, password })
    .returning(['id', 'username'])
    .then((row) => {
      const user = row;
      return res.status(201).json({ message: 'signup', user });
    })
    .catch(err =>
      res.status(500).json({
        message:
          'error'
      })
    );
});



app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});
