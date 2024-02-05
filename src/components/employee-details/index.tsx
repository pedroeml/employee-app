import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import "./index.css";
import employeeService from "../../services/employee.service";
import departmentService from "../../services/department.service";
import { formatDate, formatTimeDiff } from "../../utils/date";
import departmentHistoryService from "../../services/department-history.service";

export default function EmployeeDetails() {
  const [employee, setEmployee] = useState<any>();
  const [department, setDepartment] = useState<any>();
  const [departmentHistory, setDepartmentHistory] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any>({});
  const hireDate = useMemo(() => new Date(employee?.hireDate), [employee]);
  const hireDateString = useMemo(() => formatDate(hireDate), [hireDate]);
  const timeDiff = useMemo(() => formatTimeDiff(hireDate), [hireDate]);
  const { id } = useParams();

  const loadDepartmentHistory = useCallback(async () => {
    return await departmentHistoryService.getDepartmentHistory(id!)
      .then(history => {
        history.forEach((h: any) => {
          h.date = new Date(h.startDate);
          h.dateString = h.date.toLocaleString().split(",")[0];
        });
        history.sort((a: any, b: any) => b.date - a.date);
        setDepartmentHistory(history);
      });
  }, [id]);

  const handleDepartmentChange = useCallback((departmentId: string) => {
    departmentService.getDepartment(departmentId)
      .then(department => {
        setDepartment(department);
      });
  }, []);

  const handleUpdateDepartment = useCallback((e: any) => {
    e.preventDefault();
    employeeService.updateEmployee(id!, { departmentId: department.id })
      .then(employee => {
        setEmployee(employee);
      });
    departmentHistoryService.createDepartmentHistory({ employeeId: id, departmentId: department.id })
      .then(() => loadDepartmentHistory());
  }, [id, department, loadDepartmentHistory]);

  useEffect(() => {
    employeeService.getEmployee(id!)
      .then(employee => {
        setEmployee(employee);
        return departmentService.getDepartment(employee.departmentId);
      })
      .then(department => {
        setDepartment(department);
      });
    departmentService.getDepartments()
      .then(departments => {
        setDepartments(departments.reduce((acc: any, department: any) => ({...acc, [department.id]: department}), {}));
      });
    loadDepartmentHistory();
  }, [id, loadDepartmentHistory]);

  return (
    <div className="employee-details">
      <div className="photo"></div>
      <div className="information">
        <h3 className="name">{ employee?.firstName } { employee?.lastName }</h3>
        <span className="employee-id">Employee ID: { id }</span>
        <span className="department">Department: { departments[employee?.departmentId]?.name }</span>
        <span className="telephone">Telephone: { employee?.phone }</span>
        <span className="address">Address: { employee?.address }</span>
        {
          Object.keys(departments).length > 0 && department && (
            <form className="update-department">
              <label htmlFor="department">Update Department</label>
              <select
                name="department"
                id="department"
                value={department.id}
                onChange={(e) => handleDepartmentChange(e.target.value)}>
                { Object.keys(departments).map(key => (
                  <option key={key} value={key}>{ departments[key].name }</option>
                )) }
              </select>
              <button
                onClick={handleUpdateDepartment}
                disabled={employee?.departmentId === department.id}>
                Update
              </button>
            </form>
          )
        }
      </div>
      <div className="hire-date-information">
        <span className="hire-date-lbl">Hire Date</span>
        <span className="hire-date">{ hireDateString }</span>
        <span className="time-diff">{ timeDiff }</span>
      </div>
      <h3 className="department-history-lbl">Department History</h3>
      <table className="department-history">
        <thead>
          <tr>
            <th>Date</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          { departmentHistory.map(entry => (
            <tr key={entry.id}>
              <td>{ entry.dateString }</td>
              <td>{ departments[entry.departmentId].name }</td>
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  );
}
