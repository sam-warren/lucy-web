import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  
  private _visibleClasses = [];
  get visibleClasses(): string[] {
    return this. _visibleClasses;
  }

  @Input() set visibleClasses(classNames: string[]) {
    this._visibleClasses = classNames;
  }

  @Output() sideNavItemClicked = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  highlightMenuComponent() {
    if (this.visibleClasses.length < 1) {

    }
    const first = this.visibleClasses[0];
  }

}
