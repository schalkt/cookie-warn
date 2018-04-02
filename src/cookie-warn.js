/**
 * @preserve cookie-warn.js
 *
 * Copyright 2016, Tamas Schalk (github.com/schalkt)
 * Licensed under the MIT
 *
 * @version 1.1.0
 *
 */

/**
 * USAGE:
 *
 *    <script
 *      id="cookieWarn"
 *        data-text="Our website uses cookies."
 *        data-button="Ok"
 *        data-info="More info"
 *        data-link="http://ec.europa.eu/ipg/basics/legal/cookies/index_en.htm"
 *        data-expire="1"
 *        data-style="#cookieWarnBox a { color: #ff0000; }"
 *        type="text/javascript"
 *        src="../cookie-warn.min.js">
 *    </script>
 *
 * OR
 *
 *    <div
 *        id="cookieWarn"
 *        data-text="Our website uses cookies."
 *        data-button="Ok"
 *        data-info="More info"
 *        data-link="http://ec.europa.eu/ipg/basics/legal/cookies/index_en.htm"
 *        data-expire="1"
 *        data-style="#cookieWarnBox a { color: #ff0000; }">
 *    </div>
 *
 */

(function (fn) {

    "use strict";

    // set or get cookie
    var cookie = function (name, value, days) {

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
            value = value + ((days == null) ? "" : "; expires=" + expire.toGMTString());
            document.cookie = name + "=" + value;

        }

    };


    // if cookie true return
    if (cookie(fn)) {
        return;
    }

    // warning box close function
    window[fn] = {

        close: function (expire) {

            // set the cookie
            cookie(fn, true, expire);

            // remove warning box
            var wbox = document.getElementById('cookieWarnBox');

            wbox.className = wbox.className + ' closed';

            // if (obj) {
            //     obj.parentNode.removeChild(obj);
            // }

        }

    };

    document.addEventListener('DOMContentLoaded', function () {

        var data, lang, tag, text, button, link, expire, css, style, body, wbox, info, more, classes, bootstrap, delay, jquery;

        // get parameters
        tag = document.getElementById('cookieWarn');
        
        if (!tag) {
            console.error('cookieWarn element not found by id');
            return;
        }

        lang = document.documentElement.lang;
        data = JSON.parse(tag.getAttribute('data-lang-' + lang).replace(/'/g, '"'));

        if (!data) {
            return;
        }

        text = data.text;
        button = data.button;
        link = data.link;
        more = data.more;
       // bootstrap = tag.getAttribute('data-bootstrap');
        delay = tag.getAttribute('data-delay');
        expire = parseInt(tag.getAttribute('data-expire'));
        style = tag.getAttribute('data-style');
        classes = tag.getAttribute('data-class');
        
        bootstrap = (window.jQuery && typeof $().modal == 'function');       
        
        css = {
        
            style: [
                '#cookieWarnBox {transition: all 0.5s ease; position:fixed;z-index:999999;line-height:24px;bottom:-20px;left:0;right:0;opacity:0;text-align:center;padding:10px;background-color:#212121}',
                '#cookieWarnBox.loaded { opacity: 0.9; bottom: 0px; } #cookieWarnBox.closed { opacity: 0; bottom: -20px;  }'
            ],
            style2: [
                '#cookieWarnBox {font-family: Verdana;line-height:24px;color:#f1f1f1;font-size:14px;}',
                '#cookieWarnBox .btn {text-transform:uppercase;cursor:pointer;background-color:#f1f1f1;color:#659fda;padding:3px 14px;margin-left:10px;}',
                '#cookieWarnBox .btn:hover {background-color:#ffffff;color:#4d78a5;} #cookieWarnBox a {text-decoration:none;color:#659fda}',
            ],            
            type: 'text/css',
            element: document.createElement('style'),
            append: function () {

                if (bootstrap === undefined || bootstrap === 'false' || bootstrap === false) {
                    this.style = this.style.concat(this.style2);
                } 

                this.element.type = this.type;
                this.element.appendChild(document.createTextNode(this.style.join(' ')));
                document.head.appendChild(this.element);

            }
        };

        css.append();

        // create warning box
        wbox = document.createElement('div');
        wbox.setAttribute("id", "cookieWarnBox");       

        if (classes) {
            wbox.setAttribute("class", classes);
        }

        info = (link && more) ? ' <a target="_blank" href="' + link + '">' + more + '</a> ' : '';
        button = '<span class="btn btn-default" id="cookieWarnClose" onclick="' + fn + '.close(' + expire + ');">' + button + '</span>';
        wbox.innerHTML = '<div class="text">' + text + info + button + '</div>';

        // append to body
        body = document.getElementsByTagName("body")[0];
        body.appendChild(wbox);

        setTimeout(function(){
            wbox.className = wbox.className + ' loaded';
        }, delay ? parseInt(delay) : 500);


    }, false);

})('cookieWarn');