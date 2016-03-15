/**
 * Created by Administrator on 2016/3/8 0008.
 */
var mongoose = require('mongoose');
var crypto = require('crypto');
var UserSchema = mongoose.Schema({
    username: {
        unique:true,
        type:String
    },
    password: String,
    role:{
        type:Number,
        default:0
    }
});
UserSchema.pre('save', function(next) {
    var user = this;

  /*  if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    }
    else {
        this.meta.updateAt = Date.now()
    }*/
    var sha1 = crypto.createHash('sha1');
    sha1.update(user.password);
    user.password = sha1.digest('hex');
    next();
/*
    var hmac = crypto.createHmac('sha1',user.password);
*/


  /*  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err)

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err)

            user.password = hash
            next()
        })
    })*/
})
UserSchema.methods.speak = function () {
    var greeting = this.username
        ? "Meow name is " + this.username
        : "I don't have a name";
    console.log(greeting);
};
UserSchema.methods.comparePassword = function(_password,cb){
    var sha1 = crypto.createHash('sha1');
    sha1.update(_password);
    var check = sha1.digest('hex');
    var isMatch = check == this.password;
    cb(null,isMatch);
};
/*UserSchema.methods.comparePassword = function (_password,callback) {
    /!*var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');*!/
   bcrypt.compare(_password,this.password,function(err,isMatch){
       if(err){
           return callback(err);
       }
       callback(null,isMatch);
   });
};*/
module.exports = UserSchema;
