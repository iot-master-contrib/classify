import { DevicesComponent } from './device/devices/devices.component';
import { DeviceTypeComponent } from './device/device-type/device-type.component';
import { DeviceGroupComponent } from './device/device-group/device-group.component';
import { DeviceAreaComponent } from './device/device-area/device-area.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import {APP_BASE_HREF, registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import {NzCardModule} from "ng-zorro-antd/card";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import {BaseModule} from "./base/base.module";
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { DeviceTypeEditComponent } from './device/device-type-edit/device-type-edit.component';
import { DeviceGroupEditComponent } from './device/device-group-edit/device-group-edit.component';
import { DeviceAreaEditComponent } from './device/device-area-edit/device-area-edit.component';
import { DevicesEditComponent } from './device/devices-edit/devices-edit.component';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { SelectGroupComponent } from './device/select-group/select-group.component';
import { SelectAreaComponent } from './device/select-area/select-area.component';
import { SelectTypeComponent } from './device/select-type/select-type.component';
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import { DragDropModule } from '@angular/cdk/drag-drop'
registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    DeviceAreaComponent,DeviceGroupComponent,DeviceTypeComponent,DevicesComponent,
      DeviceTypeEditComponent, DeviceGroupEditComponent, DeviceAreaEditComponent, DevicesEditComponent, SelectGroupComponent, SelectAreaComponent, SelectTypeComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NzInputModule,
        NzMessageModule,
        NzButtonModule,
        DragDropModule,
        NzTableModule,
        NzTransferModule,
        ReactiveFormsModule,
        NzFormModule ,
        NzPopconfirmModule,
        NzModalModule,
        NzTagModule,
        NzCardModule,
        NzInputNumberModule,
        NzIconModule,
        NzSelectModule,
        NzSpaceModule,
        NzSpinModule,
        FormsModule,
        NzDividerModule,
        HttpClientModule,
        BrowserAnimationsModule,
        BaseModule
    ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/app/classify/' },
    { provide: NZ_I18N, useValue: zh_CN }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
