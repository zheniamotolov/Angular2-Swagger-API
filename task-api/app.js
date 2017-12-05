'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')()
var cors =require('cors');
module.exports = app; // for testing

var config = {
    appRoot: __dirname // required config
};

SwaggerExpress.create(config, function (err, swaggerExpress) {
    if (err) {
        throw err;
    }

    // install middleware
    var corsOptions ={
        origin: 'http://localhost:4200',
        credentials: true,
        optionsSuccesStatus: 200
    };
    app.use(cors(corsOptions));

    swaggerExpress.register(app);


    var port = process.env.PORT || 10010;
    app.listen(port);

    if (swaggerExpress.runner.swagger.paths['/hello']) {
        console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
    }
});
