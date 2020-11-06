
// callback 

var cookieWarnCallback = function (accepted) {

    var message = 'I am a callback, cookies accepted: ' + (accepted ? 'TRUE' : 'FALSE');

    document.getElementById('output').innerHTML = message;
    console.log(message);

};