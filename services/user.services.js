const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

const expiresIn = "15d";

class UserService {  
  static async registerUser(fullName, email, password, phone, defaultAddress) {
    try {
      const createUser = new UserModel({
        fullName,
        email,
        password,
        phone,
        defaultAddress,
      });
      return await createUser.save();
    } catch (err) {
      throw err;
    }
  }

  static async checkUser(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (err) {
      throw err;
    }
  }

  static async decodeToken(decodeToken) {
    try {
      return jwt.verify(decodeToken, process.env.JWT_SECRET, {
        algorithm: 'HS256',
      });
    } catch (e) {
      return res.status(401).send('Não autorizado');
    }
  }

  static async generateToken(tokenData) {
    return jwt.sign(tokenData, process.env.JWT_SECRET, {
      algorithm: 'HS256',
      expiresIn: expiresIn,
    });
  }
}

module.exports = UserService;
