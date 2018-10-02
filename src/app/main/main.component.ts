import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { catchError, takeWhile } from 'rxjs/internal/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs/index';

@Component({
	selector: 'weather-app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./styles.scss']
})

export class MainComponent implements OnInit {

	city: string;
	today: string;
	date;

	unit = 'F';
	isFirstChange = true;

	weather: number;
	forecast;
	loading = true;
	error: boolean;

	constructor(private weatherService: WeatherService) {
		this.date = new Date();
		this.today = this.getDateString(this.date);
	}

	ngOnInit() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(this.getWeather.bind(this));
		} else {
			this.loading = false;
			console.log('Geolocation is not supported by this browser.');
		}
	}

	private getWeather(position) {
		this.weatherService.getWeatherByCoordinates(position.coords)
			.pipe(
				takeWhile(() => !this.city)
			)
			.subscribe(this.handleResponse.bind(this));
	}

	private showWeather(weather) {
		this.weather = Math.floor(weather.main.temp);
		this.city = weather.name;
	}

	private handleResponse(response) {
		const weather = response[0];
		const forecast = response[1].list;

		this.loading = false;
		this.error = false;

		const today = forecast.filter(item => item.dt_txt.split(' ')[0] === this.today);

		if (!today.length) {

			const nextDates = this.getNextDates(5);
			const weatherByDays = this.getWeatherByDays(nextDates, forecast);
			const temperatureAverages = this.getTemperatureAverages(weatherByDays);
			this.forecast = nextDates.map((date, i) => {
				return {date: date, temp: temperatureAverages[i]};
			});
		} else {
			const nextDates = this.getNextDates(4);
			const weatherByDays = this.getWeatherByDays(nextDates, forecast);
			const temperatureAverages = this.getTemperatureAverages(weatherByDays);
			this.forecast = nextDates.map((date, i) => {
				return {date: date, temp: temperatureAverages[i]};
			});
			this.showWeather(weather);
		}
	}

	getForecast() {
		return this.forecast;
	}

	switchUnits() {
		this.isFirstChange = false;
		this.unit = this.unit === 'F' ? 'C' : 'F';
	}

	findCity(city) {
		this.loading = true;
		this.weatherService.getWeatherByCity(city)
			.pipe(
				catchError(this.handleError('city search'))
			)
			.subscribe(this.handleResponse.bind(this));
	}

	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {

			this.error = true;
			console.log(`${operation} failed: ${error.status}`);
			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}

	private getNextDates(numberOfDays: number) {
		const stubArr = Array.from({length: numberOfDays}, (x, i) => i);
		return stubArr
			.map((_, i) => {
				const date = new Date();
				return this.getDateString(date.setDate((date.getDate() + (i + 1))))
			});
	}

	private getTemperatureAverages(weather) {
		return weather.map(day => this.getTemperatureAverage(day));
	}

	private getTemperatureAverage(day) {
		return Math.floor(day.reduce((a, b) => {
			return a + b.main.temp;
		}, 0) / day.length);
	}

	private getWeatherByDays(dates, forecast) {
		return dates.map(date => forecast.filter(item => item.dt_txt.split(' ')[0] === date));
	}

	private getDateString(date) {
		let localDate = date;
		if (typeof date === 'number') {
			localDate = new Date(date);
		}
		// tslint:disable-next-line
		return `${localDate.getFullYear()}-${localDate.getMonth() + 1}-${localDate.getDate() < 10 ? '0' + localDate.getDate() : localDate.getDate()}`;
	}
}
