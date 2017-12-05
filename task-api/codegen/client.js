/// <reference path="../../typings/tsd.d.ts" />

import * as request from "superagent";
import {
    SuperAgentStatic
} from "superagent";

type CallbackHandler = (err: any, res ? : request.Response) => void;
type squareId = string;
type mapSight = {
    'id': string

    'name': string

    'photo': string

    'latitude': number

    'longitude': number

};
type mapSights = Array < mapSight >
    | mapSight

;
type mediaSight = {
    'id': string

    'name': string

    'photo': string

    'popularity': number

};
type mediaSights = Array < mediaSight >
    | mediaSight

;
type sightDescription = {
    'id': string

    'description': string

};
type Error = {
    'code': string

    'message': string

};

type Logger = {
    log: (line: string) => any
};

/**
 * 
 * @class SightService
 * @param {(string)} [domainOrOptions] - The project domain.
 */
export default class SightService {

    private domain: string = "http://localhost:10010/api/v1";
    private errorHandlers: CallbackHandler[] = [];

    constructor(domain ? : string, private logger ? : Logger) {
        if (domain) {
            this.domain = domain;
        }
    }

    getDomain() {
        return this.domain;
    }

    addErrorHandler(handler: CallbackHandler) {
        this.errorHandlers.push(handler);
    }

    private request(method: string, url: string, body: any, headers: any, queryParameters: any, form: any, reject: CallbackHandler, resolve: CallbackHandler) {
        if (this.logger) {
            this.logger.log(`Call ${method} ${url}`);
        }

        let req = (request as SuperAgentStatic)(method, url).query(queryParameters);

        Object.keys(headers).forEach(key => {
            req.set(key, headers[key]);
        });

        if (body) {
            req.send(body);
        }

        if (typeof(body) === 'object' && !(body.constructor.name === 'Buffer')) {
            req.set('Content-Type', 'application/json');
        }

        if (Object.keys(form).length > 0) {
            req.type('form');
            req.send(form);
        }

        req.end((error, response) => {
            if (error || !response.ok) {
                reject(error);
                this.errorHandlers.forEach(handler => handler(error));
            } else {
                resolve(response);
            }
        });
    }

    getSquaresURL(parameters: {
        'zoom' ? : number,
        'latitude' ? : number,
        'longitude' ? : number,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/squares';
        if (parameters['zoom'] !== undefined) {
            queryParameters['zoom'] = parameters['zoom'];
        }

        if (parameters['latitude'] !== undefined) {
            queryParameters['latitude'] = parameters['latitude'];
        }

        if (parameters['longitude'] !== undefined) {
            queryParameters['longitude'] = parameters['longitude'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Provide array of squares id
     * @method
     * @name SightService#getSquares
     * @param {number} zoom - The value that determines the scale of approximation.
     * @param {number} latitude - Coordinate determining the position of the point on the surface of the Earth relative to the equator in degrees.
     * @param {number} longitude - Coordinate determining the position of the point on the surface of the Earth relative to the zero meridian in degrees.
     */
    getSquares(parameters: {
        'zoom' ? : number,
        'latitude' ? : number,
        'longitude' ? : number,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/squares';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';
            headers['Content-Type'] = 'application/json';

            if (parameters['zoom'] !== undefined) {
                queryParameters['zoom'] = parameters['zoom'];
            }

            if (parameters['latitude'] !== undefined) {
                queryParameters['latitude'] = parameters['latitude'];
            }

            if (parameters['longitude'] !== undefined) {
                queryParameters['longitude'] = parameters['longitude'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getMapSightsURL(parameters: {
        'squareId': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/squares/{squareId}';

        path = path.replace('{squareId}', `${parameters['squareId']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * array of sights in current square
     * @method
     * @name SightService#getMapSights
     * @param {string} squareId - Unique id of the sight.
     */
    getMapSights(parameters: {
        'squareId': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/squares/{squareId}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';
            headers['Content-Type'] = 'application/json';

            path = path.replace('{squareId}', `${parameters['squareId']}`);

            if (parameters['squareId'] === undefined) {
                reject(new Error('Missing required  parameter: squareId'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getMediaSightsURL(parameters: {
        'sightIds' ? : string,
        'page' ? : string,
        'authToken' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/sights';
        if (parameters['sightIds'] !== undefined) {
            queryParameters['sightIds'] = parameters['sightIds'];
        }

        if (parameters['page'] !== undefined) {
            queryParameters['page'] = parameters['page'];
        }

        if (parameters['authToken'] !== undefined) {
            queryParameters['authToken'] = parameters['authToken'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * array of sorted sights by poopularity
     * @method
     * @name SightService#getMediaSights
     * @param {string} sightIds - string of sightsids
     * @param {string} page - page number
     * @param {string} authToken - auth token
     */
    getMediaSights(parameters: {
        'sightIds' ? : string,
        'page' ? : string,
        'authToken' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/sights';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';
            headers['Content-Type'] = 'application/json';

            if (parameters['sightIds'] !== undefined) {
                queryParameters['sightIds'] = parameters['sightIds'];
            }

            if (parameters['page'] !== undefined) {
                queryParameters['page'] = parameters['page'];
            }

            if (parameters['authToken'] !== undefined) {
                queryParameters['authToken'] = parameters['authToken'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getMediaSightDescriptionURL(parameters: {
        'sightId': string,
        'authToken' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/sights/{sightId}';

        path = path.replace('{sightId}', `${parameters['sightId']}`);
        if (parameters['authToken'] !== undefined) {
            queryParameters['authToken'] = parameters['authToken'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * array of sights in current square
     * @method
     * @name SightService#getMediaSightDescription
     * @param {string} sightId - sightId
     * @param {string} authToken - auth token
     */
    getMediaSightDescription(parameters: {
        'sightId': string,
        'authToken' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/sights/{sightId}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';
            headers['Content-Type'] = 'application/json';

            path = path.replace('{sightId}', `${parameters['sightId']}`);

            if (parameters['sightId'] === undefined) {
                reject(new Error('Missing required  parameter: sightId'));
                return;
            }

            if (parameters['authToken'] !== undefined) {
                queryParameters['authToken'] = parameters['authToken'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

}
