
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://202.116.148.193/recommend');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        // we're connected!
        console.log('connected');
    });
    var ActionSchema = mongoose.Schema({
        user_id: Number,
        item_id: Number,
        behavior_type:Number,
        user_geohash:String,
        item_category:Number,
        time:Date    });
    var Action = mongoose.model('Action',ActionSchema);
    var item = new Action();
    item.find({user_id:101781721},function(err,actions){
        if(err) return console.err(err);

        console.log(actions);
    });



