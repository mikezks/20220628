import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Flight } from '@flight-workspace/flight-lib';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromFlightBooking from '../+state';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  from = 'Hamburg'; // in Germany
  fromLabel = 'From:'
  to = 'Graz'; // in Austria
  urgent = false;
  flights$ = this.store.select(fromFlightBooking.selectActiveUserFlights);

  // "shopping basket" with selected flights
  basket: { [id: number]: boolean } = {
    3: true,
    5: true
  };

  constructor(
    private store: Store,
    private cdRef: ChangeDetectorRef) {

    /* setInterval(() => {
      this.cdRef.markForCheck();
    }, 3_000) */
  }

  ngOnInit() {
    console.log('ngOnInit');
    setTimeout(() =>
      this.fromLabel = 'Startflughafen:'
    , 2_000);
  }

  search(): void {
    if (!this.from || !this.to) return;

    this.store.dispatch(
      fromFlightBooking.flightsLoad({
        from: this.from,
        to: this.to,
        urgent: this.urgent
      })
    );
  }

  delay(flight: Flight): void {
    this.store.dispatch(
      fromFlightBooking.flightUpdate({
        flight: {
          ...flight,
          date: addMinutesToDate(flight.date, 15).toISOString(),
          delayed: true
        }
      })
    )
  }
}


export const addMinutesToDate = (date: Date | string, minutes: number): Date => {
  const dateObj = date instanceof Date ? date : new Date(date);
  return new Date(dateObj.getTime() + minutes * 60 * 1_000);
};
