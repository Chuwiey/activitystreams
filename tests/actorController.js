var request = require('request'),
    url = require('url'),
    assert = require('assert'),
    testUtils = require('./utils'),
    http = require('http');

describe('Test Actor Controller  ', function () {

    beforeEach(function (done) {
        // testEndpoint Auth Policy Setup
        var testEndpoint = {
            host: 'http://localhost',
            port: 6969,
            path: '/fakeSession=%s',
            sessionCookie: 'fakeSession'
        };
        sails.config.authPolicy.endpoint = testEndpoint;
        done();
    });

    describe('Check Actor GET Requests', function () {
        it('GET: actor/{appname_model} (getAllActorsOfType)', function (done) {
            baseUrl.pathname += 'actor/user';
            var apiUrl = url.format(baseUrl);
            request(apiUrl, function (err, response, body) {
                assert.equal(response.statusCode, 200);
                done();
            });
        });

        it('GET: actor/{appname_model}/{id} (getSpecificActor)', function (done) {
            baseUrl.pathname += 'actor/user/1';
            var apiUrl = url.format(baseUrl);
            request(apiUrl, function (err, response, body) {
                assert.equal(response.statusCode, 200);
                done();
            });
        });

        it('GET: actor/{appname_model}/{id}/activities (getAllActivitiesByActor)', function (done) {
            baseUrl.pathname += 'actor/user/1/activites';
            var apiUrl = url.format(baseUrl);
            request(apiUrl, function (err, response, body) {
                assert.equal(response.statusCode, 200);
                done();
            });
        });

        it('GET: actor/{appname_model}/{id}/{verb} (getAllObjectsVerbedByActor)', function (done) {
            baseUrl.pathname += 'actor/user/1/FAVORITED';
            var apiUrl = url.format(baseUrl);
            request(apiUrl, function (err, response, body) {
                assert.equal(response.statusCode, 200);
                done();
            });
        });

        it('GET: actor/{appname_model}/{id}/{verb}/{appname_model} (getSpecificObjectTypeVerbedByActor)', function (done) {
            baseUrl.pathname += 'actor/user/1/favorited/picture';
            var apiUrl = url.format(baseUrl);
            request(apiUrl, function (err, response, body) {
                assert.equal(response.statusCode, 200);
                done();

            });
        });

        it('GET: actor/{appname_model}/{id}/{verb}/{appname_model}/{id} (getActivityByActor)', function (done) {
            baseUrl.pathname += 'actor/user/1/favorited/picture/1';
            var apiUrl = url.format(baseUrl);
            request(apiUrl, function (err, response, body) {
                assert.equal(response.statusCode, 200);
                done();

            });
        });
    });

    describe('Check Actor DELETE Requests', function () {

        it('DELETE: actor/{appname_model}/{id} (deleteSpecificActor) without a valid session', function (done) {
            server = testUtils.fakeServer({code:401, respond:{}});
            var requestOptions = testUtils.createRequestOptions('DELETE', '/api/v1/actor/user/1', '');

            server.on("listening", function() {
                testUtils.makeRequest(requestOptions, function (res) {
                    assert.equal(res.statusCode, 401);
                    server.close(done);
                });
            });
        });

        it('DELETE: actor/{appname_model}/{id} (deleteSpecificActor) with a valid session', function (done) {
            server = testUtils.fakeServer({code:200, respond:{userId: 1337}});
            var requestOptions = testUtils.createRequestOptions('DELETE', '/api/v1/actor/user/1', '');

            server.on("listening", function() {
                testUtils.makeRequest(requestOptions, function (res) {
                    assert.equal(res.statusCode, 200);
                    server.close(done);
                });
            });
        });

        it('DELETE: actor/{appname_model}/{id} (deleteSpecificActor) when the node doesn\'t exist', function (done) {
            server = testUtils.fakeServer({code:200, respond:{userId: 1337}});
            var requestOptions = testUtils.createRequestOptions('DELETE', '/api/v1/actor/user/1', '');

            server.on("listening", function() {
                testUtils.makeRequest(requestOptions, function (res) {
                    assert.equal(res.statusCode, 200);
                    server.close(done);
                });
            });
        });
    });
});
