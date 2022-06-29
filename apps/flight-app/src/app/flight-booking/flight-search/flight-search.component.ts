import { HttpClient } from '@angular/common/http';
import {Component, OnInit, Optional} from '@angular/core';
import {Flight, FlightService} from '@flight-workspace/flight-lib';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { flightsLoaded } from '../+state/flight-booking.actions';
import { FlightBookingRootState } from '../+state/flight-booking.reducer';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
  providers: [
    /* {
      provide: FlightService,
      useFactory: (http: HttpClient) => new FlightService(http),
      deps: [HttpClient]
    } */
  ]
})
export class FlightSearchComponent implements OnInit {

  from = 'Hamburg'; // in Germany
  to = 'Graz'; // in Austria
  urgent = false;
  flights$: Observable<Flight[]> = this.store.select(state => state.flightBooking.flights);

  // "shopping basket" with selected flights
  basket: { [id: number]: boolean } = {
    3: true,
    5: true
  };

  constructor(
    /* @Optional()  */private flightService: FlightService,
    private store: Store<FlightBookingRootState>) {
  }

  ngOnInit() {
    console.log('ngOnInit');
  }

  search(): void {
    if (!this.from || !this.to) return;

    this.flightService
      .find(this.from, this.to, this.urgent).pipe(
        take(1)
      )
      .subscribe(
        flights => this.store.dispatch(
          flightsLoaded({ flights })
        )
      );
  }

  delay(): void {
    this.flightService.delay();
  }

}
