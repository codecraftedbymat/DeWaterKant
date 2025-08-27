// Images aléatoires
const imgs=document.querySelectorAll('.background img');
imgs[Math.floor(Math.random()*imgs.length)].style.display='block';

// Tabs
const tabBtns=[...document.querySelectorAll('.tab-btn')];
const panels=[...document.querySelectorAll('.tab-panel')];
function activateTab(id){
  tabBtns.forEach(x=>x.classList.toggle('active',x.dataset.tab===id));
  panels.forEach(p=>p.classList.toggle('active',p.id===id));
  window.scrollTo({top:0,behavior:'smooth'});
}
tabBtns.forEach(b=>b.addEventListener('click',()=>activateTab(b.dataset.tab)));

// Recherche
const searchBox=document.getElementById('searchBox');
const searchToggle=document.getElementById('searchToggle');
const searchInput=document.getElementById('searchInput');
const searchNote=document.getElementById('searchNote');

// Routes vers autres pages
const SEARCH_ROUTES = [
  { url: 'index.html',   terms: ['accueil','home','start'] },
  { url: 'contact.html', terms: ['contact','adresse','address','email','mail','téléphone','telephone','phone','horaires','hours','hour'] }
];
function routeIfOtherLink(query){
  const q=query.trim().toLowerCase();
  for(const r of SEARCH_ROUTES){
    if(r.terms.some(t=>q.includes(t))){ window.location.href=r.url; return true; }
  }
  return false;
}

// Toggle input
if(searchToggle){
  searchToggle.addEventListener('click',()=>{
    searchBox.classList.toggle('open');
    if(searchBox.classList.contains('open')) searchInput.focus();
  });
}

// Fonction unique de recherche
window.runSearch=function(q){
  const query=(q||'').trim().toLowerCase();
  if(!query){
    // Reset
    document.querySelectorAll('.menu-item').forEach(i=>i.classList.remove('is-hidden'));
    document.querySelectorAll('.section-card').forEach(c=>c.classList.remove('is-hidden'));
    if(panels.length){
      panels.forEach((p,i)=>p.classList.toggle('active', i===0));
      tabBtns.forEach((b,i)=>b.classList.toggle('active', i===0));
    }
    searchNote?.classList.remove('visible');
    return;
  }
  searchNote?.classList.add('visible');
  panels.forEach(p=>p.classList.add('active'));
  tabBtns.forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('.section-card').forEach(section=>{
    let anyVisible=false;
    section.querySelectorAll('.menu-item').forEach(item=>{
      const name=(item.querySelector('.item-name')?.textContent||'').toLowerCase();
      const match=name.includes(query);
      item.classList.toggle('is-hidden',!match);
      if(match) anyVisible=true;
    });
    section.classList.toggle('is-hidden',!anyVisible);
  });
};

// Événements champ
if(searchInput){
  searchInput.addEventListener('input',e=>{
    const v=e.target.value;
    if(!v.trim()) window.runSearch('');
    else window.runSearch(v);
  });
  searchInput.addEventListener('keydown',e=>{
    if(e.key==='Enter'){
      const q=searchInput.value||'';
      if(!q.trim()) return;
      if(routeIfOtherLink(q)) return;
      window.runSearch(q);
    }
    if(e.key==='Escape'){
      searchInput.value='';
      window.runSearch('');
      searchInput.blur();
      searchBox?.classList.remove('open');
    }
  });
  const params=new URLSearchParams(location.search);
  const q=params.get('q');
  if(q){
    searchBox?.classList.add('open');
    searchInput.value=q;
    window.runSearch(q);
  }
}
