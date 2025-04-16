import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, Navigation } from '@angular/router';
import { AppServiceService } from '../../app-service.service';

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.css']
})
export class EditTeacherComponent implements OnInit {
  teacherData: any;
  navigation: Navigation | null;

  constructor(private service: AppServiceService, private router: Router) { }

  ngOnInit(): void {
    this.navigation = this.router.getCurrentNavigation();
    this.getTeacherData();
  }

  getTeacherData() {
    if (!this.navigation?.extras?.state?.id) {
      console.error('No teacher ID provided');
      return;
    }

    let teacher = {
      id: this.navigation.extras.state.id
    };

    this.service.getOneTeacherData(teacher).subscribe(
      (response) => {
        this.teacherData = response[0];
      },
      (error) => {
        console.log('ERROR - ', error);
      }
    );
  }

  editTeacher(values: any) {
    if (!this.navigation?.extras?.state?.id) {
      console.error('No teacher ID provided');
      return;
    }

    values.id = this.navigation.extras.state.id;
    this.service.editTeacher(values).subscribe(
      (response) => {
        this.teacherData = response[0];
      },
      (error) => {
        console.log('ERROR - ', error);
      }
    );
  }
}