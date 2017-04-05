# webjerk-image-set-diff-reporter

generates a static website displaying sets of image differences.

<img width="300px" src="https://raw.githubusercontent.com/cdaringe/webjerk-image-set-diff-reporter/master/img/example.gif" />

plays nice with `webjerk-image-set-diff`, but has no tight coupling or interest directly in it!

```js
// see test/index.js for more!
var reporter = require('webjerk-image-set-diff-reporter')
reporter({
  differences: [
    {
      name: 'banana-web-widget',
      aFilename: '/reference/banana.png',
      bFilename: '/test-run/banana.png'
    }
  ],
  dest: '/static-site' // some absolute path!
}).then(...)
```
