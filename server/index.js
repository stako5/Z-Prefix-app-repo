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
    .catch(err =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
    );
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

app.get('/users', (req, res) => {
  knex('users')
    .select('*')
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
    );
});

app.post('/users', (req, res) => {
  
  const {username, password} = req.body

  knex('users')
    .select('id', 'username', 'password')
    .where('username', username)
    .first()
    .then(user => {
      if(!user) {
        return res.status(401).json({message: 'Invalid Login'})
      }
      if(user.password !== password) {
        return res.status(401).json({message: 'Invalid Login'})
      }
      res.status(200).json({
        message: "login",
        user: {
          id: user.id, 
          username: user.username
        }
      })

    })    
    .catch(err =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
    );
});



app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});