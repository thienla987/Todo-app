import { Component ,OnInit} from '@angular/core';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss']
})
export class TodoInputComponent implements OnInit {

  todoContent: string | undefined;

  constructor(){}

  ngOnInit(){

  }
  onSubmit(){
    console.log(this.todoContent);
  }
}
