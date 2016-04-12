/*
 cookie-warn.js

 Copyright 2016, Tamas Schalk (github.com/schalkt)
 Licensed under the MIT

 @version 1.0.2

*/
(function(fn) {
  var cookie = function(name, value, days) {
    if (value === undefined) {
      var i, x, y, cookies = document.cookie.split(";");
      for (i = 0;i < cookies.length;i++) {
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
      value = value + (days == null ? "" : "; expires=" + expire.toGMTString());
      document.cookie = name + "=" + value;
    }
  };
  if (cookie(fn)) {
    return;
  }
  window[fn] = {close:function(expire) {
    cookie(fn, true, expire);
    var obj = document.getElementById("cookieWarnBox");
    if (obj) {
      obj.parentNode.removeChild(obj);
    }
  }};
  document.addEventListener("DOMContentLoaded", function() {
    var data, lang, tag, text, button, link, expire, css, style, style1, style2, style3, body, wbox, info, more;
    tag = document.getElementById("cookieWarn");
    lang = document.documentElement.lang;
    data = JSON.parse(tag.getAttribute("data-lang-" + lang).replace(/'/g, '"'));
    if (!data) {
      return;
    }
    text = data.text;
    button = data.button;
    link = data.link;
    more = data.more;
    expire = parseInt(tag.getAttribute("data-expire"));
    style = tag.getAttribute("data-style");
    style1 = "#cookieWarnBox {position:fixed;z-index:999999;line-height:24px;bottom:0;left:0;right:0;background-color:#212121;color:#f1f1f1;opacity:0.9;text-align:center;padding:10px;font-size:16px;}";
    style2 = "#cookieWarnBox span {text-transform:uppercase;cursor:pointer;background-color:#f1f1f1;color:#1188ff;padding:3px 14px;margin-left:10px;}";
    style3 = "#cookieWarnBox span:hover {background-color:#fefefe;} #cookieWarnBox a {text-decoration:none;color:#1188ff;}";
    css = {type:"text/css", style:document.createElement("style"), content:style1 + style2 + style3 + style, append:function() {
      this.style.type = this.type;
      this.style.appendChild(document.createTextNode(this.content));
      document.head.appendChild(this.style);
    }};
    css.append();
    wbox = document.createElement("div");
    wbox.setAttribute("id", "cookieWarnBox");
    wbox.setAttribute("style", style.box);
    info = link && more ? ' <a target="_blank" href="' + link + '">' + more + "</a> " : "";
    button = '<span id="cookieWarnClose" onclick="' + fn + ".close(" + expire + ');">' + button + "</span>";
    wbox.innerHTML = '<div class="text">' + text + info + button + "</div>";
    body = document.getElementsByTagName("body")[0];
    body.appendChild(wbox);
  }, false);
})("cookieWarn");

