Cookie Warn
=============
EU Cookie Law warning message

[![preview](https://img.shields.io/badge/preview-click_here-green.svg?style=flat-square)](http://schalk.hu/projects/cookie-warn/demo/)
[![npm](https://img.shields.io/npm/dt/cookie-warn.svg?style=flat-square)](https://www.npmjs.com/package/cookie-warn)
[![GitHub issues](https://img.shields.io/github/issues/schalkt/cookie-warn.svg?style=flat-square)](https://github.com/schalkt/cookie-warn/issues)
[![npm](https://img.shields.io/npm/v/cookie-warn.svg?style=flat-square)](https://www.npmjs.com/package/cookie-warn)
[![schalkt](https://img.shields.io/david/schalkt/cookie-warn.svg?style=flat-square)](https://david-dm.org/schalkt/cookie-warn)
[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/cookie-warn/badge)](https://www.jsdelivr.com/package/npm/cookie-warn)

Features
--------

- responsive
- jQuery not required
- multilanguage support
- customizable style
- Bootstrap detect
- adjustable delay and expire days

# Easy usage:


## Example 1

```
<html lang="en" ... >
...
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
    }"
    data-expire="365" (optional, default 365 day)
    data-domain="*.domain.tld" (cookie domain, optional)
    data-path="/" (cookie path, optional)
    data-secure="true" (cookie secure, true / false, optional)
    data-delay="750" (optional, default 500)
    data-class="customCookieWarning" (optional)
    data-style="#cookieWarnBox a { color: #ff0000; }" (optional)
    type="text/javascript"
    src="../cookie-warn.min.js">
</script>
```

## Example 2

```
 <html lang="en" ... >
 ...
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

# TODO
- store cookie when reject?
