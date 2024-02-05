import environment from "../environment";
import { BaseService } from "./base.service";

class DepartmentHistory extends BaseService {
  public getDepartmentHistory(employeeId: string): Promise<any> {
    return super.get<any>(`${employeeId}`);
  }

  public createDepartmentHistory(departmentHistory: any): Promise<any> {
    return super.post<any, any>("", departmentHistory);
  }
}

const departmentHistoryService = new DepartmentHistory(
  environment.API_URL + "/department/history"
);
export default departmentHistoryService;
