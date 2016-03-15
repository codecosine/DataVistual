angular
    .module('app.forms',['angularFileUpload']);
angular
    .module('app.forms')
    .controller('projectController',projectController);
projectController.$inject = ['FileUploader'];

function projectController(FileUploader){

    var vm = this;
    activate();
    ////////////////

    function activate(){
        var uploader = vm.uploader = new FileUploader({
            url: 'server/upload.php'
        });
        // FILTERS

        uploader.filters.push({
            name: 'customFilter',
            fn: function(/*item, options*/) {
                return this.queue.length < 10;
            }
        });

        var connectOrigins = ['excel','txt','mysql'];
        vm.show = function(index){
            return connectOrigins[index]===vm.origin;
        };
        vm.origin = connectOrigins[0];
        vm.selectDb = function(index){
            vm.origin = connectOrigins[index];
        };
    }



}
