// PENDIENTE: WhatsApp real de la clínica (formato 549341XXXXXXX). También está en index.html y bot.js.
const PHONE='5493410000000';
const whatsappUrl=message=>`https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;

// Ubicación: 3 de Febrero 1080 (coordenadas del perfil de Google Maps de la clínica).
const clinic={name:'Bartolozzi Clínica Odontológica',address:'3 de Febrero 1080, Rosario',coords:[-32.95279,-60.63946]};
document.querySelector('#sede-turno').href=whatsappUrl('Hola, Bartolozzi. Quisiera pedir un turno.');
if(typeof L!=='undefined'){
 const map=L.map('real-map',{scrollWheelZoom:false}).setView(clinic.coords,16);
 const tiles=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
 tiles.on('tileerror',()=>{document.querySelector('#map-error').hidden=false;});
 tiles.on('tileload',()=>{document.querySelector('#map-error').hidden=true;});
 const marker=L.marker(clinic.coords,{icon:L.divIcon({className:'sede-marker selected',html:'<span><b>B</b></span>',iconSize:[40,40],iconAnchor:[20,40],popupAnchor:[0,-36]}),title:clinic.name,alt:clinic.name,keyboard:true}).addTo(map);
 marker.bindPopup(`<strong>${clinic.name}</strong><br>${clinic.address}`);
}else{document.querySelector('#map-error').hidden=false;}

// Consulta de obra social
document.querySelector('#coverage-form').addEventListener('submit',event=>{
 event.preventDefault();
 const value=document.querySelector('#obra-social').value.trim();
 if(!value){return;}
 window.open(whatsappUrl(`Hola, Bartolozzi. Quisiera saber si atienden con ${value}.`),'_blank','noopener');
});

// Formulario de turno: arma el mensaje y lo abre en WhatsApp.
document.querySelector('#form').addEventListener('submit',event=>{
 event.preventDefault();
 const name=document.querySelector('#nombre').value.trim();
 const reason=document.querySelector('#motivo').value.trim();
 if(!name||!reason){return;}
 const text=`Hola, Bartolozzi. Soy ${name} y quisiera pedir un turno.\n\nCobertura: ${document.querySelector('#cobertura-form').value}\nMotivo: ${reason}\n\n¿Qué días y horarios tienen disponibles?`;
 document.querySelector('#message').textContent=text;
 document.querySelector('#send-whatsapp').href=whatsappUrl(text);
 document.querySelector('#result').hidden=false;
 document.querySelector('#copy-status').textContent='';
});
document.querySelector('#copy').addEventListener('click',async()=>{
 try{await navigator.clipboard.writeText(document.querySelector('#message').textContent);document.querySelector('#copy-status').textContent='Mensaje copiado.';}
 catch{document.querySelector('#copy-status').textContent='No se pudo copiar automáticamente. Podés seleccionar y copiar el texto.';}
});

// Hero: la muela se inclina siguiendo el mouse y los números cuentan al cargar.
(()=>{
 const stage=document.querySelector('.hero-stage'),tilt=document.querySelector('.stage-tilt');
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(!stage||reduce){return;}
 const hero=document.querySelector('.hero-shell');
 hero.addEventListener('pointermove',event=>{
  const box=stage.getBoundingClientRect();
  const x=(event.clientX-box.left)/box.width-.5,y=(event.clientY-box.top)/box.height-.5;
  tilt.style.setProperty('--ry',`${Math.max(-1,Math.min(1,x))*6}deg`);
  tilt.style.setProperty('--rx',`${Math.max(-1,Math.min(1,y))*-5}deg`);
 });
 hero.addEventListener('pointerleave',()=>{tilt.style.setProperty('--ry','0deg');tilt.style.setProperty('--rx','0deg');});
 document.querySelectorAll('[data-count]').forEach(item=>{
  const target=Number(item.dataset.count),start=performance.now()+500;
  const step=now=>{const t=Math.min(1,Math.max(0,(now-start)/1200));item.textContent=String(Math.round(target*(1-Math.pow(1-t,3))));if(t<1){requestAnimationFrame(step);}};
  item.textContent='0';requestAnimationFrame(step);
 });
})();

// Selector de tipografía de la propuesta: A Fraunces · B Bricolage Grotesque · C Newsreader (texto: Onest).
(()=>{
 const buttons=document.querySelectorAll('[data-font-set]');
 function apply(set){
  document.documentElement.dataset.fonts=set;
  buttons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.fontSet===set)));
  try{localStorage.setItem('kder-fonts',set);}catch{}
 }
 let saved='a';
 try{saved=localStorage.getItem('kder-fonts')||'a';}catch{}
 apply(saved);
 buttons.forEach(button=>button.addEventListener('click',()=>apply(button.dataset.fontSet)));
})();

// Selector de paleta de la propuesta: menta · océano · lavanda · salvia.
(()=>{
 const buttons=document.querySelectorAll('[data-palette-set]');
 const theme=document.querySelector('meta[name="theme-color"]');
 function apply(set){
  document.documentElement.dataset.palette=set;
  buttons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.paletteSet===set)));
  if(theme){theme.content=getComputedStyle(document.documentElement).getPropertyValue('--brand').trim();}
  try{localStorage.setItem('kder-palette',set);}catch{}
 }
 let saved='menta';
 try{saved=localStorage.getItem('kder-palette')||'menta';}catch{}
 apply(saved);
 buttons.forEach(button=>button.addEventListener('click',()=>apply(button.dataset.paletteSet)));
})();
