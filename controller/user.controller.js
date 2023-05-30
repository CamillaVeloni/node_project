const jwt = require('jsonwebtoken');
const UserService = require('../services/user.services');

class UserController {
  static async registerUser(req, res) {
    try {
      const { fullName, email, password, phone, defaultAddress } = req.body;
      await UserService.registerUser(
        fullName,
        email,
        password,
        phone,
        defaultAddress
      );
      res.status(200).json({ msg: 'Registrado com sucesso' });;
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserService.checkUser(email);
      if (!user) throw new Error('Usuário não existe');

      const isMatch = await user.comparePassword(password);
      if (isMatch === false) throw new Error('Usuário ou senha inválidos');

      let tokenData = { _id: user._id, email: user.email };
      const token = await UserService.generateToken(tokenData);

      res.status(200).send(token);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
  static async ensureAuthorized(req, res) {
    try {
      var authHeader = req.headers.authorization;
      if (!authHeader.startsWith('Bearer ')) throw new Error('Não autorizado');

      var decodeToken = authHeader.substring(7, authHeader.length);
      var decoded = await UserService.decodeToken(decodeToken);

      const { email } = decoded;
      const user = await UserService.checkUser(email);
      return res.status(200).send(user);
    } catch (err) {
      res.status(403).json({message: err.message});
    }
  }
}

module.exports = UserController;
