/*TODO LIST
- Hoàn thành router cho update/delete image
- Hoàn thành controller/router cho like/unlike/delete comment
- Làm module user
    + Create user
    + GetAll/GetOneUser
    + UpdateUserName, UpdateUserEmail, UpdateUserAvatar, UpdateUserPassword (nên làm riêng 4 cái này chứ không nên gộp chung 1 hàm như image)
    + DeleteUser
*/


const express = require('express');
const Router = express.Router();

const userController = require('./controller');

Router.post('/', (req, res) => {
    userController
    .creatUser(req.body)
    .then(user => res.send(user))
    .catch(err => {
        console.log(err);
        res.status(500).send(err);
    })
});
Router.get('/:id', (req, res) => {
    userController
    .getUser(req.params.id)
    .then(user => res.send(user))
    .catch(err => {
        console.log(err);
        res.status(500).send(err); //dải 500 là lỗi server
    })
});

Router.get('/', (req, res) => {
    userController
    .getAllUsers(req.query.page || 1)
    .then(users => res.send(users))
    .catch(err => {
        console.log(err);
        res.status(500).send(err); //dải 500 là lỗi server
    })
});

Router.put('/:id/username', (req, res) => {
    userController
    .updateUserName(req.params.id, req.body)
    .then(user => res.send(user))
    .catch(err => {
        console.log(err);
        res.status(500).send(err); //dải 500 là lỗi server
    })
});


Router.put('/:id/password', (req, res) => {
    userController
    .updatePassword(req.params.id, req.body)
    .then(user => res.send(user))
    .catch(err => {
        console.log(err);
        res.status(500).send(err); //dải 500 là lỗi server
    })
});

Router.put('/:id/avatar', (req, res) => {
    userController
    .updateAvatar(req.params.id, req.body)
    .then(user => res.send(user))
    .catch(err => {
        console.log(err);
        res.status(500).send(err); //dải 500 là lỗi server
    })
});

Router.put('/:id/email', (req, res) => {
    userController
    .updateEmail(req.params.id, req.body)
    .then(user => res.send(user))
    .catch(err => {
        console.log(err);
        res.status(500).send(err); //dải 500 là lỗi server
    })
});


Router.put('/:id', (req, res) => {
    userController
    .deleteUser(req.params.id)
    .then(users => res.send(users))
    .catch(err => {
        console.log(err);
        res.status(500).send(err); //dải 500 là lỗi server
    })
})

module.exports = Router;

