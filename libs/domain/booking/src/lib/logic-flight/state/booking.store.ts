import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { FlightFilter } from '../model/flight-filter';
import { Flight } from '../model/flight';
import { computed, inject } from '@angular/core';
import { pipe, switchMap } from 'rxjs';
import { FlightService } from '../data-access/flight.service';

export interface BookingStore {
  filter: FlightFilter;
  basket: Record<number, boolean>;
  flights: Flight[];
}

export const initialBookingState: BookingStore = {
  filter: {
    from: 'Graz',
    to: 'Hamburg',
    urgent: false
  },
  basket: {
    3: true,
    5: true
  },
  flights: []
};


export const BookingStore = signalStore(
  { providedIn: 'root' },
  // State
  withState(initialBookingState),
  withComputed(store => ({
    delayedFlights: computed(
      () => store.flights().filter(flight => flight.delayed)
    ),
  })),
  // Updater
  withMethods(store => ({
    setFilter: (filter: FlightFilter) => patchState(store, { filter }),
    setFlights: (flights: Flight[]) => patchState(store, { flights }),
  })),
  // Side-Effects
  withMethods((
    store,
    flightService = inject(FlightService)
  ) => ({
    loadFlights$: rxMethod<FlightFilter>(pipe(
      switchMap(filter => flightService.find(
        filter.from, filter.to, filter.urgent
      ).pipe(
        tapResponse({
          next: flights => store.setFlights(flights),
          error: err => console.error(err)
        })
      ))
    ))
  })),
  withHooks({
    onInit: store => store.loadFlights$(store.filter)
  })
);