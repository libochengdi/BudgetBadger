// Every time active tab is changed start a timer and save it
// TODO add timer
// TODO add AFK test
chrome.tabs.onActivated.addListener(function() {
    chrome.tabs.query({
        'active': true
    },
    function(tabs) {
        var url = tabs[0].url;
        // TODO add local storage so that activity can be viewed from popup.html
        var textNode = document.createTextNode(url);
        var node = document.createElement("LI");
        node.appendChild(textNode);
        document.getElementById("myList").appendChild(node);
    });
});