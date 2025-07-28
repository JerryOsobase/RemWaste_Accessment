import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import { Sequelize, DataTypes } from 'sequelize';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const sequelize = new Sequelize('wastetrackr', 'root', 'rootpassword', {
  host: 'mysql',
  dialect: 'mysql',
});

const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, unique: true },
  password: DataTypes.STRING,
});

const Item = sequelize.define('Item', {
  name: DataTypes.STRING,
  description: DataTypes.TEXT,
});

User.hasMany(Item);
Item.belongsTo(User);

const JWT_SECRET = 'supersecretkey';

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET);
  res.json({ token });
});

app.get('/items', authenticateToken, async (req, res) => {
  const items = await Item.findAll({ where: { UserId: req.user.id } });
  res.json(items);
});

app.post('/items', authenticateToken, async (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ message: 'Name is required' });
  const item = await Item.create({ name, description, UserId: req.user.id });
  res.status(201).json(item);
});

app.put('/items/:id', authenticateToken, async (req, res) => {
  const item = await Item.findOne({ where: { id: req.params.id, UserId: req.user.id } });
  if (!item) return res.status(404).json({ message: 'Item not found' });
  const { name, description } = req.body;
  if (name !== undefined) item.name = name;
  if (description !== undefined) item.description = description;
  await item.save();
  res.json(item);
});

app.delete('/items/:id', authenticateToken, async (req, res) => {
  const item = await Item.findOne({ where: { id: req.params.id, UserId: req.user.id } });
  if (!item) return res.status(404).json({ message: 'Item not found' });
  await item.destroy();
  res.json({ message: 'Deleted successfully' });
});

(async () => {
  await sequelize.sync({ force: true }); // reset DB on startup for demo
  // Create a test user
  await User.create({ username: 'testuser', password: 'testpass' });
  app.listen(5050, () => console.log('Backend running on http://localhost:5050'));
})();
