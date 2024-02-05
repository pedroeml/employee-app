import environment from "../environment";
import {
  DepartmentHistoryRequest,
  DepartmentHistoryResponse,
} from "../interface/department-history.interface";
import { BaseService } from "./base.service";

class DepartmentHistory extends BaseService {
  public getDepartmentHistory(
    employeeId: string
  ): Promise<DepartmentHistoryResponse[]> {
    return super.get<DepartmentHistoryResponse[]>(`${employeeId}`);
  }

  public createDepartmentHistory(
    departmentHistory: DepartmentHistoryRequest
  ): Promise<DepartmentHistoryResponse> {
    return super.post<DepartmentHistoryResponse, DepartmentHistoryRequest>(
      "",
      departmentHistory
    );
  }
}

const departmentHistoryService = new DepartmentHistory(
  environment.API_URL + "/department/history"
);
export default departmentHistoryService;
