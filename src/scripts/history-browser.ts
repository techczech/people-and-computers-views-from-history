const landing = document.querySelector<HTMLElement>('[data-landing]')!;
const browser = document.querySelector<HTMLElement>('[data-browser]')!;
const sidebar = browser.querySelector<HTMLElement>('[data-sidebar]')!;
const menu = browser.querySelector<HTMLButtonElement>('[data-menu]')!;
const search = browser.querySelector<HTMLInputElement>('[data-search-input]')!;
const selectAll = <T extends Element = HTMLElement>(selector: string) => Array.from(browser.querySelectorAll<T>(selector));
let navigationTimer: ReturnType<typeof setTimeout>;
let viewGeneration = 0;
const copyTimers = new Map<HTMLButtonElement, ReturnType<typeof setTimeout>>();
function setMenu(open: boolean) {
  sidebar.classList.toggle('-translate-x-full', !open);
  sidebar.classList.toggle('translate-x-0', open);
  menu.setAttribute('aria-expanded', String(open));
  menu.querySelector('[data-menu-open]')?.toggleAttribute('hidden', open);
  menu.querySelector('[data-menu-close]')?.toggleAttribute('hidden', !open);
}
function navigate(id: string) {
  const target = id.startsWith('methods-') ? id.replace('methods-', 'method-') : id;
  const section = target.startsWith('method-') ? 'methods' : target;
  for (const item of selectAll<HTMLButtonElement>('nav [data-nav]')) {
    const active = item.dataset.nav === section;
    for (const cls of ['bg-blue-600', 'text-white', 'shadow-md']) item.classList.toggle(cls, active);
    if (active) item.setAttribute('aria-current', 'true'); else item.removeAttribute('aria-current');
  }
  setMenu(false);
  clearTimeout(navigationTimer);
  navigationTimer = setTimeout(() => {
    const element = document.getElementById(target);
    window.scrollTo({top: element ? element.getBoundingClientRect().top + window.scrollY - 80 : 0, behavior: 'smooth'});
  }, 50);
}
function filter() {
  const query = search.value.toLowerCase();
  for (const group of selectAll('[data-filter-group]')) {
    const items = Array.from(group.querySelectorAll<HTMLElement>('[data-filter-item]'));
    for (const item of items) {
      const fields = JSON.parse(item.dataset.search ?? '[]') as string[];
      item.hidden = !fields.some(field => field.toLowerCase().includes(query));
      if (item.hidden && item instanceof HTMLDetailsElement) item.open = false;
    }
    const empty = group.querySelector<HTMLElement>('[data-empty]');
    if (empty) empty.hidden = items.some(item => !item.hidden);
    // React unmounted empty timeline/video/quote wrappers; preserve that spacing.
    const list = group.firstElementChild as HTMLElement | null;
    if (empty && list) list.hidden = !items.some(item => !item.hidden);
  }
}
function reset() {
  viewGeneration++;
  search.value = '';
  filter();
  setMenu(false);
  for (const details of selectAll<HTMLDetailsElement>('details')) details.open = false;
  for (const button of selectAll<HTMLButtonElement>('[data-copy]')) {
    clearTimeout(copyTimers.get(button));
    button.disabled = false;
    button.querySelector('span')!.textContent = button.dataset.idle!;
  }
}
for (const button of document.querySelectorAll<HTMLButtonElement>('[data-open]')) {
  button.addEventListener('click', () => {
    reset(); landing.hidden = true; browser.hidden = false;
    navigate(button.dataset.open!);
  });
}
for (const button of selectAll<HTMLButtonElement>('[data-back]')) button.addEventListener('click', () => {
  reset(); clearTimeout(navigationTimer); browser.hidden = true; landing.hidden = false;
  window.scrollTo({top: 0});
});
for (const button of selectAll<HTMLButtonElement>('[data-nav]')) button.addEventListener('click', () => navigate(button.dataset.nav!));
menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
search.addEventListener('input', filter);
for (const button of selectAll<HTMLButtonElement>('[data-copy]')) button.addEventListener('click', async () => {
  const generation = viewGeneration;
  const status = button.querySelector('span')!;
  const text = button.closest('[data-prompt]')!.querySelector('pre')!.textContent!;
  button.disabled = true;
  clearTimeout(copyTimers.get(button));
  try {
    await navigator.clipboard.writeText(text);
    if (generation === viewGeneration) status.textContent = button.dataset.success!;
  } catch {
    if (generation === viewGeneration) status.textContent = button.dataset.failure!;
  } finally {
    if (generation === viewGeneration) {
      button.disabled = false;
      copyTimers.set(button, setTimeout(() => {status.textContent = button.dataset.idle!;}, 2000));
    }
  }
});
// With JavaScript disabled both views remain readable; enhancement restores the original landing-first view.
browser.hidden = true;
