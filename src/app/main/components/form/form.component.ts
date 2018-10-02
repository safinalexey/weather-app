import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
	selector: 'weather-app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss'],
})
export class FormComponent {

	@Output()
	submitted: EventEmitter<string> = new EventEmitter<string>();

	constructor() {}

	cityFinderForm = new FormGroup({
		city: new FormControl('')
	});

	onSubmit() {
		if (this.cityFinderForm.value.city !== '') {
			this.submitted.emit(this.cityFinderForm.value.city);
		}
	}
}
