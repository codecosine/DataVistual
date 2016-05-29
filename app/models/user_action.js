/**
 * Created by codecosine on 2016/4/23.
 */
/**
 * Created by Administrator on 2016/3/22 0022.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// set up a mongoose model
var Action = new Schema({
    user_id: Number,
    item_id: Number,
    behavior_type:Number,
    user_geohash:String,
    item_category:Number,
    time:Date
});

module.exports = mongoose.model('Action', Action);