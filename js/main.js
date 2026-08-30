const data = window.SITE_DATA;

const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.main-nav');
menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const contactEl = document.getElementById('contact-mail');
if (contactEl) contactEl.href = `mailto:${data.contactEmail}`;

// --- Dokumenter: tre faste mapper i Google Drive ---
const documentList = document.getElementById('document-list');
if (documentList) {
  documentList.innerHTML = data.documentFolders.map(folder => `
    <article class="document">
      <div class="file-icon">${folder.icon}</div>
      <div><h3>${folder.title}</h3><p>${folder.text}</p></div>
      <a href="${folder.url}" target="_blank" rel="noopener">Åbn mappe →</a>
    </article>
  `).join('');
}

// ---------------------------------------------------------------------------
// Live indhold fra Google Docs (bestyrelsen + opslagstavle).
// Docs skal være delt som "Alle med linket kan se" for at dette virker.
// ---------------------------------------------------------------------------
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

async function fetchDocText(docId) {
  const url = `https://docs.google.com/document/d/${docId}/export?format=txt`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Kunne ikke hente dokument (' + res.status + ')');
  const text = await res.text();
  // Google indsætter nogle gange et usynligt BOM-tegn forrest
  return text.replace(/^\uFEFF/, '');
}

function initialsFrom(name) {
  const trimmed = name.trim();
  return trimmed.slice(0, 2).toUpperCase() || '?';
}

function parseBoardLine(line) {
  const trimmed = line.trim();
  if (!trimmed) return null;
  if (trimmed.includes(',')) {
    const [first, ...rest] = trimmed.split(',');
    return { name: first.trim(), role: rest.join(',').trim() };
  }
  const [first, ...rest] = trimmed.split(' ');
  return { name: first.trim(), role: rest.join(' ').trim() };
}

// Doc-formatet understøtter valgfrie gruppeoverskrifter, fx:
// Bestyrelsen:
// Rasmus formand nr. 85
// ...
//
// Aktivitetsudvalget:
// Karen nr. 85
function parseBoardDoc(text) {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const groups = [];
  let current = { title: null, people: [] };
  for (const line of lines) {
    if (/^[^,]{1,60}:$/.test(line)) {
      if (current.people.length) groups.push(current);
      current = { title: line.slice(0, -1).trim(), people: [] };
    } else {
      const person = parseBoardLine(line);
      if (person) current.people.push(person);
    }
  }
  if (current.people.length) groups.push(current);
  return groups;
}

function renderPersonGrid(people) {
  return `<div class="person-grid">${people.map(person => `
    <article class="person">
      <div class="initials">${initialsFrom(person.name)}</div>
      <h3>${escapeHtml(person.name)}</h3>
      <p>${escapeHtml(person.role || '')}</p>
    </article>
  `).join('')}</div>`;
}

function renderBoardGroups(grid, groups) {
  if (groups.length <= 1) {
    grid.innerHTML = renderPersonGrid(groups[0]?.people || []);
    return;
  }
  grid.innerHTML = groups.map(group => `
    <div class="board-group">
      ${group.title ? `<h3 class="board-group-title">${escapeHtml(group.title)}</h3>` : ''}
      ${renderPersonGrid(group.people)}
    </div>
  `).join('');
}

async function renderBoard() {
  const grid = document.getElementById('board-grid');
  if (!grid) return;
  try {
    const text = await fetchDocText(data.bestyrelsenDocId);
    const groups = parseBoardDoc(text);
    if (groups.length) {
      renderBoardGroups(grid, groups);
    } else {
      renderBoardGroups(grid, [{ title: null, people: data.boardFallback }]);
    }
  } catch (err) {
    console.warn('Kunne ikke hente bestyrelsen fra Google Docs:', err);
    renderBoardGroups(grid, [{ title: null, people: data.boardFallback }]);
  }
}

async function renderDocParagraphs(elementId, docId, fallbackText) {
  const el = document.getElementById(elementId);
  if (!el) return;
  let text;
  try {
    text = await fetchDocText(docId);
  } catch (err) {
    console.warn(`Kunne ikke hente dokument til #${elementId} fra Google Docs:`, err);
    text = fallbackText || '';
  }
  const paragraphs = text
    .split(/\r?\n\s*\r?\n/)
    .map(p => p.trim())
    .filter(Boolean)
    .map(p => `<p>${escapeHtml(p).replace(/\r?\n/g, '<br>')}</p>`)
    .join('');
  el.innerHTML = paragraphs || '<p>Der er ikke skrevet noget endnu.</p>';
}

renderBoard();
renderDocParagraphs('opslagstavle-content', data.opslagstavleDocId, data.opslagstavleFallback);
renderDocParagraphs('arrangementer-content', data.arrangementerDocId, data.arrangementerFallback);
