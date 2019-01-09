import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  constructor(private http:HttpClient) { }

  getAllToDos() : Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/toDos/getAll');
  }

  createToDo(toDoText) : Observable<any> {
    return this.http.post <any> ('http://localhost:3000/toDos/add',toDoText);
  }

  updateToDo(id,toDoText) : Observable<any[]> {
    return this.http.put<any[]>('http://localhost:3000/toDos/update/'+id,toDoText);
  }

  deleteToDo(id) : Observable<any> {
    return this.http.delete<any>('http://localhost:3000/toDos/delete/'+id);
  }
}
