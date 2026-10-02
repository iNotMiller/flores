const NS = 'http://www.w3.org/2000/svg';
const el = (t, a, p) => { const e = document.createElementNS(NS, t); for (const k in a) e.setAttribute(k, a[k]); p && p.appendChild(e); return e };
let s = 7; const rnd = (a = 0, b = 1) => { s = (s * 16807) % 2147483647; return a + (s / 2147483647) * (b - a) };

const B = document.getElementById('bouquet'), P = [200, 430];
const gLeaves = el('g', {}, B), gStems = el('g', {}, B), gFill = el('g', {}, B), gFlowers = el('g', {}, B), gWrap = el('g', {}, B);

function leaf(parent, x, y, ang, len, delay) {
    const w = len * .28;
    const g = el('g', { transform: `translate(${x} ${y}) rotate(${ang})`, class: 'leaf', style: `animation-delay:${delay}s` }, parent);
    el('path', { d: `M0 0C${w} ${-len * .3} ${w} ${-len * .75} 0 ${-len}C${-w} ${-len * .75} ${-w} ${-len * .3} 0 0Z`, fill: 'url(#leaf)' }, g);
    el('path', { d: `M0 -4L0 ${-len * .85}`, stroke: '#b8f5d6', 'stroke-opacity': .45, 'stroke-width': 1.2, fill: 'none' }, g);
}
for (let i = 0; i < 15; i++) { const a = -78 + i * (156 / 14) + rnd(-5, 5); leaf(gLeaves, P[0], P[1] - 6, a, rnd(95, 150), .4 + i * .04) }

const F = [
    [200, 112, 50], [112, 168, 43], [290, 166, 43], [200, 212, 42],
    [62, 258, 34], [338, 254, 34], [132, 290, 32], [268, 290, 32]
];
function flower(x, y, r, d) {
    const g = el('g', { transform: `translate(${x} ${y}) rotate(${rnd(-14, 14)})` }, gFlowers);
    const b = el('g', { class: 'bloom', style: `animation-delay:${d}s`, filter: 'url(#glow)' }, g);
    const n = 10;
    for (let i = 0; i < n; i++)el('ellipse', { cx: 0, cy: -r * .58, rx: r * .27, ry: r * .5, fill: 'url(#petal)', stroke: '#d98a00', 'stroke-opacity': .35, 'stroke-width': .8, transform: `rotate(${i * 36})` }, b);
    for (let i = 0; i < n; i++)el('ellipse', { cx: 0, cy: -r * .42, rx: r * .2, ry: r * .36, fill: 'url(#petal2)', opacity: .9, transform: `rotate(${i * 36 + 18})` }, b);
    el('circle', { r: r * .27, fill: 'url(#core)' }, b);
    for (let i = 0; i < 16; i++) { const a = i * 2.4, rr = r * .2 * Math.sqrt(i / 16) + r * .02; el('circle', { cx: Math.cos(a) * rr, cy: Math.sin(a) * rr, r: r * .025, fill: '#5c2a06', opacity: .65 }, b) }
    el('ellipse', { cx: -r * .08, cy: -r * .1, rx: r * .07, ry: r * .04, fill: '#fff', opacity: .35 }, b);
}
const q = (t, a, c, b) => (1 - t) * (1 - t) * a + 2 * (1 - t) * t * c + t * t * b;
F.forEach(([x, y, r], i) => {
    const cx = (P[0] + x) / 2 + (x - P[0]) * .08, cy = (P[1] + y) / 2 + 20;
    el('path', { d: `M${P[0]} ${P[1]}Q${cx} ${cy} ${x} ${y + r * .25}`, class: 'stem', pathLength: 1, stroke: '#27a574', 'stroke-width': 3.4, 'stroke-linecap': 'round', fill: 'none', style: `animation-delay:${.1 + i * .1}s` }, gStems);
    const t = .5, lx = q(t, P[0], cx, x), ly = q(t, P[1], cy, y + r * .25), side = x < P[0] ? -1 : 1;
    leaf(gStems, lx, ly, side * (55 + rnd(0, 20)), rnd(38, 52), .9 + i * .1);
    flower(x, y, r, .9 + i * .22);
});

for (let i = 0; i < 22; i++) {
    const a = rnd(-70, 70) * Math.PI / 180, l = rnd(120, 215), x = P[0] + Math.sin(a) * l, y = P[1] - Math.cos(a) * l * .95;
    if (y < 70) continue;
    el('path', { d: `M${P[0]} ${P[1] - 10}Q${(P[0] + x) / 2} ${(P[1] + y) / 2} ${x} ${y}`, stroke: '#3dbb86', 'stroke-width': 1.1, fill: 'none', opacity: .8, class: 'stem', pathLength: 1, style: `animation-delay:${1.4 + rnd(0, .8)}s` }, gFill);
    const c = el('g', { class: 'bloom', style: `animation-delay:${2 + rnd(0, 1.2)}s` }, gFill);
    const gg = el('g', { transform: `translate(${x} ${y})` }, c);
    for (let k = 0; k < 5; k++)el('circle', { cx: Math.cos(k * 1.256) * 3.2, cy: Math.sin(k * 1.256) * 3.2, r: 2.6, fill: '#fffaf0', opacity: .95 }, gg);
    el('circle', { r: 1.6, fill: '#ffd54a' }, gg);
}

el('path', { d: 'M92 372L200 560L308 372Q200 410 92 372Z', fill: 'url(#paperBack)' }, gWrap);
el('path', { d: 'M108 392Q200 430 292 392L200 560Z', fill: 'url(#paperFront)' }, gWrap);
el('path', { d: 'M108 392L200 560L150 420Z', fill: '#e8cba6', opacity: .55 }, gWrap);
el('path', { d: 'M150 410Q200 432 250 410L240 436Q200 454 160 436Z', fill: 'url(#ribbon)' }, gWrap);
const bow = el('g', { transform: 'translate(200 440)' }, gWrap);
el('path', { d: 'M0 0C-30 -26 -58 -8 -50 14C-42 30 -14 14 0 0Z', fill: 'url(#ribbon)' }, bow);
el('path', { d: 'M0 0C30 -26 58 -8 50 14C42 30 14 14 0 0Z', fill: 'url(#ribbon)' }, bow);
el('path', { d: 'M-4 6L-26 50L-12 44L-6 58L4 8Z', fill: '#b8305a' }, bow);
el('path', { d: 'M4 6L26 50L12 44L6 58L-4 8Z', fill: '#d9456f' }, bow);
el('circle', { r: 9, fill: '#f0709a' }, bow);

const frases = [
    'Hay personas que son como el sol: llegan y todo brilla. Tú eres una.',
    'Amarillo: el color de tu sonrisa.',
    'Contigo, hasta lo más simple se vuelve primavera.',
    'Si pudiera, te regalaría un campo entero de girasoles.',
    'Gracias por existir y por ser tan tú.',
    'Que nunca te falten sol, flores ni abrazos.'
];
const f = document.getElementById('frase'); let idx = 0, timer;
function mostrar(i) { f.classList.remove('in'); setTimeout(() => { f.textContent = frases[i]; f.classList.add('in') }, 450) }
function siguiente() { idx = (idx + 1) % frases.length; mostrar(idx) }
function auto() { clearInterval(timer); timer = setInterval(siguiente, 6500) }
document.getElementById('otra').onclick = () => { siguiente(); auto() };
setTimeout(() => { f.textContent = frases[0]; f.classList.add('in') }, 2200); auto();

const cv = document.getElementById('c'), ctx = cv.getContext('2d'); let W, H, dots = [];
function size() { const d = devicePixelRatio || 1; W = cv.width = innerWidth * d; H = cv.height = innerHeight * d }
size(); addEventListener('resize', size);
const mk = (x, y, burst) => ({ x, y, r: (Math.random() * 1.8 + .6) * (devicePixelRatio || 1), vx: burst ? (Math.random() - .5) * 3 : (Math.random() - .5) * .25, vy: burst ? -Math.random() * 2.5 - .5 : -Math.random() * .35 - .08, a: Math.random(), t: Math.random() * 6, life: burst ? 1 : null });
for (let i = 0; i < 70; i++)dots.push(mk(Math.random() * W, Math.random() * H));
document.querySelector('svg').addEventListener('pointerdown', e => { const d = devicePixelRatio || 1; for (let i = 0; i < 22; i++)dots.push(mk(e.clientX * d, e.clientY * d, true)) });
const calm = matchMedia('(prefers-reduced-motion:reduce)').matches;
(function loop() {
    ctx.clearRect(0, 0, W, H); ctx.globalCompositeOperation = 'lighter';
    dots = dots.filter(p => p.life === null || p.life > 0);
    for (const p of dots) {
        p.x += p.vx; p.y += p.vy; p.t += .03;
        if (p.life !== null) { p.life -= .012; p.vy += .02 }
        else { p.x += Math.sin(p.t) * .25; if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W } }
        const al = (p.life !== null ? p.life : .35 + .35 * Math.sin(p.t)) * .9;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        g.addColorStop(0, `rgba(255,226,120,${al})`); g.addColorStop(1, 'rgba(255,200,60,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 4, 0, 6.283); ctx.fill();
    }
    if (!calm) requestAnimationFrame(loop);
})();