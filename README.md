# Cookie Warn

EU Cookie Law warning message

[![preview](https://img.shields.io/badge/preview-click_here-green.svg?style=flat-square)](http://schalk.hu/projects/cookie-warn/demo/)
[![npm](https://img.shields.io/npm/dt/cookie-warn.svg?style=flat-square)](https://www.npmjs.com/package/cookie-warn)
[![GitHub issues](https://img.shields.io/github/issues/schalkt/cookie-warn.svg?style=flat-square)](https://github.com/schalkt/cookie-warn/issues)
[![schalkt](https://img.shields.io/david/schalkt/cookie-warn.svg?style=flat-square)](https://david-dm.org/schalkt/cookie-warn)
[![Build Status](https://travis-ci.org/schalkt/cookie-warn.svg?branch=master)](https://travis-ci.org/schalkt/cookie-warn)
[![npm](https://img.shields.io/npm/v/cookie-warn.svg?style=flat-square)](https://www.npmjs.com/package/cookie-warn)
[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/cookie-warn/badge)](https://www.jsdelivr.com/package/npm/cookie-warn)

## Features

- jQuery not required
- multilanguage support
- customizable style
- responsive
- Bootstrap detect
- adjustable delay and expire days
- callback

## Easy usage

### Example 1

- without parameters
- without html lang attribute (default "en")

```html
<html>
<script id="cookieWarn" type="text/javascript" src="../cookie-warn.min.js"></script>
```

### Example 2

- all parameters
- texts and links by html lang attribute

```html
<html lang="en">
<script
    id="cookieWarn"
    data-lang-en="{
          'text': 'Our website uses cookies.',
          'more_text': 'Click here for more information',
          'more_link': 'http://ec.europa.eu/ipg/basics/legal/cookies/index_en.htm',
          'accept_text': 'I accept',
          'reject_text': 'I reject',
          'reject_info': 'You can disable unwanted cookies by using this program',
          'reject_link': 'https://www.ghostery.com/'
       },
    }" (optional, setup texts and links)
    data-callback="cookieWarnCallback" (optional, callback function name)
    data-debug="true" (optional, show debug info in console)
    data-expire="365" (optional, default 365 day)
    data-domain="*.domain.tld" (optional, cookie domain)
    data-path="/" (optional, cookie path)
    data-secure="true" (optional, cookie secure https)
    data-delay="750" (optional, default 500)
    data-class="customCookieWarningClass" (optional)
    data-style="#cookieWarnBox a { color: #ff0000; }" (optional)
    type="text/javascript"
    src="../cookie-warn.min.js">
</script>
<script>
      var cookieWarnCallback = function(accepted) {
            if (accepted) {
                do something...
            } else {
                don't do something...
            }
      };  
</script>
```

### Example 3

- with default parameters
- texts and links by html lang attribute

```html
 <html lang="en">

 <script type="text/javascript" src="../cookie-warn.min.js"></script>

 <div
     id="cookieWarn"
     data-lang-en="{
           'text':'Our website uses cookies.',
           'accept_text':'I accept',
           'more_text':'Click here for more information',
           'more_link':'http://ec.europa.eu/ipg/basics/legal/cookies/index_en.htm'
     }"
     data-lang-hu="{
           'text':'Weboldalunk sütiket használ.',
           'accept_text':'Elfogadom',
           'more_text':'Kattints ide a bővebb információért',
           'more_link':'http://ec.europa.eu/ipg/basics/legal/cookies/index_en.htm'
     }">
 </div>

```

## TODO

- if accepted call a function (callMeWhenCookiesAccepted)
- add more info to the demo page (show cookie value)
- accept for 1 day, 1 week, 1 month, 1 year
