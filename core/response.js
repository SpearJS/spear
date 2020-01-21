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
        throw new Error('invalid header format');
    }
    else{
        header = {}
    }
    return header;
}


function addHeaderIfNotExists(header, key, value){
    if(key in header === false){
        header[key] = value;
    }
    return header;
}


function mapBodyAndHeader(body, header){
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
    header['Content-Length'] = lengthInUTF8(body);
    return {
        header : header,
        body : body
    }
}


httpResponse = {};


httpResponse.OK = function OK(body, header=null){
    header = cleanHeader(header);
    var response = mapBodyAndHeader(header, body);
    response.statusCode = 200;
    return response;
}

httpResponse.NotFound = function(body=null, header=null){
    header = cleanHeader(header);
    if(body === null){
        body = '404 Not Found';
    }
    response = mapBodyAndHeader(body, header);
    response.statusCode = 404;
    return response;
}

module.exports = httpResponse;