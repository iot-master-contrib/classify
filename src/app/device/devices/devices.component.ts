import { Component, Input, Optional } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
import { RequestService } from '../../request.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ParseTableQuery } from '../../base/table';
import {
  isIncludeAdmin,
  readCsv,
  tableHeight,
  onAllChecked,
  onItemChecked,
  batchdel,
  refreshCheckedStatus,
} from 'src/app/base/public';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
})
export class DevicesComponent {
  @Input() chooseGateway = false;
  url='/app/classify/api/'
  loading = true;
  datum: any[] = [];
  total = 1;
  pageSize = 20;
  pageIndex = 1;
  query: any = {};
  showAddBtn: Boolean = true;
  columnKeyNameArr: any = ['name', 'desc', 'product_id', 'group_id', 'type'];
  uploading: Boolean = false;
  checked = false;
  indeterminate = false;
  setOfCheckedId = new Set<number>();
  delResData: any = [];
  href!: string;

  constructor(
    @Optional() protected ref: NzModalRef,
    private modal: NzModalService,
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
  disable(mess: number, id: any) {
    if (mess)
      this.rs.get(this.url+`device/${id}/disable`).subscribe((res) => {
        this.reload();
      });
    else
      this.rs.get(this.url+`device/${id}/enable`).subscribe((res) => {
        this.reload();
      });
  }
  load() {
    //筛选网关
    if (this.chooseGateway) this.query.filter = { type: 'gateway' };

    this.loading = true;
    this.rs
      .post(this.url+'device/search', this.query)
      .subscribe((res) => {
        this.datum = res.data || [];
        this.datum.filter(
          (item) =>
            (item.disabled =
              item.disabled === undefined ? false : item.disabled)
        );
        this.total = res.total;
        this.setOfCheckedId.clear();
        refreshCheckedStatus(this);
      })
      .add(() => {
        this.loading = false;
      });
  }

   

  delete(id: number, size?: number) {
    this.rs.get(`api/device/${id}/delete`).subscribe((res) => {
      if (!size  ) {
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

  pageIndexChange(pageIndex: number) {
    console.log('pageIndex:', pageIndex);
  }
  pageSizeChange(pageSize: number) {
    this.query.limit = pageSize;
    this.load();
  }
  search($event: string) {
    this.query.keyword = {
      name: $event,
    };
    this.query.skip = 0;
    this.load();
  }

  open(id: any) {
    if (this.chooseGateway) {
      this.select(id);
      return;
    }
    const path = `${isIncludeAdmin()}/device/detail/${id}`;
    this.router.navigateByUrl(path);
  }

  edit(id: any) {
    const path = `devices/edit/${id}`;
    this.router.navigateByUrl(path);
  }
  handleNew() {
    const path = `devices/create`;
    this.router.navigateByUrl(path);
  }
  select(id: any) {
    this.ref && this.ref.close(id);
  }
  cancel() {
    this.msg.info('取消操作');
  }
  
   
  getTableHeight() {
    return tableHeight(this);
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
}
