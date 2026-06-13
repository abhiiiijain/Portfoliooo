import Education from "../../../../models/Education";
import { createCrudIndexHandler } from "../../../../lib/crudHandlers";

export default createCrudIndexHandler(Education, { label: "Education" });
