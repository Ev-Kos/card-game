const CACHE_NAME = 'site-cache'
const URLS = [
  '/',
  '/index.html',
]

const startServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").then(registration => {
        console.log("ServiceWorker registration successful with scope: ", registration.scope)
      }).catch((error) => {
        console.log("ServiceWorker registration failed: ", error)
      })
    })
  }
}

startServiceWorker()

this?.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => {
      console.log("Opened cache")
      return cache.addAll(URLS)
    })
    .catch(err => {
      console.log(err)
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
      .catch(e => console.log(e))
    })
  )
})
