import { LandingComponent } from './landing/landing.component';
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
import {DataScrollerModule} from 'primeng/datascroller';
import {AccordionModule} from 'primeng/accordion';
import {PasswordModule} from 'primeng/password';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {CarouselModule} from 'primeng/carousel';
import {KeyFilterModule} from 'primeng/keyfilter';
import {SidebarModule} from 'primeng/sidebar';
import {BookingsComponent} from './bookings/bookings.component'
import { AppService } from './app.service';
import {NgxPageScrollModule} from 'ngx-page-scroll';


const appRoutes: Routes = [
  { path: "", redirectTo: "/landing", pathMatch: "full" },
  { path: "dashboard", component: DashboardComponent },
  { path: "marketplace", component: AlltimesComponent },
  { path: "history", component: TimesheetComponent},
  { path: "contacts", component: ProjectsComponent},
  { path: "profile", component: ProfileComponent},
  { path: "settings", component: SettingsComponent},
  { path: "buyers", component: BuyerComponent},
  { path: "bookings", component: BookingsComponent},
  { path: "landing", component: LandingComponent}
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
    FielderrorsComponent,
    BookingsComponent,
    LandingComponent
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
    HttpClientModule,
    DataScrollerModule,
    AccordionModule,
    PasswordModule,
    AutoCompleteModule,
    OverlayPanelModule,
    CarouselModule,
    KeyFilterModule,
    SidebarModule,
    NgxPageScrollModule
    ],
  providers: [ ConfirmationService, BuyerService, AppComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
