
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

function copyCode(btn) {
    const code = btn.closest('.code-block').querySelector('code');
    navigator.clipboard.writeText(code.textContent).then(function () {
        btn.textContent = 'Copied ✓';
        btn.classList.add('copied');
        setTimeout(function () {
            btn.textContent = 'Copy';
            btn.classList.remove('copied');
        }, 2000);
    }).catch(function () {
        // fallback for older browsers
        const ta = document.createElement('textarea');
        ta.value = code.textContent;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        btn.textContent = 'Copied ✓';
        btn.classList.add('copied');
        setTimeout(function () {
            btn.textContent = 'Copy';
            btn.classList.remove('copied');
        }, 2000);
    });
}
