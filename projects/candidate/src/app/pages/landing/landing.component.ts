import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'landing-component',
  templateUrl: './landing.component.html'
})
export class LandingComponent {

  constructor(private title: Title) {
    this.title.setTitle("Welcome to JobRoad")
  }

}
