import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToDoPage } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { ToDoPageRoutingModule } from './tab1-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    ToDoPageRoutingModule
  ],
  declarations: [ToDoPage]
})
export class TodoPageModule {}
