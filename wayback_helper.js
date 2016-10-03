var wayback_machine_url = 'https://web.archive.org/web';

chrome.contextMenus.create({
    id: 'wayback-get-latest',
    title: 'Get the latest archived copy',
    contexts: ['all']
});

chrome.contextMenus.create({
    id: 'wayback-search',
    title: 'Search for archived copies',
    contexts: ['all']
});

function waybackSearch(tab) {
    console.log('Performing archive search');
    // Wildcard search
    var wayback_url = wayback_machine_url + '/*/' + tab.url;
    console.log('> ' + wayback_url);
    chrome.tabs.update(tab.id, {url: wayback_url});
}

function waybackLatest(tab) {
    console.log('Looking up the newest archive');
    // Try to access a page whose date is the first day of next year
    var date = new Date();
    var future_date = (date.getFullYear() + 1) + '0001000000';
    var wayback_url = wayback_machine_url + '/' + future_date + '/' + tab.url;
    console.log('> ' + wayback_url);
    chrome.tabs.update(tab.id, {url: wayback_url});
}

function contextClick(info, tab) {
    switch(info.menuItemId) {
        case('wayback-search'):
            waybackSearch(tab);
            break;
        case('wayback-get-latest'):
            waybackLatest(tab);
            break;
    }
}

//chrome.contextMenus.remove('wayback');
chrome.contextMenus.onClicked.addListener(contextClick);
console.log('Addon loaded!');

