import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingService } from '../booking.service';
import { PassengerModel } from './book-tickets.model';

@Component({
  selector: 'app-book-tickets',
  templateUrl: './book-tickets.component.html',
  styleUrls: ['./book-tickets.component.css']
})
export class BookTicketsComponent implements OnInit {

  passengerDetails!: FormGroup;
  passengerModelObj: PassengerModel = new PassengerModel;

  constructor(formBuilder: FormBuilder, private router: Router, public bookingService: BookingService) {

    this.passengerDetails = formBuilder.group({
      aadharnumber: ['', [Validators.required, Validators.pattern('^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$')]],
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      mobilenumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      gender: ['', Validators.required]
    });
  }

  passengerBookigDetails: any;
  showAllPassengerDetails: boolean = false;
  alreadyBookSeats: boolean = false;
  passengerBookigDetailsLength!: number;
  availableSeatsInCoach!: number;

  getPassengerBookingDetails() {
    this.totalSeatsShow = false;
    this.showReserveNumber = false;
    this.showEntryForm = false;
    this.cancelBookingAadhar = false;
    this.showAllPassengerDetails = false;
    this.alreadyBookSeats = true;

    this.bookingService.getBookingDetails().subscribe(data => {
      this.passengerBookigDetails = data;
      this.passengerBookigDetailsLength = this.passengerBookigDetails.length;
      this.availableSeatsInCoach = 80 - this.passengerBookigDetailsLength;
    })

    // this.getPassengerPassingDetails();
  }

  getBookingEntryDetails() {
    this.totalSeatsShow = false;
    this.alreadyBookSeats = false;
    this.showEntryForm = false;
    this.cancelBookingAadhar = false;
    this.isCountValid = false;
    this.isInputValid = 0;

    this.bookingService.getBookingDetails().subscribe(data => {
      this.passengerBookigDetails = data;
      this.passengerBookigDetailsLength = this.passengerBookigDetails.length;
      if (this.passengerBookigDetailsLength >= 80) {
        this.showReserveNumber = false;
        alert(`All Tickets are booked. Please try after some days.`);
      } else {
        this.showReserveNumber = true;
      }
    })
  }

  isInputValid!: number;
  isCountValid: boolean = false;
  showEntryForm: boolean = false;
  showReserveNumber: boolean = false;

  validateReserveCount() {
    if (this.isInputValid === null) {
      this.isCountValid = false;
    } else {
      if (this.isInputValid >= 1 && this.isInputValid <= 7) {
        this.isCountValid = true;
      } else {
        if (this.isInputValid < 1) {
          this.isCountValid = false;
          alert(`Please select atleast 1 seat to reserve`);
        } else if (this.isInputValid > 7) {
          this.isCountValid = false;
          alert(`You can reserve seats upto 7 only.`);
        }
      }
    }
    this.getPassengerPassingDetails();
  }

  getPassengerPassingDetails() {
    this.bookingService.getBookingDetails().subscribe(data => {
      this.passengerBookigDetails = data;
      this.passengerBookigDetailsLength = this.passengerBookigDetails.length;
      this.availableSeatsInCoach = 80 - this.passengerBookigDetailsLength;
    })
  }

  validCountAndFillForm() {
    this.totalSeatsShow = false;
    this.alreadyBookSeats = false;
    this.showReserveNumber = false;
    this.cancelBookingAadhar = false;

    if (this.isInputValid <= this.availableSeatsInCoach) {
      this.isCountValid = true;
      this.showEntryForm = true;
    } else {
      this.isCountValid = false;
      this.showEntryForm = false;
      this.showReserveNumber = true;
      alert(`Total Seats available in coach are ${this.availableSeatsInCoach}`);
    }
  }

  loopCountForForm: number = 1;

  bookingEntry() {
    if (this.loopCountForForm <= this.isInputValid) {
      this.passengerModelObj.aadharnumber = this.passengerDetails.value.aadharnumber;
      this.passengerModelObj.firstname = this.passengerDetails.value.firstname;
      this.passengerModelObj.lastname = this.passengerDetails.value.lastname;
      this.passengerModelObj.email = this.passengerDetails.value.email;
      this.passengerModelObj.mobilenumber = this.passengerDetails.value.mobilenumber;
      this.passengerModelObj.gender = this.passengerDetails.value.gender;

      this.bookingService.bookPassengeSeat(this.passengerModelObj).subscribe(data => {
        alert(`Details of ${this.loopCountForForm} Passenger submitted :)`);
        this.passengerDetails.reset();
        this.loopCountForForm++;
        this.getPassengerPassingDetails();
      })
    } else {
      alert(`You can only book tickets upto ${this.isInputValid}`);
      this.passengerDetails.reset();
      this.showEntryForm = false;
      this.isInputValid = 0;
      this.showReserveNumber = true;
      // this.getPassengerPassingDetails();
    }
  }

  totalSeats!: number;
  totalSeatsShow: boolean = false;
  seatsArray = [
    ['Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty'],
    ['Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty'],
    ['Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty'],
    ['Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty'],
    ['Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty'],
    ['Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty'],
    ['Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty'],
    ['Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty'],
    ['Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty'],
    ['Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty'],
    ['Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty'],
    ['Empty', 'Empty', 'Empty'],
  ]

  getTotalSeats() {
    this.alreadyBookSeats = false;
    this.totalSeats = 80;
    this.totalSeatsShow = true;
    this.showReserveNumber = false;
    this.showEntryForm = false;
    this.cancelBookingAadhar = false;

    // let start = 0, end = 0;
    // for (let i = 0; i < passengerBookigDetailsLength; i++) {
    //   if (end < 7 && start < 13) {
    //     this.seatsArray[start][end] = 'Reserved';
    //     end++;
    //   } else {
    //     end = 0;
    //     start++;
    //     this.seatsArray[start][end] = 'Reserved';
    //   }
    // }

    this.getPassengerPassingDetails();
    let passengerBookigDetailsLength = this.passengerBookigDetailsLength;

    for (let i = 0; i < passengerBookigDetailsLength; i++) {
      let id = this.passengerBookigDetails[i].id;

      if (id >= 1 && id <= 7) {
        switch (id) {
          case 1: id ? this.seatsArray[0][0] = 'Reserved' : this.seatsArray[0][0] = 'Empty';
            break;
          case 2: id ? this.seatsArray[0][1] = 'Reserved' : this.seatsArray[0][1] = 'Empty';
            break;
          case 3: id ? this.seatsArray[0][2] = 'Reserved' : this.seatsArray[0][2] = 'Empty';
            break;
          case 4: id ? this.seatsArray[0][3] = 'Reserved' : this.seatsArray[0][3] = 'Empty';
            break;
          case 5: id ? this.seatsArray[0][4] = 'Reserved' : this.seatsArray[0][4] = 'Empty';
            break;
          case 6: id ? this.seatsArray[0][5] = 'Reserved' : this.seatsArray[0][5] = 'Empty';
            break;
          case 7: id ? this.seatsArray[0][6] = 'Reserved' : this.seatsArray[0][6] = 'Empty';
            break;
        }
      }
      if (id >= 8 && id <= 14) {
        switch (id) {
          case 8: id ? this.seatsArray[1][0] = 'Reserved' : this.seatsArray[1][0] = 'Empty';
            break;
          case 9: id ? this.seatsArray[1][1] = 'Reserved' : this.seatsArray[1][1] = 'Empty';
            break;
          case 10: id ? this.seatsArray[1][2] = 'Reserved' : this.seatsArray[1][2] = 'Empty';
            break;
            case11: id ? this.seatsArray[1][3] = 'Reserved' : this.seatsArray[1][3] = 'Empty';
            break;
          case 12: id ? this.seatsArray[1][4] = 'Reserved' : this.seatsArray[1][4] = 'Empty';
            break;
          case 13: id ? this.seatsArray[1][5] = 'Reserved' : this.seatsArray[1][5] = 'Empty';
            break;
          case 14: id ? this.seatsArray[1][6] = 'Reserved' : this.seatsArray[1][6] = 'Empty';
            break;
        }
      }
      if (id >= 15 && id <= 21) {
        switch (id) {
          case 15: id ? this.seatsArray[2][0] = 'Reserved' : this.seatsArray[2][0] = 'Empty';
            break;
          case 16: id ? this.seatsArray[2][1] = 'Reserved' : this.seatsArray[2][1] = 'Empty';
            break;
          case 17: id ? this.seatsArray[2][2] = 'Reserved' : this.seatsArray[2][2] = 'Empty';
            break;
          case 18: id ? this.seatsArray[2][3] = 'Reserved' : this.seatsArray[2][3] = 'Empty';
            break;
          case 19: id ? this.seatsArray[2][4] = 'Reserved' : this.seatsArray[2][4] = 'Empty';
            break;
          case 20: id ? this.seatsArray[2][5] = 'Reserved' : this.seatsArray[2][5] = 'Empty';
            break;
          case 21: id ? this.seatsArray[2][6] = 'Reserved' : this.seatsArray[2][6] = 'Empty';
            break;
        }
      }
      if (id >= 22 && id <= 28) {
        switch (id) {
          case 22: id ? this.seatsArray[3][0] = 'Reserved' : this.seatsArray[3][0] = 'Empty';
            break;
          case 23: id ? this.seatsArray[3][1] = 'Reserved' : this.seatsArray[3][1] = 'Empty';
            break;
          case 24: id ? this.seatsArray[3][2] = 'Reserved' : this.seatsArray[3][2] = 'Empty';
            break;
          case 25: id ? this.seatsArray[3][3] = 'Reserved' : this.seatsArray[3][3] = 'Empty';
            break;
          case 26: id ? this.seatsArray[3][4] = 'Reserved' : this.seatsArray[3][4] = 'Empty';
            break;
          case 27: id ? this.seatsArray[3][5] = 'Reserved' : this.seatsArray[3][5] = 'Empty';
            break;
          case 28: id ? this.seatsArray[3][6] = 'Reserved' : this.seatsArray[3][6] = 'Empty';
            break;
        }
      }
      if (id >= 29 && id <= 35) {
        switch (id) {
          case 29: id ? this.seatsArray[4][0] = 'Reserved' : this.seatsArray[4][0] = 'Empty';
            break;
          case 30: id ? this.seatsArray[4][1] = 'Reserved' : this.seatsArray[4][1] = 'Empty';
            break;
          case 31: id ? this.seatsArray[4][2] = 'Reserved' : this.seatsArray[4][2] = 'Empty';
            break;
          case 32: id ? this.seatsArray[4][3] = 'Reserved' : this.seatsArray[4][3] = 'Empty';
            break;
          case 33: id ? this.seatsArray[4][4] = 'Reserved' : this.seatsArray[4][4] = 'Empty';
            break;
          case 34: id ? this.seatsArray[4][5] = 'Reserved' : this.seatsArray[4][5] = 'Empty';
            break;
          case 35: id ? this.seatsArray[4][6] = 'Reserved' : this.seatsArray[4][6] = 'Empty';
            break;
        }
      }
      if (id >= 36 && id <= 42) {
        switch (id) {
          case 36: id ? this.seatsArray[5][0] = 'Reserved' : this.seatsArray[5][0] = 'Empty';
            break;
          case 37: id ? this.seatsArray[5][1] = 'Reserved' : this.seatsArray[5][1] = 'Empty';
            break;
          case 38: id ? this.seatsArray[5][2] = 'Reserved' : this.seatsArray[5][2] = 'Empty';
            break;
          case 39: id ? this.seatsArray[5][3] = 'Reserved' : this.seatsArray[5][3] = 'Empty';
            break;
          case 40: id ? this.seatsArray[5][4] = 'Reserved' : this.seatsArray[5][4] = 'Empty';
            break;
          case 41: id ? this.seatsArray[5][5] = 'Reserved' : this.seatsArray[5][5] = 'Empty';
            break;
          case 42: id ? this.seatsArray[5][6] = 'Reserved' : this.seatsArray[5][6] = 'Empty';
            break;
        }
      }
      if (id >= 43 && id <= 49) {
        switch (id) {
          case 43: id ? this.seatsArray[6][0] = 'Reserved' : this.seatsArray[6][0] = 'Empty';
            break;
          case 44: id ? this.seatsArray[6][1] = 'Reserved' : this.seatsArray[6][1] = 'Empty';
            break;
          case 45: id ? this.seatsArray[6][2] = 'Reserved' : this.seatsArray[6][2] = 'Empty';
            break;
          case 46: id ? this.seatsArray[6][3] = 'Reserved' : this.seatsArray[6][3] = 'Empty';
            break;
          case 47: id ? this.seatsArray[6][4] = 'Reserved' : this.seatsArray[6][4] = 'Empty';
            break;
          case 48: id ? this.seatsArray[6][5] = 'Reserved' : this.seatsArray[6][5] = 'Empty';
            break;
          case 49: id ? this.seatsArray[6][6] = 'Reserved' : this.seatsArray[6][6] = 'Empty';
            break;
        }
      }
      if (id >= 50 && id <= 56) {
        switch (id) {
          case 50: id ? this.seatsArray[7][0] = 'Reserved' : this.seatsArray[7][0] = 'Empty';
            break;
          case 51: id ? this.seatsArray[7][1] = 'Reserved' : this.seatsArray[7][1] = 'Empty';
            break;
          case 52: id ? this.seatsArray[7][2] = 'Reserved' : this.seatsArray[7][2] = 'Empty';
            break;
          case 53: id ? this.seatsArray[7][3] = 'Reserved' : this.seatsArray[7][3] = 'Empty';
            break;
          case 54: id ? this.seatsArray[7][4] = 'Reserved' : this.seatsArray[7][4] = 'Empty';
            break;
          case 55: id ? this.seatsArray[7][5] = 'Reserved' : this.seatsArray[7][5] = 'Empty';
            break;
          case 56: id ? this.seatsArray[7][6] = 'Reserved' : this.seatsArray[7][6] = 'Empty';
            break;
        }
      }
      if (id >= 57 && id <= 63) {
        switch (id) {
          case 57: id ? this.seatsArray[8][0] = 'Reserved' : this.seatsArray[8][0] = 'Empty';
            break;
          case 58: id ? this.seatsArray[8][1] = 'Reserved' : this.seatsArray[8][1] = 'Empty';
            break;
          case 59: id ? this.seatsArray[8][2] = 'Reserved' : this.seatsArray[8][2] = 'Empty';
            break;
          case 60: id ? this.seatsArray[8][3] = 'Reserved' : this.seatsArray[8][3] = 'Empty';
            break;
          case 61: id ? this.seatsArray[8][4] = 'Reserved' : this.seatsArray[8][4] = 'Empty';
            break;
          case 62: id ? this.seatsArray[8][5] = 'Reserved' : this.seatsArray[8][5] = 'Empty';
            break;
          case 63: id ? this.seatsArray[8][6] = 'Reserved' : this.seatsArray[8][6] = 'Empty';
            break;
        }
      }
      if (id >= 64 && id <= 70) {
        switch (id) {
          case 64: id ? this.seatsArray[9][0] = 'Reserved' : this.seatsArray[9][0] = 'Empty';
            break;
          case 65: id ? this.seatsArray[9][1] = 'Reserved' : this.seatsArray[9][1] = 'Empty';
            break;
          case 66: id ? this.seatsArray[9][2] = 'Reserved' : this.seatsArray[9][2] = 'Empty';
            break;
          case 67: id ? this.seatsArray[9][3] = 'Reserved' : this.seatsArray[9][3] = 'Empty';
            break;
          case 68: id ? this.seatsArray[9][4] = 'Reserved' : this.seatsArray[9][4] = 'Empty';
            break;
          case 69: id ? this.seatsArray[9][5] = 'Reserved' : this.seatsArray[9][5] = 'Empty';
            break;
          case 70: id ? this.seatsArray[9][6] = 'Reserved' : this.seatsArray[9][6] = 'Empty';
            break;
        }
      }
      if (id >= 71 && id <= 77) {
        switch (id) {
          case 71: id ? this.seatsArray[10][0] = 'Reserved' : this.seatsArray[10][0] = 'Empty';
            break;
          case 72: id ? this.seatsArray[10][1] = 'Reserved' : this.seatsArray[10][1] = 'Empty';
            break;
          case 73: id ? this.seatsArray[10][2] = 'Reserved' : this.seatsArray[10][2] = 'Empty';
            break;
          case 74: id ? this.seatsArray[10][3] = 'Reserved' : this.seatsArray[10][3] = 'Empty';
            break;
          case 75: id ? this.seatsArray[10][4] = 'Reserved' : this.seatsArray[10][4] = 'Empty';
            break;
          case 76: id ? this.seatsArray[10][5] = 'Reserved' : this.seatsArray[10][5] = 'Empty';
            break;
          case 77: id ? this.seatsArray[10][6] = 'Reserved' : this.seatsArray[10][6] = 'Empty';
            break;
        }
      }
      if (id >= 78 && id <= 80) {
        switch (id) {
          case 78: id ? this.seatsArray[11][0] = 'Reserved' : this.seatsArray[11][0] = 'Empty';
            break;
          case 79: id ? this.seatsArray[11][1] = 'Reserved' : this.seatsArray[11][1] = 'Empty';
            break;
          case 80: id ? this.seatsArray[11][2] = 'Reserved' : this.seatsArray[11][2] = 'Empty';
            break;
        }
      }
    }
  }

  isAadharNumber: string = '';
  searchPassengerId!: number;
  searchPassengerAadharNumber: string = '';
  searchPassengerFirstName: string = '';
  searchPassengerLastName: string = '';
  searchPassengerEmail: string = '';
  searchPassengerMobile: string = '';
  searchPassengerGender: string = '';

  cancelBookingAadhar: boolean = false;
  cancelBooking() {
    this.cancelBookingAadhar = true;
    this.searchedPassengerDetailToCancel = false;
    this.alreadyBookSeats = false;
    this.totalSeatsShow = false;
    this.showReserveNumber = false;
    this.showEntryForm = false;

    this.isAadharNumber = '';
  }

  searchedPassengerDetailToCancel: boolean = false;
  searchPassenger() {
    this.totalSeatsShow = false;
    this.alreadyBookSeats = false;
    this.showReserveNumber = false;
    this.showEntryForm = false;

    this.bookingService.getBookingDetails().subscribe(data => {
      this.passengerBookigDetails = data;
      let passengerBookigDetailsLength = this.passengerBookigDetails.length;

      let isPassengerFound: boolean = false;
      for (let i = 0; i < passengerBookigDetailsLength; i++) {
        let aadharCheck = +this.passengerBookigDetails[i].aadharnumber;

        if (aadharCheck === +this.isAadharNumber) {
          this.searchPassengerId = this.passengerBookigDetails[i].id;
          this.searchPassengerAadharNumber = this.passengerBookigDetails[i].aadharnumber;
          this.searchPassengerFirstName = this.passengerBookigDetails[i].firstname;
          this.searchPassengerLastName = this.passengerBookigDetails[i].lastname;
          this.searchPassengerEmail = this.passengerBookigDetails[i].email;
          this.searchPassengerMobile = this.passengerBookigDetails[i].mobilenumber;
          this.searchPassengerGender = this.passengerBookigDetails[i].gender;
          isPassengerFound = true;
          this.searchedPassengerDetailToCancel = true;
        }
      }

      if (!isPassengerFound) {
        alert(`No Seat is booked for this Aadhar Number`);
        this.searchedPassengerDetailToCancel = false;
      }
    })
  }

  deletePassengerBooking() {
    this.totalSeatsShow = false;
    this.alreadyBookSeats = false;
    this.showReserveNumber = false;
    this.showEntryForm = false;
    this.bookingService.deletePassenger(this.searchPassengerId).subscribe(data => {
      alert('Booking Cancelled Succesfully');
      this.getPassengerPassingDetails();
    })
    this.searchedPassengerDetailToCancel = false;
    this.isAadharNumber = '';
  }

  ngOnInit(): void { }

}
