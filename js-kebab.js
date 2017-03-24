const changeKebab = (str) => str
  .replace(/[A-Z]+/g, c => `-${c.toLowerCase()}`)
  .replace(/_/g, '-')
  .replace(/-+/g, '-')
  .replace(/(\.|#|^)-/g, '$1')
  .replace(/-(\d)/g, '$1')

export default function kebabTransformer(file, api) {
  const j = api.jscodeshift;

  return j(file.source)
    .find(j.CallExpression, path => {
      return path.callee.name === "$" &&
        path.arguments.length === 1 &&
        path.arguments[0].type === "Literal"
    })
    .forEach(path => {
      path.value.arguments[0] =
        j.literal(changeKebab(path.value.arguments[0].value))
    })
    .toSource()
}
