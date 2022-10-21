import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private httpClient: HttpClient) { }

  getBookingDetails() {
    return this.httpClient.get('http://localhost:3000/passenger-details');
  }

  bookPassengeSeat(passengerData: any) {
    return this.httpClient.post('http://localhost:3000/passenger-details', passengerData);
  }

  deletePassenger(passengerId: number) {
    const deleteEndPoint = 'http://localhost:3000/passenger-details/' + passengerId;
    return this.httpClient.delete(deleteEndPoint);
  }
}
