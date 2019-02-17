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
.blocklyDropdownText {
    fill: #fff !important;
}
`
        if (request.command === 'export1') {
            let svgchild = document.querySelector('svg.blocklySvg g.blocklySelected')
            if (!svgchild) alert('先点击需要导出的block')
            svgchild = svgchild.cloneNode(true)
            svgchild.setAttribute('transform', 'translate(0,0)')
            svg.append(style)
            svg.append(svgchild)

        } else {
            let svgchild = document.querySelector('svg.blocklySvg g.blocklyBlockCanvas')
            svgchild = svgchild.cloneNode(true)
            svgchild.setAttribute('transform', 'translate(0,0)')
            svg.append(style)
            svg.append(svgchild)
        }
        // 处理 nbsp 空格
        let texts = Array.from(svg.getElementsByTagName('text'))
        texts.forEach(text => {
            text.innerHTML = text.innerHTML.replace(/&nbsp;/, ' ')
        })
        // 处理image 路径
		let scratchURL = window.location.origin
		//let scratchURL = 'https://scratch3.codelab.club/'
        let images = Array.from(svg.getElementsByTagName('image'))
        images.forEach(item => {
            if (item.getAttribute('xlink:href').indexOf('/static/') === 0) {
                item.setAttribute('xlink:href', scratchURL + item.getAttribute('xlink:href').slice(0))
            } else if (item.getAttribute('xlink:href').indexOf('./static/') === 0) {
                item.setAttribute('xlink:href', scratchURL + item.getAttribute('xlink:href').slice(1))
            }
        })
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