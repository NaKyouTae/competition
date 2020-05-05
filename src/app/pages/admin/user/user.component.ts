import { Component, OnInit } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common/common-http.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsService } from 'src/app/shared/util/forms.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  public data: any;
  public fields: any = [
    { title: '일렬 번호', width: 10, field: 'idx' },
    { title: '사용자 명', width: 30, field: 'userName' },
    { title: '비밀 번호', width: 30, field: 'pw' },
    { title: '생성 일자', width: 15, field: 'insertDate' },
    { title: '수정 일자', width: 15, field: 'changeDate' },
  ];
  public newform = new FormGroup({
    userName: new FormControl('', Validators.required),
    pw: new FormControl('', Validators.required),
    rep: new FormControl('', Validators.required),
  });
  public form = new FormGroup({
    idx: new FormControl({ value: '', disabled: true }),
    userName: new FormControl('', Validators.required),
    pw: new FormControl('', Validators.required),
    insertDate: new FormControl({ value: '', disabled: true }),
    changeDate: new FormControl({ value: '', disabled: true }),
  });
  constructor(private common: CommonHttpService, private formservice: FormsService) {}

  ngOnInit() {
    this.search();
  }

  search() {
    this.common.httpCallGet('service/users').subscribe((res: any) => {
      this.data = res.result;
    });
  }

  onDblClick(data: any) {
    this.form.patchValue(data);
  }
  onClose(template: any) {
    template.style.display = 'none';
    this.newform.reset({
      username: '',
      pw: '',
      rep: '',
    });
  }
  onCreate(e: any, template: any) {
    const data = this.formservice.formToData(e);

    this.common.httpCallPost('user/signup', data).subscribe((res: any) => {
      if (res.resultCode === 'OK') {
        template.style.display = 'none';
        this.search();
        this.newform.reset({
          username: '',
          pw: '',
          rep: '',
        });
      }
    });
  }
  onUpdate(e: any, template: any) {
    const data: any = this.formservice.formToData(e);

    this.common.httpCallPut('service/users/' + data.idx, data).subscribe((res: any) => {
      if (res.resultCode === 'OK') {
        template.style.display = 'none';
        this.search();
      }
    });
  }
  onDelete(e: any, template: any) {
    const data: any = this.formservice.formToData(e);

    this.common.httpCallDelete('service/users/' + data.idx, data).subscribe((res: any) => {
      if (res.resultCode === 'OK') {
        template.style.display = 'none';
        this.search();
      }
    });
  }
}
