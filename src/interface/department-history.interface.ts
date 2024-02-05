export interface DepartmentHistoryResponse {
  id: string;
  employeeId: string;
  departmentId: string;
  startDate: string;
}

export interface DepartmentHistoryRequest {
  employeeId: string;
  departmentId: string;
  startDate?: string;
}
