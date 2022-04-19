import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from 'src/app/services/reservation.service';


@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {
  bookingForm: FormGroup;
  roomType = new FormControl('Single', Validators.required);
  fromDate = new FormControl(new Date());
  toDate = new FormControl('');
  breakfast = new FormControl(true);
  airConditioner = new FormControl(false);
  wakeUpService = new FormControl(false);
  minFromDate: Date;
  minToDate: Date;
  maxDate: Date;
  tempDate: Date;
  currentYear = new Date().getFullYear();
  reservationCreated = false;
  reservationDeleted: boolean;
  reservationUpdated: boolean;
  bookingId: string;
  modeCreate = true;
  modeEdit = false;
  reservation = {
    room_type: "",
    from_date: new Date,
    to_date: new Date,
    breakfast: "",
    air_conditioner: "",
    wake_up_service: ""
  };
  constructor(private reservationService: ReservationService) {
  }

 
  ngOnInit(): void {
    this.bookingForm = new FormGroup({
      roomType: this.roomType,
      fromDate: this.fromDate,
      toDate: this.toDate,
      breakfast: this.breakfast,
      airConditioner: this.airConditioner,
      wakeUpService: this.wakeUpService
    });
    this.minFromDate = new Date();
    this.maxDate = new Date(this.currentYear + 1, 11, 31);


  }
  resetForm() {
    console.log("Resetting the form");
    this.roomType.setValue('Single');
    this.fromDate.setValue(new Date());
    this.toDate.setValue('');
    this.breakfast.setValue(true);
    this.airConditioner.setValue(false);
    this.wakeUpService.setValue(false);
  }
  onDateUpdate() {
    if ((this.bookingForm.value).fromDate) {
      this.tempDate = (this.bookingForm.value).fromDate;
      this.minToDate = new Date(this.tempDate.getFullYear(), this.tempDate.getMonth(), this.tempDate.getDate() + 1);
    }
  }
  onSubmit() {
    this.reservationCreated = false;
    this.reservationDeleted = false;
    this.reservationUpdated = false;
    if (this.bookingForm.valid) {
      this.reservation = {
        room_type: this.roomType.value,
        from_date: this.fromDate.value,
        to_date: this.toDate.value,
        breakfast: this.breakfast.value,
        air_conditioner: this.airConditioner.value,
        wake_up_service: this.wakeUpService.value
      }
      console.log("Creating");
      this.reservationService.createReservation(this.reservation).subscribe((response: any) => {
        if (response.status) {
          this.bookingId = response.data["_id"];
          this.reservationCreated = true;
        }
      });
      this.resetForm();
    }
  }
  onEdit() {
    console.log("Edititng now");
    this.reservationCreated = false;
    this.reservationDeleted = false;
    this.reservationUpdated = false;
    this.modeCreate = false;
    this.modeEdit = true;
    this.reservationService.getReservation(this.bookingId).subscribe((response: any) => {
      if (response.status) {
        this.roomType.setValue(response.data["room_type"]);
        this.fromDate.setValue(new Date(response.data["from_date"]));
        this.toDate.setValue(new Date(response.data["to_date"]));
        this.breakfast.setValue(response.data["breakfast"]);
        this.airConditioner.setValue(response.data["air_conditioner"]);
        this.wakeUpService.setValue(response.data["wake_up_service"]);
      }
    });
  }
  onUpdate() {
    console.log("Updating");
    this.reservation = {
      room_type: this.roomType.value,
      from_date: this.fromDate.value,
      to_date: this.toDate.value,
      breakfast: this.breakfast.value,
      air_conditioner: this.airConditioner.value,
      wake_up_service: this.wakeUpService.value
    }
    this.reservationService.updateReservation(this.reservation, this.bookingId).subscribe((response: any) => {
      if (response.status == true) {
        this.reservationUpdated = true;
      }
    });
    this.resetForm();
    this.modeCreate = true;
    this.modeEdit = false;

  }
  onDelete() {
    console.log("Deleting");
    this.reservationService.deleteReservation(this.bookingId).subscribe((response: any) => {
      if (response.status) {
        this.bookingId = response.data["_id"];
        this.reservationDeleted = true;
        this.reservationCreated = false;
        this.reservationUpdated = false;
      }
    });
    
    this.resetForm();
    this.modeCreate = true;
    this.modeEdit = false;
  }
}

