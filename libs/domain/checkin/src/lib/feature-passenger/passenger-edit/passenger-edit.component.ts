import { Component, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Control, form, required, schema } from '@angular/forms/signals';
import { initialPassenger, Passenger } from '../../logic-passenger';

// (3) Field Logic: validate, readonly, disabled, hidden

const passengerSchema = schema<Passenger>(passengerPath => {
  required(passengerPath.name);
  required(passengerPath.firstName);
});

@Component({
  selector: 'app-passenger-edit',
  imports: [
    ReactiveFormsModule,
    // (4) UI Control: Template Binding
    Control
  ],
  templateUrl: './passenger-edit.component.html'
})
export class PassengerEditComponent {
  // (1) Data Model: Writable Signal
  protected passenger = signal(initialPassenger);

  // (2) Field State: valid, touched, dirty, disabled
  protected editForm = form(this.passenger, passengerSchema);

  protected save(): void {
    console.log(this.editForm().value());
  }
}
