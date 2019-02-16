let btn1 = document.getElementById('export1')
let btn2 = document.getElementById('export2')

btn1.onclick = function() {
    chrome.tabs.getSelected(null, function (tab) {
        chrome.tabs.sendMessage(tab.id, {command: "export1"}, function(response) {
            console.log(response)
        });
    })
}

btn2.onclick = function() {
    chrome.tabs.getSelected(null, function (tab) {
        chrome.tabs.sendMessage(tab.id, {command: "export2"}, function(response) {
            console.log(response)
        });
    })
}
