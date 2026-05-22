'use strict';

const seedPosts = [
  {id:'ai-campus',title:'How AI Is Quietly Changing Student Life',category:'AI',author:'Naba Imran',email:'naba@example.com',bio:'Cybersecurity student and student media creator.',excerpt:'From study planning to research support, AI is becoming part of how students learn, revise and create.',content:'Artificial intelligence is no longer something students only read about in lecture slides. It is now part of daily academic life. Students use AI to brainstorm ideas, explain difficult topics, organise notes, and prepare for presentations. The real value is not replacing effort, but improving the way students think and learn. Used responsibly, AI can help students become more confident, curious and independent learners. The challenge is learning how to use it ethically, check its output, and still keep your own voice in the work.',image:'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&auto=format&fit=crop&q=85',date:'2026-05-20',status:'published',views:412},
  {id:'cyber-everyday',title:'Cybersecurity Habits Every Student Should Know',category:'Cybersecurity',author:'Mariam Ali',email:'mariam@example.com',bio:'Digital safety writer and computing student.',excerpt:'Strong passwords, phishing awareness and privacy basics can protect your student life more than you think.',content:'Cybersecurity does not start with advanced hacking tools. It starts with everyday habits. Students should use unique passwords, enable multi-factor authentication, avoid suspicious links, and update their devices regularly. Public Wi-Fi should be used carefully, especially when logging into university portals or banking apps. Good security is not about fear. It is about being aware, prepared and consistent with small protective actions.',image:'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop&q=85',date:'2026-05-18',status:'published',views:366},
  {id:'internship-confidence',title:'What My First Internship Taught Me About Confidence',category:'Careers',author:'Sara Khan',email:'sara@example.com',bio:'Student writer focused on careers and personal growth.',excerpt:'Internships are not just about experience. They teach you how to speak, solve and show up.',content:'A first internship can feel intimidating because you are suddenly expected to act professionally while still learning. The biggest lesson is that confidence grows through responsibility. You learn how to ask better questions, manage tasks, communicate clearly and recover from mistakes. Every small task becomes proof that you are capable of more than you thought.',image:'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&auto=format&fit=crop&q=85',date:'2026-05-15',status:'published',views:294},
  {id:'digital-culture',title:'Why Digital Culture Shapes How We Think',category:'Culture',author:'Omar Hassan',email:'omar@example.com',bio:'Writer exploring internet culture and modern identity.',excerpt:'Memes, trends and social platforms are not just entertainment. They shape language, behaviour and identity.',content:'Digital culture moves fast, but its impact is deep. The way people speak, joke, learn and express opinions is shaped by online spaces. Trends can create community, but they can also create pressure. Understanding digital culture helps us become more intentional about what we consume, share and believe.',image:'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=85',date:'2026-05-12',status:'published',views:231}
];

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

function getPosts(){
  const saved = localStorage.getItem('voiceshub_posts');
  if(!saved){ localStorage.setItem('voiceshub_posts', JSON.stringify(seedPosts)); return seedPosts; }
  return JSON.parse(saved);
}
function savePosts(posts){ localStorage.setItem('voiceshub_posts', JSON.stringify(posts)); }
function slugify(text){ return text.toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''); }
function readingTime(content){ return Math.max(1, Math.ceil((content||'').split(/\s+/).length / 200)); }
function fmtDate(date){ return new Date(date).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}); }
function esc(str=''){ return str.replace(/[&<>'"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }

function initNav(){
  const nav = $('#mainNav'), burger = $('#burgerBtn'), menu = $('#mobileMenu');
  window.addEventListener('scroll',()=>nav?.classList.toggle('nav--scrolled', scrollY>30),{passive:true});
  burger?.addEventListener('click',()=>{menu.classList.toggle('is-open'); burger.setAttribute('aria-expanded', menu.classList.contains('is-open'));});
  $('#themeToggle')?.addEventListener('click',()=>{document.body.classList.toggle('dark'); localStorage.setItem('voiceshub_theme', document.body.classList.contains('dark')?'dark':'light');});
  if(localStorage.getItem('voiceshub_theme')==='dark') document.body.classList.add('dark');
}
function initReveal(){
  const items = $$('.scroll-reveal');
  if(!('IntersectionObserver' in window)){items.forEach(i=>i.classList.add('is-visible'));return;}
  const io = new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target);}}),{threshold:.12});
  items.forEach(i=>io.observe(i));
}

function card(post, large=false){
  return `<article class="post-card ${large?'large':''} scroll-reveal">
    <a href="article.html?id=${post.id}"><img src="${esc(post.image)}" alt="${esc(post.title)}"></a>
    <div class="post-body"><span class="pill">${esc(post.category)}</span><h3><a href="article.html?id=${post.id}">${esc(post.title)}</a></h3>
    <div class="meta"><span>By ${esc(post.author)}</span><span>${fmtDate(post.date)}</span><span>${readingTime(post.content)} min read</span><span>${post.views||0} views</span></div>
    <p>${esc(post.excerpt)}</p></div></article>`;
}
function initHome(){
  const wrap = $('#featuredPosts'); if(!wrap) return;
  const posts = getPosts().filter(p=>p.status==='published').sort((a,b)=>(b.views||0)-(a.views||0));
  $('#statPosts').textContent = posts.length;
  $('#statAuthors').textContent = new Set(posts.map(p=>p.email)).size;
  wrap.innerHTML = posts.length ? `${card(posts[0],true)}<div class="side-stack">${posts.slice(1,4).map(p=>card(p)).join('')}</div>` : '<p>No published posts yet.</p>';
  initReveal();
}
function initArticles(){
  const grid = $('#articlesGrid'); if(!grid) return;
  const search = $('#articleSearch'), cat = $('#categoryFilter'), sort = $('#sortFilter'), empty = $('#emptyState');
  const params = new URLSearchParams(location.search); if(params.get('category')) cat.value = params.get('category');
  function render(){
    let posts = getPosts().filter(p=>p.status==='published');
    const q = search.value.toLowerCase();
    if(q) posts = posts.filter(p=>(p.title+p.excerpt+p.content+p.author).toLowerCase().includes(q));
    if(cat.value !== 'All') posts = posts.filter(p=>p.category===cat.value);
    if(sort.value==='views') posts.sort((a,b)=>(b.views||0)-(a.views||0));
    if(sort.value==='az') posts.sort((a,b)=>a.title.localeCompare(b.title));
    if(sort.value==='newest') posts.sort((a,b)=>new Date(b.date)-new Date(a.date));
    grid.innerHTML = posts.map(p=>card(p)).join(''); empty.style.display = posts.length ? 'none':'block'; initReveal();
  }
  [search,cat,sort].forEach(el=>el.addEventListener('input',render)); render();
}
function initSubmit(){
  const form = $('#submitPostForm'); if(!form) return;
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const posts = getPosts();
    const title = $('#postTitle').value.trim();
    const post = {id: slugify(title)+'-'+Date.now().toString().slice(-4), title, category:$('#postCategory').value, author:$('#authorName').value.trim(), email:$('#authorEmail').value.trim(), bio:$('#authorBio').value.trim(), excerpt:$('#postExcerpt').value.trim(), content:$('#postContent').value.trim(), image:$('#postImage').value.trim() || 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&auto=format&fit=crop&q=85', date:new Date().toISOString().slice(0,10), status:'pending', views:0};
    posts.unshift(post); savePosts(posts); form.reset(); $('#submitMsg').textContent = 'Submitted! Your article is now pending review in the dashboard.';
  });
}
function initAuthors(){
  const grid = $('#authorsGrid'); if(!grid) return;
  const posts = getPosts().filter(p=>p.status==='published');
  const map = {};
  posts.forEach(p=>{ if(!map[p.email]) map[p.email]={name:p.author,bio:p.bio,email:p.email,count:0,cats:new Set()}; map[p.email].count++; map[p.email].cats.add(p.category); });
  grid.innerHTML = Object.values(map).map(a=>`<article class="author-card"><div class="avatar">${esc(a.name[0]||'A')}</div><h3>${esc(a.name)}</h3><p>${esc(a.bio)}</p><div class="meta"><span>${a.count} article${a.count>1?'s':''}</span><span>${[...a.cats].join(', ')}</span></div></article>`).join('') || '<p>No authors yet.</p>';
}
function initArticlePage(){
  const root = $('#articlePage'); if(!root) return;
  const id = new URLSearchParams(location.search).get('id');
  const posts = getPosts(); const post = posts.find(p=>p.id===id && p.status==='published');
  if(!post){root.innerHTML='<section class="section"><div class="container narrow"><h1>Article not found.</h1><a class="btn btn--primary" href="articles.html">Back to articles</a></div></section>';return;}
  post.views = (post.views||0)+1; savePosts(posts);
  root.innerHTML = `<article class="article-detail"><div class="container narrow"><span class="pill">${esc(post.category)}</span><h1>${esc(post.title)}</h1><div class="meta"><span>By ${esc(post.author)}</span><span>${fmtDate(post.date)}</span><span>${readingTime(post.content)} min read</span><span>${post.views} views</span></div></div><div class="container"><img class="article-cover" src="${esc(post.image)}" alt="${esc(post.title)}"></div><div class="article-content"><p>${esc(post.content).replace(/\n+/g,'</p><p>')}</p><div class="share-row"><button class="btn btn--outline" id="copyLink">Copy Link</button><a class="btn btn--primary" href="write.html">Write your own</a></div></div><section class="comments"><h2>Comments</h2><form id="commentForm" class="form-card"><input id="commentName" placeholder="Your name" required><textarea id="commentText" rows="4" placeholder="Add a comment" required></textarea><button class="btn btn--primary">Post Comment</button></form><div id="commentsList"></div></section></article>`;
  $('#copyLink').addEventListener('click',()=>navigator.clipboard.writeText(location.href));
  const key='comments_'+id; const list=()=>JSON.parse(localStorage.getItem(key)||'[]'); const save=x=>localStorage.setItem(key,JSON.stringify(x));
  function renderComments(){ $('#commentsList').innerHTML = list().map(c=>`<div class="comment"><strong>${esc(c.name)}</strong><p>${esc(c.text)}</p></div>`).join(''); }
  $('#commentForm').addEventListener('submit',e=>{e.preventDefault(); const cs=list(); cs.unshift({name:$('#commentName').value,text:$('#commentText').value}); save(cs); e.target.reset(); renderComments();}); renderComments();
}
function initDashboard(){
  const login = $('#adminLogin'); if(!login) return;
  const panel=$('#adminPanel'), box=$('#loginBox');
  function open(){box.classList.add('hidden');panel.classList.remove('hidden');renderAdmin('pending');}
  if(localStorage.getItem('voiceshub_admin')==='yes') open();
  login.addEventListener('click',()=>{ if($('#adminPassword').value==='admin123'){localStorage.setItem('voiceshub_admin','yes');open();} else $('#loginMsg').textContent='Wrong password.';});
  $$('.tab').forEach(t=>t.addEventListener('click',()=>{$$('.tab').forEach(x=>x.classList.remove('active'));t.classList.add('active');renderAdmin(t.dataset.status);}));
}
function renderAdmin(status){
  const posts=getPosts(), wrap=$('#adminPosts');
  $('#dashTotal').textContent=posts.length; $('#dashPending').textContent=posts.filter(p=>p.status==='pending').length; $('#dashPublished').textContent=posts.filter(p=>p.status==='published').length;
  const rows=posts.filter(p=>p.status===status);
  wrap.innerHTML=rows.map(p=>`<div class="admin-item"><span class="pill">${esc(p.category)} • ${esc(p.status)}</span><h3>${esc(p.title)}</h3><p>${esc(p.excerpt)}</p><div class="meta"><span>${esc(p.author)}</span><span>${fmtDate(p.date)}</span></div><div class="admin-actions"><button class="btn ok" onclick="setStatus('${p.id}','published')">Publish</button><button class="btn warn" onclick="setStatus('${p.id}','pending')">Pending</button><button class="btn danger" onclick="setStatus('${p.id}','rejected')">Reject</button><button class="btn btn--outline" onclick="deletePost('${p.id}')">Delete</button></div></div>`).join('') || '<p class="empty-state" style="display:block">No posts here.</p>';
}
window.setStatus=(id,status)=>{const posts=getPosts(); const p=posts.find(x=>x.id===id); if(p)p.status=status; savePosts(posts); renderAdmin(status);};
window.deletePost=(id)=>{if(!confirm('Delete this post?'))return; savePosts(getPosts().filter(p=>p.id!==id)); renderAdmin(document.querySelector('.tab.active').dataset.status);};
function initNewsletter(){
  $('#newsletterForm')?.addEventListener('submit',e=>{e.preventDefault(); $('#newsletterMsg').textContent='Subscribed successfully!'; e.target.reset();});
  $('#contactForm')?.addEventListener('submit',e=>{e.preventDefault(); $('#contactMsg').textContent='Message saved locally. Connect a backend later to send emails.'; e.target.reset();});
}

document.addEventListener('DOMContentLoaded',()=>{initNav();initReveal();initHome();initArticles();initSubmit();initAuthors();initArticlePage();initDashboard();initNewsletter();});