import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
export interface Task {
  id?: string;
  title: string;
  createdAt: Date;
  done: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TaskServiceService {
  private tasks = this.firestore.collection<Task>('tasks');

  constructor(private firestore: AngularFirestore) {}
  createTask(title: string): Promise<void> {
    const id = this.firestore.createId(); // Generate a unique ID
    const newTask: Task = {
      id,
      title,
      createdAt: new Date(),
      done: false,
    };
    return this.tasks.doc(id).set(newTask); // Save task to Firestore    return newTask;
  }

  deleteTask(id: string): Promise<void> {
    return this.tasks.doc(id).delete();
  }

  getTasks(): Observable<Task[]> {
    return this.firestore
      .collection<Task>('tasks')
      .valueChanges({ idField: 'id' })
      .pipe(
        map((tasks) =>
          tasks.map((task) => ({
            ...task,
            createdAt: (task.createdAt as any).toDate(), // Convert Firestore Timestamp to Date
          }))
        )
      );
  }
  getDoneTasks(): Observable<Task[]> {
    return this.firestore
      .collection<Task>('tasks', (ref) => ref.where('done', '==', true))
      .valueChanges();
  }
  toggleTaskStatus(task: Task): Promise<void> {
    return this.firestore
      .collection('tasks')
      .doc(task.id)
      .update({ done: task.done });
  }
}
