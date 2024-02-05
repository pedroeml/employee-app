export interface EmployeeResponse {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: number;
  hireDate: string;
  departmentId: string;
}

export interface EmployeeRequest {
  firstName?: string;
  lastName?: string;
  address?: string;
  phone?: number;
  hireDate?: string;
  departmentId?: string;
}
