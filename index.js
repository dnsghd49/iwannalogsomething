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
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "View All Employees By Manager",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "Add Employee",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "Remove Employee",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "Update Employee Role",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "Update Employee Manager",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "View All Roles",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "Add Role",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "Remove Role",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "View All Departments",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "Add Department",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "Remove Department",
                    value: "VIEW_EMPLOYEES"
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