import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { OverlayModule } from 'primeng/overlay';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MenuModule } from 'primeng/menu';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { SidebarModule } from 'primeng/sidebar';
import { ImageModule } from 'primeng/image';
import { ChartModule } from 'primeng/chart';
import { DataViewModule } from 'primeng/dataview';
import { BadgeModule } from 'primeng/badge';
import { CalendarModule } from 'primeng/calendar';
import { ScrollTopModule } from 'primeng/scrolltop';

@NgModule({
  imports: [
    ReactiveFormsModule, FormsModule,

    InputTextModule,
    MenubarModule,
    SidebarModule,
    MenuModule,
    ButtonModule,
    TableModule,
    PasswordModule,
    InputSwitchModule,
    InputTextareaModule,
    DropdownModule,
    FileUploadModule,
    DialogModule,
    RadioButtonModule,
    InputNumberModule,
    OverlayModule,
    OverlayPanelModule,
    AvatarGroupModule,
    AvatarModule,
    MenuModule,
    CardModule,
    TabViewModule,
    ToastModule,
    ImageModule,
    ChartModule,
    DataViewModule,
    BadgeModule,
    CalendarModule,
    ScrollTopModule
  ],
  exports: [
    FormsModule, 
    ReactiveFormsModule,
    ScrollTopModule,
    InputTextModule,
    SidebarModule,
    MenuModule,
    MenubarModule,
    ButtonModule,
    TableModule,
    PasswordModule,
    InputSwitchModule,
    InputTextareaModule,
    DropdownModule,
    FileUploadModule,
    DialogModule,
    RadioButtonModule,
    InputNumberModule,
    OverlayModule,
    OverlayPanelModule,
    AvatarGroupModule,
    AvatarModule,
    MenuModule,
    CardModule,
    TabViewModule,
    ToastModule,
    ImageModule,
    ChartModule,
    DataViewModule,
    BadgeModule,
    CalendarModule
  ]
})
export class SharedModuleComponent {

}
