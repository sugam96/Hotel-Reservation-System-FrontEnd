import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const headers = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private baseURL = `http://localhost:3000/Reservation`;
  constructor(private http: HttpClient) { }

  createReservation(reservation: Object): Observable<Object> {
    return this.http.post(this.baseURL, reservation, headers);
  }
  getReservation(id: String): Observable<Object> {
    return this.http.get(`${this.baseURL}/${id}`, headers);
  }
  getAllReservation(): Observable<Object> {
    return this.http.get(`${this.baseURL}History`, headers);
  }
  updateReservation(reservation: Object, id:String): Observable<Object> {
    return this.http.put(`${this.baseURL}/${id}`, reservation, headers);
  }
  deleteReservation(id: string): Observable<Object> {
    return this.http.delete(`${this.baseURL}/${id}`, headers);
  }
}