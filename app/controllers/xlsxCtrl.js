/**
 * Created by Administrator on 2016/3/21 0021.
 */


var formidable = require('formidable');
var xlsx = require('xlsx');
var path = require('path');
var fs = require('fs');

exports.uploadXlsx = function(req, res) {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = path.join(__dirname, '../../', '/public/upload/');
    form.keepExtensions = true;     //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小
    form.parse(req, function(err, fields, files) {
        if (err) {
            res.locals.error = err;
            res.json({
                success:false,
                msg:'失败'
            });
            return;
        }
        var extName = '';  //后缀名
        switch (files.type) {
            case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                extName = 'xlsx';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
        }
        res.locals.success = '上传成功';
        res.json({
            success:true,
            name:files.file.name,
            path: files.file.path
        })

    });

};
exports.xlsx = function(req, res) {
    var _path = req.body.paths[0].path;
    var workbook = xlsx.readFile(_path);
    var first_sheet_name = workbook.SheetNames[0];
    var worksheet = workbook.Sheets[first_sheet_name];
    var json = xlsx.utils.sheet_to_json(worksheet);

    console.log(json);
    res.json(json);

};