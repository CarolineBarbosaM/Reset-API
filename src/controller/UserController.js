const database = require('../database/connection');

class UserController {
    create(request, response){
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

    listAll(request, response){
        database.select('*').table('users').then(data => {
            return response.status(200).json({ data });
        }).catch(err => {
            return response.status(500).json({ err, message: 'Error listing user.' });
        });
    }

    list(request, response){
        const id = request.params;
        
        database.select('*').table('users').where({ id:id }).then(data => {
            return response.status(200).json({ data });
        }).catch(err => {
            return response.status(500).json({ err, message: 'Error listing user.' })
        })
    }

    updated(request, response){
        const id = request.params;
        const { name, password } = request.body;

        database.where({ id:id }).update({ name:name, password:password}).table('users').then(data => {
            return response.status(200).json({ message: 'User successfully deleting.' });
        }).catch(err => {
            return response.status(500).json({ err, message: 'Error updating user.' })
        })
    }

    deleted(request, response){
        const id = request.params;

        database.where({ id:id }).del().table('users').then(data => {
            return response.status(200).json({ message: 'User successfully deleting.' });
        }).catch(err => {
            return response.status(500).json({ err, message: 'Error while deleting user.' })
        });
    }
}

module.exports = new UserController();