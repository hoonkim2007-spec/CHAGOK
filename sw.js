// CHAGOK 오프라인 저장 장치 — 버전이 바뀌면 새로 받아 두었다가, 학생이 '지금 바꾸기'를 누르면 바꾼다
const VERSION="chagok-2bf8577492";
const FILES=["./", "index.html", "study.html", "plan.html", "fonts.css", "manifest.webmanifest", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "apple-touch-icon.png"];
self.addEventListener("install",e=>{ e.waitUntil(caches.open(VERSION).then(c=>c.addAll(FILES.map(f=>new Request(f,{cache:"reload"}))))); });
self.addEventListener("activate",e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener("message",e=>{ if(e.data==="skipWaiting") self.skipWaiting(); });
self.addEventListener("fetch",e=>{
  const r=e.request; if(r.method!=="GET" || new URL(r.url).origin!==location.origin) return;
  e.respondWith(caches.open(VERSION).then(c=>c.match(r,{ignoreSearch:true}).then(hit=>hit || (r.mode==="navigate" ? c.match("./") : null) || fetch(r))));
});
