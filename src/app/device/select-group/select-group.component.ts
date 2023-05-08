import { Component, Input, Optional } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
import { RequestService } from '../../request.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ParseTableQuery } from '../../base/table';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
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
    selector: 'app-select-group',
    templateUrl: './select-group.component.html',
    styleUrls: ['./select-group.component.scss'],
})
export class SelectGroupComponent {
    @Input() chooseGateway = false;
    url = '/app/classify/api/';

    loading = true;
    selectGroup :any={};
    datum: any[] = [];
    group: any[] = [];
    total = 1;
    pageSize = 20;
    pageIndex = 1;
    query: any = {};
    showAddBtn: Boolean = true;
    columnKeyNameArr: any = [
        'name',
        'desc',
        'product_id',
        'group_id',
        'type_id',
    ];
    uploading: Boolean = false;
    checked = false;
    indeterminate = false;
    setOfCheckedId = new Set<number>();
    delResData: any = [];
    href!: string;
    filterName = [
        { text: '全部', value: '全部' },
        { text: '已分组', value: '已分组' },
        { text: '未分组', value: '未分组', byDefault: true },
    ];
    constructor(
        @Optional() protected ref: NzModalRef,
        private modal: NzModalService,
        private router: Router,
        private rs: RequestService,
        private msg: NzMessageService
    ) {
        //this.load();
    }
    nameFilterFn = (list: any, item: any): boolean => {
        if (list === '已分组') {
            if (item.group_id) return true;
            else return false;
        }
        if (list === '未分组') {
            if (!item.group_id) return true;
            else return false;
        } else return true;
    };

    drop(event: CdkDragDrop<string[]>): void {
        moveItemInArray(this.datum, event.previousIndex, event.currentIndex);
    }

    reload() {
        this.datum = [];
        this.load();
    }

    load() {
        //筛选网关
        if (this.chooseGateway) this.query.filter = { type: 'gateway' };

        this.loading = true;
        this.rs
            .post(this.url + 'device/search', this.query)
            .subscribe((res) => {
                this.datum = res.data || [];
                this.datum.filter((item: any) => {
                    item.checked = false;
                });
                this.total = res.total;
                this.setOfCheckedId.clear();
                refreshCheckedStatus(this);
            })
            .add(() => {
                this.loading = false;
            });

        this.rs
            .post(this.url + 'device/group/search', this.query)
            .subscribe((res) => {
                this.group = res.data || [];
                this.group.filter((item: any) => {
                    item.checked = false;
                });
                // this.total = res.total;
                // this.setOfCheckedId.clear();
                // refreshCheckedStatus(this);
            })
            .add(() => {
                this.loading = false;
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

    select(id: any) {
        this.ref && this.ref.close(id);
    }
    cancel() {
        this.msg.info('取消操作');
    }

    handleItemChecked(id: any, checked: boolean, num: Number) {
        if (num) {
            if (checked) {
                this.selectGroup.device =String (id.id);
                this.selectGroup.type =String (id.type_id);
                this.selectGroup.area =String (id.area_id);
            } else this.selectGroup.device = '';
            this.check(id.id, checked, this.datum);
        } else {
            checked
                ? (this.selectGroup.group = id)
                : (this.selectGroup.group = '');
            this.check(id, checked, this.group);
        }
    }
    check(id: any, checked: boolean, num: any) {
        if (checked ) {
            num.filter((item: any) => {
                if (item.checked && item.id !== id)
                    item.checked = false;
                if (item.id == id) item.checked = true;
            });
        }
    }
    choose() {
        if (this.selectGroup.device && this.selectGroup.group) {
            let url = `device/${this.selectGroup.device}`;
            const mes = {
                group_id: this.selectGroup.group,
                area_id: this.selectGroup.area,
                type_id: this.selectGroup.type,
            };
            this.rs.post(this.url + url, mes).subscribe((res) => {
                this.selectGroup = { 
                };
                this.load();
                this.msg.success('保存成功');
            });
        } else this.msg.error('未选中列表');
    }
}
