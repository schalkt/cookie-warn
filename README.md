Cookie Warn
=============
EU Cookie Law warning message

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
          'text':'Our website uses cookies.',
          'button':'I accept',
          'more':'Click here for more information',
          'link':'http://ec.europa.eu/ipg/basics/legal/cookies/index_en.htm'
    }"
    data-expire="365" (optional, default 365 day)
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
           'button':'I accept',
           'more':'Click here for more information',
           'link':'http://ec.europa.eu/ipg/basics/legal/cookies/index_en.htm'
     }"
     data-lang-hu="{
           'text':'Weboldalunk sütiket használ.',
           'button':'Elfogadom',
           'more':'Kattints ide a bővebb információért',
           'link':'http://ec.europa.eu/ipg/basics/legal/cookies/index_en.htm'
     }">
 </div>

```
