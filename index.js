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
                    value: "VIEW_BY_DEPARTMENT"
                },
                {
                    name: "View All Employees By Manager",
                    value: "VIEW_BY_MANAGER"
                },
                {
                    name: "Add Employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "Remove Employee",
                    value: "REMOVE_EMPLOYEE"
                },
                {
                    name: "Update Employee Role",
                    value: "UPDATE_ROLE"
                },
                {
                    name: "Update Employee Manager",
                    value: "UPDATE_MANAGER"
                },
                {
                    name: "View All Roles",
                    value: "VIEW_ALL_ROLES"
                },
                {
                    name: "Add Role",
                    value: "ADD_ROLE"
                },
                {
                    name: "Remove Role",
                    value: "REMOVE_ROLE"
                },
                {
                    name: "View All Departments",
                    value: "ALL_DEPARTMENTS"
                },
                {
                    name: "Add Department",
                    value: "ADD_DEPARTMENT"
                },
                {
                    name: "Remove Department",
                    value: "REMOVE_DEPARTMENT"
                },
                
            ]
        }
    ]);

    switch (choice) {
        case "VIEW_EMPLOYEES":
            return viewEmployees();
        case "VIEW_BY_DEPARTMENT":
            return viewByDepartment();
        case "VIEW_BY_MANAGER":
            return viewByManager();
        case "ADD_EMPLOYEE":
            return addEmp();
        case "REMOVE_EMPLOYEE":
            return removeEmp();
        case "UPDATE_ROLE":
            return updateRole();
        case "UPDATE_MANAGER":
            return updateManager();
        case "VIEW_ALL_ROLES":
            return ;
        case "ADD_ROLE":
            return ;
        case "REMOVE_ROLE":
            return ;
        case "ALL_DEPARTMENTS":
            return ;
        case "ADD_DEPARTMENT":
            return ;
        case "":
            return ;
    }
}

// Function to view all the employees
async function viewEmployees() {
    const employee = await db.findAllEmp();

    console.log("\n");
    console.table(employee);

    loadMainPrompts();
}

// Function to view all the employees by department
async function viewByDepartment() {
    const departments = await db.findAllDepartments();

    const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
    }));

    const { departmentId } = await prompt([
        {
          type: "list",
          name: "departmentId",
          message: "Which department would you like to see employees for?",
          choices: departmentChoices
        }
      ]);

    const employees = await db.findAllEmployeesByDepartment(departmentId);

    console.log("\n");
    console.table(employees);

    loadMainPrompts();
}

// Function to show employees under selected manager by their first and last name
async function viewByManager() {
    const managers = await db.findAllEmp();
    
    const managerChoices = managers.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));

    const { managerId } = await prompt([
        {
          type: "list",
          name: "managerId",
          message: "Which employee do you want to see direct reports for?",
          choices: managerChoices
        }
    ]);

    const employees = await db. findAllEmpByManager(managerId);

    console.log("\n");

    // If statement for displaying error when user selects regualr employee" 
    if (employees.length === 0) {
        console.log("The selected employee has no direct reports");
      } else {
        console.table(employees);
    }

    loadMainPrompts();
}

// Function for add more employees
async function addEmp () {
    const employees = await db.findAllEmp();
    const roles = await db.findAllRoles();

    const employee = await prompt([
      {
        name: "first_name",
        message: "What is the employee's first name?"
      },
      {
        name: "last_name",
        message: "What is the employee's last name?"
      }
    ]);
  
    const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
    }));
  
    const { roleId } = await prompt({
        type: "list",
        name: "roleId",
        message: "What is the employee's role?",
        choices: roleChoices
    });
  
    employee.role_id = roleId;
  
    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));
    managerChoices.unshift({ name: "None", value: null });
  
    const { managerId } = await prompt({
        type: "list",
        name: "managerId",
        message: "Who is the employee's manager?",
        choices: managerChoices
    });
  
    employee.manager_id = managerId;
  
    await db.addEmployee(employee);
  
    console.log(
      `Added ${employee.first_name} ${employee.last_name} to the database`
    );
  
    loadMainPrompts();
}


// Function for removing employee by selecting their name
async function removeEmp() {
    const employees = await db.findAllEmp();

    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));

  const { employeeId } = await prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Which employee do you want to remove?",
      choices: employeeChoices
    }
  ]);

    await db.removeEmp(employeeId);

    console.log("Removed employee from the database");

    loadMainPrompts();
}

// Function to update employee roles
async function updateRole() {
    const employees = await db.findAllEmp();

    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }));

    const { employeeId } = await prompt([
        {
            type: "list",
            name: "employeeId",
            message: "Which employee's role do you want to update?",
            choices: employeeChoices
        }
    ]);

    const roles = await db.findAllRoles();

    const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
    }));

    const { roleId } = await prompt ([
        {
            type: "list",
            name: "roleId",
            message: "Which role do you want to assign the selected employee?",
            choices: roleChoices
        }
    ]);

    await db.updateRole(employeeId, roleId);

    console.log("Updated employee's role");

    loadMainPrompts();
}



// Function to update manager 
async function updateManager() {const employees = await db.findAllEmp();}


/*
async function helloworld() {
    const  = await db.findAllEmp();



    const employee = await prompt([
    ]);

    await db.something();

    console.log();

    loadMainPrompts();
} */