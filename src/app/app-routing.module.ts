import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CategoriesComponent } from './categories/categories.component';
import { ScheduleComponent } from './schedule/schedule.component';
import  { EditPageComponent } from './edit-page/edit-page.component';
import { QRScannerComponent } from './qrscanner/qrscanner.component';
import { Scanner2Component } from './scanner2/scanner2.component';

const routes: Routes = [
  { path: "events", component: EventsComponent },
  { path: "", component: HomepageComponent, pathMatch: "full"},
  { path: "categories", component: CategoriesComponent },
  { path: "schedule", component: ScheduleComponent },
  { path: "edit-page/:id/:source", component: EditPageComponent },
  { path: "QRScanner", component: QRScannerComponent },
  { path: "Scanner2", component: Scanner2Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
