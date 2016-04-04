/**
 * @preserve cookie-warn.js
 *
 * Copyright 2016, Tamás Schalk (github.com/schalkt)
 * Licensed under the MIT
 *
 * @version 1.0.0
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

"use strict";

(function (fn) {

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

            days = days ? days : 14;
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
            var obj = document.getElementById('cookieWarnBox');

            if (obj) {
                obj.parentNode.removeChild(obj);
            }

        }

    };

    document.addEventListener('DOMContentLoaded', function () {

        var tag, text, button, link, info, expire, css, style, style1, style2, style3, body, wbox, more;

        // get parameters
        tag = document.getElementById('cookieWarn');
        text = tag.getAttribute('data-text');
        button = tag.getAttribute('data-button');
        link = tag.getAttribute('data-link');
        info = tag.getAttribute('data-info');
        expire = parseInt(tag.getAttribute('data-expire'));
        style = tag.getAttribute('data-style');

        style1 = '#cookieWarnBox {position:fixed;line-height:32px; bottom:0;left:0;right:0;background-color:#212121;color:#f1f1f1;opacity:0.9;text-align:center;padding:15px;font-size:18px;}';
        style2 = '#cookieWarnBox span {text-transform:uppercase;cursor:pointer;background-color:#f1f1f1;color:#1188ff;padding:7px 14px;margin-left:10px;}';
        style3 = '#cookieWarnBox span:hover {background-color:#fefefe;} #cookieWarnBox a {text-decoration:none;color:#1188ff;}';
        css = {

            type: 'text/css', style: document.createElement('style'),
            content: style1 + style2 + style3 + style,
            append: function () {

                this.style.type = this.type;
                this.style.appendChild(document.createTextNode(this.content));
                document.head.appendChild(this.style);

            }
        };

        css.append();

        // create warning box
        wbox = document.createElement('div');
        wbox.setAttribute("id", "cookieWarnBox");
        wbox.setAttribute("style", style.box);
        more = (link && info) ? ' <a target="_blank" href="' + link + '">' + info + '</a> ' : '';
        button = '<span id="cookieWarnClose" onclick="' + fn + '.close(' + expire + ');">' + button + '</span>';
        wbox.innerHTML = '<div class="text">' + text + more + button + '</div>';

        // append to body
        body = document.getElementsByTagName("body")[0];
        body.appendChild(wbox);

    }, false);


})('cookieWarn');

