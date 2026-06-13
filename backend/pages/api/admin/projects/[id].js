import Project from "../../../../models/Project";
import { createCrudIdHandler } from "../../../../lib/crudHandlers";

export default createCrudIdHandler(Project, { label: "Project", runValidators: true });
