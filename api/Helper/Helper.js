module.exports = {
    getResponseMessage:  function (responseCode, responseMessage)
    {
        return '{"code": "' + responseCode + '", "message": "' + responseMessage + '" }';
    }
}