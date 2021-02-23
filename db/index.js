const connection = require("./connection");


// This way... I don't have to write db.function to my functions later
class DB {
  // Keeping a reference to the connection on the class in case we need it later
  constructor(connection) {
    this.connection = connection;
  }

  findAllEmp() {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }

  // Find all departments, join with employees and roles and sum up utilized department budget
  findAllDepartments() {
    return this.connection.query(
      "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM department LEFT JOIN role ON role.department_id = department.id LEFT JOIN employee ON employee.role_id = role.id GROUP BY department.id, department.name"
    );
  }

findAllEmployeesByDepartment(departmentId) {
  return this.connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
    departmentId
  );
}

findAllEmpByManager(managerId) {
  return this.connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;",
    managerId
  );
}

addEmployee(employee) {
  return this.connection.query(
    "INSERT INTO employee SET ?", employee
  );
}

findAllRoles() {
  return this.connection.query(
    "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
  );
}

removeEmp(employeeId) {
  return this.connection.query(
    "DELETE FROM employee WHERE id = ?",
    employeeId
  );
}

findAllRoles() {
  return this.connection.query(
    "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;", 
  )
}


}

module.exports = new DB(connection);