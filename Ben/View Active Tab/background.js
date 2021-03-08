/**
 * Every time the active tab is changed the url and time is saved in local storage
 * @author Benjamin Sheth
 */
chrome.tabs.onActivated.addListener(function() {
    chrome.tabs.query({
        'active': true
    },
    function(tabs) {
        chrome.storage.local.get(["items"], function(object) { // To append to storage you must
            var history = object.items;                        // first retrieve it
            var activeTab = {
                'url': tabs[0].url,
                'time': (new Date()).getTime()
            };
            if (typeof(history) === "undefined") { // On a fresh install storage will be empty
                history = new Array();             // so history must be initialized in that case
            }
            history.push(activeTab);

            chrome.storage.local.set({items: history});
            history = null;
        });
    });
});