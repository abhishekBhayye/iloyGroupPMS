import { Component, OnInit } from '@angular/core';
import { Department } from './department.model';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { DepartmentService } from './department.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

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
  connectedTo = [];

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

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  ngOnInit() {
    this.departmentInfoService.getDepartmentInfo()
    .subscribe( (departmentData) => {
      this.dataSource.data = departmentData;

      this.dataSource.data.forEach(item => {
        if (item.children) {
          const childItem = item.children;

          childItem.forEach(childInfo => {
            this.connectedTo.push(childInfo.name);
          });
        }
        this.connectedTo.push(item.name);
      });
    });
  }

}
