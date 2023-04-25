import { Component, Input, Optional } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
import { RequestService } from '../../request.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ParseTableQuery } from '../../base/table';

import {
  batchdel,
  onAllChecked,
  onItemChecked,
  readCsv,
  refreshCheckedStatus,
} from 'src/app/base/public'; 
@Component({
  selector: 'app-device-group',
  templateUrl: './device-group.component.html',
  styleUrls: ['./device-group.component.scss'],
})
export class DeviceGroupComponent {
  url='/app/classify/api/'
  @Input() choose = false;
  uploading: Boolean = false;
  loading = true;
  datum: any[] = [];
  total = 1;
  pageSize = 20;
  pageIndex = 1;
  indeterminate = false;
  query: any = {};
  showAddBtn: Boolean = true;
  checked = false;
  setOfCheckedId = new Set<number>();
  delResData: any = []; 
  href!: string;

  constructor(
    private ms: NzModalService,
    private modal: NzModalService,
    //@Optional() protected ref: NzModalRef,
    private router: Router,
    private rs: RequestService,
    private msg: NzMessageService
  ) {
    //this.load();
  }

  reload() {
    this.datum = [];
    this.load();
  }

  load() {
    this.loading = true;
    this.rs
      .post(this.url+'device/group/search', this.query)
      .subscribe((res) => {
        this.datum = res.data || [];
        this.total = res.total;
        this.setOfCheckedId.clear();
        refreshCheckedStatus(this);
      })
      .add(() => {
        this.loading = false;
      });
  }
  pageIndexChange(pageIndex: number) {
    console.log('pageIndex:', pageIndex);
  }
  pageSizeChange(pageSize: number) {
    this.query.limit = pageSize;
    this.load();
  }
 
  handleBatchDel() {
    batchdel(this);
  }

  handleAllChecked(id: any) {
    onAllChecked(id, this);
  }
  handleItemChecked(id: number, checked: boolean) {
    onItemChecked(id, checked, this);
  }
  create() {
    const path = `group/create`;
    this.router.navigateByUrl(path);
  }

  delete(id: number, size?: number) {
    this.rs.get(this.url+`device/group/${id}/delete`).subscribe((res) => { 
      if (!size) {
        this.msg.success('删除成功');
        this.datum = this.datum.filter((d) => d.id !== id);
      } else if (size) { 
        this.delResData.push(res);  
        if (size === this.delResData.length) {
          this.msg.success('删除成功');
          this.load();
        }
      }
    });
  }

  onQuery($event: NzTableQueryParams) {
    ParseTableQuery($event, this.query);
    this.load();
  }
  type() {
    const path = `admin/device/group/type`;
    this.router.navigateByUrl(path);
  }
  search($event: string) {
    this.query.keyword = {
      name: $event,
    };
    this.query.skip = 0;
    this.load();
  }

  edit(id: any) {
    const path = `group/edit/${id}`;
    this.router.navigateByUrl(path);
  }

   
  cancel() {
    this.msg.info('取消操作');
  }
}
