import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { validateCity } from '../../shared/validators/city-validator';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
})
export class FlightEditComponent implements OnInit {
  id: string | undefined;
  showDetails: string | undefined;
  showWarning = false;
  editForm: FormGroup = this.getEditFormMetadata();

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder) {}

  ngOnInit() {
    this.route.params.subscribe((p) => {
      this.id = p['id'];
      this.showDetails = p['showDetails'];

      this.editForm.patchValue({
        id: this.id
      });
    });

    this.editForm.valueChanges.subscribe(console.log);
  }

  getEditFormMetadata(): FormGroup {
    return this.fb.group({
      id: [0],
      from: ['Graz', [
        Validators.required,
        validateCity
      ]],
      to: ['Hamburg', [
        Validators.required
      ]],
      date: [new Date().toISOString()],
      address: [{
        street: 'Main Street',
        number: '5/1/10',
        zip: '1234567CD',
        city: 'Gothem City',
        country: 'U.S.A.'
      }]
    });
  }

  decide(answer: boolean) {
    console.log('decide', answer);
  }

  save(): void {
    console.log('value', this.editForm.value);
    console.log('valid', this.editForm.valid);
    console.log('dirty', this.editForm.dirty);
    console.log('touched', this.editForm.touched);
  }
}
