import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReservationService } from 'src/app/services/reservation.service';


@Component({
  selector: 'app-reservation-history',
  templateUrl: './reservation-history.component.html',
  styleUrls: ['./reservation-history.component.css']
})
export class ReservationHistoryComponent implements OnInit {
  reservations = [];
  bookingForm: FormGroup;
  roomType = new FormControl('Single');
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
  reservationDeleted: boolean;
  reservationUpdated: boolean;
  bookingId: string;
  modeEdit = false;
  modeTableDisplay = true;
  reservation = {
    room_type: "",
    from_date: new Date,
    to_date: new Date,
    breakfast: "",
    air_conditioner: "",
    wake_up_service: ""
  };

  constructor(private reservationService: ReservationService) {

    this.reservationService.getAllReservation().subscribe((response: any) => {
      if (response.status == true) {
        this.reservations = response.data;
      }
    });
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

  onDataUpdate(){
    this.reservationService.getAllReservation().subscribe((response: any) => {
      if (response.status == true) {
        this.reservations = response.data;
      }
    });
  }
  onModify(id: string) {
    this.bookingId = id;
    this.reservationDeleted = false;
    this.reservationUpdated = false;
    this.modeEdit = true;
    this.modeTableDisplay = false;
    this.onEdit();
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

  onEdit() {
    console.log("Edititng now");
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
    this.modeEdit = false;
    this.modeTableDisplay = true;
    this.onDataUpdate();
  }
  onDelete() {
    console.log("Deleting");
    this.reservationService.deleteReservation(this.bookingId).subscribe((response: any) => {
      if (response.status) {
        this.bookingId = response.data["_id"];
        this.reservationDeleted = true;
        this.reservationUpdated = false;
      }
    });
    
    this.resetForm();
    this.modeEdit = false;
    this.modeTableDisplay = true;
    this.onDataUpdate();
  }

}
