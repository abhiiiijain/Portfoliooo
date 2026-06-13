import Experience from "../../../../models/Experience";
import { createCrudIndexHandler } from "../../../../lib/crudHandlers";

export default createCrudIndexHandler(Experience, { label: "Experience" });
