
const cookieWarnCallback = function (accepted, categories) {

    let message = 'Callback fired &mdash; accepted: <strong>' + (accepted ? 'TRUE' : 'FALSE') + '</strong>';

    if (categories) {
        const cats = Object.entries(categories)
            .map(([k, v]) => k + ': ' + (v ? '✓' : '✗'))
            .join(' &nbsp;|&nbsp; ');
        message += '<br>Categories: ' + cats;
    }

    document.getElementById('output').innerHTML = message;
    console.log('cookieWarnCallback', accepted, categories);

};
