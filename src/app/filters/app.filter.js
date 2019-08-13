(function () {
    'use strict';

var app = angular.module('adminApp');

app.filter("strToDate", ['$filter', function ($filter) {
    return function (input, format) {
        return $filter('date')(new Date(input), format);
    }
}]);

app.filter('html', ['$sce', function($sce){
	return function(item) {
		return $sce.trustAsHtml(item);
	};
}]);

app.filter('abs', function() {
    return function(num) { return Math.abs(parseInt(num)); }
});

app.filter('isNotEmptyObj', function () {
    var bar;
    return function (obj) {
        for (bar in obj) {
            if (obj.hasOwnProperty(bar)) {
                if (bar.indexOf("$error") == -1) { // ng file upload 에 대한 예외처리
                    return true;
                }
            }
        }
        return false;
    };
});

app.filter("rangeToArr", function () {
    return function(input, min, max) {
        min = parseInt(min);
        max = parseInt(max);
        for (var i=min; i<=max; i++)
            input.push(i);
        return input;
    };
});

app.filter("tsDate", function () {
    return function (input) {
        return new Date(input).toLocaleString("ko-KR");
    }
});

// code to name
app.filter('codeToName', ['CommonService', function(CommonService) {
    return function(code, type) {

        var code_name = '';
        var code_list = CommonService.getCodeInfo(type);
        angular.forEach(code_list, function(item, idx) {
            if (code == item.key) {
                code_name = item.value;
            }
        });

        return code_name;
    };
}]);
})();