(function(){
    'use strict';

    angular
        .module('app', [
            'app.routes',
            'app.auth',
            'app.dataOrigin',
            'app.dashboard'
        ]);

})();

(function(){
    'use strict';

    angular
        .module('app.auth',[]);
})();

(function(){
    'use strict';

    angular
        .module('app.dashboard',[
            'angular-echarts',
            'ui.bootstrap',
            'rzModule',
            'ui.select',
            'ngHandsontable'
        ]);
})();

(function(){
    'use strict';

    angular
        .module('app.dataOrigin',['angularFileUpload']);
})();


