import environment from "../environment";
import {
  EmployeeRequest,
  EmployeeResponse,
} from "../interface/employee.interface";
import { BaseService } from "./base.service";

class EmployeeService extends BaseService {
  public getEmployees(): Promise<EmployeeResponse[]> {
    return super.get<EmployeeResponse[]>("");
  }

  public getEmployee(id: string): Promise<EmployeeResponse> {
    return super.get<EmployeeResponse>(`${id}`);
  }

  public updateEmployee(
    id: string,
    employee: EmployeeRequest
  ): Promise<EmployeeResponse> {
    return super.patch<EmployeeResponse, EmployeeRequest>(`${id}`, employee);
  }
}

const employeeService = new EmployeeService(environment.API_URL + "/employee");
export default employeeService;
