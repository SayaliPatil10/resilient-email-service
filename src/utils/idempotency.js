const idempotencyStore = new Map();

export const isDuplicateRequest = (key) => {
  return idempotencyStore.has(key);
};

export const saveIdempotentResult = (key, result) => {
  idempotencyStore.set(key, result);
};

export const getIdempotentResult = (key) => {
  return idempotencyStore.get(key);
};
