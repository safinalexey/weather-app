import { TestBed, inject } from '@angular/core/testing';

import { WeatherService } from './weather.service';
import { HttpClient } from '@angular/common/http';

describe('MyServiceService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [WeatherService, HttpClient]
		});
	});

	it('should be created', inject([WeatherService, HttpClient], (service: WeatherService) => {
		expect(service).toBeTruthy();
	}));
});
