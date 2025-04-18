import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AppServiceService } from '../../app-service.service';

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.css']
})
export class EditTeacherComponent implements OnInit {
  teacherData: any;
  navigation: any;

  constructor(private service: AppServiceService, private router: Router) {
    this.navigation = this.router.getCurrentNavigation();
  }

  ngOnInit(): void {
    this.getTeacherData();
  }

  getTeacherData() {
    if (!this.navigation?.extras?.state) {
      console.error('No state available in navigation extras');
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
    if (!this.navigation?.extras?.state) {
      console.error('No state available in navigation extras');
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