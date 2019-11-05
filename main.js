let btn1 = document.getElementById('export1')
let btn2 = document.getElementById('export2')
let btn3 = document.getElementById('export3')
let btn4 = document.getElementById('export4')

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

btn3.onclick = function() {
    chrome.tabs.getSelected(null, function (tab) {
        chrome.tabs.sendMessage(tab.id, {command: "export3"}, function(response) {
            console.log(response)
        });
    })
}

btn4.onclick = function() {
    chrome.tabs.getSelected(null, function (tab) {
        chrome.tabs.sendMessage(tab.id, {command: "export4"}, function(response) {
            console.log(response)
        });
    })
}
