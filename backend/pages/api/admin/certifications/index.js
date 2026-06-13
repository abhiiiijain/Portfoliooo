import Certification from "../../../../models/Certification";
import { createCrudIndexHandler } from "../../../../lib/crudHandlers";

export default createCrudIndexHandler(Certification, { label: "Certifications" });
