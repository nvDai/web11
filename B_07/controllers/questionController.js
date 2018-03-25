const QuestionSchema = require("../models/questionSchema");

let create = (question, callback)=>{
    let newQuestion = {
        questionContent: question //giống bên questionSchema.js
    }
    QuestionSchema.create(newQuestion, (err, collection) => {
        if(err) console.log(err);
        callback(collection);
    });
};

let findAll = (callback)=> {
    QuestionSchema.find((err, result) => {
        if (err) console.log(err);
        callback(result);
    });
};

let findID = (id, callback) => {
    QuestionSchema.findById(id, (err, result) => {
        if (err) close.log(err);
        callback(result);
    })
};

let updateYesNo = (vote, id, callback) => {
    if(vote == "yes") {
        findID(id, (collection) => {
            QuestionSchema.findByIdAndUpdate(id, {yes: collection.yes + 1}, (err) => {
                callback(err);
            })
        })
    } else {
        findID(id, (collection) => {
            QuestionSchema.findByIdAndUpdate(id, {no: collection.no + 1}, (err) => {
                callback(err);
            })
        })
    }
}

module.exports = {
    create,
    findAll,
    findID,
    updateYesNo
}