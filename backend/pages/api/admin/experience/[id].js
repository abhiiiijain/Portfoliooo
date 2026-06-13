import Experience from "../../../../models/Experience";
import { createCrudIdHandler } from "../../../../lib/crudHandlers";

export default createCrudIdHandler(Experience, { label: "Experience" });
