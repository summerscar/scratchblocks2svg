let btn = document.getElementById('export')

var msg = {
    data : "This is a message sent from the background-script to the browser-action-popup",
    type : "notifyPopupOfMessage"
};

btn.onclick = function() {
    chrome.tabs.getSelected(null, function (tab) {
        chrome.tabs.sendMessage(tab.id, {command: "exportSvg"}, function(response) {
            console.log(response)
        });
    })
}
