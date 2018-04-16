const userModel = require('./model');
/*
- Làm module user
    + Create user
    + GetAll/GetOneUser
    + UpdateUserName, UpdateUserEmail, UpdateUserAvatar, UpdateUserPassword (nên làm riêng 4 cái này chứ không nên gộp chung 1 hàm như image)
    + DeleteUser
*/

const creatUser = ({avatar, username, password, email})=> new Promise((resolve, reject) => {
    userModel.create({
        avatar,
        username, 
        password, 
        email
    })
    .then(data => resolve(data))
    .catch(err => reject(err))
})

const getUser = id => new Promise((resolve, reject) => {
    userModel.findOne({
        "active": true,
        _id: id
    })
    .select("_id avatar username password email")
    .exec() //thuc hien
    .then(data => resolve(data))
    .catch(err => reject(err))
});

const getAllUsers = (page) => new Promise((resolve, reject) => {
    userModel.find({
        active: true
    })
    .skip((page - 1)*20)
    .limit(20)
    .exec()
    .then(data => resolve(data))
    .catch(err => reject(err))
})

const updateUserName = (id, {username}) => new Promise((resolve, reject) => {
    userModel.findOneAndUpdate({
        _id: id
    }, {
        username
    })
    .then(data => resolve(data))
    .catch(err => reject(err))
})

const updatePassword = (id, {password}) => new Promise((resolve, reject) => {
    userModel.findOneAndUpdate({
        _id: id
    }, {
        password
    })
    .then(data => resolve(data))
    .catch(err => reject(err))
})

const updateAvatar = (id, {avatar}) => new Promise((resolve, reject) => {
    userModel.findOneAndUpdate({
        _id: id
    }, {
        avatar
    })
    .then(data => resolve(data))
    .catch(err => reject(err))
});

const updateEmail = (id, {email}) => new Promise((resolve, reject) => {
    userModel.findOneAndUpdate({
        _id: id
    }, {
        email
    })
    .then(data => resolve(data))
    .catch(err => reject(err))
});

const deleteUser = id => new Promise((resolve, reject) => {
    userModel.update({
        _id: id //Tìm thằng nào có Id như vậy để sửa
    }, {
        active: false
    })
    .then(data => resolve(data))
    .catch(err => reject(err))
});


module.exports = {
    creatUser,
    getUser,
    getAllUsers,
    updateUserName,
    updatePassword,
    updateAvatar,
    updateEmail,
    deleteUser
}