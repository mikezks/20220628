import { Flight } from '@flight-workspace/flight-lib';
import { createAction, props } from '@ngrx/store';


export const flightsLoaded = createAction(
  '[FlightBooking] Flights loaded',
  props<{ flights: Flight[] }>()
);

export const flightUpdate = createAction(
  '[FlightBooking] Flight update',
  props<{ flight: Flight }>()
);

/* export class FlightManager {
  state = {
    flights: []
  };

  setFlights(flights: Flight[]) {
    console.log('[FlightBooking] Flights loaded');
  }
} */

/* export const loadFlightBookingsFailure = createAction(
  '[FlightBooking] Load FlightBookings Failure',
  props<{ error: any }>()
);
 */
