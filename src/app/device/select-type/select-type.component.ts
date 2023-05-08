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
    selector: 'app-select-type',
    templateUrl: './select-type.component.html',
    styleUrls: ['./select-type.component.scss'],
})
export class SelectTypeComponent {
    @Input() chooseGateway = false;
    url = '/app/classify/api/';

    loading = true;
    selectType: any = { device: [], type: '', area: [], group: [] };
    datum: any[] = [];
    type: any[] = [];
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
        { text: '已分类', value: '已分类' },
        { text: '未分类', value: '未分类', byDefault: true },
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
        if (list === '已分类') {
            if (item.type_id) return true;
            else return false;
        }
        if (list === '未分类') {
            if (!item.type_id) return true;
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
            .post(this.url + 'device/type/search', this.query)
            .subscribe((res) => {
                this.type = res.data || [];
                this.type.filter((item: any) => {
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
                this.selectType.device.push(String(id.id));
                this.selectType.group.push(String(id.group_id));
                this.selectType.area.push(String(id.area_id));
            } else {
                this.selectType.device.filter((item: any, index: any) => {
                    if (item === String(id.id)) {
                        this.selectType.device.splice(index, 1);
                        this.selectType.group.splice(index, 1);
                        this.selectType.area.splice(index, 1);
                    }
                });
            }
        } else {
            if(  checked){this.selectType.type = String(id);
                this.type.filter((item: any) => {
                    if (item.checked === true && item.id !== id)
                        item.checked = false;
                    if (item.id == id) item.checked = true;
                });}
            else this.selectType.type = ''
           
           
        }
    }
    
    choose() {
        if (this.selectType.device.length > 0 && this.selectType.type) {
            this.selectType.device.filter((item: any, index: any) => {
                let url = `device/${item}`;

                const mes = {
                    type_id: this.selectType.type,
                    area_id: this.selectType.area[index],
                    group_id: this.selectType.group[index],
                };

                this.rs.post(this.url + url, mes).subscribe((res) => {
                    if (this.selectType.device.length === index + 1) {
                        this.selectType = {
                            device: [],
                            type: '',
                            area: [],
                            group: [],
                        };
                        this.load();
                        this.msg.success('保存成功');
                    }
                });
            });
        } else this.msg.error('未选中列表');
    }
}
