import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { NgForm } from '@angular/forms'; 
import {Router} from '@angular/router';

@Component({
  selector: 'fk-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})

export class AddComponent implements OnInit {

  constructor(private todoService : TodoService, private router: Router){}

  

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.todoService.postTodoItem(form.value).subscribe(
      res => {
        console.log("Erfolg");
          this.router.navigateByUrl('/home');
      },
      err => {
        console.log(err);
      }
    );
  
  }

}
