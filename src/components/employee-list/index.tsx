import { useEffect, useState } from "react";
import "./index.css";
import EmployeeListItem from "../employee-list-item";
import employeeService from "../../services/employee.service";
import { EmployeeResponse } from "../../interface/employee.interface";

export default function EmployeeList() {
  const [employees, setEmployees] = useState<EmployeeResponse[]>([]);

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
