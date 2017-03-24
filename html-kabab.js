const parse5 = require('parse5')
const fs = require('fs')
const kebab = require('postcss-kebab-case-selector')
const postcss = require('postcss')

const changeKebab = (str) => str
  .replace(/[A-Z]+/g, c => `-${c.toLowerCase()}`)
  .replace(/_/g, '-')
  .replace(/-+/g, '-')
  .replace(/(\.|#|^)-/g, '$1')
  .replace(/-(\d)/g, '$1')

const replaceStyle = text => {
  text.value = postcss([kebab]).process(text.value).toString()
  return text
}

const recursiveReplace = (node) => {
  if (node.attrs && node.attrs.length) {
    node.attrs = node.attrs.map(({name, value}) => {
      if (['class', 'id'].indexOf(name) > -1) {
        return { name, value: changeKebab(value) }
      }
      return { name, value }
    })
  }
  if (node.nodeName === 'style') {
    node.childNodes[0] = replaceStyle(node.childNodes[0])
  }
  if (node.childNodes) {
    node.childNodes = node.childNodes.map(recursiveReplace)
  }
  if (node.content) {
    node.content = recursiveReplace(node.content)
  }
  return node
}

const replaceHtml = srcPath => {
  fs.readFile(srcPath, 'utf8', (err, data) => {
    if (err) {
      return
    }
    const parse =
      srcPath.match(/\.html$/) ? parse5.parse : parse5.parseFragment
    let document = parse(data)
    document = recursiveReplace(document)
    const html = parse5.serialize(document)
    fs.writeFile(srcPath, html, err => {
      if (err) console.log(err)
      console.log(`${srcPath} ok.`)
    })
  })
}

const replaceAllInDir = dirPath => {
  fs.readdir(dirPath, (err, files) => {
    if (err) throw err
    files.map(file => `${dirPath}${file}`).forEach(replaceHtml)
  })
}

if(!process.argv[2]) {
  console.log('USAGE: node html-kabab.js path/to/html')
  return
}
replaceAllInDir(process.argv[2])
