// imports the express npm module
const express = require("express");


// imports the cors npm module
const cors = require("cors");
// Creates a new instance of express for our app

const { Sequelize, Model, DataTypes } = require('sequelize');

const app = express();

// .use is middleware - something that occurs between the request and response cycle.
app.use(cors());
 // We will be using JSON objects to communcate with our backend, no HTML pages.
app.use(express.json());
// This will serve the React build when we deploy our app
app.use(express.static("react-frontend/dist"));
// Create Sequelize instance
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});
// Define User model
class User extends Model {}
User.init({
    name: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
}, { sequelize, modelName: 'user' });
const users = [
    { name: "John Doe",  isAdmin: false },
    { name: "Jane Smith", isAdmin: false },
    { name: "Mike Johnson", isAdmin: false  },
    { name: "Sarah Williams", isAdmin: false  },
    { name: "David Brown", isAdmin: false  }
];
app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  app.post('/api/users', async (req, res) => {
    const user = await User.create(req.body);
    res.json(user);
});
 /* 
app.get('/api/seeds', async (req, res) => {
    users.forEach(u => User.create(u));
    res.json(users);
});
app.get('/api/users', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});
app.get("/api/users/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id);
    res.json(user);
});
app.post('/api/users', async (req, res) => {
    const user = await User.create(req.body);
    res.json(user);
});
app.put("/api/users/:id", async (req, res) => {
    const { name, isAdmin } = req.body;

    const user = await User.findByPk(req.params.id);
    await user.update({ name, isAdmin });
    await user.save();
    res.json(user);
});
app.delete('/api/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.json({data: `The user with id of ${req.params.id} is removed.`});
});

// Sync models with database
sequelize.sync();

// This route will return 'Hello Ikea!' when you go to localhost:8080/ in the browser
app.get("/", (req, res) => {
    res.json({ data: 'Hello Ikea!' });
});

// This tells the express application to listen for requests on port 8080
const port = process.env.PORT || 8080;
app.listen(port, async () => {
    console.log(`Server started at ${port}`);
});
*/


const PORT = process.env.PORT || 8080;

server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
module.exports = {app, server} // this is so we can stop the server programmatically 
