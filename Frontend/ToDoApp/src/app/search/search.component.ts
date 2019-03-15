import { Component, OnInit } from '@angular/core';
import { ToDoItem } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'fk-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public todoItems : any[];
  usersToSearch = [];
  dataForm: ToDoItem;
  counter: number = 0;
  name;

  constructor(private todoService : TodoService) { }

  ngOnInit() {   
    
    this.todoService.getAll().subscribe((items) => {
      this.todoItems = items;
      console.log(this.todoItems);
      })

  }

  onChange(param) {
    this.usersToSearch = [];
    this.todoItems.forEach((item) => {
      if (item.operator === param) {
        this.usersToSearch.push(item);
      }
    });
  }

}

