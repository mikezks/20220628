/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NgControl } from '@angular/forms';


export interface Address {
  street: string;
  number: number[];
  zip: string;
  city: string;
  country: string;
}


@Component({
  selector: 'address-control',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit, ControlValueAccessor {
  addressForm: FormGroup = this.getAddressFormMetadata();
  onChangeFn: ((address: Address) => void) | undefined;

  constructor(
    private fb: FormBuilder,
    private ngControl: NgControl) {

    this.ngControl.valueAccessor = this;
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}

  getAddressFormMetadata(): FormGroup {
    return this.fb.group({
      street: [''],
      number: [''],
      zip: [''],
      city: [''],
      country: ['']
    });
  }

  writeValue(address: Address): void {
    this.addressForm.patchValue(address);
  }

  registerOnChange(fn: (address: Address) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    // throw new Error('Method not implemented.');
  }

  updateAddress(): void {
    /* const externalAddress: Address = {
      ...this.addressForm.value,
      number: this.addressForm.value.number.split('/')
    };
    this.onChangeFn?.(externalAddress); */
    this.onChangeFn?.(this.addressForm.value);
  }
}
