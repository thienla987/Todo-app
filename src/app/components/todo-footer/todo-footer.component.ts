import { Component, OnInit } from '@angular/core';
import { FilterButton,Filter } from 'src/app/models/filtering.module';
@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.scss']
})
export class TodoFooterComponent implements OnInit{

  filterButtons: FilterButton[]=[
    {type: Filter.All, label:'All',isActive:true },
    {type: Filter.Active, label:'Active',isActive:false },
    {type: Filter.Completed, label:'Completed',isActive:false },

  ];

  length =0;
  constructor(){}
  ngOnInit() {

  }
}
