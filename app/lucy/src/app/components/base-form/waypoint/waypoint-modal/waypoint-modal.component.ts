import { Component, OnInit } from '@angular/core';
import { WaypointTextEntryComponent } from '../waypoint-text-entry/waypoint-text-entry.component';

@Component({
  selector: 'app-waypoint-modal',
  templateUrl: './waypoint-modal.component.html',
  styleUrls: ['./waypoint-modal.component.css']
})
export class WaypointModalComponent implements OnInit {

  showInfo = false;
  pointsEntered = [];

  constructor() { }

  ngOnInit() {
    this.pointsEntered.push(new WaypointTextEntryComponent());
  }

  toggleView() {
    this.showInfo = !this.showInfo;
  }

  addNewWaypointTextEntry() {
    this.pointsEntered.push(new WaypointTextEntryComponent());
  }

  removeWaypoint(index) {
    this.pointsEntered.splice(index, 1);
  }

}
