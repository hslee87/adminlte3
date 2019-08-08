(function () {
	'use strict';

	var app = angular.module('adminApp');

	// 모든 클릭 이벤트에 대한 로그인 여부 확인
	app.directive('body', ['$state',
		function ($state) {
			return {
				restrict: 'E',
				link: function (scope, element, attr) {
					element.on('click', function () {
						// TODO: 로그인 상태가 아니면 로그인 화면이로 이동 처리
					});
				}
			}
		}
	]);

	// 뒤로 가기
    app.directive('historyBack', ['$window', function($window) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                elem.bind('click', function () {
                    $window.history.back();
                });
            }
        };
	}]);

	// 포커스 처리
	app.directive('focusMe', ['$timeout', function ($timeout) {
		return {
			restrict: 'A',
			scope: { trigger: '=focusMe' },
			link: function (scope, element) {
				scope.$watch('trigger', function(value) {
					if(value === true) {
						$timeout(function() {
							element[0].focus();
						}, 0, false);
					}
				});
			}
		};
	}]);

	// Blur
	app.directive('blurMe', ['$timeout', function ($timeout) {
		return {
			restrict: 'A',
			link: function (scope, element) {
				element.bind('click', function () {
					$timeout(function() {
						element[0].blur();
					}, 0);
				});

			}
		};
	}]);

	// Blur after 3 digits
	app.directive('blurThreeDigits', ['$timeout', function ($timeout) {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, element, attrs, ngModel) {
				scope.$watch(function () {
					return ngModel.$modelValue;
				}, function(newValue, oldValue) {
					if (typeof oldValue !== 'undefined' && typeof newValue !== 'undefined') {
						if (oldValue.length == 2 && newValue.length == 3) {
							$timeout(function() {
								element[0].blur();
							}, 0);
						}
					}
				});
			}
		}
	}]);

	// Blur after 6 digits
	app.directive('blurSixDigits', ['$timeout', function ($timeout) {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, element, attrs, ngModel) {
				scope.$watch(function () {
					return ngModel.$modelValue;
				}, function(newValue, oldValue) {
					if (typeof oldValue !== 'undefined' && typeof newValue !== 'undefined') {
						if (oldValue.length == 5 && newValue.length == 6) {
							$timeout(function() {
								element[0].blur();
							}, 0);
						}
					}
				});
			}
		}
	}]);

	// only DIGITS
	app.directive('onlyDigits', function () {
		return {
			require: 'ngModel',
			restrict: 'A',
			link: function (scope, element, attr, ctrl) {
				function inputValue(val) {
					if (val) {
						var digits = val.replace(/[^0-9]/g, '');

						if (digits !== val) {
							ctrl.$setViewValue(digits);
							ctrl.$render();
						}
						return digits;
					}
					return undefined;
				}
				ctrl.$parsers.push(inputValue);
			}
		};
	});

	// only DIGITS and Comma
	app.directive('onlyDigitsDot', function () {
		return {
			require: 'ngModel',
			restrict: 'A',
			link: function (scope, element, attr, ctrl) {
				function inputValue(val) {
					if (val) {
						var digits = val.replace(/[^0-9.]/g, '');

						if (digits !== val) {
							ctrl.$setViewValue(digits);
							ctrl.$render();
						}
						return digits;
					}
					return undefined;
				}
				ctrl.$parsers.push(inputValue);
			}
		};
	});

	// only DIGITS and Comma
	app.directive('onlyDigitsComma', function () {
		return {
			require: 'ngModel',
			restrict: 'A',
			link: function (scope, element, attr, ctrl) {
				function inputValue(val) {
					if (val) {
						var digits = val.replace(/[^0-9,]/g, '');

						if (digits !== val) {
							ctrl.$setViewValue(digits);
							ctrl.$render();
						}
						return digits;
					}
					return undefined;
				}
				ctrl.$parsers.push(inputValue);
			}
		};
	});

	// only DIGITS and Dot and Comma
	app.directive('onlyDigitsDotComma', function () {
		return {
			require: 'ngModel',
			restrict: 'A',
			link: function (scope, element, attr, ctrl) {
				function inputValue(val) {
					if (val) {
						var digits = val.replace(/[^0-9.,]/g, '');

						if (digits !== val) {
							ctrl.$setViewValue(digits);
							ctrl.$render();
						}
						return digits;
					}
					return undefined;
				}
				ctrl.$parsers.push(inputValue);
			}
		};
	});

	// replace number format
	app.directive('replaceNumberFormat', ['$filter', function ($filter) {
		return {
			require: 'ngModel',
			restrict: 'A',
			link: function (scope, element, attr, ctrl) {
				ctrl.$parsers.push(function(val) {
					if (val) {
						var num = val.replace(/[^0-9]/g, '');
						var value = $filter('number')(num);

						if (value !== val) {
							ctrl.$setViewValue(value);
							ctrl.$render();
						}
						return value;
					}
					return undefined;
				});
			}
		};
	}]);

	// select file after click button
	app.directive('uploadFile', function () {
		return {
			restrict: 'A',
			scope: {
				fid: '=fid'
			},
			link: function(scope, element) {
				element.bind('click', function(e) {
					$('#' + scope.fid).trigger('click');
				});
			}
		};
	});

	app.directive('iframeOnload', [function(){
		return {
			scope: {
				callBack: '&iframeOnload'
			},
			link: function(scope, element, attrs){
				element.on('load', function(){
					return scope.callBack();
				})
			}
		};
	}]);

	// open window
	app.directive('openWindow', ['$timeout', function ($timeout) {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				element.bind('click', function () {
					$timeout(function() {
						window.open(attrs.openWindow);
					});
				});
			}
		};
	}]);

	// move location
	app.directive('moveLocation', ['$timeout', function ($timeout) {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				element.bind('click', function () {
					$timeout(function() {
						window.location.href = attrs.moveLocation;
					});
				});
			}
		};
	}]);

	// infinite scroll
	app.directive('infiniteScroll', function() {
		return function(scope, elm, attr) {
			var raw = elm[0];

			elm.bind('scroll', function() {
				// //-- console.log('scrollTop : ' + raw.scrollTop + ', offsetHeight : ' + raw.offsetHeight  + ', scrollHeight : ' + raw.scrollHeight)
				if ((raw.scrollTop + raw.offsetHeight) >= (raw.scrollHeight - 100)) {
					scope.$apply(attr.infiniteScroll);
				}
			});
		};
	});

	// Keyboard Input (Browser Event)
	app.directive('onKey', ['$rootScope', function ($rootScope) {
		return {
			restrict: 'A',
			link: function(scope, elem, attrs) {
				elem.on('keydown', function (event) {
					$rootScope.$broadcast('event:key_down', event);
				});
				elem.on('keyup', function (event) {
					$rootScope.$broadcast('event:key_up', event);
				});
				elem.on('keypress', function (event) {
					$rootScope.$broadcast('event:key_press', event);
				});
			}
		};
	}]);

	// Keyboard Enter (Browser Event)
	app.directive('onEnter', function () {
		return {
			restrict: 'A',
			link: function(scope, elem, attrs) {
				elem.bind('keydown', function (event) {
					if (event.which == 13) {
						scope.$apply(function (){
							scope.$eval(attrs.onEnter);
						});

						event.preventDefault();
					}
				});
			}
		};
	});
    
    // for converting value of select options to number
    app.directive('convertToNumber', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function(val) {
                    return parseInt(val, 10);
                });
                ngModel.$formatters.push(function(val) {
                    return '' + val;
                });
            }
        };
    });
    
    // custom on change
    app.directive('customOnChange', function() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var onChangeHandler = scope.$eval(attrs.customOnChange);
                element.bind('change', onChangeHandler);
            }
        };
    });
    
    // null fix
    app.directive('nullFix', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function(value) {
                    if ( value === null ) {
                        value = '';
                    }
                    return value;
                });
            }
        };
    });
    
    // only DIGITS & Dash
    app.directive('onlyDigitsDash', function () {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attr, ctrl) {
                function inputValue(val) {
                    if (val) {
                        var digits = val.replace(/[^0-9-]/g, '');
    
                        if (digits !== val) {
                            ctrl.$setViewValue(digits);
                            ctrl.$render();
                        }
                        return digits;
                    }
                    return undefined;
                }
                ctrl.$parsers.push(inputValue);
            }
        };
    });
    
    // only Number & Lower Alphabet
    app.directive('onlyLoweralphaNumeric', function () {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attr, ctrl) {
                function inputValue(val) {
                    if (val) {
                        var chars = val.replace(/[^a-z0-9]/g, '');
    
                        if (chars !== val) {
                            ctrl.$setViewValue(chars);
                            ctrl.$render();
                        }
                        return chars;
                    }
                    return undefined;
                }
                ctrl.$parsers.push(inputValue);
            }
        };
    });
    
    // 모든 http 요청시 사용할 loading 레이어 (now isn't used)
    app.directive('loading', ['$http' ,function ($http) {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs) {
                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };
    
                scope.$watch(scope.isLoading, function (v) {
                    if(v){
                        elm.show();
                    }else{
                        elm.hide();
                    }
                });
            }
        };
    
    }]);
    
    // jquery selectric
    app.directive('selectric', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, el, attrs) {
                $(el).selectric();
                scope.$on('$includeContentLoaded', function() {
                    $(el).selectric('refresh');
                });
            }
        };
    });
    
    // history back
    app.directive('customHistoryBack', function($window) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.on('click', function() {
                    $window.history.back();
                });
            }
        };
    });
    
    // 한글 입력
    app.directive('krInput', [ '$parse', function($parse) {
        return {
            priority : 2,
            restrict : 'A',
            compile : function(element) {
                element.on('compositionstart',
                    function(e) { e.stopImmediatePropagation();
                });
            }
        };
    }]);
})();
