// Copyright (c) 2014-2015, MyMonero.com
//
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without modification, are
// permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice, this list of
//    conditions and the following disclaimer.
//
// 2. Redistributions in binary form must reproduce the above copyright notice, this list
//    of conditions and the following disclaimer in the documentation and/or other
//    materials provided with the distribution.
//
// 3. Neither the name of the copyright holder nor the names of its contributors may be
//    used to endorse or promote products derived from this software without specific
//    prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
// EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL
// THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
// STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF
// THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

config.coinUnits = JSBigInt.pow(10, config.coinUnitPlaces);

var thinwalletCtrls = angular.module('thinWallet.Controllers', [
    'infinite-scroll'
]);

var thinwalletFilters = angular.module('thinWallet.Filters', []);

var thinwalletServices = angular.module('thinWallet.Services', []);
thinwalletServices.constant('EVENT_CODES', {
    authStatusChanged: 'auth-status-changed'
});

var thinwalletDirectives = angular.module('thinWallet.Directives', [
    'thinWallet.Services'
]);

var thinwalletApp = angular.module('thinWallet', [
    'ngRoute',
    'ngclipboard',
    'thinWallet.Controllers',
    'thinWallet.Services',
    'thinWallet.Filters',
    'thinWallet.Directives',
    'ngIdle'
]);

thinwalletApp.config(['$httpProvider', function($httpProvider) {
     $httpProvider.defaults.withCredentials = true;
     delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

thinwalletApp.config(['KeepaliveProvider', 'IdleProvider', function(KeepaliveProvider, IdleProvider) {
    "use strict";
    IdleProvider.idle(config.idleTimeout * 60);
    IdleProvider.timeout(config.idleWarningDuration);
    KeepaliveProvider.interval(10);
}]);

thinwalletApp.run(function ($rootScope, $route, $location, $http, $timeout, Idle, EVENT_CODES, AccountService, ModalService) {
    "use strict";

    var clipboard = new ClipboardJS('.clipboard-btn');
    clipboard.on('success', function(e) {
        e.trigger.className = "fa fa-check-circle clipboard-btn";
        $timeout(function() {
            e.trigger.className = "fa fa-clipboard clipboard-btn";
        }, 1000);

        e.clearSelection();
    });

    Idle.watch();

    $rootScope.$on('$routeChangeSuccess', function () {
        $rootScope.title = $route.current.title;
        AccountService.checkPageAuth();
    });

    $rootScope.$on(EVENT_CODES.authStatusChanged, function () {
        AccountService.checkPageAuth();
    });

    $rootScope.$on('IdleStart', function() {
        if(AccountService.loggedIn()) {
            ModalService.show('idle-warning');
        }
    });

    $rootScope.$on('IdleEnd', function() {
        ModalService.hide('idle-warning');
    });

    $rootScope.$on('IdleTimeout', function() {
        if(AccountService.loggedIn()) {
            AccountService.logout();
            ModalService.show('idle-timeout');
        }
    });

    $rootScope.parseMoney = cnUtil.parseMoney;
    $rootScope.config = config;

    $rootScope.currentPage = function (page, c) {
        c = c || "w--current";
        return ((($route.current || {}).originalPath + '').trim() === ('/' + page).trim()) ? c : '';
    };

    $rootScope.getModalURL = ModalService.getModalURL;
});
