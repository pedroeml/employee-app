import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import departmentService from "../../services/department.service";
import { formatDate, formatTimeDiff } from "../../utils/date";
import { DepartmentResponse } from "../../interface/department.interface";
import { EmployeeResponse } from "../../interface/employee.interface";

type Props = {
  employee: EmployeeResponse;
};

export default function EmployeeListItem({ employee }: Props) {
  const [department, setDepartment] = useState<DepartmentResponse>();

  const navigate = useNavigate();

  const name = useMemo(() => `${employee.firstName} ${employee.lastName}`, [employee]);
  const hireDate = useMemo(() => new Date(employee.hireDate), [employee]);
  const hireDateString = useMemo(() => formatDate(hireDate), [hireDate]);
  const timeDiff = useMemo(() => formatTimeDiff(hireDate), [hireDate]);

  const handleDetailsClick = useCallback(() => {
    navigate(`/employee/${employee.id}`);
  }, [navigate, employee]);

  useEffect(() => {
    departmentService.getDepartment(employee.departmentId)
      .then(department => {
        setDepartment(department);
      });
  }, [employee]);

  return (
    <div className="employee-list-item">
      <div className="photo"></div>
      <div className="information">
        <span className="name"><strong>{ name }</strong> ({ department?.name })</span>
        <span className="hire-date-lbl">Hire Date</span>
        <span className="hire-date">{ hireDateString } ({ timeDiff })</span>
      </div>
      <button className="details" onClick={handleDetailsClick}>View Details</button>
    </div>
  );
}
