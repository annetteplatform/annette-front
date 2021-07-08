export default (md) => {
  const temp = md.renderer.rules.fence.bind(md.renderer.rules)
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx]
    if (token.info === 'echarts5') {
      const code = token.content.trim()
      try {
        const json = JSON.parse(code)
        const width = json.width || 900
        const height = json.height || 500
        json.height = undefined
        json.width = undefined
        console.log(json)
        return `<div style="width:${width}px;height:${height}px" class="md-echarts5">${JSON.stringify(json)}</div>`
      } catch (e) { // JSON.parse exception
        return `<pre>${e}</pre>`
      }
    }
    return temp(tokens, idx, options, env, slf)
  }
}
