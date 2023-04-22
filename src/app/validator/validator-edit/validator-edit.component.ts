 
  import { Component, OnInit } from '@angular/core';
  import { FormBuilder, Validators, FormGroup } from "@angular/forms";
  import { ActivatedRoute, Router } from "@angular/router";
  import { RequestService } from "src/app/request.service";
  import { NzMessageService } from "ng-zorro-antd/message"; 
  import { isIncludeAdmin } from 'src/app/base/public';
  @Component({
    selector: 'app-validator-edit',
    templateUrl: './validator-edit.component.html',
    styleUrls: ['./validator-edit.component.scss']
  })
  export class ValidatorEditComponent  implements OnInit {
    group!: FormGroup;
    id: any = 0
    listOfOption:any[]=[ ]
    productList:any[]=[ ]
    url = '/app/alarm/api/';
    constructor(private fb: FormBuilder,
      private router: Router,
      private route: ActivatedRoute,
      private rs: RequestService,
      private msg: NzMessageService) {
    }
  
  
    ngOnInit(): void {
      if (this.route.snapshot.paramMap.has("id")) {
        this.id = this.route.snapshot.paramMap.get("id");
        this.rs.get(this.url+`validator/${this.id}`).subscribe(res => {
          //let data = res.data;
          this.build(res.data)
        })
  
      }
  
      this.build()

      this.rs
      .post('api/product/search', {})
      .subscribe((res) => { 
        const data: any[] = [];

        res.data.filter((item: { id: string; name: string }) =>
          data.push({ label: item.id + ' / ' + item.name, value: item.id })
        );
        this.productList = data;
      })
      .add(() => {});

      
    }
  
    build(obj?: any) {
      obj = obj || {}
      this.group = this.fb.group({ 
        again: [obj.again || 0 ,[]], 
        delay: [obj.delay || 0, []],  
        expression: [obj.expression || '' ,[]], 
        id: [obj.id || '', []],   
        product_id: [obj.product_id || '' ,[]], 
        template: [obj.template || '', []],  
        level: [obj.level || 0 ,[]], 
        total: [obj.total || 0 ,[]], 
        type: [obj.type || '', []],   
        title: [obj.title|| '', []],   
      })
    }
   
    submit() {
  
      if (this.group.valid) { 
        let url = this.id ? this.url+`validator/${this.id}` : this.url+`validator/create`;  
        this.rs.post(url, this.group.value).subscribe(res => { 
          this.handleCancel()
          this.msg.success("保存成功")
        })
  
        return;
      }
      else {
        Object.values(this.group.controls).forEach(control => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
  
      }
    }
    handleCancel() {
      const path = `/validator`;
      this.router.navigateByUrl(path);
    }
  
  }
  
