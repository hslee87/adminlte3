(function () {
	'use strict';

	var app = angular.module('adminApp');

	app.filter('strReplace', function () {
		return function (input, from, to) {
			input = input || '';
			from = from || '';
			to = to || '';
			return input.replace(new RegExp(from, 'g'), to);
		};
	});

	// 절대값
	app.filter('abs', function () {
		return function (num) {
			return Math.abs(parseFloat(num));
		}
	});

	// 문자열 분리 후 추출
	app.filter('split', function () {
		return function (input, splitChar, splitIndex) {
			return input.split(splitChar)[splitIndex];
		}
	});

	// 초 to 시:분:초
	app.filter('secToTime', function () {
		return function (seconds) {
			var pad = function (x) { return (x < 10) ? "0" + x : x; }

			var arrTime = [];
			arrTime.push(parseInt(seconds / 3600)); // 60*60
			arrTime.push(parseInt(seconds / 60 % 60));
			arrTime.push(parseInt(seconds % 60));

			var retStr = "";
			if (arrTime[0] == 0) {
				retStr = pad(arrTime[1]) + ":" + pad(arrTime[2]);
			}
			else {
				retStr = pad(arrTime[0]) + ":" + pad(arrTime[1]) + ":" + pad(arrTime[2]);
			}

			return retStr;
		}
	});

	// 전화번호에 "-" 표시 하기
	// type 에 0을 넣으면 가운데 표시에 *** 표시
	app.filter('cellNumberFomatter', function () {
		return function (num, type) {
			var formatNum = '';

			if (num) {
				num = num.replace(/[^0-9]/g, '');

				if (num.length == 11) {
					if (type == 0) {
						formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '***-****-$3');
					} else {
						formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
					}
				} else if (num.length == 8) {
					formatNum = num.replace(/(\d{4})(\d{4})/, '$1-$2');
				} else {
					if (num.indexOf('02') == 0) {
						if (type == 0) {
							formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '**-****-$3');
						} else {
							formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
						}
					} else {
						if (type == 0) {
							formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '***-***-$3');
						} else {
							formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
						}
					}
				}
				return formatNum;
			}
			else {
				return "";
			}
		}
	});

	// login id에 "*" 표시 하기
	// type 에 0을 넣으면 가운데 표시에 *** 표시
	app.filter('loginIdFomatter', function () {
		return function (id, type) {
			var formatId = "";

			var frontShowNum = 2;
			var backShowNum = 2;

			if (id) {
				var idLen = id.length;
				var arrStr = ["", "", ""];

				if (type == 0) {
					arrStr[0] = id.substring(0, frontShowNum);
					arrStr[1] = id.substring(2, idLen - backShowNum).replace(/[^\r]/gi, "*");
					arrStr[2] = id.substring(arrStr[0].length + arrStr[1].length, idLen);
					formatId = arrStr[0] + arrStr[1] + arrStr[2];
				} else {
					formatId = id;
				}

				return formatId;
			}
			else {
				return "";
			}
		}
	});

	// sprintf
	app.filter('sprintf', function () {
		function parse(str) {
			var args = [].slice.call(arguments, 1),
				i = 0;

			if (str) {
				return str.replace(/%s/g, function () {
					return args[i++];
				});
			}
			else{
				return "";
			}
		}

		return function (str) {
			return parse(str, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
		};
	});

	// custom Date
	app.filter('customDate', ['$filter', function ($filter) {
		return function (date, format) {
			var newDate = date;
			return $filter('date')(newDate, format);
		}
	}]);

	// ocm: UTC -> KST (yyyy-MM-dd hh:mm:ss → UTC +9h)
	app.filter('utcToKst', ['$filter', function ($filter) {
		return function (date, format) {
			var newDate = new Date(date);
			newDate.setHours(newDate.getHours()+9)

			return $filter('date')(newDate, format);
		}
	}]);

	// trusted HTML
	app.filter('trustedHtml', ['$sce', function ($sce) {
		return function (content) {
			return $sce.trustAsHtml(content);
		}
	}]);

	// code to name
	app.filter('codeToName', ['MasterDataService', function (MasterDataService) {
		return function (code1, type, code2) {
			return MasterDataService.getCodeInfo(type, code1, code2);
		};
	}]);

	// string to float
	app.filter('strToFloat', function () {
		return function (input) {
			return parseFloat(input);
		};
	});

	// (BTC,PHP) -> BTC/PHP
	app.filter('currencyPair', ['$filter', function ($filter) {
		return function (currency, counter_currency) {
			return ($filter('uppercase')(currency)) + "/" + ($filter('uppercase')(counter_currency));
		};
	}]);

	// (BTC,PHP) -> btc_php
	app.filter('currencyPairUnderline', ['$filter', function ($filter) {
		return function (currency, counter_currency) {
			return ($filter('lowercase')(currency)) + "_" + ($filter('lowercase')(counter_currency));
		};
	}]);

	// BTC/PHP -> BTC
	app.filter('currencyFromCurrencyPair', ['$filter', function ($filter) {
		return function (currency_pair) {
			return $filter('uppercase')($filter('split')(currency_pair, '/', 0));
		};
	}]);

	// BTC/PHP -> PHP
	app.filter('counterCurrencyFromCurrencyPair', ['$filter', function ($filter) {
		return function (currency_pair) {
			var currencyPair = $filter('uppercase')($filter('split')(currency_pair, '/', 1));
			return typeof currencyPair !== 'undefined' ? currencyPair : '';
		};
	}]);

	// BTC/PHP -> btc_php
	app.filter('currencyPairToUnderline', ['$filter', function ($filter) {
		return function (currency_pair) {
			if (typeof currency_pair !== 'undefined') {
				return $filter('lowercase')(currency_pair.replace("/", "_"));
			} else {
				return '';
			}
		};
	}]);

	// btc_php -> BTC/PHP
	app.filter('currencyPairFromUnderline', ['$filter', function ($filter) {
		return function (currency_pair_underline) {
			if (typeof currency_pair_underline !== 'undefined') {
				return $filter('uppercase')(currency_pair_underline.replace("_", "/"));
			} else {
				return '';
			}
		};
	}]);

	// 시세 거래금액 처리
	app.filter('million', function () {
		return function (num) {
			var new_num = parseInt(num).toString();
			return new_num.substring(0, new_num.length - 6);
		}
	});

	// 거래금액 처리 (KRW)
	app.filter('priceSixUnit', ['CommonService', function (CommonService) {
		return function (num, type) {
			var obj = CommonService.getPriceSixUnit(num);
			return obj[type];
		}
	}]);

	/**
	 * replace number format (for calculator)
	 * . 을 표시하도록
	 */
	app.filter('customNumberFormat', ['$filter', function ($filter) {
		return function (num) {
			if (num) {
				var numStr = num.toString();
				var finalValue = '';
				var numArr = numStr.split('.');
				if (typeof numArr[0] !== 'undefined') {
					var num1 = numArr[0].replace(/[^0-9]/g, '');
					finalValue = $filter('number')(num1);
				}
				if (typeof numArr[1] !== 'undefined') {
					finalValue += "." + numArr[1].replace(/[^0-9]/g, '');
				}

				return finalValue;
			} else {
				return 0;
			}
		}
	}]);

	/**
	 * reformat number
	 * (12345.000, 1) -> 12,345.0
	 * (12345.23000, 3) -> 12,345.230
	 * $filter('number') 의 내림수 처리 (숫자 formatting & size 만큼 0 추가)
	 */
	app.filter('customNumber', ['$filter', function ($filter) {
		return function (num, size) {
			var newNum = $filter('number') ($filter('customToFixed')(num, size), size);
			if (newNum) {
				return newNum;
			} else {
				return 0;
			}
		}
	}]);

	/**
	 * reformat number
	 * (12345.000, 1) -> 12,345
	 * (12345.23000, 3) -> 12,345.23
	 */
	app.filter('customNumberComma', ['$filter', function ($filter) {
		return function (num, size) {
			var newNum = $filter('customNumber')(num, size);
			newNum = newNum.toString();
			if (newNum.indexOf('.') !== -1) {
				newNum = newNum.replace(/0+$/g,'');
			}

			if (newNum) {
				if (newNum.slice(-1) == ".") {
					newNum = newNum.replace('.','');
				}

				return newNum;
			} else {
				return 0;
			}
		}
	}]);

	/**
	 * reformat to Fixed
	 * (12345.000, 0) -> 12345
	 * (12345.23000, 3) -> 12345.23
	 * float toFixed 의 내림수 처리 (0은 제거)
 	 */
	app.filter('customToFixed', function () {
		return function (num, size) {

			function toFixed(num, size) {
				size = parseInt(size);
				var fixedNum = num;
				var numIdx = num.indexOf('.');
				if (numIdx !== -1) {
					var cutIdx = numIdx + size + 1;
					if (size == 0) {
						cutIdx = numIdx + size;
					}
					fixedNum = num.substring(0, cutIdx);
				}

				fixedNum = parseFloat(fixedNum);
				return fixedNum.toString();
			}

			if (num) {
				var numStr = num.toString();
				var newNum = numStr.replace(/,/g,'');
				newNum = newNum.replace(/\.0+0$/g,'');
				if (newNum.slice(-1) == ".") {
					newNum = newNum.replace('.','');
				}

				// 소수점 이하 있으면
				if (newNum.indexOf('.') !== -1) {
					var fixedNum = toFixed(newNum, size);
					// var fixedNum = parseFloat(newNum).toFixed(size).toString();

					if(size != 0){
						if (fixedNum.indexOf('.') !== -1) {
							return fixedNum.replace(/0+$/, '');
						} else {
							return fixedNum;
						}
					}
					else{
						return fixedNum;
					}
					
				} else { // 소수점 이하 없으면
					return newNum;
				}
			} else {
				return 0;
			}
		}
	});

	/**
	 * common currency number format by fiat_yn
	 */
	app.filter('commonCurrencyNumberFormat', ['$filter', 'MasterDataService', 'APP_CONSTANTS', function ($filter, MasterDataService, APP_CONSTANTS) {
		return function (num, currency) {

			try {
				var new_num = 0;
				var coin_info = MasterDataService.getCodeInfo('coin');

				if (APP_CONSTANTS.TRANSLATION_CURRENCY == currency) {
					new_num = $filter('number')(num);
				} else {
					if (typeof coin_info[currency] !== 'undefined' && typeof num !== 'undefined') {
						if (coin_info[currency].fiat_yn == 'Y') {
							new_num = $filter('number')(num);
						} else {
							new_num = $filter('customNumber')(num, 8);
						}
					}
				}

				return new_num;
			} catch (e) {
				return 0;
			}
		}
	}]);

	/**
	 * common currency tick size number format
	 */
	app.filter('tickSizeNumberFormat', ['$filter', 'MasterDataService', 'MarketService', function ($filter, MasterDataService, MarketService) {
		return function (price, currency) {

			try {
				if (currency && price) {
					var tick_size = MarketService.getTickSize(currency, price);
					var tick_digit_count = 0;
					if (parseFloat(tick_size) < 1) {
						tick_digit_count = MarketService.getTickDigitCount(tick_size);
					}

					return $filter('customNumber')(price, tick_digit_count);
				} else {
					return 0;
				}
			} catch (e) {
				return 0;
			}
		}
	}]);

	/**
	 * common currency tick size number
	 */
	app.filter('tickSizeNumber', ['$filter', 'MasterDataService', 'MarketService', function ($filter, MasterDataService, MarketService) {
		return function (price, currency) {

			try {
				var tick_size = MarketService.getTickSize(currency, price);
				var tick_digit_count = 0;
				if (parseFloat(tick_size) < 1) {
					tick_digit_count = MarketService.getTickDigitCount(tick_size);
				}

				return $filter('customToFixed')(price, tick_digit_count);
			} catch (e) {
				return 0;
			}
		}
	}]);

	// 정수 혹은 실수 덧셈 연산
	app.filter('calculatorAdd', function() {
		return function(input, arg1, arg2) {
			var r1, r2, m, c;

			// arg1 = Number(arg1).toString();
			// arg2 = Number(arg2).toString();

			arg1 = arg1.toString();
			arg2 = arg2.toString();

			try {
				r1 = arg1.split(".")[1].length;
			} catch (e) {
				r1 = 0;
			}
			try {
				r2 = arg2.split(".")[1].length;
			}
			catch (e) {
				r2 = 0;
			}
			c = Math.abs(r1 - r2);
			m = Math.pow(10, Math.max(r1, r2));
			if (c > 0) {
				var cm = Math.pow(10, c);
				if (r1 > r2) {
					arg1 = Number(arg1.replace(".", ""));
					arg2 = Number(arg2.replace(".", "")) * cm;
				} else {
					arg1 = Number(arg1.replace(".", "")) * cm;
					arg2 = Number(arg2.replace(".", ""));
				}
			} else {
				arg1 = Number(arg1.replace(".", ""));
				arg2 = Number(arg2.replace(".", ""));
			}

			return (arg1 + arg2) / m;
		};
	});

	// 정수 혹은 실수 뺄셈 연산
	app.filter('calculatorSub', function() {
		return function(input, arg1, arg2) {
			var r1, r2, m, n;

			// arg1 = Number(arg1).toString();
			// arg2 = Number(arg2).toString();

			arg1 = arg1.toString();
			arg2 = arg2.toString();

			try {
				r1 = arg1.split(".")[1].length;
			}
			catch (e) {
				r1 = 0;
			}
			try {
				r2 = arg2.split(".")[1].length;
			}
			catch (e) {
				r2 = 0;
			}
			m = Math.pow(10, Math.max(r1, r2));
			n = (r1 >= r2) ? r1 : r2;

			return ((arg1 * m - arg2 * m) / m).toFixed(n);
		};
	});

	// 정수 혹은 실수 곱셈 연산
	app.filter('calculatorMul', function() {
		return function(input, arg1, arg2) {
			var m = 0,
				s1 = Number(arg1).toString(),
				s2 = Number(arg2).toString();

			try {
				m += s1.split(".")[1].length;
			} catch (e) {}

			try {
				m += s2.split(".")[1].length;
			} catch (e) {}

			return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
		};
	});

	app.filter('ceil', function() {
		return function(input) {
			return Math.ceil(input);
		};
	});

	// multi string filter
	app.filter("msFilter", function() {
		return function(input, fields, searchText){
			var result = [];
			angular.forEach(input, function(item, idx) {
				for(var i=0; i<fields.length; i++) {
					var field = fields[i];

					var lowerSearchText = searchText.toString().toLowerCase();
					if(item[field].toLowerCase().indexOf(lowerSearchText) !== -1 && result.indexOf(item) === -1) {
						result.push(item);
					}
				}
			});


			return result;
		}
	});

	// custom style for number size
	app.filter('customNumSizeStyle', function() {
		return function(input, size) {
			if (!input) input = '';
			var length = (input.toString()).length;
			if (length > (size + 5)) {
				return 'font-size-s1';
			} else if (length > size) {
				return 'font-size-s2';
			} else {
				return '';
			}
		};
	});

	// to translation currency unit
	app.filter('toTranslationCurrency', ['$filter', 'APP_CONSTANTS', function ($filter, APP_CONSTANTS) {
		return function(ticker_info, currency_pair) {
			var translation_currency = APP_CONSTANTS.TRANSLATION_CURRENCY;
			var counter_currency = $filter('counterCurrencyFromCurrencyPair')(currency_pair);
			if (translation_currency != counter_currency) {
				if (typeof ticker_info[currency_pair] !== 'undefined') {
					var current_last_price = ticker_info[currency_pair].last_price;

					var traslation_currency_pair = counter_currency + '/' + translation_currency;
					var translation_last_price = 0;
					if (typeof ticker_info[traslation_currency_pair] !== 'undefined') {
						translation_last_price = ticker_info[traslation_currency_pair].last_price;
					}

					return $filter('calculatorMul') ('', current_last_price, translation_last_price);
				}
			}

			return '';
		};
	}]);

})();