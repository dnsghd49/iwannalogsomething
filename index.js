const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
//const db = require("./db");
//require("console.table");

run();

function run() {
    const logoText = logo({ name: "Employee Manager" }).render();
    console.log(logoText);

    loadMainPrompts();
}

async function loadMainPrompts() {
    const { choice } = await prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "view all emp", 
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "test2", 
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "test3", 
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "test4", 
                    value: "VIEW_EMPLOYEES"
                },
                
            ]
        }
    ])

    switch (choice) {
        case "VIEW_EMPLOYEES":
    }
}
