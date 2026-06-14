import { adminFetch } from "./adminApi";

export async function persistItemOrder(apiPath, orderedItems) {
  const withOrder = orderedItems.map((item, index) => ({ ...item, order: index }));
  const changed = orderedItems.some((item, index) => item.order !== index);

  if (!changed) {
    return withOrder;
  }

  const response = await adminFetch(apiPath, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      items: withOrder.map(({ id, order }) => ({ id, order })),
    }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || `Failed to save order (${response.status})`);
  }

  const updated = await response.json().catch(() => null);
  if (Array.isArray(updated)) {
    return updated;
  }

  return withOrder;
}
