import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MenuModule, PanelModule, ChartModule, InputTextModule, ButtonModule, InputMaskModule, InputTextareaModule, EditorModule, CalendarModule, RadioButtonModule, FieldsetModule, DropdownModule, MultiSelectModule, ListboxModule, SpinnerModule, SliderModule, RatingModule, DataTableModule, ContextMenuModule, TabViewModule, DialogModule, StepsModule, ScheduleModule, TreeModule, GMapModule, DataGridModule, TooltipModule, ConfirmationService, ConfirmDialogModule, GrowlModule, DragDropModule, GalleriaModule, MenubarModule } from 'primeng/primeng';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule, Routes} from "@angular/router";
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatisticComponent } from './statistic/statistic.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { BuyerComponent } from './buyers/buyer-list.component';
import { BuyerService } from './buyers/buyer.service';
import { AlltimesComponent } from './alltimes/alltimes.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { FielderrorsComponent } from './fielderrors/fielderrors.component';

const appRoutes: Routes = [
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: "dashboard", component: DashboardComponent },
  { path: "alltimes", component: AlltimesComponent },
  { path: "timesheet", component: TimesheetComponent},
  { path: "projects", component: ProjectsComponent},
  { path: "profile", component: ProfileComponent},
  { path: "settings", component: SettingsComponent},
  { path: "buyers", component: BuyerComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    StatisticComponent,
    TimesheetComponent,
    ProjectsComponent,
    AlltimesComponent,
    ProfileComponent,
    SettingsComponent,
    BuyerComponent,     
    FielderrorsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MenuModule,
    PanelModule,
    ChartModule,
    InputTextModule,
    ButtonModule,
    InputMaskModule,
    InputTextareaModule,
    EditorModule,
    CalendarModule,
    RadioButtonModule,
    FieldsetModule,
    DropdownModule,
    MultiSelectModule,
    ListboxModule,
    SpinnerModule,
    SliderModule,
    RatingModule,
    DataTableModule,
    ContextMenuModule,
    TabViewModule,
    DialogModule,
    StepsModule,
    ScheduleModule,
    TreeModule,
    GMapModule,
    DataGridModule,
    TooltipModule,
    ConfirmDialogModule,
    GrowlModule,
    DragDropModule,
    GalleriaModule,
    MenubarModule,
    HttpClientModule
    
  ],
  providers: [ ConfirmationService, BuyerService ],
  bootstrap: [AppComponent]
})
export class AppModule { }