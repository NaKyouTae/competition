import { Component, OnInit } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common/common-http.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsService } from 'src/app/shared/util/forms.service';

@Component({
  selector: 'app-week-word',
  templateUrl: './week-word.component.html',
  styleUrls: ['./week-word.component.css'],
})
export class WeekWordComponent implements OnInit {
  public data: any;

  public newform = new FormGroup({
    word: new FormControl({ value: null }, Validators.required),
    wordGroup: new FormControl({ value: null }, Validators.required),
    startDate: new FormControl({ value: '00:00:00' }, Validators.required),
    endDate: new FormControl({ value: '23:59:59' }, Validators.required),
    description: new FormControl({ value: null }, Validators.required),
  });
  public form = new FormGroup({
    idx: new FormControl({ value: null, disabled: true }),
    wordGroup: new FormControl({ value: null }, Validators.required),
    word: new FormControl({ value: null }, Validators.required),
    insertDate: new FormControl({ value: null, disabled: true }),
    startDate: new FormControl({ value: null }, Validators.required),
    endDate: new FormControl({ value: null }, Validators.required),
    description: new FormControl({ value: null }, Validators.required),
  });
  constructor(private common: CommonHttpService, private formservice: FormsService) {}

  ngOnInit() {
    this.search();
  }

  public search() {
    this.common.httpCallGet('service/weekword/lists').subscribe((res: any) => {
      this.data = res.result;
      console.log(res);
    });
  }

  public onDblClick(data: any) {
    this.form.patchValue(data);
  }
  public onClose(template: any) {
    template.style.display = 'none';
  }
  public onCreate(e: any, template: any) {
    const data = this.formservice.formToData(e);
    this.common.httpCallPost('service/weekword/words', data).subscribe((res: any) => {
      if (res.resultCode === 'OK') {
        alert(res.message);
        this.search();
        template.style.display = 'none';
      }

      this.newform.reset({
        word: '',
        wordGroup: '',
        startDate: '00:00:00',
        endDate: '23:59:59',
      });
    });
  }
  public onUpdate(e: any, template: any) {
    const data: any = this.formservice.formToData(e);
    this.common.httpCallPut('service/weekword/words/' + data.idx, data).subscribe((res: any) => {
      if (res.resultCode === 'OK') {
        alert(res.message);
        this.search();
        template.style.display = 'none';
      }
    });
  }
  public onDelete(e: any, template: any) {
    const data: any = this.formservice.formToData(e);
    this.common.httpCallDelete('service/weekword/words/' + data.idx, data).subscribe((res: any) => {
      if (res.resultCode === 'OK') {
        alert(res.message);
        this.search();
        template.style.display = 'none';
      }
    });
  }
}
