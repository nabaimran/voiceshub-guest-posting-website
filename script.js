'use strict';

const demoArticles = {
  'ai-students': {
    title: 'How UAE Students Are Using AI to Study Smarter',
    category: 'AI',
    readTime: '5 min read',
    author: 'Naba Imran',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1400&auto=format&fit=crop&q=80',
    excerpt: 'AI is becoming part of everyday student life, from planning essays to supporting research and revision.',
    body: `
      <p>AI is no longer just a future concept discussed in lectures. For many students, it has become part of how they organise ideas, revise difficult topics, and build confidence with academic work.</p>
      <h2>AI as a study partner</h2>
      <p>Used properly, AI can help students break down complicated concepts, generate revision questions, plan outlines, and compare different perspectives. The value is not in copying answers, but in using tools to think more clearly.</p>
      <h2>The responsible way to use it</h2>
      <p>Students still need to fact-check, reference properly, and write in their own voice. The strongest students are not replacing effort with AI. They are using AI to improve structure, creativity, and understanding.</p>
      <h2>What comes next</h2>
      <p>As universities adapt, students who learn ethical and practical AI skills will have an advantage in both academic and professional settings.</p>
    `
  },
  'cyber-uae': {
    title: 'What It Is Really Like Studying Cybersecurity in the UAE',
    category: 'Cybersecurity',
    readTime: '6 min read',
    author: 'Adam Yusuf',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1400&auto=format&fit=crop&q=80',
    excerpt: 'A student perspective on labs, pressure, curiosity, digital forensics, and finding your direction in tech.',
    body: `
      <p>Cybersecurity sounds glamorous from the outside, but studying it is a mix of logic, patience, mistakes, and constant learning.</p>
      <h2>It is more practical than people expect</h2>
      <p>Students work with networks, logs, vulnerabilities, reports, and forensic thinking. The real skill is not memorising everything. It is learning how to investigate carefully.</p>
      <h2>The pressure is real</h2>
      <p>Technology changes fast, so students often feel like they are behind. The solution is consistency: small labs, reading, documenting, and asking better questions.</p>
    `
  },
  internship: {
    title: 'The Internship Skills No One Talks About',
    category: 'Career',
    readTime: '5 min read',
    author: 'Omar Khan',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&auto=format&fit=crop&q=80',
    excerpt: 'Communication, ownership, patience, and problem-solving often matter more than just knowing the tools.',
    body: `
      <p>Internships are not only about technical skills. They are also about reliability, communication, and learning how real workplaces operate.</p>
      <h2>Ownership matters</h2>
      <p>People remember interns who follow up, take notes, ask useful questions, and complete tasks without needing to be chased.</p>
      <h2>Soft skills become career skills</h2>
      <p>Confidence, time management, and professional communication can completely change how your work is perceived.</p>
    `
  },
  confidence: {
    title: 'How to Build Confidence as a University Student',
    category: 'Student Life',
    readTime: '4 min read',
    author: 'Maya Ali',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&auto=format&fit=crop&q=80',
    excerpt: 'Confidence is not always loud. Sometimes it starts with showing up, asking questions, and trying again.',
    body: `
      <p>Confidence in university grows through repetition. You build it by showing up even when you feel unsure.</p>
      <h2>Start small</h2>
      <p>Speak once in class, ask one question, join one activity, or complete one difficult task. Small wins create evidence that you are capable.</p>
    `
  },
  'personal-brand': {
    title: 'Why Everyone Wants a Personal Brand Now',
    category: 'Digital Culture',
    readTime: '4 min read',
    author: 'Naba Imran',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1400&auto=format&fit=crop&q=80',
    excerpt: 'Online identity has become a portfolio, a network, and sometimes even a career opportunity.',
    body: `
      <p>A personal brand is not just about aesthetics. It is about what people associate with your name when they see your work.</p>
      <h2>Your profile is a portfolio</h2>
      <p>For students and young professionals, posting thoughtful work online can create opportunities before a formal job title does.</p>
    `
  },
  happiness: {
    title: 'The Science of Happiness for Busy Students',
    category: 'Wellbeing',
    readTime: '5 min read',
    author: 'Maya Ali',
    image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1400&auto=format&fit=crop&q=80',
    excerpt: 'Small routines, meaningful connections, and realistic expectations can change the way students experience university.',
    body: `
      <p>Happiness is not about being positive all the time. It is about building habits and environments that support your wellbeing.</p>
      <h2>Connection matters</h2>
      <p>Students often underestimate how much friendships, community, and feeling understood affect motivation and confidence.</p>
    `
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initTheme();
  initScrollReveal();
  initArticleFilters();
  initArticlePage();
  initForms();
  initDashboard();
  initComments();
});

function initNav() {
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (!burgerBtn || !mobileMenu) return;

  burgerBtn.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('is-open');
    burgerBtn.classList.toggle('is-open', open);
    burgerBtn.setAttribute('aria-expanded', open.toString());
    document.body.style.overflow = open ? 'hidden' : '';
  });

  document.querySelectorAll('.nav__mobile-link').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      burgerBtn.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });
}

function initTheme() {
  const toggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('voiceshub-theme');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    if (toggle) toggle.textContent = '☀️';
  }

  if (!toggle) return;

  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('voiceshub-theme', isDark ? 'dark' : 'light');
    toggle.textContent = isDark ? '☀️' : '🌙';
  });
}

function initScrollReveal() {
  const items = document.querySelectorAll('.scroll-reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach((item) => observer.observe(item));
}

function initArticleFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.article-card');
  const search = document.getElementById('articleSearch');
  const noResults = document.getElementById('noResults');

  if (!cards.length) return;

  let activeFilter = new URLSearchParams(window.location.search).get('category') || 'all';

  const applyFilters = () => {
    const query = search ? search.value.toLowerCase().trim() : '';
    let visibleCount = 0;

    buttons.forEach((btn) => {
      btn.classList.toggle('filter-btn--active', btn.dataset.filter === activeFilter);
    });

    cards.forEach((card) => {
      const category = card.dataset.category || '';
      const title = card.dataset.title.toLowerCase();
      const matchesFilter = activeFilter === 'all' || category === activeFilter;
      const matchesSearch = !query || title.includes(query) || category.toLowerCase().includes(query);
      const visible = matchesFilter && matchesSearch;

      card.classList.toggle('is-hidden', !visible);
      if (visible) visibleCount += 1;
    });

    if (noResults) noResults.style.display = visibleCount ? 'none' : 'block';
  };

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      activeFilter = btn.dataset.filter;
      applyFilters();
    });
  });

  if (search) search.addEventListener('input', applyFilters);
  applyFilters();
}

function initArticlePage() {
  const title = document.getElementById('articleTitle');
  if (!title) return;

  const articleId = new URLSearchParams(window.location.search).get('id') || 'ai-students';
  const article = demoArticles[articleId] || demoArticles['ai-students'];

  document.title = `${article.title} — VoicesHub`;
  document.getElementById('articleCategory').textContent = article.category;
  document.getElementById('articleReadTime').textContent = article.readTime;
  document.getElementById('articleTitle').textContent = article.title;
  document.getElementById('articleExcerpt').textContent = article.excerpt;
  document.getElementById('articleAuthor').textContent = article.author;
  document.getElementById('articleImage').src = article.image;
  document.getElementById('articleImage').alt = article.title;
  document.getElementById('articleBody').innerHTML = article.body;
}

function initForms() {
  const submitForm = document.getElementById('submitArticleForm');
  const contactForm = document.getElementById('contactForm');
  const newsletterForm = document.getElementById('newsletterForm');

  if (submitForm) {
    submitForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const submission = {
        id: Date.now(),
        name: document.getElementById('writerName').value.trim(),
        email: document.getElementById('writerEmail').value.trim(),
        bio: document.getElementById('writerBio').value.trim(),
        title: document.getElementById('articleTitleInput').value.trim(),
        category: document.getElementById('articleCategoryInput').value,
        image: document.getElementById('articleImageInput').value.trim(),
        content: document.getElementById('articleContentInput').value.trim(),
        status: 'pending',
        createdAt: new Date().toLocaleString()
      };

      const submissions = getSubmissions();
      submissions.unshift(submission);
      localStorage.setItem('voiceshub-submissions', JSON.stringify(submissions));

      submitForm.reset();
      document.getElementById('submitMessage').textContent = 'Your article has been submitted for review.';
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      contactForm.reset();
      document.getElementById('contactMessage').textContent = 'Message sent. Thank you for reaching out.';
    });
  }

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (event) => {
      event.preventDefault();
      newsletterForm.reset();
      const msg = document.getElementById('newsletterMsg');
      if (msg) msg.textContent = 'You are on the list.';
    });
  }
}

function initDashboard() {
  const loginBtn = document.getElementById('adminLoginBtn');
  const dashboardContent = document.getElementById('dashboardContent');
  const dashboardLogin = document.getElementById('dashboardLogin');

  if (!loginBtn || !dashboardContent || !dashboardLogin) return;

  loginBtn.addEventListener('click', () => {
    const password = document.getElementById('adminPassword').value;
    const message = document.getElementById('adminLoginMsg');

    if (password !== 'admin123') {
      message.textContent = 'Wrong password. Try admin123 for the demo.';
      return;
    }

    dashboardLogin.hidden = true;
    dashboardContent.hidden = false;
    renderDashboard();
  });
}

function renderDashboard() {
  const list = document.getElementById('submissionList');
  if (!list) return;

  const submissions = getSubmissions();
  const pending = submissions.filter((item) => item.status === 'pending').length;
  const approved = submissions.filter((item) => item.status === 'approved').length;

  document.getElementById('pendingCount').textContent = pending;
  document.getElementById('approvedCount').textContent = approved;
  document.getElementById('totalCount').textContent = submissions.length;

  if (!submissions.length) {
    list.innerHTML = '<p class="muted">No submissions yet. Try submitting an article from the Write for Us page.</p>';
    return;
  }

  list.innerHTML = submissions.map((item) => `
    <article class="submission-card">
      <div class="article-meta"><span>${escapeHTML(item.category)}</span><span>${escapeHTML(item.status)}</span><span>${escapeHTML(item.createdAt)}</span></div>
      <h3>${escapeHTML(item.title)}</h3>
      <p><strong>${escapeHTML(item.name)}</strong> — ${escapeHTML(item.email)}</p>
      <p>${escapeHTML(item.content).slice(0, 220)}...</p>
      <div class="submission-actions">
        <button class="mini-btn mini-btn--approve" onclick="updateSubmission(${item.id}, 'approved')">Approve</button>
        <button class="mini-btn" onclick="updateSubmission(${item.id}, 'pending')">Mark Pending</button>
        <button class="mini-btn mini-btn--delete" onclick="deleteSubmission(${item.id})">Delete</button>
      </div>
    </article>
  `).join('');
}

function updateSubmission(id, status) {
  const submissions = getSubmissions().map((item) => (
    item.id === id ? { ...item, status } : item
  ));

  localStorage.setItem('voiceshub-submissions', JSON.stringify(submissions));
  renderDashboard();
}

function deleteSubmission(id) {
  const submissions = getSubmissions().filter((item) => item.id !== id);
  localStorage.setItem('voiceshub-submissions', JSON.stringify(submissions));
  renderDashboard();
}

function getSubmissions() {
  return JSON.parse(localStorage.getItem('voiceshub-submissions') || '[]');
}

function initComments() {
  const form = document.getElementById('commentForm');
  const list = document.getElementById('commentList');
  if (!form || !list) return;

  const articleId = new URLSearchParams(window.location.search).get('id') || 'ai-students';
  const key = `voiceshub-comments-${articleId}`;

  const render = () => {
    const comments = JSON.parse(localStorage.getItem(key) || '[]');
    list.innerHTML = comments.map((comment) => `
      <div class="comment-item">
        <strong>${escapeHTML(comment.name)}</strong>
        <p>${escapeHTML(comment.text)}</p>
      </div>
    `).join('');
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const comments = JSON.parse(localStorage.getItem(key) || '[]');
    comments.unshift({
      name: document.getElementById('commentName').value.trim(),
      text: document.getElementById('commentText').value.trim()
    });

    localStorage.setItem(key, JSON.stringify(comments));
    form.reset();
    render();
  });

  render();
}

function escapeHTML(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
