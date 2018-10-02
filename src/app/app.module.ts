import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { FormComponent } from './main/components/form/form.component';
import { WeatherService } from './services/weather.service';
import { UnitsPipe } from './units.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';


@NgModule({
	declarations: [
		AppComponent,
		MainComponent,
		FormComponent,
		UnitsPipe
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatProgressSpinnerModule
		// StoreModule.forRoot(reducers, { initialState: getInitialState })
	],
	providers: [WeatherService],
	bootstrap: [AppComponent]
})
export class AppModule {
}
