const CACHE_NAME = 'site-cache'
const URLS = [
  '/',
]

const startServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js")
    })
  }
}

startServiceWorker()

this?.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => {
      return cache.addAll(URLS)
    })
  )
})

this?.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response
        }
        const fetchRequest = event.request.clone()

        return fetch(fetchRequest)
        
      .then(response => {
        if(!response || response.status !== 200 || response.type !== 'basic') {
          return response
        } 
        const responseToCache = response.clone()
        caches.open(CACHE_NAME)
        .then(cache => {
            cache.put(event.request, responseToCache)
        })
        return response
      })
    })
  )
})
