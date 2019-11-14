
# Small vinyl-stream wrapper -aka Gulp plugin- for imagemin

Run imagemin within your streams. Lazy loads plugins.

> *NOTE:* No tests have been written yet!

## Installation

`yarn install`. Or `npm install`. Or just copy the files to your own project.

## Usage

```
const imageminWrapper = require('@eklingen/vinyl-stream-imagemin')
stream.pipe(imageminWrapper())
```

## Options

There are a few options you can play with:

### `plugins`

What plugins you intend to use. Possible options are `jpegoptim`, `optipng` and `svgo`. You can pass either `true` or a configuration object.

```
imageminWrapper({
  plugins: {
    jpegoptim: true,
    optipng: true,
    svgo: true
  }
})
```

```
imageminWrapper({
  plugins: {
    jpegoptim: { ... },
    optipng: { ... },
    svgo: { ... }
  }
})
```

### `swallowUnchanged`

Set this to `true` if you want the plugin to emit only changed files back into the stream.

```
imageminWrapper({
  swallowUnchanged: true
})
```


## Dependencies

This package requires ["imagemin"](https://www.npmjs.com/package/imagemin).

## Optional dependencies

This package can require ["imagemin-jpegoptim"](https://www.npmjs.com/package/imagemin-jpegoptim), ["imagemin-optipng"](https://www.npmjs.com/package/imagemin-optipng) and ["imagemin-svgo"](https://www.npmjs.com/package/imagemin-svgo).

---

Copyright (c) 2019 Elco Klingen. MIT License.
