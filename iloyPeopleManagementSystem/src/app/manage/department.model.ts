import { Employee } from './employee.model';

export class Department {
  public name: string;
  public children ?: Department[];
  public listOfEmployee ?: Employee[];

  constructor(name: string, listOfEmployee: Employee[]) {
    this.name = name;
    this.listOfEmployee = listOfEmployee;
  }
}
