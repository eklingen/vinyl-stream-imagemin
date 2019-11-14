// Small vinyl-stream wrapper -aka Gulp plugin- for imagemin.

const { extname } = require('path')
const { Transform } = require('stream')

const DEFAULT_OPTIONS = {
  plugins: {
    jpegoptim: false,
    optipng: false,
    svgo: false
  },
  swallowUnchanged: false
}

function imageminWrapper (options = {}) {
  const imagemin = require('imagemin')

  function onData (data, file) {
    file.originalLength = file.contents.length
    file.contents = data
  }

  function onComplete (options, file, callback) {
    return (options.swallowUnchanged && file.contents.length === file.originalLength) ? callback() : callback(null, file)
  }

  function onError (error, file, callback) {
    return callback(new Error(error, { fileName: file.sourcePath }))
  }

  function transform (file, encoding, callback) {
    options = ({ ...DEFAULT_OPTIONS, ...options })

    const plugins = []
    const exts = []

    if (options.plugins.jpegoptim) {
      plugins.push(require('imagemin-jpegoptim')(options.plugins.jpegoptim))
      exts.push('.jpg', '.jpeg')
    }

    if (options.plugins.optipng) {
      plugins.push(require('imagemin-optipng')(options.plugins.optipng))
      exts.push('.png')
    }

    if (options.plugins.svgo) {
      plugins.push(require('imagemin-svgo')(options.plugins.svgo))
      exts.push('.svg')
    }

    // Checking the extension is necessary, because the list of plugins is variable
    if (!exts.includes(extname(file.path).toLowerCase())) {
      return options.swallowUnchanged ? callback() : callback(null, file)
    }

    imagemin.buffer(file.contents, { plugins })
      .then(data => onData(data, file))
      .then(() => onComplete(options, file, callback))
      .catch(error => onError(error, file, callback))
  }

  return new Transform({ transform, readableObjectMode: true, writableObjectMode: true })
}

module.exports = imageminWrapper
