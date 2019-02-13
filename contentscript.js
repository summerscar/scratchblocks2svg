console.log('注入成功')

chrome.extension.onMessage.addListener(
    function(request, sender, sendMessage) {
        console.log(request)

        let svg = document.createElement('svg')
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
        svg.setAttribute('xmlns:html', 'http://www.w3.org/1999/xhtml')
        svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink')
        svg.setAttribute('version', '1.1')

        let style = document.createElement('style')
        style.innerHTML =
`
.blocklyText {
    fill: #fff;
    font-family: "Helvetica Neue", Helvetica, sans-serif;
    font-size: 12pt;
    font-weight: 500;
}
.blocklyNonEditableText>text, .blocklyEditableText>text {
    fill: #575E75;
}
`

        let svgchild = document.querySelector('svg.blocklySvg g.blocklySelected')
        if (!svgchild) alert('先点击需要导出的block')
        svgchild = svgchild.cloneNode(true)
        svgchild.setAttribute('transform', 'translate(0,0)')
        svg.append(style)
        svg.append(svgchild)
        // svg.innerHTML = svg.innerHTML.replace('&nbsp;', ' ')
        console.log(svg)

        let tmp = document.createElement('div')
        tmp.appendChild(svg);

        exportData(tmp.innerHTML)
        sendMessage({command: 'ok'})
});

function exportData(text) {
    const saveLink = document.createElement('a')
    document.body.appendChild(saveLink)

    const data = new Blob([text], { type: 'text' })
    const url = window.URL.createObjectURL(data)
    saveLink.href = url

    // File name: project-DATE-TIME
    const date = new Date()
    const timestamp = `${date.toLocaleDateString()}-${date.toLocaleTimeString()}`
    saveLink.download = `block.${timestamp}.svg`
    saveLink.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(saveLink)
}