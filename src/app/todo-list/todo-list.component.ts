import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  constructor() { }

  public names = [];
  public task = "";
  public deleted = [];

  public addelement = ()=>{
      this.names = [this.task,...this.names];
      this.task = "";
  }

  public deleteelement = (e) =>{
      this.names = this.names.filter(name => name!=e);
      this.deleted = [e, this.deleted];
  }

  public undoelement = ()=>{
    if (this.deleted.length>0){
      this.names = [this.deleted[0],...this.names];
      this.deleted.shift()
    }
      
  }

  ngOnInit(): void {
  }

}
