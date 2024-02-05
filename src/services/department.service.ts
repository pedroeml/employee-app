import environment from "../environment";
import { DepartmentResponse } from "../interface/department.interface";
import { BaseService } from "./base.service";

class DepartmentService extends BaseService {
  public getDepartments(): Promise<DepartmentResponse[]> {
    return super.get<DepartmentResponse[]>("");
  }

  public getDepartment(id: string): Promise<DepartmentResponse> {
    return super.get<DepartmentResponse>(`${id}`);
  }
}

const departmentService = new DepartmentService(
  environment.API_URL + "/department"
);
export default departmentService;
