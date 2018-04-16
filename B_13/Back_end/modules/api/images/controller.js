const imageModel = require('./model');

//({ imageUrl, title, description, createbody}) chỉ lấy data mình cần
const creatImage = ({ imageUrl, title, description, createdBy}) => new Promise((resolve, reject) => {
    imageModel.create({
        imageUrl,
        title, 
        description, 
        createdBy
    })
    .then(data => resolve({id: data._id }))
    .catch(err => reject(err))
}); 

const getAllImages = page => new Promise((resolve, reject) => {
    imageModel.find({
        "active": true
    })
    .sort({createdAt: -1}) //Lấy từ bài mới đến bài cũ, -1 là giảm dần, 1 tăng dần
    .skip((page - 1)*20)
    .limit(20) //Gioi han so luong lay ra
    .select("_id imageUrl title desciption createdAt createBy view like")
    .exec() //thuc hien
    .then(data => resolve(data))
    .catch(err => reject(err))
});

const getImage = id => new Promise((resolve, reject) => {
    imageModel.findOne({
        "active": true,
        _id: id
    })
    .select("_id imageUrl title desciption createdAt createBy view like comment")
    .exec() //thuc hien
    .then(data => resolve(data))
    .catch(err => reject(err))
});

const updateImage = (id, { imageUrl, title, description, createdBy}) => new Promise((resolve, reject) => {
    imageModel.update({
        _id: id
    },{
        imageUrl,
        title, 
        description, 
        createdBy
    })
    .then(data => resolve({id: data._id }))
    .catch(err => reject(err))
}); 

const deleteImage = id => new Promise((resolve, reject) => {
    imageModel.update({
        _id: id //Tìm thằng nào có Id như vậy để sửa
    }, {
        active: false
    })
    .then(data => resolve({id: data._id }))
    .catch(err => reject(err))
});

const addComment = (imageId, {createBy, content, active}) => new Promise((resolve, reject) => {
    imageModel.update(
        {
            _id: imageId
        },
        { $push: { comment: { createBy, content, active }}}
    ) 
    .then(data => resolve(data))
    .catch(err => reject(err))
});


const deleteComment = (imageId, commentId) => new Promise((resolve, reject) => {
    imageModel.update(
        {
            _id: imageId
        },
        { $pull: { comment: { 
            _id: commentId 
         }
        }}
    ) 
    .then(data => resolve({id: data._id }))
    .catch(err => reject(err))
});

const likeImage = (imageId) => new Promise((resolve, reject) => {
    
    imageModel.findOneAndUpdate(
        {
            _id: imageId
        },
        { $inc: {
            'like': 1
        }}
    ) 
    .then(data => resolve(data))
    .catch(err => reject(err))
});

const unlikeImage = (imageId) => new Promise((resolve, reject) => {
    
    imageModel.findOneAndUpdate(
        {
            _id: imageId
        },
        { $inc: {  //$inc: mỗi lần tăng 'like' lên x đơn vị(x nhận giá trị âm và dương)
            'like': -1
        }}
    ) 
    .then(data => resolve(data))
    .catch(err => reject(err))
});


//TODO like image
//TODO unlike image
//TODO comment
//TODO delete comment

module.exports = {
    creatImage,
    getAllImages,
    getImage,
    updateImage, 
    deleteImage,
    addComment,
    deleteComment,
    likeImage,
    unlikeImage
}

