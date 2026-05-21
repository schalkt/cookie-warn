/**
 * @preserve cookie-warn - EU cookie warn
 *
 * @version v4.0.3
 * @link https://projects.schalk.hu/cookie-warn/demo/index.html
 * @author Tamas Schalk (https://github.com/schalkt)
 * @license MIT
 */

(function (fn) {
    "use strict";

    var cwVersion = 'v4.0.3';
    var elementId = fn + "Box";
    var cookieName = "cookieWarn.accepted";
    var categoriesCookieName = "cookieWarn.categories";
    var versionCookieName = "cookieWarn.version";
    var timestampCookieName = "cookieWarn.timestamp";

    var el = document.getElementById(fn);

    if (!el) {
        console.warn(fn + " element not found by id");
        return;
    }

    var getAttributes = function () {
        var lang = document.documentElement.lang ? document.documentElement.lang : "en";
        var langData = el.getAttribute("data-lang-" + lang);
        var data, parameters;

        var defaultData = {
            text: "Our website uses cookies.",
            accept_text: "I accept",
            more_text: "Click here for more information",
            more_link: "https://ec.europa.eu/info/law/law-topic/data-protection_en",
            reject_text: "I reject",
            reject_info: null,
            reject_link: null,
            close_text: "Close",
        };

        if (!langData) {
            data = defaultData;
        } else {
            try {
                data = JSON.parse(langData.replace(/'/g, '"'));
            } catch (e) {
                console.warn(fn + ": failed to parse data-lang-" + lang + ", using defaults. " + e.message);
                data = defaultData;
            }
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
            theme: el.getAttribute("data-theme") || "dark",
            version: el.getAttribute("data-version") || null,
            position: el.getAttribute("data-position") || "bottom",
            once: el.getAttribute("data-once") === "true",
            data: data,
        };

        if (parameters.secure) {
            parameters.secure = parameters.secure == "true" ? true : false;
        } else {
            parameters.secure = location.protocol !== 'https:' ? false : true;
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

    var attributes = getAttributes();

    var cookie = function (name, value, days, path, domain, secure) {
        if (value === undefined) {
            var i, ckey, cval, cidx, cookies = document.cookie.split(";");
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
                values.push("expires=" + expire.toUTCString());
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
            values.push("SameSite=Lax");

            if (values.length > 0) {
                value = value + "; " + values.join("; ");
            }

            if (attributes.debug) {
                console.log(name, value);
            }

            document.cookie = name + "=" + value;
        }
    };

    var escapeHtml = function (str) {
        if (!str) { return ''; }
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    };

    var safeUrl = function (url) {
        if (!url) { return ''; }
        return /^https?:\/\//i.test(url) ? url : '';
    };

    // --- category helpers ---

    var serializeCategories = function (categoriesObj) {
        return Object.keys(categoriesObj).filter(function (k) { return categoriesObj[k]; }).join(',');
    };

    var deserializeCategories = function (val, categoriesDef) {
        var accepted = {};
        var keys = val ? val.split(',') : [];
        keys.forEach(function (k) { k = k.trim(); if (k) { accepted[k] = true; } });
        Object.keys(categoriesDef).forEach(function (k) {
            if (categoriesDef[k].required) { accepted[k] = true; }
        });
        return accepted;
    };

    var buildRequiredCategories = function (categoriesDef) {
        var result = {};
        Object.keys(categoriesDef).forEach(function (k) {
            result[k] = !!categoriesDef[k].required;
        });
        return result;
    };

    var buildAllCategories = function (categoriesDef) {
        var result = {};
        Object.keys(categoriesDef).forEach(function (k) { result[k] = true; });
        return result;
    };

    var getSelectedFromCheckboxes = function (categoriesDef) {
        var result = {};
        Object.keys(categoriesDef).forEach(function (k) {
            if (categoriesDef[k].required) {
                result[k] = true;
            } else {
                var cb = document.querySelector('[data-cw-cat="' + k + '"]');
                result[k] = cb ? cb.checked : false;
            }
        });
        return result;
    };

    // --- internal helpers ---

    var saveVersion = function () {
        if (attributes.version) {
            cookie(versionCookieName, attributes.version, attributes.expire, attributes.path, attributes.domain, attributes.secure);
        }
    };

    var saveTimestamp = function () {
        cookie(timestampCookieName, new Date().toISOString(), attributes.expire, attributes.path, attributes.domain, attributes.secure);
    };

    var deleteCookies = function () {
        cookie(cookieName, '', -1, attributes.path, attributes.domain, attributes.secure);
        cookie(categoriesCookieName, '', -1, attributes.path, attributes.domain, attributes.secure);
        cookie(versionCookieName, '', -1, attributes.path, attributes.domain, attributes.secure);
        cookie(timestampCookieName, '', -1, attributes.path, attributes.domain, attributes.secure);
    };

    var closeBox = function () {
        var wbox = document.getElementById(elementId);
        if (wbox) { wbox.className = wbox.className + " closed"; }
    };

    var check = function (warnValue) {
        var accepted, categoriesResult;
        var categoriesDef = attributes.data.categories;

        if (categoriesDef) {
            var categoriesVal = cookie(categoriesCookieName);
            if (categoriesVal) {
                categoriesResult = deserializeCategories(categoriesVal, categoriesDef);
                accepted = Object.keys(categoriesDef).some(function (k) {
                    return !categoriesDef[k].required && categoriesResult[k];
                });
            } else {
                accepted = false;
                categoriesResult = buildRequiredCategories(categoriesDef);
            }
        } else {
            accepted = warnValue == "true" || warnValue === true;
        }

        if (attributes.debug) {
            console.log("status: " + (accepted ? "accepted" : "rejected"));
            if (categoriesResult) { console.log("categories:", categoriesResult); }
        }

        if (!attributes.callback) {
            attributes.callback = "cookieWarnCallback";
        }

        if (attributes.callback && window[attributes.callback]) {
            if (attributes.debug) {
                console.log("call: " + attributes.callback);
            }
            window[attributes.callback](accepted, categoriesResult || null);
        }
    };

    var saveCategories = function (categoriesObj) {
        cookie(categoriesCookieName, serializeCategories(categoriesObj), attributes.expire, attributes.path, attributes.domain, attributes.secure);
        cookie(cookieName, true, attributes.expire, attributes.path, attributes.domain, attributes.secure);
    };

    // Wire up elements with [data-cw-reopen] so they trigger reopen() on click
    var initReopenLinks = function () {
        var links = document.querySelectorAll('[data-cw-reopen]');
        for (var i = 0; i < links.length; i++) {
            (function (link) {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    window[fn].reopen();
                });
            })(links[i]);
        }
    };

    // --- public API ---

    window[fn] = {
        version: cwVersion,

        accept: function () {
            if (attributes.data.categories) {
                saveCategories(buildAllCategories(attributes.data.categories));
            } else {
                cookie(cookieName, true, attributes.expire, attributes.path, attributes.domain, attributes.secure);
            }
            saveVersion();
            saveTimestamp();
            closeBox();
            cookieWarnValue = true;
            check(cookieWarnValue);
        },

        acceptSelected: function () {
            if (!attributes.data.categories) { return; }
            saveCategories(getSelectedFromCheckboxes(attributes.data.categories));
            saveVersion();
            saveTimestamp();
            closeBox();
            cookieWarnValue = true;
            check(cookieWarnValue);
        },

        reject: function () {
            if (attributes.data.categories) {
                saveCategories(buildRequiredCategories(attributes.data.categories));
                closeBox();
            } else {
                cookie(cookieName, false, attributes.expire, attributes.path, attributes.domain, attributes.secure);
                var wbox = document.getElementById(elementId);
                if (attributes.data.reject_info) {
                    wbox.className = wbox.className + " reject";
                } else {
                    closeBox();
                }
            }
            saveVersion();
            saveTimestamp();
            cookieWarnValue = false;
            check(cookieWarnValue);
        },

        close: function () {
            closeBox();
        },

        reopen: function () {
            deleteCookies();
            cookieWarnValue = undefined;
            var existingBox = document.getElementById(elementId);
            if (existingBox) {
                existingBox.parentNode.removeChild(existingBox);
            }
            warn();
        },
    };

    var cookieWarnValue = cookie(cookieName);

    // --- render ---

    var warn = function () {
        if (!attributes.data) {
            console.error("Empty or invalid data-lang parameters");
            return;
        }

        // Bootstrap 4: jQuery + $().modal; Bootstrap 5: window.bootstrap.Modal
        var bootstrap = (window.jQuery && typeof $ == "function" && typeof $().modal == "function")
                     || (window.bootstrap && typeof window.bootstrap.Modal === "function");
        var categoriesDef = attributes.data.categories;
        var theme = attributes.theme;

        // Position: "bottom" (default) or "top"
        var pos = attributes.position === 'top' ? 'top' : 'bottom';
        var oppPos = pos === 'top' ? 'bottom' : 'top';
        var shadowY = pos === 'top' ? '' : '-';

        // Bootstrap uses its own button classes; otherwise use built-in btn-cw-action
        var btnClass = bootstrap ? 'btn btn-outline-secondary btn-sm' : 'btn btn-cw-action';

        // Layout CSS – always applied, theme-independent
        var cssBase = [
            "#" + elementId + " {position:fixed;z-index:999999;" + pos + ":-140px;left:0;right:0;opacity:0;}",
            "#" + elementId + ".loaded {opacity:1;" + pos + ":0;}",
            "#" + elementId + ".closed {display:none;}",
            "#" + elementId + ".reject .reject_more {display:block;}",
            "#" + elementId + " .text {max-width:1100px;margin:0 auto;padding:14px 24px;display:flex;align-items:center;flex-wrap:wrap;gap:10px 12px;justify-content:center;text-align:center;}",
            "#" + elementId + " .btn {white-space:nowrap;}",
            "#" + elementId + " .btn-cw-action {white-space:nowrap;}",
            "#" + elementId + " .reject_more {padding:0 10px;display:none;}",
            "#" + elementId + " .cw-categories {display:flex;flex-wrap:wrap;gap:8px;margin:8px 0;justify-content:center;width:100%;}",
            "#" + elementId + " .cw-cat-item {display:inline-flex;align-items:flex-start;flex-direction:column;padding:8px 13px;border-radius:10px;cursor:pointer;text-align:left;transition:background 0.18s,border-color 0.18s;}",
            "#" + elementId + " .cw-cat-header {display:flex;align-items:center;gap:8px;}",
            "#" + elementId + " .cw-cat-item input {cursor:pointer;margin:0;width:15px;height:15px;}",
            "#" + elementId + " .cw-cat-item.cw-cat-required {opacity:0.5;cursor:default;}",
            "#" + elementId + " .cw-cat-item.cw-cat-required input {cursor:default;}",
            "#" + elementId + " .cw-cat-desc {display:block;font-size:11px;opacity:0.6;margin-top:5px;max-width:180px;line-height:1.45;}",
            "@media(max-width:640px){#" + elementId + " .text{padding:12px 14px;gap:8px 10px;}#" + elementId + " .cw-cat-desc{max-width:130px;}}",
        ];

        // Theme definitions – transition and border adapt to position
        var cssThemes = {
            dark: [
                "#" + elementId + " {transition:" + pos + " 0.55s cubic-bezier(0.16,1,0.3,1),opacity 0.35s ease;background:linear-gradient(180deg,#0c101a 0%,#101521 100%);border-" + oppPos + ":1px solid rgba(80,140,255,0.18);box-shadow:0 " + shadowY + "12px 60px rgba(0,0,0,0.6),0 " + shadowY + "1px 0 rgba(80,140,255,0.06);}",
                "#" + elementId + " {font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif;font-size:13.5px;color:#96a3b8;line-height:1.55;}",
                "#" + elementId + " .btn-cw-action {font-family:inherit;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;cursor:pointer;background:transparent;color:#6fa8ff;border:1.5px solid rgba(80,140,255,0.32);padding:7px 18px;border-radius:100px;margin-left:6px;transition:background 0.18s,border-color 0.18s,color 0.18s;white-space:nowrap;}",
                "#" + elementId + " .btn-cw-action:hover {background:rgba(80,140,255,0.1);border-color:rgba(80,140,255,0.65);color:#9fc6ff;}",
                "#" + elementId + " .btn-cw-action:focus-visible {outline:2px solid rgba(80,140,255,0.55);outline-offset:3px;border-radius:100px;}",
                "#" + elementId + " .cw-cat-item {color:#96a3b8;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);}",
                "#" + elementId + " .cw-cat-item:not(.cw-cat-required):hover {background:rgba(80,140,255,0.09);border-color:rgba(80,140,255,0.32);}",
                "#" + elementId + " .cw-cat-item input {accent-color:#508cff;}",
                "#" + elementId + " .cw-cat-item strong {color:#c4cedd;font-weight:600;}",
                "#" + elementId + " a {color:#6fa8ff;text-decoration:none;border-bottom:1px solid rgba(80,140,255,0.28);transition:border-color 0.18s,color 0.18s;}",
                "#" + elementId + " a:hover {color:#9fc6ff;border-bottom-color:rgba(80,140,255,0.65);}",
            ],
            light: [
                "#" + elementId + " {transition:" + pos + " 0.55s cubic-bezier(0.16,1,0.3,1),opacity 0.35s ease;background:#ffffff;border-" + oppPos + ":1px solid #e2e8f0;box-shadow:0 " + shadowY + "4px 32px rgba(0,0,0,0.09);}",
                "#" + elementId + " {font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif;font-size:13.5px;color:#4b5563;line-height:1.55;}",
                "#" + elementId + " .btn-cw-action {font-family:inherit;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;cursor:pointer;background:transparent;color:#374151;border:1.5px solid rgba(55,65,81,0.32);padding:7px 18px;border-radius:100px;margin-left:6px;transition:background 0.18s,border-color 0.18s;white-space:nowrap;}",
                "#" + elementId + " .btn-cw-action:hover {background:rgba(55,65,81,0.07);border-color:rgba(55,65,81,0.55);}",
                "#" + elementId + " .btn-cw-action:focus-visible {outline:2px solid rgba(55,65,81,0.4);outline-offset:3px;border-radius:100px;}",
                "#" + elementId + " .cw-cat-item {color:#4b5563;background:#f9fafb;border:1px solid #e5e7eb;}",
                "#" + elementId + " .cw-cat-item:not(.cw-cat-required):hover {background:#f3f4f6;border-color:#9ca3af;}",
                "#" + elementId + " .cw-cat-item input {accent-color:#374151;}",
                "#" + elementId + " .cw-cat-item strong {color:#111827;font-weight:600;}",
                "#" + elementId + " a {color:#2563eb;text-decoration:none;border-bottom:1px solid rgba(37,99,235,0.3);transition:border-color 0.18s;}",
                "#" + elementId + " a:hover {border-bottom-color:rgba(37,99,235,0.7);}",
            ],
            minimal: [
                "#" + elementId + " {transition:" + pos + " 0.45s cubic-bezier(0.16,1,0.3,1),opacity 0.3s ease;background:rgba(255,255,255,0.97);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border-" + oppPos + ":1px solid rgba(0,0,0,0.09);}",
                "#" + elementId + " {font-size:13px;line-height:1.5;}",
                "#" + elementId + " .btn-cw-action {font-size:12px;font-weight:500;cursor:pointer;background:transparent;color:inherit;border:1px solid rgba(0,0,0,0.28);padding:5px 14px;border-radius:4px;margin-left:8px;transition:background 0.15s,border-color 0.15s;white-space:nowrap;}",
                "#" + elementId + " .btn-cw-action:hover {background:rgba(0,0,0,0.05);border-color:rgba(0,0,0,0.4);}",
                "#" + elementId + " .btn-cw-action:focus-visible {outline:2px solid rgba(0,0,0,0.25);outline-offset:2px;}",
                "#" + elementId + " .cw-cat-item {background:rgba(0,0,0,0.03);border:1px solid rgba(0,0,0,0.1);}",
                "#" + elementId + " .cw-cat-item:not(.cw-cat-required):hover {background:rgba(0,0,0,0.06);border-color:rgba(0,0,0,0.2);}",
                "#" + elementId + " a {color:inherit;text-decoration:underline;}",
                "#" + elementId + " a:hover {opacity:0.7;}",
            ],
        };

        // Bootstrap-specific CSS (replaces theme, uses Bootstrap's own button styling)
        var cssBootstrap = [
            "#" + elementId + " {transition:" + pos + " 0.55s cubic-bezier(0.16,1,0.3,1),opacity 0.35s ease;background:linear-gradient(180deg,#0c101a 0%,#101521 100%);border-" + oppPos + ":1px solid rgba(80,140,255,0.18);box-shadow:0 " + shadowY + "12px 60px rgba(0,0,0,0.6);}",
            "#" + elementId + " {color:#b0bec5;}",
            "#" + elementId + " a {color:#90caf9;}",
            "#" + elementId + " a:hover {color:#bbdefb;}",
            "#" + elementId + " .cw-cat-item {background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#b0bec5;}",
            "#" + elementId + " .cw-cat-item:not(.cw-cat-required):hover {background:rgba(80,140,255,0.1);border-color:rgba(80,140,255,0.3);}",
            "#" + elementId + " .cw-cat-item input {accent-color:#508cff;}",
            "#" + elementId + " .cw-cat-item strong {color:#dde4f0;font-weight:600;}",
            "#" + elementId + " .btn-outline-secondary {color:#b0bec5 !important;border-color:rgba(176,190,197,0.4) !important;border-radius:100px !important;font-size:11px !important;font-weight:700 !important;letter-spacing:0.07em !important;text-transform:uppercase !important;padding:7px 18px !important;margin-left:6px !important;}",
            "#" + elementId + " .btn-outline-secondary:hover {background:rgba(176,190,197,0.12) !important;border-color:rgba(176,190,197,0.65) !important;color:#e8edf5 !important;}",
        ];

        var activeThemeCss = bootstrap ? cssBootstrap : (cssThemes[theme] || cssThemes.dark);

        var css = {
            style: cssBase.concat(activeThemeCss),
            styleId: "cw-style-" + elementId,
            element: document.createElement("style"),
            append: function () {
                // Guard: don't inject a second <style> on reopen()
                if (document.getElementById(this.styleId)) { return; }
                if (attributes.style) {
                    this.style = this.style.concat(attributes.style);
                }
                this.element.id = this.styleId;
                this.element.type = "text/css";
                this.element.appendChild(document.createTextNode(this.style.join(" ")));
                document.head.insertBefore(this.element, document.head.childNodes[0]);
            },
        };

        css.append();

        var wbox = document.createElement("div");
        wbox.setAttribute("id", elementId);
        wbox.setAttribute("role", "dialog");
        wbox.setAttribute("aria-modal", "false");
        wbox.setAttribute("aria-label", "Cookie consent");
        wbox.setAttribute("aria-live", "polite");

        if (attributes.class) {
            wbox.setAttribute("class", attributes.class);
        }

        var moreLink = safeUrl(attributes.data.more_link);
        var info = moreLink && attributes.data.more_text
            ? ' <a target="_blank" rel="noopener noreferrer" href="' + moreLink + '">' + escapeHtml(attributes.data.more_text) + "</a> "
            : "";

        var html = '<div class="text">' + escapeHtml(attributes.data.text) + info;

        if (categoriesDef) {
            html += '<div class="cw-categories">';
            Object.keys(categoriesDef).forEach(function (k) {
                var cat = categoriesDef[k];
                var isRequired = !!cat.required;
                html += '<label class="cw-cat-item' + (isRequired ? ' cw-cat-required' : '') + '">';
                html += '<span class="cw-cat-header">';
                html += '<input type="checkbox" data-cw-cat="' + escapeHtml(k) + '"' + (isRequired ? ' checked disabled' : '') + '> ';
                html += '<strong>' + escapeHtml(cat.label || k) + '</strong>';
                html += '</span>';
                if (cat.description) {
                    html += '<small class="cw-cat-desc">' + escapeHtml(cat.description) + '</small>';
                }
                html += '</label>';
            });
            html += '</div>';

            html += '<span class="' + btnClass + '" id="' + fn + 'Accept" onclick="' + fn + '.accept();" role="button" tabindex="0">'
                + escapeHtml(attributes.data.accept_text || 'Accept all') + '</span> ';
            html += '<span class="' + btnClass + '" onclick="' + fn + '.acceptSelected();" role="button" tabindex="0">'
                + escapeHtml(attributes.data.accept_selected_text || 'Save settings') + '</span> ';
            html += '<span class="' + btnClass + '" onclick="' + fn + '.reject();" role="button" tabindex="0">'
                + escapeHtml(attributes.data.reject_text || 'Necessary only') + '</span>';
        } else {
            var accept_button = '<span class="' + btnClass + '" id="' + fn + 'Accept" onclick="' + fn + '.accept();" role="button" tabindex="0">' + escapeHtml(attributes.data.accept_text) + "</span> ";
            var reject_button = "";
            var reject_content = "";

            if (attributes.data.reject_text) {
                reject_button = '<span class="' + btnClass + '" onclick="' + fn + '.reject();" role="button" tabindex="0">' + escapeHtml(attributes.data.reject_text) + "</span> ";

                if (attributes.data.reject_info || attributes.data.reject_link) {
                    var rejectLink = safeUrl(attributes.data.reject_link);
                    reject_content = ' <span class="reject_more">';
                    reject_content += escapeHtml(attributes.data.reject_info);
                    if (rejectLink) {
                        reject_content += ' <a target="_blank" rel="noopener noreferrer" href="' + rejectLink + '">' + escapeHtml(attributes.data.reject_link) + "</a> ";
                    }
                    reject_content += ' <span class="' + btnClass + '" id="' + fn + 'Close" onclick="' + fn + '.close();" role="button" tabindex="0">' + escapeHtml(attributes.data.close_text) + "</span> ";
                    reject_content += " </span> ";
                }
            }

            html += accept_button + reject_button + reject_content;
        }

        html += '</div>';
        wbox.innerHTML = html;

        if (attributes.debug) {
            console.log("innerHTML: " + wbox.innerHTML);
        }

        document.body.appendChild(wbox);

        // data-once: immediately persist a "rejected" state so the banner won't re-appear
        // on subsequent visits if the user closes the page without interacting
        if (attributes.once) {
            if (categoriesDef) {
                saveCategories(buildRequiredCategories(categoriesDef));
            } else {
                cookie(cookieName, false, attributes.expire, attributes.path, attributes.domain, attributes.secure);
            }
        }

        setTimeout(function () {
            wbox.className = wbox.className + " loaded";
            var firstBtn = document.getElementById(fn + 'Accept');
            if (firstBtn) { firstBtn.focus(); }
        }, attributes.delay);
    };

    var isDOMready = function () {
        var readyState = document.readyState;

        if (attributes.debug) {
            console.log("readyState: " + readyState);
            console.log("cookieWarnValue: " + cookieWarnValue);
        }

        if (readyState == "complete") {

            initReopenLinks();

            var categoriesDef = attributes.data.categories;
            var hasConsent = categoriesDef ? !!cookie(categoriesCookieName) : !!cookieWarnValue;

            // Version check: if data-version is set and the stored version differs, invalidate consent
            if (hasConsent && attributes.version) {
                var storedVersion = cookie(versionCookieName);
                if (storedVersion !== attributes.version) {
                    if (attributes.debug) {
                        console.log("version mismatch: stored=" + storedVersion + " current=" + attributes.version);
                    }
                    deleteCookies();
                    cookieWarnValue = undefined;
                    hasConsent = false;
                }
            }

            if (!hasConsent) {
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
