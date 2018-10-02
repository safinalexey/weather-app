import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs/operators';
import { Observable } from 'rxjs/index';

@Injectable()
export class WeatherService {

	appId = 'e9d81a8a6266879a2d26b84bb9f70fc4';

	constructor(private http: HttpClient) {}

	getWeatherByCoordinates(coordinates): Observable<any> {
		const {latitude: lat, longitude: long} = coordinates;
		return this.http
			.get(`//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&APPID=${this.appId}`)
			.pipe(
				zip(this.http.get(`//api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=imperial&APPID=${this.appId}`))
			);
	}

	getWeatherByCity(city: string): Observable<any> {
		return this.http
			.get(`//api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${this.appId}`)
			.pipe(
				zip(this.http.get(`//api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&APPID=${this.appId}`))
			);
	}
}
