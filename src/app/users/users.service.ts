import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {User} from './User';

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) {}

  // public $userSource = new Subject<any>();

  get(): Observable <User[]> {
    return Observable.create(observer => {
      this.http.get('/api/user').subscribe((data: any) => {
          observer.next(data);
          observer.complete();
      });
    });
  }

  create(user: User): Observable <User> {
    return Observable.create(observer => {
      this.http.post('/api/user', user).subscribe((data: any) => {
        observer.next({user: data.user});
        observer.complete();
      });
    });
  }
}
