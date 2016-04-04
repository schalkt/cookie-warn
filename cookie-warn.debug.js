/*
 cookie-warn.js

 Copyright 2016, Tam?s Schalk (github.com/schalkt)
 Licensed under the MIT

 @version 1.0.0

*/
(function(fn) {
  var tag, text, button, link, info, expire, cookie;
  window[fn] = {close:function() {
    cookie(fn, true);
    var obj = document.getElementById("cookieWarnBox");
    if (obj) {
      obj.parentNode.removeChild(obj);
    }
  }};
  cookie = function(name, value, days) {
    var expire;
    if (days == undefined) {
      days = expire ? expire : 14;
    }
    if (value !== undefined) {
      expire = new Date;
      expire.setDate(expire.getDate() + days);
      value = escape(value) + (days == null ? "" : "; expires=" + expire.toGMTString());
      document.cookie = name + "=" + value;
    } else {
      var i, x, y, cookies = document.cookie.split(";");
      for (i = 0;i < cookies.length;i++) {
        x = cookies[i].substr(0, cookies[i].indexOf("="));
        y = cookies[i].substr(cookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == name) {
          return unescape(y);
        }
      }
    }
  };
  document.addEventListener("DOMContentLoaded", function() {
    tag = document.getElementById("cookieWarn");
    text = tag.getAttribute("data-text");
    button = tag.getAttribute("data-button");
    link = tag.getAttribute("data-link");
    info = tag.getAttribute("data-info");
    expire = parseInt(tag.getAttribute("data-expire"));
    style = tag.getAttribute("data-style");
    if (cookie(fn)) {
      return;
    }
    var style1 = "#cookieWarnBox {position:fixed;line-height:32px; bottom:0;left:0;right:0;background-color:#212121;color:#f1f1f1;opacity:0.9;text-align:center;padding:15px;font-size:18px;}";
    var style2 = "#cookieWarnBox span {text-transform:uppercase;cursor:pointer;background-color:#f1f1f1;color:#1188ff;padding:7px 14px;margin-left:10px;}";
    var style3 = "#cookieWarnBox span:hover {background-color:#fefefe;} #cookieWarnBox a {text-decoration:none;color:#1188ff;}";
    var css = {type:"text/css", style:document.createElement("style"), content:style1 + style2 + style3 + style, append:function() {
      this.style.type = this.type;
      this.style.appendChild(document.createTextNode(this.content));
      document.head.appendChild(this.style);
    }};
    css.append();
    var body, wbox, more, style;
    wbox = document.createElement("div");
    wbox.setAttribute("id", "cookieWarnBox");
    wbox.setAttribute("style", style.box);
    more = link && info ? ' <a target="_blank" href="' + link + '">' + info + "</a> " : "";
    button = '<span id="cookieWarnClose" onclick="javascript: ' + fn + '.close();">' + button + "</span>";
    wbox.innerHTML = '<div class="text">' + text + more + button + "</div>";
    body = document.getElementsByTagName("body")[0];
    body.appendChild(wbox);
  }, false);
})("cookieWarn");

