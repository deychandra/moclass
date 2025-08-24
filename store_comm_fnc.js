export const getFromLocal = (name, default_value) => {
    try {
      const raw = localStorage.getItem(name);
      if (raw === null) return default_value;
  
      // If it looks like JSON (starts with { [ " or a number), parse it
      if (/^[\[{"]/.test(raw) || /^-?\d+$/.test(raw)) {
        return JSON.parse(raw);
      }
  
      // Otherwise, return as plain string
      return raw;
    } catch (e) {
      return default_value;
    }
  };
  