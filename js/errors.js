/* JAMS Fitness · error reporting. Loaded first so problems on people's phones are reported
   (message, file, line, screen, app version, device type only, with no personal data). */
const APP_VERSION='2026.10.30';
(()=>{let n=0;
  const send=(m,s,l)=>{if(n++>=5)return;try{const body=JSON.stringify({m:String(m||'').slice(0,300),s:String(s||'').split('/').pop().slice(0,60),l:l|0,r:String(self.__r||''),v:APP_VERSION,
    d:((navigator.userAgent.match(/iPhone|iPad|Android|Macintosh|Windows|Linux/)||['other'])[0])});
    if(navigator.sendBeacon)navigator.sendBeacon('api/log',new Blob([body],{type:'application/json'}));else fetch('api/log',{method:'POST',headers:{'content-type':'application/json'},body,keepalive:true})}catch(e){}};
  addEventListener('error',e=>send(e.message,e.filename,e.lineno));
  addEventListener('unhandledrejection',e=>send('Unhandled: '+((e.reason&&e.reason.message)||e.reason)));
})();
