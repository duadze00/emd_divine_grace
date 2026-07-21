// ==============================================================================
// MODULES
// ==============================================================================

// When using JavaScript ES Modules, you should include .js.

// ============= NAME EXPORT =============
export class Teacher {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

// ============= NAME IMPORT =============
import { Teacher } from "./filename.js";

// ============= DEFAUT EXPORT =============
export default class Teacher {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

// ============= DEFAUT IMPORT =============
import Teacher from "./filename.js";

// ==============================================================================
// IMPORTING MODULES FILE PATHS
// ==============================================================================

// 1. ======================== FILES FROM SAME FOLDER ========================
/*
project/
│
├── app.js
└── utils.js
*/

// utils.js
export const name = "Eric";

// app.js
import { name } from "./utils.js"; // ==> ./ means "look in the current folder".

// 2. ======================== IMPORT FROM A SUBFOLDER ========================
/*
project/
│
├── app.js
└── js/
    └── utils.js
*/
import { name } from "./js/utils.js"; // Go into the js folder.

// 3. ======================== IMPORT FROM A PARENT FOLDER ========================
/*
project/
│
├── utils.js
└── js/
    └── app.js
*/
import { name } from "../utils.js"; // ==> ../ means "go up one folder".

// 4. ======================== IMPORT FROM A SIBLING FOLDER ========================
/*
│
├── pages/
│   └── app.js
│
└── utils/
    └── helper.js
*/
import { helper } from "../utils/helper.js"; // ==> Go up (../) then into utils.

// ======================== QUICK PATH CHEASTSHEET ========================
/*
SYMBOL                MEANING
./                    Current folder
../                   One folder up
../../                Two folders up
folder/file.js        Go into a folder

*/

// ======================== EXAMPLE ========================
// Same folder
import { user } from "./user.js";

// Child folder
import { user } from "./data/user.js";

// Parent folder
import { user } from "../user.js";

// Parent then another folder
import { user } from "../data/user.js";

// ======================== RULE========================
// Start from the file doing the import, then use:
// ./ → current folder
// ../ → go up
// folder names → go down
