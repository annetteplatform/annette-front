export default (md) => {
  console.log('echarts1')
  const temp = md.renderer.rules.fence.bind(md.renderer.rules)
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx]
    console.log('echarts2')
    if (token.info === 'echarts5') {
      const code = token.content.trim()
      try {
        const json = JSON.parse(code)
        const width = json.width || 500
        const height = json.height || 400
        return `<div style="width:${width}px;height:${height}px" class="md-echarts5">${JSON.stringify(json)}</div>`
      } catch (e) { // JSON.parse exception
        return `<pre>${e}</pre>`
      }
    }
    return temp(tokens, idx, options, env, slf)
  }
}
