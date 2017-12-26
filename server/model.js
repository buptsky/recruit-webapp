const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/recruit-webapp';
mongoose.connect(DB_URL, {useMongoClient: true});

const models = {
  user: {
    'userName': {type: String, require: true},
    'userPwd': {type: String, require: true},
    'userType': {type: String, require: true},
    'avatar': {type: String},
    // 个人简介或职位简介
    'desc': {type: String},
    // 职位名
    'title': {type: String},
    'company':{type: String},
    'money': {type: String}
  }
}

for (let i in models) {
  mongoose.model(i, new mongoose.Schema(models[i]));
}

module.exports = {
  getModel: function (name) {
    return mongoose.model(name);
  }
}