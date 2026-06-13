import Project from "../../../../models/Project";
import { createCrudIndexHandler } from "../../../../lib/crudHandlers";

export default createCrudIndexHandler(Project, { label: "Projects" });
