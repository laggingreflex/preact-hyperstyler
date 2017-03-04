# preact-hyperstyler

Apply [CSS Modules] in [preact-hyperscript].

[CSS Modules]: https://github.com/webpack-contrib/css-loader#css-scope
[hyperstyles]: https://github.com/colingourlay/hyperstyles
[preact-hyperscript]: https://github.com/queckezz/preact-hyperscript

## Install

```
npm i preact-hyperstyler
```

## Usage

```js
import styler from 'preact-hyperstyler'
import styles from './style.styl'

const h = styler(styles);

export default () => h('div.css-module', ['Hello World!'])
  // className from `styles.css-module` will be applied automatically
```

### Options

```js
styler(styles, {...option});
```

**`classKey`** [default 'class']

`hyperstyler` uses this key as an attribute on the node to infer the CSS Modules keys to be applied as classnames. By default it's just the "class" attribute, but you can set it to something else like "styleName" (as [react-css-modules] does)

**`strict`** [default true when classKey !== 'class']

Throws an error if the specified style name isn't found
