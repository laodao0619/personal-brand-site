const game = document.querySelector<HTMLElement>('[data-star-game]')!;
const stage = game.querySelector<HTMLElement>('[data-stage]')!;
const controls = game.querySelector<HTMLElement>('[data-game-controls]')!;
const canvas = game.querySelector<HTMLCanvasElement>('[data-lines]')!;
const status = game.querySelector<HTMLElement>('[data-star-status]')!;
const progress = game.querySelector<HTMLProgressElement>('[data-star-progress]')!;
const stars = Array.from(game.querySelectorAll<HTMLButtonElement>('[data-star]'));
const viewButtons = Array.from(game.querySelectorAll<HTMLButtonElement>('button[data-view]'));
const map = stars.map(star => [parseFloat(star.style.getPropertyValue('--x')), parseFloat(star.style.getPropertyValue('--y'))]);
const horizon = [[12, 57], [30, 29], [49, 43], [70, 18], [89, 51]];
const collected: number[] = [];
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let mirrored = false;

function drawTrail() {
  const context = canvas.getContext('2d');
  if (!context) return;
  const width = stage.clientWidth;
  const height = stage.clientHeight;
  const scale = Math.min(devicePixelRatio || 1, 2);
  const bufferWidth = Math.round(width * scale);
  const bufferHeight = Math.round(height * scale);
  if (canvas.width !== bufferWidth || canvas.height !== bufferHeight) {
    canvas.width = bufferWidth;
    canvas.height = bufferHeight;
  }
  context.setTransform(scale, 0, 0, scale, 0, 0);
  context.clearRect(0, 0, width, height);
  if (collected.length < 2) return;

  const tint = context.createLinearGradient(0, 0, width, height);
  tint.addColorStop(0, '#beeaff');
  tint.addColorStop(1, '#f5b6ff');
  context.strokeStyle = tint;
  context.lineWidth = 2.2;
  context.lineJoin = 'round';
  context.shadowColor = '#efb9fc';
  context.shadowBlur = 12;
  context.beginPath();
  for (const [index, starId] of collected.entries()) {
    const star = stars[starId];
    const x = parseFloat(star.style.getPropertyValue('--x')) * width / 100;
    const y = parseFloat(star.style.getPropertyValue('--y')) * height / 100;
    if (index === 0) context.moveTo(x, y);
    else context.lineTo(x, y);
  }
  context.stroke();
}

function positionStars() {
  const layout = stage.dataset.view === 'horizon' ? horizon : map;
  stars.forEach((star, index) => {
    const [x, y] = layout[index];
    star.style.setProperty('--x', (mirrored ? 100 - x : x) + '%');
    star.style.setProperty('--y', y + '%');
  });
  drawTrail();
}

function updateScore() {
  progress.value = collected.length;
  status.textContent = collected.length === stars.length
    ? '星轨已完成！切换视角看看，或再玩一局。'
    : `已拾取 ${collected.length} / ${stars.length}`;
}

stars.forEach((star, index) => {
  star.hidden = false;
  star.addEventListener('click', () => {
    if (collected.includes(index)) return;
    collected.push(index);
    star.setAttribute('aria-pressed', 'true');
    if (!reduced.matches) {
      star.animate([{ scale: 1 }, { scale: 1.24 }, { scale: 1 }], { duration: 270 });
    }
    drawTrail();
    updateScore();
  });
});

viewButtons.forEach(button => {
  button.addEventListener('click', () => {
    stage.dataset.view = button.dataset.view;
    for (const other of viewButtons) other.setAttribute('aria-pressed', String(other === button));
    positionStars();
  });
});

game.querySelector<HTMLButtonElement>('[data-reset]')!.addEventListener('click', () => {
  collected.length = 0;
  mirrored = !mirrored;
  for (const star of stars) star.setAttribute('aria-pressed', 'false');
  positionStars();
  updateScore();
  stars[0].focus({ preventScroll: true });
});

new ResizeObserver(drawTrail).observe(stage);
controls.hidden = false;

const openButton = document.querySelector<HTMLButtonElement>('[data-observatory-toggle]')!;
const frame = document.querySelector<HTMLElement>('#meteor-frame')!;
const source = document.querySelector<HTMLAnchorElement>('[data-meteor-source]')!;

openButton.hidden = false;
openButton.addEventListener('click', () => {
  const show = frame.hidden;
  if (show) {
    const viewer = document.createElement('iframe');
    viewer.title = '宝瓶座 δ 南流星雨 3D 轨道观测器';
    viewer.src = source.href;
    viewer.setAttribute('sandbox', 'allow-scripts allow-same-origin');
    viewer.allowFullscreen = true;
    frame.replaceChildren(viewer);
  } else {
    frame.replaceChildren();
  }
  frame.hidden = !show;
  openButton.textContent = show ? '关闭 3D 观测器' : '加载 3D 观测器';
  openButton.setAttribute('aria-expanded', String(show));
});
