/**
 * @preserve cookie-warn - EU cookie warn
 *
 * @version v3.2.18
 * @link https://projects.schalk.hu/cookie-warn/demo/index.html
 * @author Tamas Schalk (https://github.com/schalkt)
 * @license MIT
 */

(function (fn) {
    "use strict";

    // element id for styles
    var elementId = fn + "Box";
    var cookieName = "cookieWarn.accepted";

    // get cookieWarn element
    var el = document.getElementById(fn);

    if (!el) {
        console.warn(fn + " element not found by id");
        return;
    }

    // get cookie warn attributes
    var getAttributes = function () {
        var lang = document.documentElement.lang ? document.documentElement.lang : "en";
        var langData = el.getAttribute("data-lang-" + lang);
        var data, parameters;

        if (!langData) {
            data = {
                text: "Our website uses cookies.",
                accept_text: "I accept",
                more_text: "Click here for more information",
                more_link: "https://ec.europa.eu/info/law/law-topic/data-protection_en",
                reject_text: "I reject",
                reject_info: null,
                reject_link: null,
                close_text: "Close",
            };
        } else {
            data = JSON.parse(langData.replace(/'/g, '"'));
        }

        parameters = {
            delay: parseInt(el.getAttribute("data-delay")),
            expire: parseInt(el.getAttribute("data-expire")),
            domain: el.getAttribute("data-domain"),
            path: el.getAttribute("data-path"),
            secure: el.getAttribute("data-secure"),
            debug: el.getAttribute("data-debug"),
            style: el.getAttribute("data-style"),
            class: el.getAttribute("data-class"),
            callback: el.getAttribute("data-callback"),
            data: data,
        };

        if (parameters.secure) {
            parameters.secure = parameters.secure == "true" ? true : false;
        } else {
            parameters.secure =  location.protocol !== 'https:' ? false : true;
        }

        parameters.path = parameters.path ? parameters.path : "/";
        parameters.delay = parameters.delay ? parameters.delay : 500;
        parameters.expire = parameters.expire ? parameters.expire : 365;
        parameters.debug = parameters.debug == "true" ? true : false;

        if (parameters.debug) {
            console.log(parameters);
        }

        return parameters;
    };

    // get cookieWarn html attributes
    var attributes = getAttributes();

    // set or get cookie
    var cookie = function (name, value, days, path, domain, secure) {

        if (value === undefined) {
            var i,
                ckey,
                cval,
                cidx,
                cookies = document.cookie.split(";");

            for (i = 0; i < cookies.length; i++) {

                cidx = cookies[i].indexOf("=");
                ckey = cookies[i].substring(0, cidx).trim();
                cval = cookies[i].substring(cidx + 1).trim();

                if (ckey == name) {
                    return cval;
                }
            }
        } else {
            var values = [];
            var expire = new Date();

            days = days ? days : 365;
            expire.setDate(expire.getDate() + days);

            if (days != undefined && days != null) {
                values.push("expires=" + expire.toGMTString());
            }

            if (path != undefined && path != null) {
                values.push("path=" + path);
            }

            if (domain != undefined && domain != null) {
                values.push("domain=" + domain);
            }

            if (secure != undefined && secure != null && secure) {
                values.push("secure");
            }

            if (values.length > 0) {
                value = value + "; " + values.join("; ");
            }

            if (attributes.debug) {
                console.log(name, value);
            }

            document.cookie = name + "=" + value;
        }
    };

    // warning box close function
    window[fn] = {
        accept: function () {
            // set the cookie
            cookie(cookieName, true, attributes.expire, attributes.path, attributes.domain, attributes.secure);

            // remove warning box
            var wbox = document.getElementById(elementId);
            wbox.className = wbox.className + " closed";

            cookieWarnValue = true;
            check(cookieWarnValue);
        },

        reject: function () {
            // set the cookie
            cookie(cookieName, false, attributes.expire, attributes.path, attributes.domain, attributes.secure);

            var wbox = document.getElementById(elementId);

            // show reject information
            if (attributes.data.reject_info) {
                wbox.className = wbox.className + " reject";
            } else {
                wbox.className = wbox.className + " closed";
            }

            cookieWarnValue = false;
            check(cookieWarnValue);
        },

        close: function () {
            var wbox = document.getElementById(elementId);
            wbox.className = wbox.className + " closed";
        },
    };

    var cookieWarnValue = cookie(cookieName);

    // check
    var check = function (warnValue) {

        var accepted = warnValue == "true" || warnValue === true ? true : false;

        if (attributes.debug) {
            console.log("status: " + (accepted ? "accepted" : "rejected"));
        }

        if (!attributes.callback) {
            attributes.callback = "cookieWarnCallback";
        }

        if (attributes.callback && window[attributes.callback]) {
            if (attributes.debug) {
                console.log("call: " + attributes.callback);
            }
            window[attributes.callback](accepted);
        }
    };

    var warn = function () {
        if (!attributes.data) {
            console.error("Empty or invalid data-lang parameters");
            return;
        }

        var bootstrap = window.jQuery && typeof $ == "function" && typeof $().modal == "function";

        var css = {
            style: [
                "#" + elementId + " {transition:all 0.4s ease-in-out;position:fixed;z-index:999999;bottom:-20px;left:0;right:0;opacity:0;text-align:center;padding:10px;background-color:#212121}",
                "#" + elementId + " .btn {white-space:nowrap}",
                "#" + elementId + " .reject_more {padding:0px 10px;display:none;}",
                "#" + elementId + ".reject .reject_more {display:block;}",
                "#" + elementId + ".loaded {opacity:0.9;bottom:0px}",
                "#" + elementId + ".closed {display:none;}",
            ],
            style2: [
                "#" + elementId + " {font-family: Verdana;line-height:24px;color:#f1f1f1;font-size:14px;}",
                "#" + elementId + " .btn {text-transform:uppercase;cursor:pointer;background-color:#f1f1f1;color:#659fda;padding:3px 14px;margin-left:10px;}",
                "#" + elementId + " .btn:hover {background-color:#ffffff;color:#4d78a5;}",
                "#" + elementId + " a {text-decoration:none;color:#659fda}",
            ],
            type: "text/css",
            element: document.createElement("style"),
            append: function () {
                if (!bootstrap) {
                    this.style = this.style.concat(this.style2);
                }

                if (attributes.style) {
                    this.style = this.style.concat(attributes.style);
                }

                this.element.type = this.type;
                this.element.appendChild(document.createTextNode(this.style.join(" ")));
                document.head.insertBefore(this.element, document.head.childNodes[0]);
            },
        };

        css.append();

        // create warning box
        var wbox = document.createElement("div");
        wbox.setAttribute("id", elementId);

        if (attributes.class) {
            wbox.setAttribute("class", attributes.class);
        }

        var info = attributes.data.more_link && attributes.data.more_text ? ' <a target="_blank" href="' + attributes.data.more_link + '">' + attributes.data.more_text + "</a> " : "";
        var accept_button = '<span class="btn btn-success" id="' + fn + 'Accept" onclick="' + fn + '.accept();">' + attributes.data.accept_text + "</span> ";
        var reject_button = "";
        var reject_content = "";

        if (attributes.data.reject_text) {
            reject_button = '<span class="btn btn-warning" onclick="' + fn + '.reject();">' + attributes.data.reject_text + "</span> ";

            if (attributes.data.reject_info || attributes.data.reject_link) {
                reject_content = ' <span class="reject_more">';
                reject_content += attributes.data.reject_info + ' <a target="_blank" href="' + attributes.data.reject_link + '">' + attributes.data.reject_link + "</a> ";
                reject_content += ' <span class="btn btn-secondary" id="' + fn + 'Close" onclick="' + fn + '.close();">' + attributes.data.close_text + "</span> ";
                reject_content += " </span> ";
            }
        }

        wbox.innerHTML = '<div class="text">' + attributes.data.text + info + accept_button + reject_button + reject_content + "</div>";

        if (attributes.debug) {
            console.log("innerHTML: " + wbox.innerHTML);
        }

        // append to body
        document.body.appendChild(wbox);

        setTimeout(function () {
            wbox.className = wbox.className + " loaded";
        }, attributes.delay);

    };

    var isDOMready = function () {
        var readyState = document.readyState;

        if (attributes.debug) {
            console.log("readyState: " + readyState);
            console.log("cookieWarnValue: " + cookieWarnValue);
        }

        if (readyState == "complete") {
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
})("cookieScript");
