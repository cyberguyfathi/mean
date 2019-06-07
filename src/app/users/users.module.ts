import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import {UsersComponent} from './users.component';
import {UsersService} from './users.service';
import {SharedModule} from '../shared/shared.module';
import {UserComponent} from './user/user.component';

@NgModule({
  declarations: [
    UsersComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ],
  providers: [
    UsersService
  ],
  entryComponents: [UserComponent]
})
export class UsersModule {}
