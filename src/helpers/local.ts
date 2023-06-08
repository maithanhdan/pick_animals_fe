type SessionStorageKey = string;
type LocalStorageKey = string;

const setSession = (key: SessionStorageKey, value: any): void =>
  sessionStorage.setItem(key, JSON.stringify(value));

const getSession = (key: SessionStorageKey) => {
  const storedValue = sessionStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : null;
};

const removeSession = (key: SessionStorageKey): void =>
  sessionStorage.removeItem(key);

const isExistSession = (key: SessionStorageKey): boolean =>
  sessionStorage.getItem(key) !== null;

const clearSession = () => sessionStorage.clear();

const setLocal = (key: LocalStorageKey, value: any): void =>
  localStorage.setItem(key, JSON.stringify(value));

const getLocal = (key: LocalStorageKey, noParse?: boolean) => {
  const storedValue = localStorage.getItem(key);
  return noParse ? storedValue : storedValue ? JSON.parse(storedValue) : null;
};

const removeLocal = (key: LocalStorageKey): void =>
  localStorage.removeItem(key);

const isExistLocal = (key: LocalStorageKey): boolean =>
  localStorage.getItem(key) !== null;

const clearLocal = () => localStorage.clear();

const SessionStore = {
  set: setSession,
  get: getSession,
  remove: removeSession,
  isExist: isExistSession,
  clear: clearSession,
};

const LocalStore = {
  set: setLocal,
  get: getLocal,
  remove: removeLocal,
  isExist: isExistLocal,
  clear: clearLocal,
};

export { SessionStore, LocalStore };
