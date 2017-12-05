var fs = require('fs');
var CodeGen = require('swagger-js-codegen').CodeGen;

var file = 'api/swagger/swagger.json';
var swagger = JSON.parse(fs.readFileSync(file, 'UTF-8'));
//var angularjsSourceCode = CodeGen.getAngularCode({className: 'ProductService', swagger: swagger});
var tsSourceCode = CodeGen.getTypescriptCode({ className: 'SightService', swagger: swagger, imports: ['../../typings/tsd.d.ts']});
console.log(tsSourceCode);
