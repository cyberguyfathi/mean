import { Component, OnInit } from '@angular/core';
import {UsersService} from './users.service';
import {Observable} from 'rxjs';
import {User} from './User';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {UserComponent} from './user/user.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: Observable<User[]>;
  constructor(private usersService: UsersService,
              private dialog: MatDialog) {}

  public ngOnInit() {
    this.users = this.usersService.get();
  }

  createUser() {
    const u: User = {
      createdAt: null,
      email: '',
      fullname: '',
      _id: null,
      password: '',
      roles: []
    };

    const dialogRef = this.dialog.open(UserComponent, {
      height: '400px',
      width: '600px',
      data: {user: u}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.users = this.usersService.get();
      }
    });
  }

  public editUser(user: User) {
    const dialogRef = this.dialog.open(UserComponent, {
      height: '400px',
      width: '600px',
    });
  }
}


