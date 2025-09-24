import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookingStore, Flight, FlightFilter } from '../../logic-flight';
import { FlightCardComponent, FlightFilterComponent } from '../../ui-flight';


@Component({
  selector: 'app-flight-search',
  imports: [
    CommonModule,
    FormsModule,
    FlightCardComponent,
    FlightFilterComponent
  ],
  templateUrl: './flight-search.component.html',
})
export class FlightSearchComponent {
  private store = inject(BookingStore)

  protected filter = this.store.filter;
  protected basket = this.store.basket;
  protected flights = this.store.flights

  protected search(filter: FlightFilter): void {
    this.store.setFilter(filter);

    if (!this.filter.from || !this.filter.to) {
      return;
    }
  }

  protected delay(flight: Flight): void {
    const oldFlight = flight;
    const oldDate = new Date(oldFlight.date);

    const newDate = new Date(oldDate.getTime() + 1000 * 60 * 5); // Add 5 min
    const newFlight = {
      ...oldFlight,
      date: newDate.toISOString(),
      delayed: true
    };

    // TODO: needs to be fixed
  }

  protected reset(): void {
    this.store.setFlights([]);
  }
}
