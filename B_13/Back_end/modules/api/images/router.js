/*TODO LIST
- Hoàn thành router cho update/delete image
- Hoàn thành controller/router cho like/unlike/delete comment

*/


const express = require('express');
const Router = express.Router();

const imageController = require('./controller');

Router.get('/', (req, res) => {
    imageController
    .getAllImages(req.query.page || 1)
    .then(images => res.send(images))
    .catch(err => {
        console.log(err);
        res.status(500).send(err); //dải 500 là lỗi server
    })
});
Router.get('/:id', (req, res) => {
    imageController
    .getImage(req.params.id)
    .then(image => res.send(image))
    .catch(err => {
        console.log(err);
        res.status(500).send(err); //dải 500 là lỗi server
    })
});


Router.post('/', (req, res) => {
    imageController
        .creatImage(req.body)
        .then(result => res.send(result))
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        })
});

Router.put('/:id', (req, res) => {
    imageController
    .updateImage(req.params.id, req.body)
    .then(id => res.send(id))
    .catch(err => {
        console.log(err);
        res.status(500).send(err); //dải 500 là lỗi server
    })
})

Router.put('/:id', (req, res) => {
    imageController
    .deleteImage(req.params.id)
    .then(id => res.send(id))
    .catch(err => {
        console.log(err);
        res.status(500).send(err); //dải 500 là lỗi server
    })
})

Router.post('/:imageId/comments', (req, res) => {
    imageController
    .addComment(req.params.imageId, req.body)
    .then(id => res.send(id))
    .catch(err => {
        console.log(err);
        res.status(500).send(err); //dải 500 là lỗi server
    })
});

Router.put('/:imageId/comments/:commentId', (req, res) => {
    console.log(req.params.commentId);
    // console.log(res.body.(req.params.commentId));
    imageController
    .deleteComment(req.params.imageId, req.params.commentId)
    .then(id => res.send(id))
    .catch(err => {
        console.log(err);
        res.status(500).send(err); //dải 500 là lỗi server
    })
});

Router.put('/:id/like', (req, res) => {
    imageController
    .likeImage(req.params.id)
    .then(id => res.send(id))
    .catch(err => {
        console.log(err);
        res.status(500).send(err); //dải 500 là lỗi server
    })
});

Router.put('/:id/unlike', (req, res) => {
    imageController
    .unlikeImage(req.params.id)
    .then(id => res.send(id))
    .catch(err => {
        console.log(err);
        res.status(500).send(err); //dải 500 là lỗi server
    })
});

module.exports = Router;

