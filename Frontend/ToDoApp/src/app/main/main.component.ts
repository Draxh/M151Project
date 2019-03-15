import { Component, OnInit, Input } from '@angular/core';
import { TodoService } from '../todo.service';
import { EditComponent } from '../edit/edit.component';
import { ToDoItem } from '../todo.model';

@Component({
  selector: 'fk-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public todoItems : any[];
  dataForm: ToDoItem
  constructor(private todoService : TodoService) {
   }

  ngOnInit() {   
    
    this.todoService.getAll().subscribe((items) => {
      this.todoItems = items;
      console.log(this.todoItems);
      })
  }

  delete(id){
    this.todoService.delete(id);
    alert("Task deleted successfully");
    window.location.reload();
  } 

}
