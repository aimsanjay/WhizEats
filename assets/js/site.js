/* =====================================================================
   WhizEats — shared behaviour for the responsive HTML pages
   - injects the icon sprite, header and footer (one source of truth)
   - dropdown + mobile menu, footer active links, toasts, modals, forms
   Each page sets <body data-page="..."> to mark the current page.
   ===================================================================== */
(function(){
'use strict';

const PHONE='+91 9830359903', TEL='tel:+919830359903', MAIL='info@wizardcomm.net', SITE='https://www.wizardcomm.net';
const MAPS='https://www.google.com/maps/search/?api=1&query=MP+Island+18+Kankurgachi+Road+Kolkata+700054';
const page=document.body.dataset.page||'';

/* ---------- icons (Lucide-style, 24×24, stroke) ---------- */
const ICONS={
  home:'<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>',
  'chev-down':'<path d="m6 9 6 6 6-6"/>',
  'chev-right':'<path d="m9 6 6 6-6 6"/>',
  arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  video:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m10 9 5 3-5 3z"/>',
  bulb:'<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.4 1.1 2.2h5c0-.8.4-1.6 1.1-2.2A6 6 0 0 0 12 3z"/>',
  plug:'<path d="M9 2v6M15 2v6M6 8h12v3a6 6 0 0 1-12 0zM12 17v5"/>',
  book:'<path d="M2 4h7a3 3 0 0 1 3 3v14a2 2 0 0 0-2-2H2zM22 4h-7a3 3 0 0 0-3 3v14a2 2 0 0 1 2-2h8z"/>',
  menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
  x:'<path d="M18 6 6 18M6 6l12 12"/>',
  check:'<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
  tick:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  shield:'<path d="M12 3 4 6v6c0 5 3.4 8.3 8 9 4.6-.7 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  lock:'<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a6.5 6.5 0 0 1 3.5 5.5"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  chart:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  trend:'<path d="m3 17 6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
  bars:'<path d="M5 21v-6M10 21V11M15 21v-8M20 21V6"/><path d="m4 9 5-4 5 3 6-5"/>',
  pie:'<path d="M21 12A9 9 0 1 1 12 3v9z"/><path d="M15 3.5A9 9 0 0 1 20.5 9H15z"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  smile:'<circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>',
  target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  chef:'<path d="M6 13.9A4 4 0 0 1 7.4 6a5 5 0 0 1 9.2 0A4 4 0 0 1 18 13.9V20H6z"/><path d="M6 17h12"/>',
  cloud:'<path d="M7 18a4.5 4.5 0 0 1-.6-8.95A6 6 0 0 1 18 8.5a4.75 4.75 0 0 1-.5 9.5z"/>',
  gear:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  monitor:'<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
  devices:'<rect x="2" y="5" width="13" height="10" rx="1.5"/><path d="M5 19h7"/><rect x="16" y="8" width="6" height="12" rx="1.5"/>',
  table:'<path d="M3 9h18M5 9v11M19 9v11M3 9l2-5h14l2 5"/>',
  utensils:'<path d="M4 3v7a3 3 0 0 0 6 0V3M7 3v18M17 21V3c-2.5 1-4 3.5-4 7h4"/>',
  receipt:'<path d="M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2z"/><path d="M9 8h6M9 12h6M9 16h3"/>',
  card:'<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M2.5 10h19M6.5 15h4"/>',
  box:'<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
  tag:'<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
  puzzle:'<path d="M9 3h4a2 2 0 1 1 4 0v0h2a2 2 0 0 1 2 2v3a2 2 0 1 0 0 4v3a2 2 0 0 1-2 2h-3a2 2 0 1 0-4 0H5a2 2 0 0 1-2-2v-3a2 2 0 1 0 0-4V5a2 2 0 0 1 2-2z"/>',
  rocket:'<path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2.2 2.2 0 0 0-2.9-.1z"/><path d="M12 15l-3-3a22 22 0 0 1 2-4A13 13 0 0 1 22 2c0 2.7-.8 7.5-6 11a22 22 0 0 1-4 2z"/><path d="M9 12H4s.5-3 2-4c1.6-1.1 5 0 5 0M12 15v5s3-.5 4-2c1.1-1.6 0-5 0-5"/>',
  handshake:'<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.9-3.9a3 3 0 0 0-4.2 0l-.9.9a1 1 0 1 1-3-3l2.8-2.8a5.8 5.8 0 0 1 7.1-.9l.5.3a2 2 0 0 0 1.4.3L21 4"/><path d="m21 3 1 11h-2M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3M3 4h8"/>',
  headset:'<path d="M3 14v-2a9 9 0 0 1 18 0v2"/><path d="M21 14v3a2 2 0 0 1-2 2h-1v-6h3zM3 14v3a2 2 0 0 0 2 2h1v-6H3z"/><path d="M18 19a4 4 0 0 1-4 3h-2"/>',
  phone:'<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  mail:'<rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="m3 6 9 7 9-7"/>',
  globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  pin:'<path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/>',
  heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/><path d="M3.5 12h4l2-3 3 6 2-3h6"/>',
  grad:'<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>',
  award:'<circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 8 5-3 5 3-1.5-8"/>',
  scale:'<path d="M12 3v18M5 21h14M3 7h18"/><path d="m6 7-3 7a3 3 0 0 0 6 0zM18 7l-3 7a3 3 0 0 0 6 0z"/>',
  store:'<path d="M3 9l1.5-5h15L21 9"/><path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0"/><path d="M5 12v9h14v-9M10 21v-5h4v5"/>',
  building:'<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M10 21v-3h4v3"/>',
  crown:'<path d="m3 7 4.5 4L12 4l4.5 7L21 7l-2 12H5z"/>',
  send:'<path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/>',
  chat:'<path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.4A8 8 0 1 1 21 12z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/>',
  coffee:'<path d="M17 8h1a4 4 0 0 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z"/><path d="M6 2v2M10 2v2M14 2v2"/>',
  cloche:'<path d="M3 18h18M4 18a8 8 0 0 1 16 0M12 6V4M10 4h4"/>',
  gem:'<path d="M6 3h12l4 6-10 12L2 9z"/><path d="M2 9h20M12 21 8 9l4-6 4 6z"/>',
  megaphone:'<path d="M3 11v3a1 1 0 0 0 1 1h3l5 4V6L7 10H4a1 1 0 0 0-1 1z"/><path d="M16 8a5 5 0 0 1 0 8M19 5a9 9 0 0 1 0 14"/>',
  trophy:'<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>',
  file:'<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>',
  share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>',
  refresh:'<path d="M21 12a9 9 0 0 1-15.5 6.2L3 16M3 12a9 9 0 0 1 15.5-6.2L21 8"/><path d="M21 3v5h-5M3 21v-5h5"/>',
  rupee:'<path d="M6 4h12M6 9h12M14 20 7 13h2a4.5 4.5 0 0 0 0-9"/>',
  play:'<path d="M8 5v14l11-7z"/>',
  playc:'<circle cx="12" cy="12" r="9"/><path d="m10 8.5 5.5 3.5-5.5 3.5z"/>',
  star:'<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9z"/>',
  layers:'<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
  bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17h4l3-6h4l1 6M13 11l-2-4H8M15 7h3"/>',
  clipboard:'<rect x="5" y="4" width="14" height="18" rx="2"/><path d="M9 4V3h6v1M9 10h6M9 14h6M9 18h3"/>',
  clip:'<path d="m21 11-8.5 8.5a5 5 0 0 1-7-7L14 4a3.5 3.5 0 0 1 5 5l-8.5 8.5a2 2 0 0 1-3-3L15 7"/>',
  zap:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  login:'<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/>',
  sparkle:'<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
  linkedin:'<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>',
  facebook:'<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  instagram:'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
  youtube:'<path d="M22.5 6.4a2.8 2.8 0 0 0-2-2C18.8 4 12 4 12 4s-6.8 0-8.5.4a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1 12a29 29 0 0 0 .5 5.6 2.8 2.8 0 0 0 2 2c1.7.4 8.5.4 8.5.4s6.8 0 8.5-.4a2.8 2.8 0 0 0 2-2A29 29 0 0 0 23 12a29 29 0 0 0-.5-5.6z"/><path d="m10 15 5-3-5-3z"/>',
};
const sprite=document.createElementNS('http://www.w3.org/2000/svg','svg');
sprite.setAttribute('aria-hidden','true'); sprite.style.cssText='position:absolute;width:0;height:0;overflow:hidden';
sprite.innerHTML=Object.entries(ICONS).map(([k,v])=>`<symbol id="i-${k}" viewBox="0 0 24 24">${v}</symbol>`).join('');
document.body.prepend(sprite);
const ic=(name,cls='')=>`<svg class="ic ${cls}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
window.ic=ic;
// pages write icons as <i data-ic="name"></i>
document.querySelectorAll('i[data-ic]').forEach(el=>{ el.outerHTML=ic(el.dataset.ic,el.className); });

/* ---------- navigation model ---------- */
const NAV=[
  {key:'home',label:'Home',href:'home.html'},
  {key:'features',label:'Features',href:'features.html'},
  {key:'solutions',label:'Solutions',href:'solutions.html',sub:[
    ['solutions','All Solutions','solutions.html','layers'],
    ['dine-in','Dine-in Restaurants','dine-in.html','utensils'],
    ['cafes','Cafés & Coffee Shops','cafes.html','coffee'],
    ['cloud-kitchen','Cloud Kitchens','cloud-kitchen.html','cloud']]},
  {key:'pricing',label:'Pricing',href:'pricing.html'},
  {key:'about',label:'About Us',href:'about.html',sub:[
    ['careers','Careers','careers.html','briefcase'],
    ['partner','Partner Program','partner.html','handshake']]},
  {key:'contact',label:'Contact',href:'contact.html'},
];
// which top-level item is highlighted for each page
const SECTION={'dine-in':'solutions',cafes:'solutions','cloud-kitchen':'solutions',careers:'about',partner:'about'};
const activeTop=SECTION[page]||page;

const header=document.createElement('header');
header.className='site-header';
header.innerHTML=`<div class="container nav">
  <a class="brand" href="home.html" aria-label="WhizEats home"><img src="apple-touch-icon.png" alt=""><span>Whiz<b>Eats</b></span></a>
  <ul class="menu" id="site-menu">
    ${NAV.map(n=>n.sub?`
      <li class="has-sub${n.key===activeTop?' active':''}">
        <div class="parent"><a href="${n.href}">${n.label}</a><button class="sub-toggle" aria-expanded="false" aria-label="Show ${n.label} menu">${ic('chev-down','chev')}</button></div>
        <ul class="dropdown">${n.sub.map(([k,l,h,i])=>`<li><a href="${h}"${k===page?' class="current" aria-current="page"':''}>${ic(i)}${l}</a></li>`).join('')}</ul>
      </li>`:`
      <li class="${n.key===activeTop?'active':''}"><a href="${n.href}"${n.key===page?' aria-current="page"':''}>${n.label}</a></li>`).join('')}
    <li class="mobile-cta"><a class="btn btn-primary btn-block" href="demo.html">Book a Demo ${ic('arrow')}</a></li>
  </ul>
  <a class="btn btn-primary nav-cta" href="demo.html">Book a Demo ${ic('arrow')}</a>
  <button class="nav-toggle" aria-controls="site-menu" aria-expanded="false" aria-label="Open menu">${ic('menu')}</button>
</div>`;
document.body.prepend(header);

// dropdowns: hover on desktop, tap the chevron on touch / mobile
const desktop=()=>window.matchMedia('(min-width:1025px)').matches;
header.querySelectorAll('.has-sub').forEach(li=>{
  const btn=li.querySelector('.sub-toggle'); let t;
  const set=open=>{li.classList.toggle('open',open); btn.setAttribute('aria-expanded',open);};
  li.addEventListener('mouseenter',()=>{ if(desktop()){clearTimeout(t); set(true);} });
  li.addEventListener('mouseleave',()=>{ if(desktop()) t=setTimeout(()=>set(false),150); });
  li.addEventListener('focusin',()=>{ if(desktop()) set(true); });
  li.addEventListener('focusout',e=>{ if(desktop() && !li.contains(e.relatedTarget)) set(false); });
  btn.addEventListener('click',e=>{ e.stopPropagation(); set(!li.classList.contains('open')); });
  if(!desktop() && li.classList.contains('active')) set(true);   // mobile: section of current page starts expanded
});
document.addEventListener('click',e=>{ if(desktop() && !e.target.closest('.has-sub')) header.querySelectorAll('.has-sub.open').forEach(li=>li.classList.remove('open')); });

const toggle=header.querySelector('.nav-toggle');
const setNav=open=>{ document.body.classList.toggle('nav-open',open); toggle.setAttribute('aria-expanded',open);
  toggle.innerHTML=ic(open?'x':'menu'); toggle.setAttribute('aria-label',open?'Close menu':'Open menu'); };
toggle.addEventListener('click',()=>setNav(!document.body.classList.contains('nav-open')));
window.addEventListener('resize',()=>{ if(desktop()) setNav(false); });

/* ---------- footer ---------- */
const FOOT=[
  {h:'Product',links:[['features','Features','features.html'],['solutions','Solutions','solutions.html'],['pricing','Pricing','pricing.html']]},
  {h:'Solutions',links:[['dine-in','Dine-in Restaurants','dine-in.html'],['cafes','Cafés & Coffee Shops','cafes.html'],['cloud-kitchen','Cloud Kitchens','cloud-kitchen.html']]},
  {h:'Resources',links:[['blog','Blog','blog.html'],['help','Help Center','help.html'],['cases','Case Studies','#','Case studies are coming soon.'],['guides','Guides','guides.html']]},
  {h:'About Us',href:'about.html',key:'about',links:[['careers','Careers','careers.html'],['partner','Partner Program','partner.html']]},
];
const LEGAL=[['privacy','Privacy Policy','privacy.html'],['terms','Terms of Service','terms.html'],['refund','Refund Policy','refund.html']];
const footLink=([k,l,h,soon])=>`<a href="${h}" data-key="${k}"${soon?` data-soon="${soon}"`:''}${k===page?' class="active" aria-current="page"':''}>${l}</a>`;
const footer=document.createElement('footer');
footer.className='site-footer';
footer.innerHTML=`<div class="container">
  <div class="footer-grid">
    <div class="footer-brand">
      <a class="logo" href="home.html"><img src="apple-touch-icon.png" alt="">WhizEats</a>
      <p>Smart Restaurant Back-Office &amp; Management System by Wizard Communication Limited.<br>Simplify operations. Delight customers. Grow your business.</p>
      <div class="socials">
        <a href="#" data-soon="Opens WhizEats on Facebook." aria-label="Facebook">${ic('facebook')}</a>
        <a href="#" data-soon="Opens WhizEats on Instagram." aria-label="Instagram">${ic('instagram')}</a>
        <a href="#" data-soon="Opens WhizEats on LinkedIn." aria-label="LinkedIn">${ic('linkedin')}</a>
        <a href="#" data-soon="Opens WhizEats on YouTube." aria-label="YouTube">${ic('youtube')}</a>
      </div>
    </div>
    ${FOOT.map(c=>`<div class="footer-col"><h4>${c.href?`<a href="${c.href}" data-key="${c.key}"${c.key===page?' class="active"':''}>${c.h}</a>`:c.h}</h4>
      <ul>${c.links.map(l=>`<li>${footLink(l)}</li>`).join('')}</ul></div>`).join('')}
    <div class="footer-col footer-contact"><h4>Contact Us</h4><ul>
      <li><a href="${TEL}">${ic('phone')}${PHONE}</a></li>
      <li><a href="mailto:${MAIL}">${ic('mail')}${MAIL}</a></li>
      <li><a href="${SITE}" target="_blank" rel="noopener">${ic('globe')}www.wizardcomm.net</a></li></ul></div>
  </div>
  <div class="footer-bottom">
    <span>© 2026 Wizard Communication Limited. All rights reserved.</span>
    <nav aria-label="Legal">${LEGAL.map(footLink).join('<span>|</span>')}</nav>
  </div>
</div>`;
document.body.append(footer);

// a clicked footer link turns red (and stays red on the page it opens)
footer.addEventListener('click',e=>{
  const a=e.target.closest('a[data-key]'); if(!a) return;
  footer.querySelectorAll('a.active').forEach(x=>x.classList.remove('active'));
  a.classList.add('active');
});

/* ---------- toast ---------- */
const toastEl=document.createElement('div'); toastEl.className='toast'; toastEl.setAttribute('role','status'); document.body.append(toastEl);
let tt;
function toast(msg){ toastEl.textContent=msg; toastEl.classList.add('show'); clearTimeout(tt); tt=setTimeout(()=>toastEl.classList.remove('show'),2800); }
window.toast=toast;
document.addEventListener('click',e=>{
  const a=e.target.closest('[data-soon]'); if(!a) return;
  e.preventDefault(); toast(a.dataset.soon);
});

/* ---------- modals ---------- */
const overlay=document.createElement('div');
overlay.className='modal-overlay'; overlay.innerHTML='<div class="modal" role="dialog" aria-modal="true"></div>';
document.body.append(overlay);
const modal=overlay.firstElementChild;
let lastFocus=null;
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const first=s=>esc(String(s||'').trim().split(/\s+/)[0]);
const PARTNER_TYPES=['Referral Partner','Implementation Partner','Technology Partner','Strategic Partner','Consulting Partner','Industry Partner'];

const field=(name,label,{type='text',req=true,ph='',opts=null,area=false}={})=>`
  <div class="field"><label for="m-${name}">${label}${req?' <i>*</i>':''}</label>
  ${opts?`<select class="input" id="m-${name}" name="${name}"${req?' required':''}><option value="">Select…</option>${opts.map(o=>`<option${o.sel?' selected':''}>${esc(o.v??o)}</option>`).join('')}</select>`
   :area?`<textarea class="input" id="m-${name}" name="${name}" placeholder="${ph}"${req?' required':''}></textarea>`
   :`<input class="input" id="m-${name}" name="${name}" type="${type}" placeholder="${ph}"${req?' required':''}>`}
  <div class="msg"></div></div>`;
const done=(title,body,actions)=>`<div class="done"><div class="icon-circle">${ic('tick')}</div><h2>${title}</h2><p>${body}</p><div class="actions">${actions}</div></div>`;

const MODALS={
  video:d=>`<span class="eyebrow">${ic('playc')} Product Tour</span><h2>${esc(d.title||'WhizEats Walkthrough')}</h2>
    <div class="video"><div class="play">${ic('play')}</div></div>
    <p class="sub">The recorded product tour is coming soon. Want to see it live? Book a personalised demo with our team.</p>
    <div class="actions"><button class="btn btn-ghost" data-close>Close</button><a class="btn btn-primary" href="demo.html">Book a Live Demo</a></div>`,
  apply:d=>`<span class="eyebrow">${ic('briefcase')} Careers</span><h2>${d.job?'Apply: '+esc(d.job):'Send Us Your Resume'}</h2>
    <p class="sub">${d.job?'Kolkata / Hybrid · Full-time. ':''}Tell us a bit about yourself and attach your resume.</p>
    <form class="form" data-form="apply" novalidate>
      ${field('name','Full Name',{ph:'Your full name'})}
      <div class="row">${field('email','Email',{type:'email',ph:'you@example.com'})}${field('phone','Phone Number',{type:'tel',ph:'+91'})}</div>
      ${field('link','LinkedIn / Portfolio URL',{req:false,ph:'https://'})}
      <label class="file-drop">${ic('clip')}<span>Attach resume (PDF, DOC)</span><input type="file" name="cv" accept=".pdf,.doc,.docx"></label>
      <input type="hidden" name="job" value="${esc(d.job||'General application')}">
      <button class="btn btn-primary btn-block" type="submit">Submit Application ${ic('arrow')}</button>
    </form>`,
  applyDone:d=>done('Application submitted!',`Thanks, ${first(d.name)}. Our hiring team will review your profile and get in touch if there’s a match.`,
    `<button class="btn btn-primary" data-close>Done</button>`),
  partner:d=>`<span class="eyebrow">${ic('handshake')} Partner Program</span><h2>Become a WhizEats Partner</h2>
    <p class="sub">Grow together with us. Share a few details and our partnerships team will contact you.</p>
    <form class="form" data-form="partner" novalidate>
      <div class="row">${field('name','Full Name')}${field('company','Company Name')}</div>
      <div class="row">${field('email','Work Email',{type:'email'})}${field('phone','Phone Number',{type:'tel'})}</div>
      ${field('ptype','Partnership Type',{opts:PARTNER_TYPES.map(v=>({v,sel:v===d.ptype}))})}
      ${field('msg','Tell us about your business',{req:false,area:true})}
      <button class="btn btn-primary btn-block" type="submit">Submit Application ${ic('arrow')}</button>
    </form>`,
  partnerDone:d=>done(`Welcome aboard, ${first(d.name)}!`,`Your <b>${esc(d.ptype)}</b> application for <b>${esc(d.company)}</b> has been received. Our partnerships team will contact you within 2 business days.`,
    `<button class="btn btn-primary" data-close>Done</button>`),
  login:()=>`<span class="eyebrow">${ic('login')} Partner Portal</span><h2>Partner Login</h2>
    <form class="form" data-form="login" novalidate style="margin-top:18px">
      ${field('email','Partner Email',{type:'email'})}${field('password','Password',{type:'password'})}
      <button class="btn btn-primary btn-block" type="submit">Sign In ${ic('arrow')}</button>
      <p class="privacy-note">Not a partner yet? <a href="#" data-modal="partner" class="accent"><b>Apply now</b></a></p>
    </form>`,
  demoDone:d=>done(`Thank you, ${first(d.name)}!`,`Your demo request for <b>${esc(d.company)}</b> has been received. A WhizEats product specialist will reach out at <b>${esc(d.email)}</b> within one business day.`,
    `<a class="btn btn-ghost" href="features.html">Explore Features</a><a class="btn btn-primary" href="home.html">Back to Home</a>`),
  contactDone:d=>done('Message sent!',`Thanks, ${first(d.name)}. Our team has received your message and will get back to you shortly at <b>${esc(d.email)}</b>.`,
    `<button class="btn btn-ghost" data-close>Close</button><a class="btn btn-primary" href="home.html">Back to Home</a>`),
};

function openModal(name,data={}){
  if(!overlay.classList.contains('open')) lastFocus=document.activeElement;
  modal.innerHTML=`<button class="close" data-close aria-label="Close">${ic('x')}</button>`+MODALS[name](data);
  overlay.classList.add('open'); document.body.style.overflow='hidden';
  const f=modal.querySelector('input:not([type=hidden]),select,button.btn,a.btn'); setTimeout(()=>f&&f.focus(),50);
  const file=modal.querySelector('input[type=file]');
  if(file) file.addEventListener('change',()=>{ file.previousElementSibling.textContent=file.files[0]?file.files[0].name:'Attach resume (PDF, DOC)'; });
}
function closeModal(){ overlay.classList.remove('open'); document.body.style.overflow=''; lastFocus&&lastFocus.focus&&lastFocus.focus(); }
window.openModal=openModal;
overlay.addEventListener('click',e=>{ if(e.target===overlay||e.target.closest('[data-close]')) closeModal(); });
document.addEventListener('keydown',e=>{ if(e.key==='Escape'){ if(overlay.classList.contains('open')) closeModal(); else setNav(false); } });
document.addEventListener('click',e=>{
  const t=e.target.closest('[data-modal]'); if(!t) return;
  e.preventDefault(); openModal(t.dataset.modal,{...t.dataset});
});

/* ---------- forms (page forms + modal forms) ---------- */
const MSG={required:'This field is required.',email:'Please enter a valid email address.',tel:'Please enter a valid phone number.'};
function validate(form){
  let firstBad=null;
  form.querySelectorAll('.field').forEach(f=>{
    const el=f.querySelector('.input'); if(!el) return;
    const v=el.value.trim(); let err='';
    if(el.required && !v) err=MSG.required;
    else if(v && el.type==='email' && !/^\S+@\S+\.\S+$/.test(v)) err=MSG.email;
    else if(v && el.type==='tel' && v.replace(/\D/g,'').length<8) err=MSG.tel;
    f.classList.toggle('err',!!err); f.querySelector('.msg').textContent=err;
    if(err && !firstBad) firstBad=el;
  });
  if(firstBad){ firstBad.focus(); return false; }
  return true;
}
document.addEventListener('input',e=>{ const f=e.target.closest('.field.err'); if(f && e.target.value.trim()) f.classList.remove('err'); });
document.addEventListener('submit',e=>{
  const form=e.target.closest('form[data-form]'); if(!form) return;
  e.preventDefault();
  if(!validate(form)) return;
  const kind=form.dataset.form, data=Object.fromEntries(new FormData(form));
  if(kind==='login'){ closeModal(); toast('Partner portal is coming soon — thanks for signing in!'); return; }
  if(!form.closest('.modal')) form.reset();
  openModal(kind+'Done',data);
});

// Book a Demo: prefill the requirement note from ?plan=
const plan=new URLSearchParams(location.search).get('plan');
const notes=document.querySelector('form[data-form="demo"] [name="notes"]');
if(plan && notes) notes.value=`Interested in the ${plan} plan.`;

/* ---------- article lists: category filters + live search ----------
   <div data-list> holds .post cards with data-cat and searchable text;
   .filters buttons carry data-cat ('' = all); input[data-search] filters by text. */
document.querySelectorAll('[data-list]').forEach(list=>{
  const scope=list.closest('section')||document;
  const items=[...list.querySelectorAll('.post')];
  const empty=scope.querySelector('.empty');
  const inputs=document.querySelectorAll(`input[data-search="${list.id}"]`);
  let cat='', q='';
  const apply=()=>{
    let shown=0;
    items.forEach(it=>{
      const ok=(!cat||it.dataset.cat===cat) && (!q||it.textContent.toLowerCase().includes(q));
      it.hidden=!ok; if(ok) shown++;
    });
    if(empty) empty.classList.toggle('show',!shown);
  };
  scope.querySelectorAll('.filters button').forEach(b=>b.addEventListener('click',()=>{
    scope.querySelectorAll('.filters button').forEach(x=>{x.classList.remove('on');x.setAttribute('aria-pressed','false');});
    b.classList.add('on'); b.setAttribute('aria-pressed','true'); cat=b.dataset.cat||''; apply();
  }));
  inputs.forEach(inp=>{
    inp.addEventListener('input',()=>{ q=inp.value.trim().toLowerCase(); apply(); });
    const form=inp.closest('form');
    if(form) form.addEventListener('submit',e=>{ e.preventDefault(); q=inp.value.trim().toLowerCase(); apply();
      list.scrollIntoView({behavior:'smooth',block:'start'}); });
  });
});

// newsletter sign-up (blog)
document.querySelectorAll('form[data-subscribe]').forEach(f=>f.addEventListener('submit',e=>{
  e.preventDefault(); const em=f.querySelector('input[type=email]');
  if(!/^\S+@\S+\.\S+$/.test(em.value.trim())){ em.focus(); toast('Please enter a valid email address.'); return; }
  f.reset(); toast('Thanks for subscribing! You’ll get our next update by email.');
}));

/* ---------- reveal on scroll ---------- */
const reveals=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>es.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target);} }),{threshold:.12});
  reveals.forEach(el=>io.observe(el));
} else reveals.forEach(el=>el.classList.add('in'));

// everything is in place: show the page (see body.preload in site.css)
requestAnimationFrame(()=>document.body.classList.remove('preload'));

})();
