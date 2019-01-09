import { Component, OnInit } from '@angular/core';
import {ToDoService} from '../services/to-do.service'

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {
  public toDoList;
  public editedInput;
  public createToDoInput="";
  public updateActive=null;
  constructor(private todoService: ToDoService) { }

  ngOnInit() {
    this.getAlltoDos();
    this.reset();

  }

  getAlltoDos() {
    this.todoService.getAllToDos().subscribe(res=> {
      this.toDoList=res;
    },
    err => console.log(err),
    ()=> {
      console.log("To-dos",this.toDoList);
    });
  }


  createTodo(toDoInput) {
    // console.log("creating",toDoInput);
    let textObj={"todo": toDoInput}
    this.todoService.createToDo(textObj).subscribe(res=> {
      console.log("created",res);
    },
    err => console.log(err),
    ()=> {
      this.reset();
      this.getAlltoDos();
    });
  }

  reset() {
    document.getElementById("createForm").reset();
  }

  switchtoEditMode(idx)
 {
  this.updateActive=idx;
  console.log("switch to update mode")
 }

 cancelUpdate(idx) {
  this.updateActive=null;
 }

 
 setNewData (newData) {
  this.editedInput=newData;
}

editTodo(existingtoDo,idx) {
  console.log("editing",existingtoDo);
  let id=existingtoDo._id;
  let textObj;
  console.log(this.editedInput);
  if (this.editedInput!="" || this.editedInput!=undefined) {
    textObj={"todo": this.editedInput};
    this.todoService.updateToDo(id,textObj).subscribe(res=> {
      console.log("updated",res);
    },
    err => console.log(err),
    ()=> {
      this.getAlltoDos();
      this.updateActive=null;
    });
  }
  else {
      textObj={"todo": existingtoDo.todo};
      console.log("Cannot update with null data!");
      alert("Cannot update with null data!")
  }
  

}

  deleteTodo(toDo) {
    // console.log("deleting",toDo);
    let id=toDo._id;
    this.todoService.deleteToDo(id).subscribe(res=> {
      console.log("deleted",res.value);
    },
    err => console.log(err),
    ()=> {
      this.getAlltoDos();
    });
  }

}
