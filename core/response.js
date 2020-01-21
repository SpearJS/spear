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
    if(typeof body !== 'undefined' || body !== null)
        header['Content-Length'] = lengthInUTF8(body);
    
    return {
        header : header,
        body : body
    }
}


httpResponse = {};


httpResponse.OK = function OK(body, header=null){
    if(typeof body === 'undefined' || body === null){
        throw new Error('OK response required body');
    }
    var response = mapBodyAndHeader(body, header);
    response.statusCode = 200;
    return response;
}

httpResponse.Created = function Created(body='', header=null){
    response = mapBodyAndHeader(body, header);
    response.statusCode = 201;
    return response;
}

httpResponse.Accepted = function Accepted(body='', header=null){
    response = mapBodyAndHeader(body, header);
    response.statusCode = 202;
    return response;
}


httpResponse.BadRequest = function BadRequest(body="Bad Request", header=null){
    response = mapBodyAndHeader(body, header);
    response.statusCode = 400;
    return response;
}

httpResponse.Unauthorized = function Unauthorized(body="Unauthorized", header=null){
    response = mapBodyAndHeader(body, header);
    response.statusCode = 401;
    return response;
}

httpResponse.Forbidden = function Forbidden(body="Forbidden", header=null){
    response = mapBodyAndHeader(body, header);
    response.statusCode = 403;
    return response;
}

httpResponse.NotFound = function(body="Not Found", header=null){
    response = mapBodyAndHeader(body, header);
    response.statusCode = 404;
    return response;
}

httpResponse.MethodNotAllowed = function MethodNotAllowed(body="Method Not Allowed", header=null){
    response = mapBodyAndHeader(body, header);
    response.statusCode = 405;
    return response;
}

httpResponse.NotAcceptable = function NotAcceptable(body="Not Acceptable", header=null){
    response = mapBodyAndHeader(body, header);
    response.statusCode = 406;
    return response;
}

httpResponse.InternalServerError = function InternalServerError(body="Internal Server Error", header=null){
    response = mapBodyAndHeader(body, header);
    response.statusCode = 500;
    return response;
}

httpResponse.NotImplemented = function NotImplemented(body="Not Implemented", header=null){
    response = mapBodyAndHeader(body, header);
    response.statusCode = 501;
    return response;
}

httpResponse.BadGateway = function BadGateway(body="Bad Gateway", header=null){
    response = mapBodyAndHeader(body, header);
    response.statusCode = 502;
    return response;
}

httpResponse.ServiceUnavailable = function ServiceUnavailable(body="Service Unavailable", header=null){
    // default `Retry-After` 600 sec
    response = mapBodyAndHeader(body, header);
    response.header = addHeaderIfNotExists(response.header, 'Retry-After', 600);
    response.statusCode = 503;
    return response;
}

module.exports = httpResponse;