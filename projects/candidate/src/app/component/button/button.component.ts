import { Component, EventEmitter, Input, Output } from "@angular/core";
import { SharedModuleComponent } from "../shared-module";

@Component({
  selector: 'app-button',
  template: `
  <p-button icon="{{ iconBtn }}" label="{{ label }}" pRipple [routerLink]="link" [loading]="loading" (onClick)="clickBtn()" styleClass="p-button-sm {{classBtn}}" type="{{ typeBtn }}"
  [style]="{'background-color' : backgroundColor, 'border':border}"
  [disabled]="isDisabled"
  ></p-button>
  `,
  standalone: true,
  imports: [
    SharedModuleComponent
  ]
})
export class ButtonComponent {
  @Input() label = ''
  @Input() classBtn = ''
  @Input() iconBtn = ''
  @Input() link: undefined | string = undefined
  @Input() loading = false
  @Input() typeBtn = ''
  @Input() backgroundColor = ''
  @Input() border = 'none'
  @Input() isDisabled = false

  @Output() clickChange = new EventEmitter<void>()

  clickBtn() {
    this.clickChange.emit()
  }

}
