import { DeviceTypeEditComponent } from './device/device-type-edit/device-type-edit.component';
import { DeviceGroupEditComponent } from './device/device-group-edit/device-group-edit.component';
import { DevicesComponent } from './device/devices/devices.component';
import { DeviceTypeComponent } from './device/device-type/device-type.component';
import { ValidatorsComponent } from './validator/validators/validators.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlarmsComponent } from './alarm/alarms/alarms.component';
import { ValidatorEditComponent } from './validator/validator-edit/validator-edit.component';
import {PageNotFoundComponent} from "./base/page-not-found/page-not-found.component";
import { DeviceAreaComponent } from './device/device-area/device-area.component';
import { DeviceGroupComponent } from './device/device-group/device-group.component'; 
import { DeviceAreaEditComponent } from './device/device-area-edit/device-area-edit.component'; 
 import { DevicesEditComponent } from './device/devices-edit/devices-edit.component';
const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'alarm' },
    { path: 'alarm', component: AlarmsComponent },
    { path: 'validator', component: ValidatorsComponent },
    { path: 'validator/edit/:id', component: ValidatorEditComponent },
    { path: 'validator/create', component: ValidatorEditComponent },
    { path: 'devices', component: DevicesComponent},
    { path: 'devices/create', component: DevicesEditComponent },
    { path: 'devices/edit/:id', component: DevicesEditComponent },
    { path: 'type', component: DeviceTypeComponent },
    { path: 'type/edit/:id', component: DeviceTypeEditComponent },
    { path: 'type/create', component: DeviceTypeEditComponent },
    { path: 'area', component: DeviceAreaComponent },
    { path: 'area/edit/:id', component: DeviceAreaEditComponent   },
    { path: 'area/create', component: DeviceAreaEditComponent  },
    { path: 'group', component: DeviceGroupComponent },
    { path: 'group/edit/:id', component:  DeviceGroupEditComponent    },
    { path: 'group/create', component: DeviceGroupEditComponent   },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
