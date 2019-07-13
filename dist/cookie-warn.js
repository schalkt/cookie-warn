/**
 * @preserve cookie-warn - EU cookie warn
 * 
 * @version v3.1.5
 * @link http://schalk.hu/projects/cookie-warn/demo/index.html
 * @author Tamas Schalk (https://github.com/schalkt)
 * @license MIT
 */
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
 *        data-callback="cookieWarnCallback"
 *        data-debug="true" (optional, show debug info in console)
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

    // element id for styles
    var elementId = fn + 'Box';
    var cookieName = 'cookieWarn.accepted';

    // get cookieWarn element
    var el = document.getElementById(fn);

    if (!el) {
        console.warn(fn + ' element not found by id');
        return;
    }

    // get cookie warn attributes
    var getAttributes = function () {

        var lang = document.documentElement.lang ? document.documentElement.lang : 'en';
        var langData = el.getAttribute('data-lang-' + lang);
        var data;

        if (!langData) {
            data = {
                'text': 'Our website uses cookies.',
                'accept_text': 'I accept',
                'more_text': 'Click here for more information',
                'more_link': 'http://ec.europa.eu/ipg/basics/legal/cookies/index_en.htm',
                'reject_text': 'I reject',
                'reject_info': 'You can disable unwanted cookies by using this program',
                'reject_link': 'https://www.ghostery.com/'
            };
        } else {
            data = JSON.parse(langData.replace(/'/g, '"'));
        }

        var attributes = {
            delay: parseInt(el.getAttribute('data-delay')),
            expire: parseInt(el.getAttribute('data-expire')),
            domain: el.getAttribute('data-domain'),
            path: el.getAttribute('data-path'),
            secure: el.getAttribute('data-secure'),
            debug: el.getAttribute('data-debug'),
            style: el.getAttribute('data-style'),
            class: el.getAttribute('data-class'),
            callback: el.getAttribute('data-callback'),
            data: data
        };

        attributes.path = attributes.path ? attributes.path : '/';
        attributes.delay = attributes.delay ? attributes.delay : 500;
        attributes.expire = attributes.expire ? attributes.expire : 365;
        attributes.secure = attributes.secure == "true" ? true : false;
        attributes.debug = attributes.debug == "true" ? true : false;

        if (attributes.debug) {
            console.log(attributes);
        }

        return attributes;

    };


    // get cookieWarn html attributes
    var attributes = getAttributes();


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

            var values = [];
            var expire = new Date();

            days = days ? days : 365;
            expire.setDate(expire.getDate() + days);

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

            if (attributes.debug) {
                console.log(name, value);
            }

            document.cookie = escape(name) + "=" + value;

        }

    };

    // warning box close function
    window[fn] = {

        accept: function () {

            // set the cookie
            cookie(cookieName, true, attributes.expire, attributes.path, attributes.domain, attributes.secure);

            // remove warning box
            var wbox = document.getElementById(elementId);
            wbox.className = wbox.className + ' closed';

            cookieWarnValue = true;
            check(cookieWarnValue);

        },

        reject: function () {

            // set the cookie
            cookie(cookieName, false, attributes.expire, attributes.path, attributes.domain, attributes.secure);

            // show reject information
            var wbox = document.getElementById(elementId);
            wbox.className = wbox.className + ' reject';

            cookieWarnValue = false;
            check(cookieWarnValue);

        },

    };

    var cookieWarnValue = cookie(cookieName);

    // check
    var check = function (cookieWarnValue) {

        var accepted = cookieWarnValue == 'true' || cookieWarnValue === true ? true : false;

        if (attributes.debug) {
            console.log('status: ' + (accepted ? 'accepted' : 'rejected'));
        }

        if (attributes.callback && window[attributes.callback]) {
            if (attributes.debug) {
                console.log('call: ' + attributes.callback);
            }
            window[attributes.callback](accepted);
        }

    };

    var warn = function () {

        if (!attributes.data) {
            console.error('Empty or invalid data-lang parameters');
            return;
        }

        var bootstrap = (window.jQuery && typeof $().modal == 'function');

        var css = {

            style: [
                '#' + elementId + ' {transition:all 0.4s ease-in-out;position:fixed;z-index:999999;bottom:-20px;left:0;right:0;opacity:0;text-align:center;padding:10px;background-color:#212121}',
                '#' + elementId + ' .btn {white-space:nowrap}',
                '#' + elementId + ' .reject_more {padding:0px 10px;display:none;}',
                '#' + elementId + '.reject .reject_more {display:block;}',
                '#' + elementId + '.loaded {opacity:0.9;bottom:0px}',
                '#' + elementId + '.closed {display:none;}'
            ],
            style2: [
                '#' + elementId + ' {font-family: Verdana;line-height:24px;color:#f1f1f1;font-size:14px;}',
                '#' + elementId + ' .btn {text-transform:uppercase;cursor:pointer;background-color:#f1f1f1;color:#659fda;padding:3px 14px;margin-left:10px;}',
                '#' + elementId + ' .btn:hover {background-color:#ffffff;color:#4d78a5;}',
                '#' + elementId + ' a {text-decoration:none;color:#659fda}',
            ],
            type: 'text/css',
            element: document.createElement('style'),
            append: function () {

                if (!bootstrap) {
                    this.style = this.style.concat(this.style2);
                }

                if (attributes.style) {
                    this.style = this.style.concat(attributes.style);
                }

                this.element.type = this.type;
                this.element.appendChild(document.createTextNode(this.style.join(' ')));
                document.head.insertBefore(this.element, document.head.childNodes[0]);

            }
        };

        css.append();

        // create warning box
        var wbox = document.createElement('div');
        wbox.setAttribute("id", elementId);

        if (attributes.class) {
            wbox.setAttribute("class", attributes.class);
        }

        var info = (attributes.data.more_link && attributes.data.more_text) ? ' <a target="_blank" href="' + attributes.data.more_link + '">' + attributes.data.more_text + '</a> ' : '';
        var accept_button = '<span class="btn btn-success" id="' + fn + 'Accept" onclick="' + fn + '.accept();">' + attributes.data.accept_text + '</span>';
        var reject_button, reject_content;

        if (attributes.data.reject_text) {
            reject_button = '<span class="btn btn-warning" onclick="' + fn + '.reject();">' + attributes.data.reject_text + '</span>';
            reject_content = '<span class="reject_more">' + attributes.data.reject_info + ' <a target="_blank" href="' + attributes.data.reject_link + '">' + attributes.data.reject_link + '</a></span>';
        } else {
            reject_button = '';
            reject_content = '';
        }

        wbox.innerHTML = '<div class="text">' + attributes.data.text + info + accept_button + reject_button + reject_content + '</div>';

        // append to body
        var body = document.getElementsByTagName("body")[0];
        body.appendChild(wbox);

        setTimeout(function () {
            wbox.className = wbox.className + ' loaded';
        }, attributes.delay);

    };


    var isDOMready = function () {

        var readyState = document.readyState;

        if (attributes.debug) {
            console.log('readyState: ' + readyState);
        }

        if (readyState == 'complete') {

            if (!cookieWarnValue) {
                warn();
            } else {
                check(cookieWarnValue);
            }

        } else {
            setTimeout(function () {
                isDOMready();
            }, 200);
        }

    };

    isDOMready();

})('cookieWarn');