import { Injectable } from '@angular/core';
import {Todo,} from '../models/todo.model';
import { BehaviorSubject,Observable } from 'rxjs';
import { Filter } from '../models/filtering.module';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private static readonly TodoStorageKey = 'todos';

  private todos: Todo[] = [];
  private filteredTodos: Todo[]=[];
  private lengthSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private displayTodosSubject: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  private currenFilter:Filter = Filter.All;

  todos$: Observable<Todo[]> = this.displayTodosSubject.asObservable();
  length$: Observable<number> = this.lengthSubject.asObservable();
  constructor(private storageService: LocalStorageService) { }
  fetchFromLocalStorage(){
    this.todos = this.storageService.getValue<Todo[]>(TodoService.TodoStorageKey)||[];
    this.filteredTodos = [...this.todos.map(todo => ({...todo}))];
    this.updateTodoData();


  }

  updateToLocalStorage(){
    this.storageService.setObject(TodoService.TodoStorageKey,this.todos);
    this.filterTodos(this.currenFilter,false)
    this.updateTodoData();
  }
  filterTodos(filter:Filter,isFiltering:boolean = true){
    this.currenFilter = filter;
    switch (filter){
      case Filter.Active:
       this.filteredTodos = this.todos.filter(todo => !todo.isCompleted);
        break;
        case Filter.Completed:
        this.filteredTodos = this.todos.filter(todo => todo.isCompleted);
        break;
        case Filter.All:
        this.filteredTodos = [...this.todos.map(todo => ({...todo}))];
        break;

        if(isFiltering){
          this.updateToLocalStorage();
        }
      }
  }
  private updateTodoData() {
    this.displayTodosSubject.next(this.filteredTodos);
    this.lengthSubject.next(this.todos.length);
  }


}
