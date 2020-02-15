import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatInputModule,
  MatTooltipModule,
  MatToolbarModule,
  MatSelectModule,
  MatTableModule,
  MatGridListModule,
} from '@angular/material';
import { AddRideComponent } from './add-ride/add-ride.component';
import { TransportServiceService } from 'src/services/transport-service.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ShowAllRidesComponent } from './show-all-rides/show-all-rides.component';

@NgModule({
  declarations: [
    AppComponent,
    AddRideComponent,
    ShowAllRidesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule
  ],
  providers: [
    TransportServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
