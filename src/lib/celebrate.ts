// Confetti and floating "+XP" text, drawn straight into a fixed overlay so they
// never touch React state. Only called from event handlers.

const COLORS = ["#f74c00", "#ff8a3d", "#ffc53d", "#2dd4bf", "#818cf8", "#f0abfc"];
const SHAPES = ["square", "dot", "gear"];

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function layer() {
  let host = document.getElementById("celebrate-layer");
  if (!host) {
    host = document.createElement("div");
    host.id = "celebrate-layer";
    host.setAttribute("aria-hidden", "true");
    document.body.appendChild(host);
  }
  return host;
}

function spawn(className: string, x: number, y: number, vars: Record<string, string>, text?: string) {
  const node = document.createElement("span");
  node.className = className;
  node.style.setProperty("--x", `${x}px`);
  node.style.setProperty("--y", `${y}px`);
  for (const [key, value] of Object.entries(vars)) node.style.setProperty(key, value);
  if (text) node.textContent = text;
  node.addEventListener("animationend", () => node.remove());
  layer().appendChild(node);
}

/** Confetti (squares, dots and little gears) bursting out of a point. */
export function burst(x: number, y: number, count = 16, spread = 1) {
  if (reducedMotion()) return;
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const distance = (36 + Math.random() * 80) * spread;
    spawn(`confetti confetti-${SHAPES[i % SHAPES.length]}`, x, y, {
      "--dx": `${Math.cos(angle) * distance}px`,
      "--dy": `${Math.sin(angle) * distance - 40 * spread}px`,
      "--fall": `${60 + Math.random() * 80}px`,
      "--rot": `${(Math.random() > 0.5 ? 1 : -1) * (240 + Math.random() * 480)}deg`,
      "--dur": `${800 + Math.random() * 600}ms`,
      "--c": COLORS[i % COLORS.length],
    });
  }
}

function center(el: Element) {
  const rect = el.getBoundingClientRect();
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}

export function burstFrom(el: Element, count?: number, spread?: number) {
  const { x, y } = center(el);
  burst(x, y, count, spread);
}

/** Text that rises and fades, like "+180 XP". */
export function floatText(x: number, y: number, text: string, big = false, delay = 0) {
  if (reducedMotion()) return;
  spawn(`float-text${big ? " is-big" : ""}`, x, y, { "--delay": `${delay}ms` }, text);
}

export function floatFrom(el: Element, text: string) {
  const { x, y } = center(el);
  floatText(x, y - 12, text);
}

/** Screen-wide celebration with one big line per message (day complete, level up). */
export function celebrateBig(messages: string[]) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  [0.2, 0.5, 0.8].forEach((at) => burst(width * at, height * 0.38, 34, 1.9));
  messages.forEach((message, i) => floatText(width / 2, height * 0.42 + i * 44, message, true, i * 350));
}
