import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookTicketsComponent } from './book-tickets/book-tickets.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'booktickets', component: BookTicketsComponent}
];

@NgModule({
  declarations: [
    // BookTicketsComponent
    // ReserveCountComponent
  ],
  imports: [
    RouterModule.forChild(routes), 
    CommonModule
  ],
  exports: [RouterModule]
})

//Original
// @NgModule({
//   declarations: [
//     BookTicketsComponent
//   ],
//   imports: [
//     CommonModule
//   ]
// })


export class BookingRoutingModule { }
