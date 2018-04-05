/*
 cookie-warn.js

 Copyright 2016-2018, Tamas Schalk (github.com/schalkt)
 Licensed under the MIT

 @version 2.0.0

*/
(function(fn) {
  var cookie = function(name, value, days, path, domain, secure) {
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
      var expire = new Date;
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
      console.log("cookie", name, value);
      document.cookie = escape(name) + "=" + value;
    }
  };
  if (cookie(fn)) {
    return;
  }
  window[fn] = {close:function(expire, path, domain, secure) {
    cookie(fn, true, expire, path, domain, secure);
    var wbox = document.getElementById(fn + "Box");
    wbox.className = wbox.className + " closed";
  }};
  document.addEventListener("DOMContentLoaded", function() {
    var data, lang, tag, text, button, link, domain, path, expire, secure, css, style, body, wbox, info, more, classes, bootstrap, delay, args;
    tag = document.getElementById("cookieWarn");
    if (!tag) {
      console.error("cookieWarn element not found by id");
      return;
    }
    lang = document.documentElement.lang;
    data = JSON.parse(tag.getAttribute("data-lang-" + lang).replace(/'/g, '"'));
    if (!data) {
      return;
    }
    text = data.text;
    button = data.button;
    link = data.link;
    more = data.more;
    delay = parseInt(tag.getAttribute("data-delay"));
    domain = tag.getAttribute("data-domain");
    path = tag.getAttribute("data-path");
    secure = tag.getAttribute("data-secure");
    expire = parseInt(tag.getAttribute("data-expire"));
    style = tag.getAttribute("data-style");
    classes = tag.getAttribute("data-class");
    bootstrap = window.jQuery && typeof $().modal == "function";
    css = {style:["#" + fn + "Box {transition:all 0.5s ease;position:fixed;z-index:999999;bottom:-20px;left:0;right:0;opacity:0;text-align:center;padding:10px;background-color:#212121}", "#" + fn + "Box .btn {white-space:nowrap}", "#" + fn + "Box.loaded {opacity:0.9;bottom:0px}", "#" + fn + "Box.closed {opacity:0;bottom:-20px}"], style2:["#" + fn + "Box {font-family: Verdana;line-height:24px;color:#f1f1f1;font-size:14px;}", "#" + fn + "Box .btn {text-transform:uppercase;cursor:pointer;background-color:#f1f1f1;color:#659fda;padding:3px 14px;margin-left:10px;}", 
    "#" + fn + "Box .btn:hover {background-color:#ffffff;color:#4d78a5;}", "#" + fn + "Box a {text-decoration:none;color:#659fda}"], type:"text/css", element:document.createElement("style"), append:function() {
      if (!bootstrap) {
        this.style = this.style.concat(this.style2);
      }
      this.element.type = this.type;
      this.element.appendChild(document.createTextNode(this.style.join(" ")));
      document.head.appendChild(this.element);
    }};
    css.append();
    wbox = document.createElement("div");
    wbox.setAttribute("id", fn + "Box");
    if (classes) {
      wbox.setAttribute("class", classes);
    }
    args = [expire ? expire : "null", path ? "'" + path + "'" : "null", domain ? "'" + domain + "'" : "null", secure == "true" ? 1 : 0].join(",");
    console.log(args);
    info = link && more ? ' <a target="_blank" href="' + link + '">' + more + "</a> " : "";
    button = '<span class="btn btn-default" id="' + fn + 'Close" onclick="' + fn + ".close(" + args + ');">' + button + "</span>";
    wbox.innerHTML = '<div class="text">' + text + info + button + "</div>";
    body = document.getElementsByTagName("body")[0];
    body.appendChild(wbox);
    setTimeout(function() {
      wbox.className = wbox.className + " loaded";
    }, delay ? parseInt(delay) : 500);
  }, false);
})("cookieWarn");

