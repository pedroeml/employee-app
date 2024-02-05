import { useEffect, useState } from "react";
import "./index.css";
import EmployeeListItem from "../employee-list-item";
import employeeService from "../../services/employee.service";

export default function EmployeeList() {
  const [employees, setEmployees] = useState<any[]>([]);

  useEffect(() => {
    employeeService.getEmployees()
      .then((employees) => {
        setEmployees(employees);
      });
  }, []);

  return (
    <div className="employee-list">
      {
        employees.map((employee) => (
          <EmployeeListItem key={employee.id} employee={employee}/>
        ))
      }
    </div>
  );
}
