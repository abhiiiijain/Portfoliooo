import Education from "../../../../models/Education";
import { createCrudIdHandler } from "../../../../lib/crudHandlers";

export default createCrudIdHandler(Education, { label: "Education" });
