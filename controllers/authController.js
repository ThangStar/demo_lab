const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../middleware/authMiddleware');

const users = [
    { id: 1, username: 'admin', password: 'admin123' }
];

const login = (req, res) => {
    console.log('Login attempt:', req.body); // Add this for debugging
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
};

const register = (req, res) => {
    const { username, password } = req.body;
    
    // Check if user already exists
    if (users.find(u => u.username === username)) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    // Create new user
    const newUser = {
        id: users.length + 1,
        username,
        password
    };
    users.push(newUser);

    // Generate token
    const token = jwt.sign({ userId: newUser.id }, SECRET_KEY, { expiresIn: '1h' });
    res.status(201).json({ token });
};

module.exports = { login, register };