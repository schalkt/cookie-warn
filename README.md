# Cookie Warn

EU Cookie Law warning message – GDPR / ePrivacy / EAA compliant

[![npm](https://img.shields.io/npm/dt/cookie-warn.svg?style=flat-square)](https://www.npmjs.com/package/cookie-warn)
[![GitHub issues](https://img.shields.io/github/issues/schalkt/cookie-warn.svg?style=flat-square)](https://github.com/schalkt/cookie-warn/issues)
[![npm](https://img.shields.io/npm/v/cookie-warn.svg?style=flat-square)](https://www.npmjs.com/package/cookie-warn)

[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=schalkt_cookie-warn&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=schalkt_cookie-warn)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=schalkt_cookie-warn&metric=security_rating)](https://sonarcloud.io/dashboard?id=schalkt_cookie-warn)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=schalkt_cookie-warn&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=schalkt_cookie-warn)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=schalkt_cookie-warn&metric=bugs)](https://sonarcloud.io/dashboard?id=schalkt_cookie-warn)

## Preview

[![preview](https://img.shields.io/badge/preview-click_here-green.svg?style=flat-square)](https://projects.schalk.hu/cookie-warn/demo/)

## Features

- Zero-config: drop in one script tag and it works out of the box
- jQuery not required
- Multilanguage support via `data-lang-*` attributes
- Three built-in themes: `dark`, `light`, `minimal`
- Bootstrap-aware: uses `btn-outline-secondary` when Bootstrap is detected
- Granular consent by category (necessary, analytics, marketing, etc.)
- Consent withdrawal via `reopen()` method
- Customizable style, class, and inline CSS override
- Responsive layout, mobile-friendly
- ARIA accessibility attributes (EAA 2025 compliant)
- XSS-safe: all user-supplied text is HTML-escaped
- `SameSite=Lax` on consent cookies
- Adjustable delay and expiry
- Callback with accepted status and categories object

## Quick start

One line, works out of the box with English defaults:

```html
<script id="cookieScript" src="cookie-warn.min.js"></script>
```

## Parameters

All parameters are optional.

### `data-lang-*` attributes

Texts and links are set per language via `data-lang-{code}` on the script/div element. The language is detected from `<html lang="...">`. If no `data-lang-*` attribute matches the current language, English defaults are used automatically.

| Key | Default | Description |
|-----|---------|-------------|
| `text` | `"Our website uses cookies."` | Banner text |
| `accept_text` | `"I accept"` | Accept all button |
| `accept_selected_text` | `"Save settings"` | Save selected categories button (categories mode) |
| `reject_text` | `"I reject"` / `"Necessary only"` | Reject / necessary-only button |
| `reject_info` | `null` | Text shown after rejection (simple mode) |
| `reject_link` | `null` | Link shown after rejection (simple mode) |
| `close_text` | `"Close"` | Close button text (shown after rejection info) |
| `more_text` | `"Click here for more information"` | Info link text |
| `more_link` | EU data protection URL | Info link URL |
| `categories` | `null` | Category definitions object – enables granular mode (see below) |

### HTML attributes

| Attribute | Default | Description |
|-----------|---------|-------------|
| `data-delay` | `500` | Milliseconds before the banner appears |
| `data-expire` | `365` | Cookie expiry in days |
| `data-domain` | — | Cookie domain (e.g. `*.example.com`) |
| `data-path` | `/` | Cookie path |
| `data-secure` | auto (https = true) | Force cookie `Secure` flag |
| `data-callback` | `"cookieWarnCallback"` | Name of the global callback function |
| `data-class` | — | Extra CSS class on the banner element |
| `data-style` | — | Additional inline CSS appended to the banner styles |
| `data-theme` | `"dark"` | Visual theme: `dark`, `light`, or `minimal` (see below) |
| `data-position` | `"bottom"` | Banner position: `bottom` or `top` |
| `data-version` | — | Consent version string. If the stored version differs, existing consent is invalidated and the banner re-appears. Useful after privacy policy changes. |
| `data-once` | `false` | Show the banner only once. If set to `true`, a rejected-state cookie is written the moment the banner is shown, so it will not re-appear on subsequent visits even if the user never clicks a button (PECR / implied consent use case). |
| `data-debug` | `false` | Log debug info to the console |

## Themes

Choose a built-in theme with `data-theme`. All themes are fully responsive and GDPR-compliant.

| Theme | Description |
|-------|-------------|
| `dark` | Default. Deep navy gradient background, electric blue accent, pill-shaped buttons. |
| `light` | White background, light gray category cards, dark outline buttons. Suited for light-theme sites. |
| `minimal` | Near-zero styling. Frosted glass background, inherits the page's font and text color. Easy to integrate into any existing site without visual conflicts. |

```html
<script id="cookieScript" data-theme="light" src="cookie-warn.min.js"></script>
```

### Bootstrap

When Bootstrap is detected on the page, cookie-warn automatically switches to Bootstrap mode:

- Button classes become `btn btn-outline-secondary btn-sm` (equal visual weight, EDPB-compliant)
- Built-in font and button CSS is skipped; Bootstrap handles typography
- Banner background, ARIA attributes, and category layout still apply
- **Bootstrap 5**: detected via `window.bootstrap.Modal` — jQuery not required
- **Bootstrap 4**: detected via jQuery + `$().modal` — jQuery must be loaded before cookie-warn

### Multilanguage & language switching

The displayed language is read from `<html lang="...">` when the script loads. To switch language via a URL parameter (e.g. `?lang=hu`), set the `lang` attribute **before** the script loads:

```html
<head>
  <!-- Must run before cookie-warn.js -->
  <script>
    var lang = new URLSearchParams(location.search).get('lang');
    if (lang) document.documentElement.lang = lang;
  </script>
  <script id="cookieScript" src="cookie-warn.min.js" data-lang-en="{...}" data-lang-hu="{...}"></script>
</head>
```

## Examples

### Example 1 – minimum (zero-config)

```html
<html lang="en">
<head>
  <script id="cookieScript" src="cookie-warn.min.js"></script>
</head>
```

### Example 2 – simple mode with all parameters

```html
<html lang="en">
<head>
  <script
    id="cookieScript"
    data-lang-en="{
      'text': 'Our website uses cookies.',
      'more_text': 'Click here for more information',
      'more_link': 'https://ec.europa.eu/info/law/law-topic/data-protection_en',
      'accept_text': 'I accept',
      'reject_text': 'I reject',
      'reject_info': 'You can disable unwanted cookies in your browser settings.',
      'reject_link': 'https://www.ghostery.com/',
      'close_text': 'Close'
    }"
    data-callback="cookieWarnCallback"
    data-expire="365"
    data-domain="*.example.com"
    data-path="/"
    data-secure="true"
    data-delay="750"
    data-class="my-cookie-banner"
    data-style="#cookieScriptBox a { color: #ff0000; }"
    data-debug="false"
    src="cookie-warn.min.js">
  </script>
</head>
<script>
  function cookieWarnCallback(accepted) {
    if (accepted) {
      // load analytics, ads, etc.
    }
  }
</script>
```

### Example 3 – granular category consent (GDPR recommended)

Adds per-category checkboxes. Required categories are always checked and cannot be unchecked.

```html
<html lang="en">
<head>
  <script
    id="cookieScript"
    data-lang-en="{
      'text': 'We use cookies to improve your experience.',
      'more_text': 'Privacy policy',
      'more_link': 'https://example.com/privacy',
      'accept_text': 'Accept all',
      'accept_selected_text': 'Save settings',
      'reject_text': 'Necessary only',
      'categories': {
        'necessary':  {'label': 'Necessary',  'description': 'Required for the site to function.', 'required': true},
        'analytics':  {'label': 'Analytics',  'description': 'Help us understand how visitors use the site.'},
        'marketing':  {'label': 'Marketing',  'description': 'Used for personalised ads and content.'}
      }
    }"
    data-lang-hu="{
      'text': 'Sütiket használunk a jobb felhasználói élményért.',
      'more_text': 'Adatkezelési tájékoztató',
      'more_link': 'https://example.com/adatkezeles',
      'accept_text': 'Mindent elfogad',
      'accept_selected_text': 'Mentés',
      'reject_text': 'Csak szükséges',
      'categories': {
        'necessary':  {'label': 'Szükséges',  'description': 'Az oldal működéséhez elengedhetetlen.', 'required': true},
        'analytics':  {'label': 'Analitikai', 'description': 'Segít az oldal fejlesztésében.'},
        'marketing':  {'label': 'Marketing',  'description': 'Célzott hirdetések és tartalom.'}
      }
    }"
    data-callback="cookieWarnCallback"
    src="cookie-warn.min.js">
  </script>
</head>
<script>
  function cookieWarnCallback(accepted, categories) {
    // accepted: true if at least one non-required category was accepted
    // categories: { necessary: true, analytics: false, marketing: true }
    if (categories && categories.analytics) {
      // load analytics
    }
    if (categories && categories.marketing) {
      // load ads
    }
  }
</script>
```

### Example 4 – multilanguage with a `<div>` element

The script tag can be replaced with a `<div>` if you prefer to keep scripts at the bottom.

```html
<html lang="hu">
<head>
  <script src="cookie-warn.min.js"></script>
</head>
<body>
  <div
    id="cookieScript"
    data-lang-en="{
      'text': 'Our website uses cookies.',
      'accept_text': 'Accept'
    }"
    data-lang-hu="{
      'text': 'Weboldalunk sütiket használ.',
      'accept_text': 'Elfogadom'
    }">
  </div>
</body>
```

### Example 5 – light theme

```html
<html lang="en">
<head>
  <script
    id="cookieScript"
    data-theme="light"
    data-lang-en="{
      'text': 'We use cookies to improve your experience.',
      'accept_text': 'Accept all',
      'reject_text': 'Necessary only'
    }"
    src="cookie-warn.min.js">
  </script>
</head>
```

### Example 6 – minimal theme (integrate into any site)

The minimal theme has almost no own styling — it inherits the page's font and text color.

```html
<html lang="en">
<head>
  <script
    id="cookieScript"
    data-theme="minimal"
    data-lang-en="{
      'text': 'This site uses cookies.',
      'accept_text': 'Accept',
      'reject_text': 'Decline'
    }"
    src="cookie-warn.min.js">
  </script>
</head>
```

## JavaScript API

| Method | Description |
|--------|-------------|
| `cookieScript.accept()` | Accept all categories (or all cookies in simple mode) |
| `cookieScript.acceptSelected()` | Accept only the checked categories (categories mode only) |
| `cookieScript.reject()` | Accept necessary-only (categories mode) or reject all (simple mode) |
| `cookieScript.close()` | Close the banner without changing the stored consent |
| `cookieScript.reopen()` | Delete consent cookies and re-show the banner (use in a "Cookie settings" footer link) |

### Consent withdrawal example

Add a link anywhere on your page so users can change their preferences at any time (required by GDPR Art. 7(3)). Two equivalent ways:

```html
<!-- inline JS -->
<a href="#" onclick="cookieScript.reopen(); return false;">Cookie settings</a>

<!-- data attribute (no inline JS needed) -->
<a href="#" data-cw-reopen>Cookie settings</a>
```

Any element with `data-cw-reopen` is wired up automatically when the library loads.

## Callback

The global callback function is called whenever consent is read or updated.

```js
function cookieWarnCallback(accepted, categories) {
  // accepted  – boolean: true if any non-required category accepted (or accepted in simple mode)
  // categories – object or null (null in simple mode)
  //   { necessary: true, analytics: false, marketing: true }
}
```

## Google Consent Mode v2

Google Consent Mode v2 is required for Google Analytics 4 and Google Ads in the EEA. Without it, conversion modelling and cross-channel attribution are degraded and your Google Ads campaigns lose signal.

The key difference from a simple callback-based script loader: **always load GA4 / GTM, but start with denied defaults, then update consent in the callback.** GA4 will model conversions even for users who decline, as long as Consent Mode is active.

### Setup

```html
<head>
  <!-- 1. Define gtag and set defaults BEFORE GA4/GTM loads -->
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('consent', 'default', {
      analytics_storage:     'denied',
      ad_storage:            'denied',
      ad_user_data:          'denied',
      ad_personalization:    'denied',
      functionality_storage: 'granted',
      wait_for_update:       500
    });
    gtag('js', new Date());
  </script>

  <!-- 2. Load GA4 — it will respect the denied defaults above -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>gtag('config', 'G-XXXXXXXXXX');</script>

  <!-- 3. Load cookie-warn with categories -->
  <script
    id="cookieScript"
    data-lang-en="{
      'text': 'We use cookies to improve your experience.',
      'accept_text': 'Accept all',
      'accept_selected_text': 'Save settings',
      'reject_text': 'Necessary only',
      'categories': {
        'necessary': {'label': 'Necessary', 'description': 'Required for the site to function.', 'required': true},
        'analytics': {'label': 'Analytics', 'description': 'Google Analytics — helps us understand usage.'},
        'marketing': {'label': 'Marketing', 'description': 'Google Ads — personalised ads and conversion tracking.'}
      }
    }"
    data-callback="cookieWarnCallback"
    src="cookie-warn.min.js">
  </script>
</head>

<script>
  function cookieWarnCallback(accepted, categories) {
    if (!categories) {
      // simple mode — no category breakdown available
      gtag('consent', 'update', {
        analytics_storage: accepted ? 'granted' : 'denied'
      });
      return;
    }
    gtag('consent', 'update', {
      analytics_storage:  categories.analytics ? 'granted' : 'denied',
      ad_storage:         categories.marketing ? 'granted' : 'denied',
      ad_user_data:       categories.marketing ? 'granted' : 'denied',
      ad_personalization: categories.marketing ? 'granted' : 'denied'
    });
  }
</script>
```

### Consent signal mapping

| cookie-warn category | Consent Mode v2 signal(s) |
|---|---|
| `necessary` (always granted) | `functionality_storage: 'granted'` |
| `analytics` | `analytics_storage` |
| `marketing` | `ad_storage`, `ad_user_data`, `ad_personalization` |

### Notes

- `wait_for_update: 500` gives cookie-warn 500 ms to fire `gtag('consent', 'update', ...)` before GA4 sends its first event. Match this to your `data-delay` value if you change it.
- The callback fires on **every page load**, not just on first consent. This is correct — GA4 needs the consent update on every page.
- If using **Google Tag Manager**: set the `consent default` call in a Custom HTML tag on the Consent Initialization trigger, before the GTM container fires.
- For sites outside the EEA where Consent Mode is not legally required, you can still use it — it improves data quality with modelled conversions.

## Cookies

| Cookie name | Value | Description |
|-------------|-------|-------------|
| `cookieWarn.accepted` | `true` / `false` | Set in simple mode |
| `cookieWarn.categories` | `necessary,analytics` | Comma-separated accepted category keys (categories mode) |
| `cookieWarn.version` | string | Stored value of `data-version` (if set); used for consent invalidation on version mismatch |
| `cookieWarn.timestamp` | ISO 8601 string | UTC timestamp of the last consent action (accept / reject) |

All cookies are set with `SameSite=Lax` and `Secure` (on HTTPS).

