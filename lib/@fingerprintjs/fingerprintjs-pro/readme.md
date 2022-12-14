<p align="center">
  <br>
  <a href="https://fingerprintjs.com">
    <img src="https://raw.githubusercontent.com/fingerprintjs/fingerprintjs/82b752cdeb6f0c7dc07300650ab31758235819fd/resources/logo.svg" alt="FingerprintJS" width="312px" />
  </a>
</p>

Makes a website visitor identifier from a browser fingerprint.
Unlike cookies and local storage, fingerprint stays the same in incognito/private mode and even when browser data is purged.
Provides additional information and higher accuracy compared to Open Source FingerprintJS.

## Quick start

Get a pro key:

1. Register a new PRO account at [dashboard.fingerprintjs.com/signup](https://dashboard.fingerprintjs.com/signup) (there is a free trial)
2. After registration go to the [dashboard](https://dashboard.fingerprintjs.com) and select the created subscription
3. Go the "Tokens" page in the navigation side bar on the left side of the page
4. Copy a token with type "Browser"

### Install from CDN

```html
<script>
  function initFingerprintJS() {
    // Initialize an agent at application startup.
    const fpPromise = FingerprintJS.load({ token: 'your-pro-key' })

    // Get the visitor identifier when you need it.
    fpPromise
      .then(fp => fp.get())
      .then(result => {
        // This is the visitor identifier:
        const visitorId = result.visitorId
        console.log(visitorId)
      })
  }
</script>
<script
  async
  src="//cdn.jsdelivr.net/npm/@fingerprintjs/fingerprintjs-pro@3/dist/fp.min.js"
  onload="initFingerprintJS()"
></script>
```

[Run this code](https://stackblitz.com/edit/fpjs-pro-3-cdn?file=index.html&devtoolsheight=100)

### Alternatively you can install from NPM to use with Webpack/Rollup/Browserify

```bash
npm i @fingerprintjs/fingerprintjs-pro
# or
yarn add @fingerprintjs/fingerprintjs-pro
```

```js
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'

// Initialize an agent at application startup.
const fpPromise = FingerprintJS.load({ token: 'your-pro-key' })

;(async () => {
  // Get the visitor identifier when you need it.
  const fp = await fpPromise
  const result = await fp.get()

  // This is the visitor identifier:
  const visitorId = result.visitorId
  console.log(visitorId)
})()
```

[Run this code](https://stackblitz.com/edit/fpjs-pro-3-npm?file=index.js&devtoolsheight=100)

## See also

???? [Live demo](https://fingerprintjs.com/demo)

??? [How to upgrade from Open Source to Pro in 30 seconds](https://dev.fingerprintjs.com/v3/docs/migrating-from-previous-versions#from-fingerprintjs-open-source-version-3)

?????? [How to migrate from FingerprintJS Pro version 2](https://dev.fingerprintjs.com/v3/docs/migrating-from-previous-versions#from-fingerprintjs-pro-version-2)

???? [FingerprintJS Pro documentation](https://dev.fingerprintjs.com)

?????? [Video: use FingerprintJS Pro to prevent multiple signups](https://www.youtube.com/watch?v=jWX9P5_jZn8)
