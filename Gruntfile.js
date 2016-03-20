/**
 * Created by Administrator on 2016/3/15 0015.
 */
module.exports = function(grunt){

    grunt.initConfig({

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.option('force',true);
    grunt.registerTask('default',['concurrent']);
}