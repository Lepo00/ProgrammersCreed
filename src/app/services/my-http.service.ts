import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';
import { Serie } from '../models/serie.interface';
import { isInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

@Injectable({
  providedIn: 'root'
})
export class MyHttpService {

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<any>{
    return this.httpClient.get('http://localhost:3000/users');
  }

  getMyProfile():Observable<any>{
    return this.httpClient.get('http://localhost:3000/users/'+Number.parseInt(sessionStorage.getItem('user')));
  }

  get8Serie(): Observable<any>{
    return this.httpClient.get('http://localhost:3000/serie?_page=1&_limit=8');
  }

  getSerie(): Observable<any>{
    return this.httpClient.get('http://localhost:3000/serie');
  }

  getSerieFiltrata(filtro:string):Observable<any>{
    return this.httpClient.get('http://localhost:3000/serie?'+filtro+'=true');
  }

  get8SerieFiltrata(filtro:string, limit:number):Observable<any>{
    return this.httpClient.get('http://localhost:3000/serie?_page=1&_limit='+limit+'?'+filtro+'=true');
  }

  getOneSerie(id:number):Observable<any>{
    return this.httpClient.get('http://localhost:3000/serie/'+id);
  }


  
  /*getUsersUsername(author: number): Observable<HttpResponse<User[]>> {
    let genere: string=""+author;
    let params: HttpParams;
    if (genere != null) {
      params = new HttpParams().set('genere', genere);
    }
    return this.httpClient.get<User[]>('http://localhost:3000/games', { observe: 'response', params: params });
    //return this.httpClient.get<GameItem[]>('http://localhost:3000/games?genere=' + genere);
  }*/
  
  postUser(user:User){
    console.log(user);
    return this.httpClient.post('http://localhost:3000/users', user);
  }

  putUser(user: User){
    console.log(".put(http://localhost:3000/users/"+user.id, user);
    //sessionStorage.setItem('user',JSON.stringify(user));
    return this.httpClient.put('http://localhost:3000/users/'+user.id, user);
  }

  putSerie(serie: Serie){
    return this.httpClient.put('http://localhost:3000/serie/'+serie.id, serie);
  }

}
