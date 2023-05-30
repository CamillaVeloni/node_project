const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const db = require('../config/db');

const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  defaultAddress: {
    // logradouro
    street: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    complement: {
      type: String,
      default: '',
    },
    // bairro
    neighborhood: {
      type: String,
      required: true,
    },
    // localidade
    city: {
      type: String,
      required: true,
    },
    // uf 
    state: {
      type: String,
      required: true,
    },
    //cep
    zipCode: {
      type: String,
      required: true,
    },
  },
});

userSchema.pre('save', async function() {
  try {
    var user = this;
    const salt = await(bcrypt.genSalt(10));
    const hashpass = await bcrypt.hash(user.password, salt);

    user.password = hashpass;
  }catch(err) {
    throw err;
  }
});

userSchema.methods.comparePassword = async function(userPassword) {
  try {
    const isMatch = await bcrypt.compare(userPassword, this.password);
    return isMatch;
  }catch(err) {
    throw err;
  }
};

const UserModel = db.model('user', userSchema);

module.exports = UserModel;
