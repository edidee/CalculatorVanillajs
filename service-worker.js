// installation
self.addEventListener('install', e => {

    let CACHE_NAME = 'static';
    let urlsToCache = [
        './', 
        './index.html', 
        './style.css',
        './android-chrome-512x512.png',
        './andriod-chrome-192x192.png',
        './main.js'
    ]

   e.waitUntil(
       caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)
       )
   );
});

// Activation
self.addEventListener('activate', e => {
    let cacheWhitelist = ['products-v2']

    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map( cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName)
                    }
                })
            )
        })
    )
})

self.addEventListener('activate', (e) => {
    self.skipWaiting()
})





// fetch
self.addEventListener('fetch', e => {
   e.respondWith(
       caches.open('products-v2').then(cache => {
           return cache.match(e.request).then(response => {
               if (response) {
                   console.log('Cache hit! Fetching response from cache', e.request.url)
                   return response
               }

               fetch(e.request).then(response => {
                   cache.put(e.request, response.clone())
                   return response
               })
           })
       })
       
   );
}); 


// push notification
if (Notification.permission === 'default') {

    Notification.requestPermission().then(result => {
        if (result === 'denied') {
            console.log('Permission denied')
            return
        }

        if (result === 'granted') {
            console.log('Permission granted')

            ServiceWorkerRegistration.pushManager.getSubscription().then (subscription => {
                if (!subscription) {
                    const applicationServerKey = ''
                    ServiceWorkerRegistration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey
                    })
                } else {
                    saveSubscriptionInDB(subscription, userId)
                }
            })
        }
    })
}