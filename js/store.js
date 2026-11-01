// Tiny persisted app state (per device). Real accounts/sync come later with a backend.
//
// state = {
//   lang:    'en' | 'ms' | null        chosen before sign-in
//   user:    { name, email } | null    demo sign-in
//   saved:   [questionId]              ❤ bookmarks
//   seen:    [questionId]              questions viewed in feed or book
//   revealed:[questionId]              formula revealed
// }

const KEY = 'mathui:v1';
const DEFAULTS = { lang: null, user: null, saved: [], seen: [], revealed: [] };

function load() {
  try {
    return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(KEY) ?? '{}') };
  } catch {
    return { ...DEFAULTS };
  }
}

let state = load();
const listeners = new Set();

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* private mode / storage blocked: keep working in memory */
  }
}

export const store = {
  get: () => state,
  set(patch) {
    state = { ...state, ...patch };
    save();
    listeners.forEach((fn) => fn(state));
  },
  subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
  toggleIn(listName, id) {
    const list = new Set(state[listName]);
    list.has(id) ? list.delete(id) : list.add(id);
    store.set({ [listName]: [...list] });
    return list.has(id);
  },
  addTo(listName, id) {
    if (!state[listName].includes(id)) store.set({ [listName]: [...state[listName], id] });
  },
  signOut() {
    store.set({ user: null });
  },
};

// Session-only flags (e.g. which category intros were already played in full).
export const session = {
  get(key) {
    try {
      return sessionStorage.getItem(`mathui:${key}`);
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      sessionStorage.setItem(`mathui:${key}`, value);
    } catch {
      /* ignore */
    }
  },
};
