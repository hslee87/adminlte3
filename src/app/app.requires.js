// Module (moved to webpack.config.js)
// ==============================================
// require('angular-cookie');
// require('@uirouter/angularjs');
// require('ng-file-upload');
// require('angular-ui-bootstrap');
// require('jquery');       // hard-coded in index.html

// webpack require config added in webpack.config.js -- resolve

// Custom

// Environment
require('env/app.env');

// Controllers
require('controllers/index.controller');
require('controllers/empty.controller');
require('controllers/main.controller');

// Components
require('components/main-navbar.component');
require('components/main-sidebar.component');
require('components/main-footer.component');

// Service
require('services/poloniex.service');

// Directive
require('directives/app.directive');

// Filter
require('filters/app.filter');
require('filters/common.filter');
