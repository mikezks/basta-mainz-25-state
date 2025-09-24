import { Component, input, linkedSignal, output } from '@angular/core';
import { Control, form, required, schema } from '@angular/forms/signals';
import { FlightFilter } from '../../logic-flight';


const flightFilterSchema = schema<FlightFilter>(filterPath => {
  required(filterPath.from);
  required(filterPath.to);
});

  
@Component({
  selector: 'app-flight-filter',
  imports: [
    Control
  ],
  templateUrl: './flight-filter.component.html'
})
export class FlightFilterComponent {
  filter = input.required<FlightFilter>();
  filterChange = output<FlightFilter>();
  private filterState = linkedSignal(this.filter);
  protected inputFilterForm = form(this.filterState, flightFilterSchema);

  protected triggerSearch(): void {
    this.filterChange.emit(this.filterState());
  }
}
