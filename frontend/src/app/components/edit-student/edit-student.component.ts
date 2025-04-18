import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AppServiceService } from '../../app-service.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  studentData: any;
  navigation: any;

  constructor(private service: AppServiceService, private router: Router) {
    this.navigation = this.router.getCurrentNavigation();
  }

  ngOnInit(): void {
    this.getStudentData();
  }

  getStudentData() {
    if (!this.navigation?.extras?.state) {
      console.error('No state available in navigation extras');
      return;
    }

    let student = {
      id: this.navigation.extras.state.id
    };

    this.service.getOneStudentData(student).subscribe(
      (response) => {
        this.studentData = response[0];
      },
      (error) => {
        console.log('ERROR - ', error);
      }
    );
  }

  editStudent(values: any) {
    if (!this.navigation?.extras?.state) {
      console.error('No state available in navigation extras');
      return;
    }

    values.id = this.navigation.extras.state.id;
    this.service.editStudent(values).subscribe(
      (response) => {
        this.studentData = response[0];
      },
      (error) => {
        console.log('ERROR - ', error);
      }
    );
  }
}