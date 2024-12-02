import { Component, OnInit } from '@angular/core';
import { TaskServiceService } from '../services/task-service.service';
import { Task } from '../services/task-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  doneTasks: Task[] = [];
  doneTasks$: Observable<Task[]> | undefined;

  constructor(private taskService: TaskServiceService) {}

  ngOnInit(): void {
    this.doneTasks$ = this.taskService.getDoneTasks();
    this.doneTasks$.subscribe((tasks) => {
      this.doneTasks = tasks;
    });
  }
}
