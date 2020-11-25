import { Employee } from './employee.model';

export class Department {
  public name: string;
  public children ?: Department[];
  public listOfEmployee ?: Employee[];
}
