Cookie Warn
=============
EU Cookie Law warning message

Features
--------

- responsive
- jQuery not required
- multilanguage support
- customizable style

Easy usage:
-----------

```
<html lang="en">
...
<script
    id="cookieWarn"
    data-lang-en="{'text':'Our website uses cookies.','button':'Ok','more':'More info','link':'http://ec.europa.eu/ipg/basics/legal/cookies/index_en.htm'}"
    data-expire="365"
    data-style="#cookieWarnBox a { color: orange; }"
    type="text/javascript"
    src="../cookie-warn.min.js">
</script>

OR

<html lang="de">
...
<div
    id="cookieWarn"
    data-lang-en="{'text':'Our website uses cookies.','button':'Ok','more':'More info','link':'http://ec.europa.eu/ipg/basics/legal/cookies/index_en.htm'}"
    data-lang-de="{'text':'Our website uses cookies.','button':'Ok','more':'More info','link':'http://ec.europa.eu/ipg/basics/legal/cookies/index_en.htm'}"
    data-expire="90"
    data-style="#cookieWarnBox a { color: red; }">
</div>

```
