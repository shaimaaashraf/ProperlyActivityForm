  
      var myApp = angular.module('MyApp', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache']).config(['$mdIconProvider', function($mdIconProvider) {
        $mdIconProvider.icon('md-close', 'img/icons/ic_close_24px.svg', 24);
      }]);

      myApp.controller('AppCtrl', function($scope) {
        this.userProvince = '';
        this.provinces = ('Alberta, British Columbia, Manitoba, New Brunswick, Newfoundland and Labrador, Nova Scotia, Ontario, Prince Edward Island, Quebec, Saskatchewan').
		split(', ').map(function (province) { return { abbrev: province }; });
		
		 $scope.project = {
         description: '......',
         special: true
      };
	  
	  
	  var self = this;

    self.readonly = false;

    // Lists of features objects
    self.editableFeatures = [];

      });





// Directive To Check Postal Code
myApp.directive('checkPostal', function() {
		return {
			require: 'ngModel',
			link: function(scope, elem, attr, ngModel) {
				ngModel.$validators.postal = function(val) {
					var regexp = /^(\d{5}(-\d{4})?|[A-Z]\d[A-Z] *\d[A-Z]\d)$/;
					if (val) {
						return regexp.test(val);
					}
					else {
						return true;
					}
				};
			}
		};
	});

	
	
	// Directive To mask Canadian Phone Number
myApp.directive('phoneInput', function($filter, $browser) {
    return {
        require: 'ngModel',
        link: function($scope, $element, $attrs, ngModelCtrl) {
            var listener = function() {
                var value = $element.val().replace(/[^0-9]/g, '');
                $element.val($filter('tel')(value, false));
            };

            // This runs when we update the text field
            ngModelCtrl.$parsers.push(function(viewValue) {
                return viewValue.replace(/[^0-9]/g, '').slice(0,10);
            });

            // This runs when the model gets updated on the scope directly and keeps our view in sync
            ngModelCtrl.$render = function() {
                $element.val($filter('tel')(ngModelCtrl.$viewValue, false));
            };

            $element.bind('change', listener);
            $element.bind('keydown', function(event) {
                var key = event.keyCode;
                // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
                // This lets us support copy and paste too
                if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)){
                    return;
                }
                $browser.defer(listener); // Have to do this or changes don't get picked up properly
            });

            $element.bind('paste cut', function() {
                $browser.defer(listener);
            });
        }

    };
});




myApp.filter('tel', function () {
    return function (tel) {
        console.log(tel);
        if (!tel) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, city, number;

        switch (value.length) {
            case 1:
            case 2:
            case 3:
                city = value;
                break;

            default:
                city = value.slice(0, 3);
                number = value.slice(3);
        }

        if(number){
            if(number.length>3){
                number = number.slice(0, 3) + '-' + number.slice(3,7);
            }
            else{
                number = number;
            }

            return ("(" + city + ") " + number).trim();
        }
        else{
            return "(" + city;
        }

    };
});


