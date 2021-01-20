# Cookie Warn

EU Cookie Law warning message

[![npm](https://img.shields.io/npm/dt/cookie-warn.svg?style=flat-square)](https://www.npmjs.com/package/cookie-warn)
[![GitHub issues](https://img.shields.io/github/issues/schalkt/cookie-warn.svg?style=flat-square)](https://github.com/schalkt/cookie-warn/issues)
[![schalkt](https://img.shields.io/david/schalkt/cookie-warn.svg?style=flat-square)](https://david-dm.org/schalkt/cookie-warn)
[![Build Status](https://travis-ci.org/schalkt/cookie-warn.svg?branch=master)](https://travis-ci.org/schalkt/cookie-warn)
[![npm](https://img.shields.io/npm/v/cookie-warn.svg?style=flat-square)](https://www.npmjs.com/package/cookie-warn)

[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=schalkt_cookie-warn&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=schalkt_cookie-warn)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=schalkt_cookie-warn&metric=security_rating)](https://sonarcloud.io/dashboard?id=schalkt_cookie-warn)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=schalkt_cookie-warn&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=schalkt_cookie-warn)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=schalkt_cookie-warn&metric=bugs)](https://sonarcloud.io/dashboard?id=schalkt_cookie-warn)

## Preview

[![preview](https://img.shields.io/badge/preview-click_here-green.svg?style=flat-square)](https://schalk.hu/projects/cookie-warn/demo/)

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

```html
<html lang="en">
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
          'more_link': 'https://ec.europa.eu/info/law/law-topic/data-protection_en',
          'accept_text': 'I accept',
          'reject_text': 'I reject',
          'reject_info': 'You can disable unwanted cookies by using this program',
          'reject_link': 'https://www.ghostery.com/'
          'close_text': 'Close'
       },
    }" (optional, setup texts and links)
    data-callback="cookieWarnCallback" (callback function name, optional)
    data-debug="true" (show debug info in console, optional)
    data-expire="365" (default 365 day, optional)
    data-domain="*.domain.tld" (cookie domain, optional)
    data-path="/" (cookie path, optional)
    data-secure="true" (cookie secure https, optional)
    data-delay="750" (default 500, optional)
    data-class="customCookieWarningClass" (optional)
    data-style="#cookieWarnBox a { color: #ff0000; }" (optional)
    type="text/javascript"
    src="../cookie-warn.min.js">
</script>
<script>
      var cookieWarnCallback = function(accepted) {
            if (accepted) {
                  // do something...
            } else {
                  // do nothing...
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
           'more_link':'https://ec.europa.eu/info/law/law-topic/data-protection_en'
     }"
     data-lang-hu="{
           'text':'Weboldalunk sütiket használ.',
           'accept_text':'Elfogadom',
           'more_text':'Kattints ide a bővebb információért',
           'more_link':'https://ec.europa.eu/info/law/law-topic/data-protection_hu'
     }">
 </div>

```
