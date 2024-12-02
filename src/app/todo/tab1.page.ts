import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AlertController,
  IonInput,
  ItemReorderEventDetail,
} from '@ionic/angular';
import { TaskServiceService } from '../services/task-service.service';
import { Task } from '../services/task-service.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class ToDoPage implements OnInit {
  isInputHidden = true;
  taskTitle = '';
  tasks: Task[] = [];
  @ViewChild('input')
  input!: IonInput;
  constructor(
    private taskService: TaskServiceService,
    private alertController: AlertController
  ) {}
  createTask(title: string): void {
    if (this.taskTitle.trim() === '') {
      return;
    }
    this.taskService
      .createTask(title)
      .catch((error) => console.error('Error adding task:', error));
    this.taskTitle = '';
  }
  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }
  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);
    ev.detail.complete();
  }
  toggleInputVisibility() {
    this.isInputHidden = !this.isInputHidden;
  }
  toggleTask(task: Task) {
    this.taskService
      .toggleTaskStatus(task)
      .catch((error) => console.error('Error toggling task:', error));
  }
  deleteTask(task: Task) {
    this.taskService
      .deleteTask(task.id!)
      .catch((error) => console.error('Error deleting task:', error));
  }
  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: (task: Task) => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: (task: Task) => {
        console.log('Alert confirmed');
        this.deleteTask(task);
      },
    },
  ];

  async presentAlert(task: Task) {
    const alert = await this.alertController.create({
      header: 'Confirm Deletion',
      message: `Are you sure you want to delete the task: "${task.title}"?`,
      buttons: this.alertButtons.map((button) => ({
        ...button,
        handler: () => button.handler && button.handler(task),
      })),
    });

    await alert.present();
  }
}
