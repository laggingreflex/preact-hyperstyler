var H = require('preact-hyperscript-h')

module.exports = preactHyperscriptStyler

function preactHyperscriptStyler(styles, opts) {
  opts = opts || {}

  var h = opts.h || H

  var hs = createHs(h, styles, opts)

  if (!opts.h) {
    Object.keys(h).forEach(function(k) {
      if (typeof h[k] === 'function') {
        hs[k] = createHs(h[k], styles, opts)
      } else {
        hs[k] = h[k]
      }
    })
  }

  return hs

}

function createHs(h, styles, opts) {
  return function hs() {
    var node = h.apply(null, arguments)

    processNode(node, styles, opts)

    if (opts.recursive && node.children instanceof Array) {
      node.children.forEach(function(node) {
        processNode(node, styles, opts)
      })
    }

    return node
  }
}

function processNode(node, styles, opts) {

  styles = styles || {}
  opts = opts || {}

  if (!(styles instanceof Array)) {
    styles = [styles]
  }

  var classKey = opts.classKey || 'class'

  if (!node) {
    return
  }

  if (!node.attributes) {
    node.attributes = {};
  }
  if (!node.attributes[classKey]) {
    node.attributes[classKey] = {};
  }

  var classProperty = node.attributes[classKey]
  if (!classProperty) {
    return node
  }

  var classes
  if (classProperty instanceof Array) {
    classes = classProperty
  } else if (typeof classProperty === 'string') {
    classes = classProperty.split(/ /g)
  } else {
    classes = Object.keys(classProperty).reduce(function(classes, className) {
      if (classProperty[className]) {
        classes.push(className)
      }
      return classes
    }, [])
  }

  classes.push(node.nodeName)

  var add = []
  classes.forEach(function(className) {
    styles.forEach(function(style) {
      if (className in style) {
        if (classes.indexOf(style[className]) < 0) {
          add.push(style[className])
        }
      } else if (classKey !== 'class' || opts.strict) {
        throw new Error("'" + className + "' doesn't exist");
      }
    })
  })

  node.attributes.class = classes.concat(add).join(' ')

  return node

}
