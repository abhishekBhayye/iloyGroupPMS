import { Employee } from './employee.model';

export class Department {
  [x: string]: any;
  public _id: string;
  public name: string;
  public children ?: Department[];
  public listOfEmployee ?: Employee[];
}
