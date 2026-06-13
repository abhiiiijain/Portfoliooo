export function stripPayload(body = {}) {
  const { _id, id, __v, ...rest } = body;
  return rest;
}

export function toApiDoc(doc) {
  if (!doc) return null;
  const { _id, __v, ...rest } = doc;
  const id = _id.toString();
  return { ...rest, id, _id: id };
}
