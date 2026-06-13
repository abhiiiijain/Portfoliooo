import Certification from "../../../../models/Certification";
import { createCrudIdHandler } from "../../../../lib/crudHandlers";

export default createCrudIdHandler(Certification, { label: "Certification" });
