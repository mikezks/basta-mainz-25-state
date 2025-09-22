import { Routes } from "@angular/router";
import { provideEffects } from "@ngrx/effects";
import { provideState } from "@ngrx/store";
import { Airport, FlightBookingComponent, FlightEditComponent, FlightSearchComponent } from "../feature-flight";
import { MyFlightsComponent } from "../feature-flight/my-flights/my-flights.component";
import { resolveFlight, TicketEffects, ticketFeature } from "../logic-flight";


export const BOOKING_ROUTES: Routes = [
  {
    path: '',
    component: FlightBookingComponent,
    providers: [
      provideState(ticketFeature),
      provideEffects([TicketEffects]),
    ],
    children: [
      {
        path: '',
        redirectTo: 'flight',
        pathMatch: 'full'
      },
      {
        path: 'flight',
        children: [
          {
            path: '',
            redirectTo: 'search',
            pathMatch: 'full'
          },
          {
            path: 'search',
            component: FlightSearchComponent,
          },
          {
            path: 'edit/:id',
            component: FlightEditComponent,
            resolve: {
              flight: resolveFlight
            }
          }
        ]
      },
      {
        path: 'my-flights',
        component: MyFlightsComponent,
      },
      {
        path: 'airport',
        component: Airport,
      }
    ]
  }
];

export default BOOKING_ROUTES;
