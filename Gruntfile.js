/**
 * Created by Administrator on 2016/3/15 0015.
 */
module.exports = function(grunt){

    // 项目配置信息
    grunt.initConfig({
        concat : {
            dist:{
                src:['public/scripts/*.js','public/scripts/*/*.js'],
                dest:'public/dist/built.js'
            }
        },
        uglify:{
            build:{
                src:'public/dist/built.js',
                dest:'public/dist/built.min.js'
            }
        }
    });

    // 加载插件
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default',['concat','uglify']);
}