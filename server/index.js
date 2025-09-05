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
    .then(items => res.status(200).json(items))
    .catch(err => res.status(500).json({ message: 'error', err }));
});

//Creates new item. need work to create new columns for customer if more catygories requested 
app.post('/items', (req, res) => {
  const itemData = req.body
  knex('items')
    .insert(itemData)
    .returning('*')
    .then(newItem => res.status(200).json(newItem))
    .catch(err => res.status(500).json({ message: 'Error Server not found.', err }));
});

app.get('/items/:id', (req, res) =>{
  knex('items')
    .where({item_id: req.params.id})
    .select('*')
    .first()
    .then(item => res.status(200).json(item))
    .catch(err => res.status(500).json({error: 'Error Server not found.', err}))
})

//Need to work with updating the entire items inventory. Currently only updates the quantity of one items JSON at a time.
app.put('/items/:id', (req, res) => {
  knex('items')
    .where({item_id: req.params.id})
    .returning({ quantity: req.body.quantity})
    .then(count => { 
      if(count) res.status(200).json({quantity: req.body.quantity})
    })
    .catch(err => res.status(500).json({error: 'Error Server not found.', err}))
});

app.delete('/items/:id', (req, res) => {
  knex('items')
    .where({item_id: req.params.id})
    .del()
    .then(count => {
      if(count) res.json({delete: count})})
    .catch(err => res.status(500).json({error: 'Error Server not found.', err}))
})

app.get('/users', (req, res) => {
  knex('users')
    .select('*')
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({error: 'Error Server not found.', err}))
});

//Need to fix the crashes if user or password are incorrect, also add HASHing
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  knex('users')
    .select('id', 'username', 'password')
    .where('username', username)
    .first()
    .then(user => {
      if (!user || user.password !== password){
        res.status(401).json({ message: 'Invalid Login' })
      } 
      return res.status(200).json({user: { username: user.username }});
    })
    .catch(err => res.status(500).json({error: 'Error Server not found.', err}));
});

//Needs HASHing on creation of account password
app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  knex('users')
    .insert({ username, password })
    .returning(['id', 'username'])
    .then((rows) => {
      const user = rows[0];
      res.status(200).json({ message: 'signup' });
    })
    .catch(err => res.status(500).json({error: 'Error Server not found.', err}))
});



app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});
