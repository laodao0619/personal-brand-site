import { stations } from '../data/stations';

const paths: readonly string[] = stations.map(station => station.href);
const storagePrefix = 'window-signals-visited-v1:';
const visited = new Set<string>();

function readVisits() {
  try {
    for (const path of paths) if (localStorage.getItem(storagePrefix + path) === '1') visited.add(path);
  } catch {
    // The shortcuts stay usable when storage is unavailable.
  }
}

function updateStamps() {
  readVisits();
  const current = window.location.pathname;
  if (paths.includes(current) && !visited.has(current)) {
    visited.add(current);
    try {
      localStorage.setItem(storagePrefix + current, '1');
    } catch {
      // This visit still counts for the lifetime of this document.
    }
  }

  for (const counter of document.querySelectorAll<HTMLElement>('[data-stamp-count]')) {
    counter.textContent = String(visited.size);
  }
  for (const token of document.querySelectorAll<HTMLElement>('[data-stamp]')) {
    const collected = visited.has(token.dataset.stamp ?? '');
    token.classList.toggle('is-stamped', collected);
    token.textContent = collected ? '已点亮' : '未点亮';
  }
  for (const progress of document.querySelectorAll<HTMLProgressElement>('[data-stamp-progress]')) {
    progress.value = visited.size;
  }

  const completion = document.querySelector<HTMLElement>('[data-stamp-completion]');
  if (completion) completion.hidden = visited.size !== paths.length;
}

updateStamps();
window.addEventListener('pageshow', updateStamps);
window.addEventListener('storage', (event) => {
  if (event.key !== null && !event.key.startsWith(storagePrefix)) return;
  visited.clear();
  updateStamps();
});
