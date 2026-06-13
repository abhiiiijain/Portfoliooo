import { adminFetch } from "./adminApi";

export async function persistItemOrder(apiPath, orderedItems) {
  const withOrder = orderedItems.map((item, index) => ({ ...item, order: index }));
  const changed = orderedItems.some((item, index) => item.order !== index);

  if (!changed) {
    return withOrder;
  }

  await adminFetch(apiPath, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      items: withOrder.map(({ id, order }) => ({ id, order })),
    }),
  });

  return withOrder;
}
