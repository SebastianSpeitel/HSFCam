"use strict";

var cachedFiles = [
    'index.html'
];

async function loadCache() {
    let cache = await caches.open('CACHE1');
    await cache.addAll(cachedFiles);
}

async function clearCache() {
    await caches.delete('CACHE1');
}

async function myFetch(request) {
    let response = await caches.match(request);
    if (typeof response === "undefined") response = await fetch(request);
    //if (typeof response === "undefined") response = await caches.match('offline.php');
    return response;
}

self.addEventListener('install', function (event) {
    console.log('Service worker installing');
    event.waitUntil(loadCache());
    /*if('PushManager' in window){
      swRegistration.pushManager.getSubscription().then(function(subscription) {
      isSubscribed = !(subscription === null);
  
      if (isSubscribed) {
        console.log('User IS subscribed.');
      } else {
        console.log('User is NOT subscribed.');
      }});
  	
    };*/
});

self.addEventListener('fetch', function (event) {
    //console.log('Fetch event for ', event.request.url);

    event.respondWith(myFetch(event.request));
});

//self.addEventListener('message', function (event) {
//    console.log("SW Received Message:", event);
//    switch (event.data) {
//        case "update": clearCache(); loadCache(); break;

//    }
//});