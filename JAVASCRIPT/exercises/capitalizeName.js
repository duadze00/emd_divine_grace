//* ==================================================
//* CAPITALIZING NAME
//* ==================================================
const name = "eric mawule duadze";
const otherName = name.split(" ");
let capitalizeNames = [];

otherName.forEach((names) => {
  let newName = names.charAt(0).toUpperCase() + names.slice(1);
  capitalizeNames.push(newName);
});

console.log(capitalizeNames.join(" "));

//* ==================================================
//* CAPITALIZE NAME FUNCTION
//* ==================================================
function capitalizeName(name) {
  const otherName = name.split(" ");
  let capitalizeNames = [];

  otherName.forEach((names) => {
    let newName = names.charAt(0).toUpperCase() + names.slice(1).toLowerCase();
    capitalizeNames.push(newName);
  });

  return capitalizeNames.join(" ");
}

//* ==================================================
//* CAPITALIZE NAME FUNCTION (MORE SUCCINCT APPROACH)
//* ==================================================
function capitalizeName(name) {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
