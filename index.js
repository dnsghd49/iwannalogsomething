const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
require("console.table");

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
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "View All Employees By Department",
                    value: ""
                },
                {
                    name: "View All Employees By Manager",
                    value: ""
                },
                {
                    name: "Add Employee",
                    value: ""
                },
                {
                    name: "Remove Employee",
                    value: ""
                },
                {
                    name: "Update Employee Role",
                    value: ""
                },
                {
                    name: "Update Employee Manager",
                    value: ""
                },
                {
                    name: "View All Roles",
                    value: ""
                },
                {
                    name: "Add Role",
                    value: ""
                },
                {
                    name: "Remove Role",
                    value: ""
                },
                {
                    name: "View All Departments",
                    value: ""
                },
                {
                    name: "Add Department",
                    value: ""
                },
                {
                    name: "Remove Department",
                    value: ""
                },
                
            ]
        }
    ]);

    switch (choice) {
        case "VIEW_EMPLOYEES":
            return viewEmployees();
    }
}


async function viewEmployees(){
    const employee = await db.findAllEmp();

    console.log("\n");
    console.table(employee);

    loadMainPrompts();
}