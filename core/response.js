let ServerResponse = require('http').ServerResponse;

function lengthInUTF8(str){
    // @ref https://stackoverflow.com/questions/5515869/string-length-in-bytes-in-javascript#5515960
    // Matches only the 10.. bytes that are non-initial characters in a multi-byte sequence.
    var m = encodeURIComponent(str).match(/%[89ABab]/g);
    return str.length + (m ? m.length : 0);
}

function cleanHeader(header){
    if(header !== null){
        if(typeof header === 'object'){
            if(Array.isArray(header)){
                throw new Error('invalid header format');
            }
            return header;
        }
        else
            throw new Error('invalid header format');
    }
    else
        header = {};
    return header;
}


function addHeaderIfNotExists(header, key, value){
    if(key in header === false){
        header[key] = value;
    }
    return header;
}


function mapBodyAndHeader(body, header){
    header = cleanHeader(header);
    if(typeof body === 'object'){
        if(Array.isArray()){
            body = {data : body};
        }
        body = JSON.stringify(body);
        header = addHeaderIfNotExists(header, 'Content-Type', 'application/json');
    }
    else if(typeof body === 'string'){
        header = addHeaderIfNotExists(header, 'Content-Type', 'text/html');
    }
    else if(typeof body !== 'undefined'){
        body = String(body);
        header = addHeaderIfNotExists(header, 'Content-Type', 'text/html');
    }
    if(!(body === null || typeof body === 'undefined')){
        header['Content-Length'] = lengthInUTF8(body);
    }
    return {
        header : header,
        body : body
    }
}

var response = {
    header : {},
    body : null
};




ServerResponse.prototype.__responseMapper = function (statusCode){
    this.writeHead(statusCode, response.header);
    this.write(response.body);
    return this.end();
}


ServerResponse.prototype.OK = function OK(body, header=null){
    if(typeof body === 'undefined' || body === null){
        throw new Error('OK response required body');
    }
    response = mapBodyAndHeader(body, header);
    return this.__responseMapper(200);
}

ServerResponse.prototype.Created = function Created(body, header=null){
    response = mapBodyAndHeader(body, header);
    return this.__responseMapper(201);
}

ServerResponse.prototype.Accepted = function Accepted(body, header=null){
    response = mapBodyAndHeader(body, header);
    return this.__responseMapper(202);
}


ServerResponse.prototype.BadRequest = function BadRequest(body="Bad Request", header=null){
    response = mapBodyAndHeader(body, header);
    return this.__responseMapper(400);
}

ServerResponse.prototype.Unauthorized = function Unauthorized(body="Unauthorized", header=null){
    response = mapBodyAndHeader(body, header);
    return this.__responseMapper(401);
}

ServerResponse.prototype.Forbidden = function Forbidden(body="Forbidden", header=null){
    response = mapBodyAndHeader(body, header);
    return this.__responseMapper(403);
}

ServerResponse.prototype.NotFound = function(body="Not Found", header=null){
    response = mapBodyAndHeader(body, header);
    return this.__responseMapper(404);
}

ServerResponse.prototype.MethodNotAllowed = function MethodNotAllowed(body="Method Not Allowed", header=null){
    response = mapBodyAndHeader(body, header);
    response.statusCode = 405;
    return this.__responseMapper(405);
}

ServerResponse.prototype.NotAcceptable = function NotAcceptable(body="Not Acceptable", header=null){
    response = mapBodyAndHeader(body, header);
    response.statusCode = 406;
    return this.__responseMapper(406);
}

ServerResponse.prototype.InternalServerError = function InternalServerError(body="Internal Server Error", header=null){
    response = mapBodyAndHeader(body, header);
    response.statusCode = 500;
    return this.__responseMapper(500);
}

ServerResponse.prototype.NotImplemented = function NotImplemented(body="Not Implemented", header=null){
    response = mapBodyAndHeader(body, header);
    return this.__responseMapper(501);
}

ServerResponse.prototype.BadGateway = function BadGateway(body="Bad Gateway", header=null){
    response = mapBodyAndHeader(body, header);
    response.statusCode = 502;
    return this.__responseMapper(502);
}

ServerResponse.prototype.ServiceUnavailable = function ServiceUnavailable(body="Service Unavailable", header=null){
    // default `Retry-After` 600 sec
    response = mapBodyAndHeader(body, header);
    response.header = addHeaderIfNotExists(response.header, 'Retry-After', 600);
    return this.__responseMapper(503);
}

module.exports = ServerResponse;