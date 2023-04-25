import { filter } from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../../request.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DevicesComponent } from '../devices/devices.component';
import { isIncludeAdmin } from 'src/app/base/public';
@Component({
  selector: 'app-devices-edit',
  templateUrl: './devices-edit.component.html',
  styleUrls: ['./devices-edit.component.scss'],
})
export class DevicesEditComponent implements OnInit {
  group!: FormGroup;
  id: any = 0;
  url='/app/classify/api/';
  typeID: any[] = [];
  areaID:any[] = [];
  groupID: any[] = [];
  @ViewChild('childTag') childTag: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private rs: RequestService,
    private ms: NzModalService,
    private msg: NzMessageService
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.has('id')) {
      this.id = this.route.snapshot.paramMap.get('id');

      this.rs.get(this.url+`device/${this.id}`).subscribe((res) => {
        //let data = res.data;
        if (this.childTag) {
          // 给子组件设值
          const { product_id, group_id } = res.data || {};
          const IdObj = {
            product_id: product_id || '',
            group_id: group_id || '',
          };
          this.childTag.IdObj = JSON.parse(JSON.stringify(IdObj));
        }
        this.build(res.data);
      });
    }

    this.build();
    this.selectId();
  }
  selectId() {
    this.rs.get(this.url+'device/type/list').subscribe((res) => {
      const data: any[] = [];
    res.data?  res.data.filter((item: { name: any; desc: any; id: any }) =>
        data.push({
          value: item.id,
          label: item.id + ' / ' + item.name,
        })
      ):[];
      this.typeID = data;
    });

    this.rs
      .post(this.url+'device/group/search', {})
      .subscribe((res) => {
        const data: any[] = [];

     res.data?   res.data.filter((item: { id: string; name: string }) =>
          data.push({ label: item.id + ' / ' + item.name, value: item.id })
        ):[];
        this.groupID = data;
      })
      .add(() => {});

      this.rs
      .post(this.url+'device/area/search', {})
      .subscribe((res) => {
        const data: any[] = [];
 
     res.data?   res.data.filter((item: { id: string; name: string }) =>
          data.push({ label: item.id + ' / ' + item.name, value: item.id })
        ):[];
        this.areaID = data;
      })
      .add(() => {});
  }
  build(obj?: any) {
    obj = obj || {};
    this.group = this.fb.group({
      id: [obj.id || '', []], 
      area_id: [obj.area_id || '', []],
      group_id: [obj.group_id || '', []],
      type_id: [obj.type_id || '', []],
     
      // disabled: [obj.disabled || false, []],
    });
  }

  submit() {
    if (this.group.valid) { 
      let url = (this.id ? `api/device/${this.id}` : `api/device/create`); 
      this.rs.post(url, this.group.value).subscribe((res) => {
       
        this.router.navigateByUrl(`devices`);
        this.msg.success('保存成功');
      });
    } else {
      Object.values(this.group.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

   

  handleCancel() {
    
    this.router.navigateByUrl(`devices`);
  }
}
