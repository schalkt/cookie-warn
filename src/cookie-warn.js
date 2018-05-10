
/**
 * EXAMPLE 1:
 * 
 *    <html lang="en" ... >
 *    ...
 *    <script
 *        id="cookieWarn"
 *        data-lang-en="{
 *              'text': 'Our website uses cookies.',
 *              'more_text': 'Click here for more information',
 *              'more_link': 'http://ec.europa.eu/ipg/basics/legal/cookies/index_en.htm',
 *              'accept_text': 'I accept',
 *              'reject_text': 'I reject',
 *              'reject_info': 'You can disable unwanted cookies by using this program',
 *              'reject_link': 'https://www.ghostery.com/'
 *           },
 *        }"
 *        data-expire="365" (optional, default 365 day)
 *        data-domain="*.domain.tld" (cookie domain, optional)
 *        data-path="/" (cookie path, optional)
 *        data-secure="true" (cookie secure, true / false, optional)
 *        data-delay="750" (optional, default 500)
 *        data-class="customCookieWarning" (optional)
 *        data-style="#cookieWarnBox a { color: #ff0000; }" (optional)
 *        type="text/javascript"
 *        src="../cookie-warn.min.js">
 *    </script>
 *
 * EXAMPLE 2:
 *    
 *    <html lang="en" ... >
 *    ...
 *    <script type="text/javascript" src="../cookie-warn.min.js"></script>
 * 
 *    <div
 *        id="cookieWarn"
 *        data-lang-en="{
 *              'text':'Our website uses cookies.',
 *              'accept_text':'I accept',
 *              'more_text':'Click here for more information',
 *              'more_link':'http://ec.europa.eu/ipg/basics/legal/cookies/index_en.htm'
 *        }"
 *        data-lang-hu="{
 *              'text':'Weboldalunk sütiket használ.',
 *              'accept_text':'Elfogadom',
 *              'more_text':'Kattints ide a bővebb információért',
 *              'more_link':'http://ec.europa.eu/ipg/basics/legal/cookies/index_en.htm'
 *        }">
 *    </div>
 *
 */

(function (fn) {

    "use strict";

    // set or get cookie
    var cookie = function (name, value, days, path, domain, secure) {

        if (value === undefined) {

            var i, x, y, cookies = document.cookie.split(";");

            for (i = 0; i < cookies.length; i++) {

                x = cookies[i].substr(0, cookies[i].indexOf("="));
                y = cookies[i].substr(cookies[i].indexOf("=") + 1);
                x = x.replace(/^\s+|\s+$/g, "");

                if (x == name) {
                    return y;
                }

            }

        } else {

            days = days ? days : 365;
            var expire = new Date();
            expire.setDate(expire.getDate() + days);
            var values = [];

            if (days !== undefined && days !== null) {
                values.push("expires=" + expire.toGMTString());
            }

            if (path !== undefined && path !== null) {
                values.push("path=" + path);
            }

            if (domain !== undefined && domain !== null) {
                values.push("domain=" + domain);
            }

            if (secure !== undefined && secure !== null && secure) {
                values.push("secure");
            }

            if (values.length > 0) {
                value = value + "; " + values.join("; ");
            }

            document.cookie = escape(name) + "=" + value;

        }

    };

    // if cookie available then return
    if (cookie(fn)) {
        return;
    }

    // warning box close function
    window[fn] = {

        close: function (expire, path, domain, secure) {

            // set the cookie
            cookie(fn, true, expire, path, domain, secure);

            // remove warning box
            var wbox = document.getElementById(fn + 'Box');
            wbox.className = wbox.className + ' closed';

        },

        reject: function () {
           
            // show reject information
            var wbox = document.getElementById(fn + 'Box');
            wbox.className = wbox.className + ' reject';

        }

    };

    document.addEventListener('DOMContentLoaded', function () {

        // get parameters
        var tag = document.getElementById('cookieWarn');

        if (!tag) {
            console.error('cookieWarn element not found by id');
            return;
        }

        var lang = document.documentElement.lang;
        var data = JSON.parse(tag.getAttribute('data-lang-' + lang).replace(/'/g, '"'));

        if (!data) {
            return;
        }

        var delay = parseInt(tag.getAttribute('data-delay'));
        var domain = tag.getAttribute('data-domain');
        var path = tag.getAttribute('data-path');
        var secure = tag.getAttribute('data-secure');
        var expire = parseInt(tag.getAttribute('data-expire'));
        var style = tag.getAttribute('data-style');
        var classes = tag.getAttribute('data-class');

        var bootstrap = (window.jQuery && typeof $().modal == 'function');

        var css = {

            style: [
                '#' + fn + 'Box {transition:all 0.4s ease-in-out;position:fixed;z-index:999999;bottom:-20px;left:0;right:0;opacity:0;text-align:center;padding:10px;background-color:#212121}',
                '#' + fn + 'Box .btn {white-space:nowrap}',
                '#' + fn + 'Box .reject_more {padding:0px 10px;display:none;}',
                '#' + fn + 'Box.reject .reject_more {display:block;}',
                '#' + fn + 'Box.loaded {opacity:0.9;bottom:0px}',
                '#' + fn + 'Box.closed {opacity:0;bottom:-20px}'
            ],
            style2: [
                '#' + fn + 'Box {font-family: Verdana;line-height:24px;color:#f1f1f1;font-size:14px;}',
                '#' + fn + 'Box .btn {text-transform:uppercase;cursor:pointer;background-color:#f1f1f1;color:#659fda;padding:3px 14px;margin-left:10px;}',
                '#' + fn + 'Box .btn:hover {background-color:#ffffff;color:#4d78a5;}',
                '#' + fn + 'Box a {text-decoration:none;color:#659fda}',
            ],
            type: 'text/css',
            element: document.createElement('style'),
            append: function () {

                if (!bootstrap) {
                    this.style = this.style.concat(this.style2);
                }

                this.element.type = this.type;
                this.element.appendChild(document.createTextNode(this.style.join(' ')));
                document.head.insertBefore(this.element, document.head.childNodes[0]);

            }
        };

        css.append();

        // create warning box
        var wbox = document.createElement('div');
        wbox.setAttribute("id", fn + "Box");

        if (classes) {
            wbox.setAttribute("class", classes);
        }

        var args = [
            expire ? expire : 'null',
            path ? "'" + path + "'" : 'null',
            domain ? "'" + domain + "'" : 'null',
            secure == "true" ? 1 : 0,
        ].join(',');

        var info = (data.more_link && data.more_text) ? ' <a target="_blank" href="' + data.more_link + '">' + data.more_text + '</a> ' : '';
        var accept_button = '<span class="btn btn-default" id="' + fn + 'Close" onclick="' + fn + '.close(' + args + ');">' + data.accept_text + '</span>';

        if (data.reject_text) {
            var reject_button = '<span class="btn btn-warning" onclick="' + fn + '.reject();">' + data.reject_text + '</span>';
            var reject_content = '<span class="reject_more">' + data.reject_info + ' <a target="_blank" href="' + data.reject_link + '">' + data.reject_link + '</a></span>';
        } else {
            var reject_button = '';
            var reject_content = '';
        }

        wbox.innerHTML = '<div class="text">' + data.text + info + accept_button + reject_button + reject_content + '</div>';

        // append to body
        var body = document.getElementsByTagName("body")[0];
        body.appendChild(wbox);

        setTimeout(function () {
            wbox.className = wbox.className + ' loaded';
        }, delay ? parseInt(delay) : 500);


    }, false);

})('cookieWarn');