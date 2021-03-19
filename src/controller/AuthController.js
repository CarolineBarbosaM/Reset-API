const database = require('../database/connection');
require("dotenv-safe").config();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const jwt_decode = require('jwt-decode');

class AuthController {
    register(request, response){
        const salt = bcrypt.genSaltSync(10);
        const { name, email, pass } = request.body;

        if(email == null && pass == null){
            return response.status(500).json({ err, message: 'Error when registering user.' });
        }

        const password = bcrypt.hashSync(pass, salt);
        const token = jwt.sign({ email, pass}, process.env.SECRET);

        database.insert({ name, email, password, token }).table('users').then(data => {
            return response.status(200).json({ message: 'User successfully registered.', token: token });
        }).catch(err => {
            return response.status(500).json({ err, message: 'Error when registering user.' });
        });
    }

}

module.exports = new AuthController();