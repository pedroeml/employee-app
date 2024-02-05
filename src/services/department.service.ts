import environment from "../environment";
import { BaseService } from "./base.service";

class DepartmentService extends BaseService {
  public getDepartments(): Promise<any> {
    return super.get<any>("");
  }

  public getDepartment(id: string): Promise<any> {
    return super.get<any>(`${id}`);
  }
}

const departmentService = new DepartmentService(
  environment.API_URL + "/department"
);
export default departmentService;
