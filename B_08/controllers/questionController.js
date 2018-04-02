const QuestionSchema = require("../models/questionSchema");

let create = (question, callback)=>{
    let newQuestion = {
        questionContent: question //giống bên questionSchema.js
    }
    try {
        QuestionSchema.create(newQuestion, (err, doc) => {
            //chỉ trả về error nên không cần truyền collection vào
            callback(err, doc);
        });
    } catch (ex) {
        console.log(ex);
    }
    
};

let getQuestion = (callback)=> {
    QuestionSchema.find({}, (err, docs) => {
        if (err) console.log(err);
        callback(docs);
    });
    return;
};

let getQuestionByID = (id, callback) => {
    try {
        QuestionSchema.findById(id, (err, doc) => {
            if (err) console.log(err);
            callback(doc);
        })
    } catch (ex) {
        console.log(ex);
    }
    
};

// let findRandom = (callback) => {
//     try {
//         QuestionSchema.count().exec((err, length) => {
//             if(err) callback(err)
//             else {
//                 QuestionSchema.findOne().skip(Math.floor(Math.random()*docs.length)).exec((errRandom, doc) => {
//                     callback(errRandom, doc);
//                 })
//             }   
//         })
//     } catch (ex) {
//         console.log(ex);
//     }
// }

let updateYesNo = (vote, id, callback) => {
    if(vote == "yes") {
        getQuestionByID(id, (doc) => {
            QuestionSchema.findByIdAndUpdate(id, {yes: doc.yes + 1}, (err) => {
                callback(err);
            })
        })
    } else {
        getQuestionByID(id, (doc) => {
            QuestionSchema.findByIdAndUpdate(id, {no: doc.no + 1}, (err) => {
                callback(err);
            })
        })
    }
}

module.exports = {
    create,
    getQuestion,
    getQuestionByID,
    updateYesNo
}