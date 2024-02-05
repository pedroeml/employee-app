import environment from "../environment";
import { BaseService } from "./base.service";

class EmployeeService extends BaseService {
  public getEmployees(): Promise<any[]> {
    return super.get<any[]>("");
  }

  public getEmployee(id: string): Promise<any> {
    return super.get<any>(`${id}`);
  }

  public createEmployee(employee: any): Promise<any> {
    return super.post<any, any>("", employee);
  }

  public updateEmployee(id: string, employee: any): Promise<any> {
    return super.patch<any, any>(`${id}`, employee);
  }

  public deleteEmployee(id: string): Promise<any> {
    return super.delete<any>(`${id}`);
  }
}

const employeeService = new EmployeeService(environment.API_URL + "/employee");
export default employeeService;
