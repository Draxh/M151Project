import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'fk-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  public numb: any;
  public hrefEdit: any = "";

  public todoItems : any[];
  constructor(private todoService : TodoService, private router: Router) {}
  


  ngOnInit() {
    this.hrefEdit = this.router.url
    this.numb = this.hrefEdit.match(/\d/g);
    this.numb = this.numb.join("");
     
    this.todoService.getItem(this.numb).subscribe((items) => {
    this.todoItems = items;
    console.log(this.numb);    
    console.log(this.todoItems);

  })
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.todoService.put(this.numb, form.value).subscribe(
      res => {
        console.log("Erfolg");
      },
      err => {
        console.log(err);
      }
    );
  }

}

