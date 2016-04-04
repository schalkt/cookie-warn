(function(fn) {
  var tag, text, button, link, info, expire, cookie;
  tag = document.getElementById("cookieWarn");
  text = tag.getAttribute("data-text");
  button = tag.getAttribute("data-button");
  link = tag.getAttribute("data-link");
  info = tag.getAttribute("data-info");
  expire = parseInt(tag.getAttribute("data-expire"));
  style = tag.getAttribute("data-style");
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
      days = expire ? expire : 1;
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
  if (cookie(fn)) {
    return;
  }
  var style1 = "#cookieWarnBox { position: fixed; bottom:0; left:0; right:0; background-color: #212121; color: #f1f1f1; opacity: 0.9; text-align: center; padding: 15px; font-size: 18px; }";
  var style2 = "#cookieWarnBox button { text-transform: uppercase; cursor: pointer; }";
  var style3 = "#cookieWarnBox a { text-decoration: none; color: #1188ff; }";
  var css = {type:"text/css", style:document.createElement("style"), content:style1 + style2 + style3 + style, append:function() {
    this.style.type = this.type;
    this.style.appendChild(document.createTextNode(this.content));
    document.head.appendChild(this.style);
  }};
  css.append();
  var body, wbox, html, style;
  wbox = document.createElement("div");
  wbox.setAttribute("id", "cookieWarnBox");
  wbox.setAttribute("style", style.box);
  button = '<button type="button" id="cookieWarnClose" onclick="javascript: ' + fn + '.close();">' + button + "</button>";
  wbox.innerHTML = '<div class="text">' + text + ' <a href="' + link + '">' + info + "</a> " + button + "</div>";
  document.addEventListener("DOMContentLoaded", function() {
    body = document.getElementsByTagName("body")[0];
    body.appendChild(wbox);
  }, false);
})("cookieWarn");

