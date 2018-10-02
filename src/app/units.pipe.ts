import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'units'
})
export class UnitsPipe implements PipeTransform {

	transform(value: number, unit: string, flag): number {
		if (flag) {
			return value;
		}
		return unit === 'C' ? Math.floor((value - 32) * 5 / 9) : Math.floor(value);
	}

}
