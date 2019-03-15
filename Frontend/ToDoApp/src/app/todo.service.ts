import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToDoItem } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  dataForm: ToDoItem;

  private serviceProvider : string = "https://localhost:5001/api/todo/";
  constructor(private httpClient : HttpClient) { }

  public getAll() {
    return this.httpClient.get<any>(this.serviceProvider);
  }

  public delete(id) {
    return this.httpClient.delete<any>(this.serviceProvider + id).subscribe(
      res => {
        console.log("Erfolg");
      },
      err => {
        console.log("Error " + err);
      }
    )
  }

  public put(id, dataForm: ToDoItem) {
    return this.httpClient.put<any>(this.serviceProvider + id, dataForm)
  }

  postTodoItem(dataForm: ToDoItem) {
    return this.httpClient.post(this.serviceProvider, dataForm);
  }
  /*
  public create(newValues) {
    return this.httpClient.post<any>(this.serviceProvider, newValues);
  }*/

  public getItem(id) : Observable<any> {
    return this.httpClient.get<any>(this.serviceProvider + id);
  }
}
