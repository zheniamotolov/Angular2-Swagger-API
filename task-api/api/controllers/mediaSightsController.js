'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
 */

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

 It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
var util = require('util');
var dummyjson = require('dummy-json');
var jstoxml = require('jstoxml');
var o2x = require('object-to-xml');


/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.

 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.

 Either:
 - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
 - Or the operationId associated with the operation in your Swagger document
 In the starter/skeleton project the 'get' operation on the '/hello' path has an operationId named 'hello'.  Here,
 we specify that in the exports of this module that 'hello' maps to the function named 'hello'
 */

/////////////////////////////
var sightDescriptionSchema = '{' +
    '"id" : "{{@guid}}", ' +
    '"description":"{{lorem 5}}" }';
var mediaSightSchema ='{' +
    '"id" : "{{@guid}}", ' +
    '"name" : "{{firstName}} {{lastName}}", ' +
    '"photo" : "https://www.spb-guide.ru/img/7916/77421.jpg", ' +
    '"popularity":"{{int 0 100}}",'+
    '"latitude":"{{lat}}", ' +
    '"longitude":"{{long}}" }';

var mediaSightsSchema = '['+
    '{{#repeat 10}}' + mediaSightSchema  +
    '{{/repeat}}' +
    ']';
/*
 Functions in a127 controllers used for operations should take two parameters:

 Param 1: a handle to the request object
 Param 2: a handle to the response object
 */
module.exports.getMediaSights= function getMediaSights(req,res,next){
    var sightIds = req.query.sightIds || "1;2;3;4";
    var page = req.query.page || 1;
    var authToken= req.query.longitude || "default";
    var mediaSights = {};
    mediaSights['applicstion/json'] = JSON.parse(dummyjson.parse(mediaSightsSchema));

    if (Object.keys(mediaSights).length > 0) {
        res.setHeader('Content-Type', 'application/json');
        res.json(mediaSights[Object.keys(mediaSights)[0]]);
    }
    else {
        res.end();
    }
}
module.exports.getMediaSightDescription= function getMediaSightDescription(req,res,next){
    var sightId = req.param('sightId');
    var authToken= req.query.longitude || "default";
    var sightDescription = {};

    sightDescription['application/json'] = JSON.parse(dummyjson.parse(sightDescriptionSchema));

    if(Object.keys(sightDescription).length > 0){
        res.setHeader('Content-Type', 'application/json');
        res.json(sightDescription[Object.keys(sightDescription)[0]]);

    }

    else {
        res.end();
    }
}
/////////
module.exports.getSquares = function getSquares(req, res, next) {
    var zoom = req.query.zoom || 1;
    var latitude = req.query.latitude || 2;
    var longitude= req.query.longitude || 3;
    var squares = {};
    squares['applicstion/json'] = JSON.parse(dummyjson.parse(squaresSchema, {mockdata: {"zoom": zoom}}));

    if (Object.keys(squares).length > 0) {
        res.setHeader('Content-Type', 'application/json');
        res.json(squares[Object.keys(squares)[0]]);
    }
    else {
        res.end();
    }
};
module.exports.getSights = function getSights(req, res, next) {
    var squareId = req.param('squareId');

    var sights = {};

    sights['application/json'] = JSON.parse(dummyjson.parse(sightsSchema));

    if(Object.keys(sights).length > 0){
        res.setHeader('Content-Type', 'application/json');
        res.json(sights[Object.keys(sights)[0]]);

    }

    else {
        res.end();
    }
};
// function hello(req, res) {
//     // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
//     var name = req.swagger.params.name.value || 'stranger';
//     var hello = util.format('Hello, %s!', name);
//
//     // this sends back a JSON response which is a single string
//     res.json(hello);
// }
