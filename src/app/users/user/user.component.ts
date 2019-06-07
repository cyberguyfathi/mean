import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {User} from '../user';
import {UsersService} from '../users.service';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {

  form;
  isSaving;

  constructor(
    public dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {user: User},
    private usersService: UsersService,
    private formBuilder: FormBuilder
  ) {}

  public ngOnInit() {
    const userForm = {
      fullname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      repeatPassword: new FormControl('', [Validators.required, this.passwordsMatchValidator]),
      isUsersAdmin: this.data.user.roles.indexOf('admin') > -1,
      isAnalyst: this.data.user.roles.indexOf('analyst') > -1,
    };
    this.form = this.formBuilder.group(userForm, {validator: this.hasSomeRolesValidator});
  }

  public onSubmit(userData) {
    this.isSaving = true;
    const user: User = {
      email: this.form.root.get('email').value,
      fullname: this.form.get('fullname').value,
      password: this.form.get('password').value,
      repeatPassword: this.form.get('repeatPassword').value,
      roles: []
    };
    if (this.form.root.get('isUsersAdmin').value === true) {
      user.roles.push('admin');
    }
    if (this.form.root.get('isAnalyst').value === true) {
      user.roles.push('analyst');
    }
    this.usersService.create(user).subscribe((data) => {
      this.dialogRef.close(data);
      this.isSaving = false;
    });
  }

  passwordsMatchValidator(control: FormControl): ValidationErrors {
    const password = control.root.get('password');
    return password && control.value !== password.value ? {
      passwordMatch: true
    } : null;
  }

  hasSomeRolesValidator(control: FormGroup): ValidationErrors {
    return control.get('isUsersAdmin').value === false &&
    control.get('isAnalyst').value === false ?
      { hasSomeRoles: true}
      : null;
  }
}
