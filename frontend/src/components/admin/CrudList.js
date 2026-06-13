import { useCallback, useEffect, useState } from "react";
import AdminFormFields from "@/components/admin/AdminFormFields";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminModal from "@/components/admin/AdminModal";
import SortableItemList from "@/components/admin/SortableItemList";
import { AdminPanel, AdminPanelBody, btnPrimary } from "@/components/admin/adminUi";
import { adminFetch } from "@/lib/adminApi";

export default function CrudList({
  title,
  subtitle,
  apiPath,
  fields,
  subtitleField,
  emptyLabel = "item",
  embedded = false,
  initialForm = {},
  prepareEditForm,
  hideDelete = false,
  renderModalExtra,
  renderListItem,
}) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const reload = useCallback(
    () => adminFetch(apiPath).then((r) => r.json()).then(setItems),
    [apiPath]
  );

  useEffect(() => {
    reload();
  }, [reload]);

  const openAdd = () => {
    setForm(initialForm);
    setIsEdit(false);
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setForm(prepareEditForm ? prepareEditForm(item) : { ...item });
    setIsEdit(true);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setForm(initialForm);
    setIsEdit(false);
  };

  const save = async () => {
    setSaving(true);
    try {
      const { _id, id, ...rest } = form;
      const payload = {
        ...rest,
        order: isEdit ? form.order : items.length,
      };
      const url = isEdit ? `${apiPath}/${form.id}` : apiPath;
      const method = isEdit ? "PUT" : "POST";
      await adminFetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      closeModal();
      await reload();
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this item?")) return;
    await adminFetch(`${apiPath}/${id}`, { method: "DELETE" });
    reload();
  };

  const formFields = fields.filter((f) => f.key !== "order");

  const defaultRenderListItem = (item) => (
    <div className="flex justify-between items-start gap-3">
      <div className="min-w-0">
        <p className="font-semibold text-slate-100 truncate">
          {item.title || item.position || item.type || item.name}
        </p>
        {subtitleField && item[subtitleField] && (
          <p className="text-slate-500 text-sm truncate">{item[subtitleField]}</p>
        )}
      </div>
      <div className="flex gap-3 shrink-0">
        <button type="button" onClick={() => openEdit(item)} className="text-violet-400 text-sm hover:text-violet-300">
          Edit
        </button>
        {!hideDelete && (
          <button type="button" onClick={() => remove(item.id)} className="text-red-400 text-sm hover:text-red-300">
            Delete
          </button>
        )}
      </div>
    </div>
  );

  const listContent = (
    <>
      <AdminPanel>
        <AdminPanelBody>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-400">
              {items.length} {emptyLabel}
              {items.length !== 1 ? "s" : ""}
            </p>
            <button type="button" onClick={openAdd} className={btnPrimary}>
              + Add {emptyLabel}
            </button>
          </div>

          <SortableItemList
            items={items}
            setItems={setItems}
            apiPath={apiPath}
            renderItem={(item) =>
              renderListItem
                ? renderListItem(item, { onEdit: () => openEdit(item), onRemove: () => remove(item.id) })
                : defaultRenderListItem(item)
            }
          />
        </AdminPanelBody>
      </AdminPanel>

      <AdminModal
        open={modalOpen}
        onClose={closeModal}
        title={isEdit ? `Edit ${emptyLabel}` : `Add ${emptyLabel}`}
        onSubmit={save}
        submitting={saving}
        submitLabel={isEdit ? "Save changes" : "Create"}>
        <AdminFormFields fields={formFields} form={form} setForm={setForm} />
        {renderModalExtra?.({ form, setForm })}
      </AdminModal>
    </>
  );

  if (embedded) return listContent;

  return (
    <AdminLayout title={title} subtitle={subtitle}>
      {listContent}
    </AdminLayout>
  );
}
