'use strict';

/**
 * @ngdoc overview
 * @name tempGitApp
 * @description
 * # tempGitApp
 *
 * Main module of the application.
 */
angular
  .module('tempGitApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ])
  .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(false);
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'UpdateCtrl'
      })
      .when('/menu', {
        templateUrl: 'views/menu.html',
        controller: 'konmenuCtrl'
      })
      .when('/locs',{
        templateUrl:'views/locs.html',
        controller: 'LocateCtrl'
      }).
      when('/locs/:storeId', {
        templateUrl:'views/store-detail.html',
        controller: 'LocdetailCtrl'
      })
      .when('/admin',{
        templateUrl: 'views/admin.html',
        controller: 'UpdateCtrl'
      })
      .when('/media', {
        templateUrl: 'views/media.html',
        controller: 'MediaCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

'use strict';

/**
 * @ngdoc function
 * @name tempGitApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tempGitApp
 */
angular.module('tempGitApp')
  .controller('MainCtrl', ["$scope", function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.locations = [
    	'5th avenue',
    	'7th avenue'
    ];
  }]);

'use strict';

/**
 * @ngdoc function
 * @name tempGitApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the tempGitApp
 */
angular.module('tempGitApp')
  .controller('AboutCtrl', ["$scope", function ($scope) {
    /*	$scope.myInterval = 3000;

    	$scope.slides = [
    	{
    		image:'images/aboutImages/aboutStore/kondiPhoto1.jpg'
    	},
    	{
    		image:'images/aboutImages/aboutStore/kondiPhoto2.jpg'
    	},
    	{
    		image:'images/aboutImages/aboutStore/kondiPhoto3.jpg'
    	}];

    	
*/
        $('.notMain').hide();

        $('#ownersInfo').click(function(){
            $('#aboutSelections').children().removeClass('aboutNavActive');
            $('#aboutContents').children().hide();
            $('#aboutOwners').fadeIn('slow');
            $(this).addClass('aboutNavActive');
        });

           $('#baristasInfo').click(function(){
            $('#aboutSelections').children().removeClass('aboutNavActive');
            $('#aboutContents').children().hide();
            $('#aboutBaristass').fadeIn('slow');
            $(this).addClass('aboutNavActive');
        });
              $('#storesInfo').click(function(){
            $('#aboutSelections').children().removeClass('aboutNavActive');
            $('#aboutContents').children().hide();
            $('#aboutStores').fadeIn('slow');
            $(this).addClass('aboutNavActive');
        });


       
  }]);

'use strict';

/**
 * @ngdoc function
 * @name tempGitApp.controller:LocateCtrl
 * @description
 * # LocateCtrl
 * Controller of the tempGitApp
 */
angular.module('tempGitApp')
  .controller('LocateCtrl', ["$scope", "$routeParams", "$http", "konStores", function ($scope, $routeParams, $http, konStores) {
   		$scope.stores = konStores.query({storeId: $routeParams.storeId});

      $scope.storeBlurb = false;
      $('#storeDivImageContainer').hover(function(event){
        event.preventDefault();
          $('#storeDivImageBlurb').toggleClass('fadeIn');


      })
   		/*$http.get('stores/stores.json').success (function(data){
   			$scope.storeVar = data; 
   		});
									Back up just incase the service doesn't work. 	

									*/  

        
  }])
  /*.animation('.slide',[function(){

  		return {
  			enter: function(element,doneFn) {
  				jQuery(element).hover(function(){
  					
  					
  				})
  			}

  		}




  }])*/



  ;

'use strict';

/**
 * @ngdoc service
 * @name tempGitApp.konStores
 * @description
 * # konStores
 * Service in the tempGitApp.
 */
angular.module('tempGitApp')
  .service('konStores', ["$resource", function($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
  	return $resource('infos/stores.json',{},{
  		query:{method:'GET',params:{storeId:'stores'}, isArray:true}
  	});
  }]);

'use strict';

/**
 * @ngdoc directive
 * @name tempGitApp.directive:lights
 * @description
 * # lights
 */
angular.module('tempGitApp')
  .directive('faderImage', function () {
    return {
      template: '<div></div>',
      restrict: 'EAC',
      link: function postLink(scope, element, attrs) {
      	element.hide()
        element.mouseenter(function(){
        	this.show('fast');
        });
      }
    };
  });

'use strict';

/**
 * @ngdoc function
 * @name tempGitApp.controller:LocdetailCtrl
 * @description
 * # LocdetailCtrl
 * Controller of the tempGitApp
 */
angular.module('tempGitApp') // ...Change this soon.
  .controller('LocdetailCtrl', ["$scope", "$http", "$routeParams", function ($scope, $http, $routeParams) {
    /*	$scope.storeId = konStores.query({storeId: $routeParams.storeId});

    	$scope.store = konStores.filter(function(entry){

    		return entry.id === $scope.storeId
    	})[0];


        console.log($scope.storeId);
*/

    $scope.storeId = $routeParams.storeId;

    $http.get('infos/stores.json').success(function(data){
    	$scope.store = data.filter(function(entry){ 

    		return entry.id === $scope.storeId;
    	})[0];
    });
    
  }]);

'use strict';

/**
 * @ngdoc function
 * @name tempGitApp.controller:KonmenuCtrl
 * @description
 * # KonmenuCtrl
 * Controller of the tempGitApp
 */
angular.module('tempGitApp')
  .controller('konmenuCtrl', ["$scope", "$http", function ($scope,$http) {
    	$http.get('infos/menu.json').success(function(data){
    		$scope.menuItems = data;
    	});
  }]);

'use strict';

/**
 * @ngdoc function
 * @name tempGitApp.controller:UpdatectrlCtrl
 * @description
 * # UpdatectrlCtrl
 * Controller of the tempGitApp
 */
angular.module('tempGitApp')
  .controller('UpdateCtrl', ["$scope", "$firebaseObject", "$firebaseArray", function ($scope, $firebaseObject, $firebaseArray) {

 
  			/*var ref = new Firebase('https://konditori.firebaseIO.com/Updates');
  			var syncObject = $firebaseArray(ref);
  		
  			syncObject.$bindTo($scope, "data");*/

  			

  				var ref = new Firebase('https://konditori.firebaseIO.com/');

  				$scope.Updates = $firebaseArray(ref);



  				$scope.addUpdate = function(){
  						    var re = /\/n/g; 
   							 var str = $scope.update;
     						var subst = '<br>';
    					var result = str.replace(re, subst);
  					
  						var title = $scope.title;
  						$scope.Updates.$add({
  							Title:title,
  							Body: result
  						});

  						$scope.update = '';
  				}

  				

  			
  }]);

'use strict';

/**
 * @ngdoc function
 * @name tempGitApp.controller:MediaCtrl
 * @description
 * # MediaCtrl
 * Controller of the tempGitApp
 */
angular.module('tempGitApp')
  .controller('MediaCtrl', ["$scope", function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);

'use strict';

/** 
 * @ngdoc directive
 * @name tempGitApp.directive:navMenu
 * @description
 * # navMenu
 */
angular.module('tempGitApp')
  .directive('navMenu', ["$routeParams", "$http", "konStores", function ($routeParams, $http, konStores ) {
    return {
      replace:true,
      templateUrl: 'templates/navMenu.html',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
        var navBarz = $('#navBarz a');
        $('#ayyyyy').hide();
        var backImage = $(this).css('background-image','url("/images/vinSwedFlag.jpg').fadeIn(200);
            
        var locBarz = $('#navBarz a').eq(2);

            $('.locationNav').hover(function(){
              $('#ayyyyy').slideDown('fast');
            
            },function(){
              $('#ayyyyy').hide();
            
            

            });

          scope.stores = konStores.query({storeId: $routeParams.storeId});
/*        
        navBarz.mouseenter(function(){
          $(this).addClass('navMenuActive');*/
        	/*this.removeClass('navMenuActive').css('color','#777');*/
        /* });*/
        /*navBarz.mouseleave(function() {
        	$(this).removeClass('navMenuActive');
        });*/
       /* 
        navBarz.hover(function(){
          $(this).toggleClass('navMenuActive','fadeInLeft');
          
        });
        navBarz.click(function(){  
          if($(navBarz).hasClass('navMenuActive')){
            $(this).removeClass('navMenuActive');
            $(this).addClass('navMenuActive')
          }
          else{
          $(this).addClass('navMenuActive');
          }
        });
        $scope.apply()
*/      
      }
    };
  }]);

'use strict';

/**
 * @ngdoc directive
 * @name tempGitApp.directive:emailContact
 * @description
 * # emailContact
 */
angular.module('tempGitApp')
  .directive('emailContact', function () {
    return {
      replace:true,
      templateUrl: 'templates/emailContact.html',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
       scope.completedEmail= {};

       scope.updates = function(user) {
       	scope.completedEmail = angular.copy(user);
       	console.log(scope.completedEmail);
       	
       };

       scope.reset = function() {
       	scope.completedEmail = angular.copy(scope.completedEmail);
       };
       scope.reset();
      }
    };
  });

'use strict';

/**
 * @ngdoc directive
 * @name tempGitApp.directive:twitterDisplay
 * @description
 * # twitterDisplay
 */
angular.module('tempGitApp')
  .directive('twitterDisplay', function () {
    return {
      replace:true,		
      templateUrl: 'templates/twitterDisplay.html',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
        
      }
    };
  });

'use strict';

/**
 * @ngdoc directive
 * @name tempGitApp.directive:faded
 * @description
 * # faded
 */
angular.module('tempGitApp')
  .directive('faded', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the faded directive');
      }
    };
  });

'use strict';

/**
 * @ngdoc directive
 * @name tempGitApp.directive:aboutStore
 * @description
 * # aboutStore
 */
angular.module('tempGitApp')
  .directive('aboutStore', function () {
    return {
      replace:true,
      templateUrl: 'templates/aboutStore.html',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
        scope.myInterval = 3000;

        $('#something > div').hide();
        setInterval(function(){
        	$('#something')
        		.fadeOut(1000)
        		.next()
        		.fadeIn(1000)
        		.end()
        		.appendTo('#somethings');

        },3000);


    	scope.slides = [
    	{
    		image:'images/aboutImages/aboutStore/kondiPhoto1.jpg'
    	},
    	{
    		image:'images/aboutImages/aboutStore/kondiPhoto2.jpg'
    	},
    	{
    		image:'images/aboutImages/aboutStore/kondiPhoto3.jpg'
    	},
      {
        image:'images/aboutImages/aboutStore/kondiPhoto4.jpg'
      },
      {
        image:'images/aboutImages/aboutStore/kondiPhoto5.jpg'
      }];
    	

      }
    };
  });

'use strict';

/**
 * @ngdoc directive
 * @name tempGitApp.directive:aboutBaristas
 * @description
 * # aboutBaristas
 */
angular.module('tempGitApp')
  .directive('aboutBaristas', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the aboutBaristas directive');
      }
    };
  });

'use strict';

/**
 * @ngdoc directive
 * @name tempGitApp.directive:aboutOwners
 * @description
 * # aboutOwners
 */
angular.module('tempGitApp')
  .directive('aboutOwners', function () {
    return {
      replace:true,	
      templateUrl: 'templates/aboutOwners.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.ownImage = [
        {
        	image:'images/aboutImages/aboutOwner/kondiPhoto1.jpg'	
        },
        {
        	image:'images/aboutImages/aboutOwner/kondiPhoto2.jpg'	
        },
        {
        	image:'images/aboutImages/aboutOwner/kondiPhoto3.jpg'	
        }];
      }
    };
  });