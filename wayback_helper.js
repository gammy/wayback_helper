var wayback_machine_url = 'https://web.archive.org/web';

chrome.contextMenus.create({
    id: 'wayback-get-newest',
    title: 'Go to newest',
    contexts: ['all']
});

chrome.contextMenus.create({
    id: 'wayback-get-oldest',
    title: 'Go to oldest',
    contexts: ['all']
});

chrome.contextMenus.create({
    id: 'wayback-search',
    title: 'Search the archive',
    contexts: ['all']
});

function waybackSearch(tab) {
    console.log('Performing archive search');
    // Wildcard search
    var wayback_url = wayback_machine_url + '/*/' + tab.url;
    console.log('> ' + wayback_url);
    chrome.tabs.update(tab.id, {url: wayback_url});
}

function waybackOldest(tab) {
    console.log('Looking up the earliest archive');
    var wayback_url = wayback_machine_url + '/0/' + tab.url;
    console.log('> ' + wayback_url);
    chrome.tabs.update(tab.id, {url: wayback_url});
}

function waybackNewest(tab) {
    console.log('Looking up the newest archive');
    // Try to access a page whose date is the first day of next year
    var date = new Date();
    var future_date = (date.getFullYear() + 1) + '0101000000';
    var wayback_url = wayback_machine_url + '/' + future_date + '/' + tab.url;
    console.log('> ' + wayback_url);
    chrome.tabs.update(tab.id, {url: wayback_url});
}

function contextClick(info, tab) {
    switch(info.menuItemId) {
        case('wayback-search'):
            waybackSearch(tab);
            break;
        case('wayback-get-oldest'):
            waybackOldest(tab);
            break;
        case('wayback-get-newest'):
            waybackNewest(tab);
            break;
    }
}

//chrome.contextMenus.remove('wayback');
chrome.contextMenus.onClicked.addListener(contextClick);
console.log('Addon loaded!');

