
// callback 

const cookieWarnCallback = function (accepted) {

    let message = 'I am a callback, cookies accepted: ' + (accepted ? 'TRUE' : 'FALSE');

    document.getElementById('output').innerHTML = message;
    console.log(message);

};