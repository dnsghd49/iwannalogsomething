//const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
//const db = require("./db");
//require("console.table");

run();

function run() {
    const logoText = logo({ name: "Employee Manager" }).render();
    console.log(logoText);
}