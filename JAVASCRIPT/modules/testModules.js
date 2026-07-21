// ============= NAME IMPORT =============
import { Teacher } from "./modules.js";

let teacher = new Teacher("Eric", 23);
let t = teacher.show();
console.log(t);

// ============= DEFAUT IMPORT =============
import Student from "./modules.js";

let student = new Student("Eric", 23);
let s = student.show();
console.log(s);
