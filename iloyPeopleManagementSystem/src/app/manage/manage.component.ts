import { Component, OnInit } from '@angular/core';
import { Department } from './department.model';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { DepartmentService } from './department.service';
import { Employee } from './employee.model';

// const TREE_DATA: Department[] = [
//   {
//     name: 'Graphics',
//     listOfEmployee: [
//       {firstName: 'Apple', lastName: 'Apple', dateOfBirth: '03/09/1994' , speciality: 'Apple'},
//       {firstName: 'Apple', lastName: 'Apple', dateOfBirth: '03/09/1994' , speciality: 'Apple'},
//       {firstName: 'Apple', lastName: 'Apple', dateOfBirth: '03/09/1994' , speciality: 'Apple'},
//     ]
//   }, {
//     name: 'Software',
//     children: [
//       {
//         name: 'Front-end',
//         listOfEmployee: [
//           {firstName: 'Apple', lastName: 'Apple', dateOfBirth: '03/09/1994' , speciality: 'Apple'},
//           {firstName: 'Apple', lastName: 'Apple', dateOfBirth: '03/09/1994' , speciality: 'Apple'},
//           {firstName: 'Apple', lastName: 'Apple', dateOfBirth: '03/09/1994' , speciality: 'Apple'},
//         ]
//       }, {
//         name: 'Back-end',
//         listOfEmployee: [
//           {firstName: 'Apple', lastName: 'Apple', dateOfBirth: '03/09/1994' , speciality: 'Apple'},
//           {firstName: 'Apple', lastName: 'Apple', dateOfBirth: '03/09/1994' , speciality: 'Apple'},
//           {firstName: 'Apple', lastName: 'Apple', dateOfBirth: '03/09/1994' , speciality: 'Apple'},
//         ]
//       },
//     ]
//   },
// ];


/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}


@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  status = false;

  private transformerDepartment = (node: Department, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      // tslint:disable-next-line: object-literal-shorthand
      level: level,
      listOfEmployee: node.listOfEmployee,
    };
  }

  // tslint:disable-next-line: member-ordering
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  // tslint:disable-next-line: member-ordering
  treeFlattener = new MatTreeFlattener(
    this.transformerDepartment, node => node.level, node => node.expandable, node => node.children);

  // tslint:disable-next-line: member-ordering
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(public departmentInfoService: DepartmentService) {

  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;



  ngOnInit() {
    this.departmentInfoService.getDepartmentInfo()
    .subscribe( (departmentData: [Department]) => {
      this.dataSource.data = departmentData;
    });
  }

}
