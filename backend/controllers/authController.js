const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendEmail = require('../utils/email');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  console.log('Register request body:', req.body);

  try {
    let user = await User.findOne({ where: { username: email } });
    if (user) return res.status(400).send('User already exists');

    user = new User({ username: email, password: await bcrypt.hash(password, 10) });
    await user.save();

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.send({ token });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log('Login request body:', req.body);

  try {
    const user = await User.findOne({ where: { username: email } });
    if (!user) return res.status(400).send('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.send({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Server error');
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log('Forgot password request body:', req.body);

  try {
    const user = await User.findOne({ where: { username: email } });
    if (!user) return res.status(400).send('User does not exist');

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const resetLink = `https://tablesprint.vercel.app/reset-password/${token}`;

    await sendEmail(user.username, 'Password Reset', `Please reset your password using the following link: ${resetLink}`);

    res.send('Password reset link sent');
  } catch (error) {
    console.error('Error during password reset:', error);
    res.status(500).send('Server error');
  }
};

exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(400).send('Invalid token');

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.send('Password reset successfully');
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).send('Server error');
  }
};