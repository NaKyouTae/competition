import { Component, OnInit, Input } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common/common-http.service';
import { FormsService } from 'src/app/shared/util/forms.service';
import { FormGroup, FormControl } from '@angular/forms';
import { SessionService } from 'src/app/shared/common/session/session.service';
import { CookieService } from 'src/app/shared/common/cookie/cookies.service';
import { Subject } from 'rxjs';
import { ObservableService } from 'src/app/shared/common/observable/observable.service';
import { JwtService } from 'src/app/shared/common/jwt/jwt.service';

@Component({
  selector: 'app-user-contents',
  templateUrl: './user-contents.component.html',
  styleUrls: ['./user-contents.component.css'],
})
export class UserContentsComponent implements OnInit {
  // tslint:disable-next-line: max-line-length
  constructor(private common: CommonHttpService, private formservice: FormsService, private observableService: ObservableService, private jwt: JwtService) { }

  // tslint:disable-next-line: no-input-rename
  @Input('contents') public contents: any = new Array<any>();
  // tslint:disable-next-line: no-input-rename
  @Input('type') public type: string;
  public userName: any = this.jwt.getJWTAccessKey('username') !== null ? this.jwt.getJWTAccessKey('username') : '';
  public userCheck: any = this.jwt.getJWTAccessKey('username') !== null ? true : false;

  public threeForm = new FormGroup({
    contentOne: new FormControl(''),
    contentTwo: new FormControl(''),
    contentThree: new FormControl(''),
    userName: new FormControl(''),
    userIdx: new FormControl(''),
  });

  public twoForm = new FormGroup({
    contentOne: new FormControl(''),
    contentTwo: new FormControl(''),
    userName: new FormControl(''),
    userIdx: new FormControl(''),
  });
  ngOnInit() { }

  inThree(e: any) {
    e.userName.setValue(this.userName);
    e.userIdx.setValue(this.userName);
    const data = this.formservice.formToData(e);
    this.common.httpCallPost('service/three/threes', data).subscribe((res: any) => {
      if (res.resultCode === 'OK') {
        this.threeForm.reset({
          contentOne: '',
          contentTwo: '',
          contentThree: '',
          userName: '',
          userIdx: '',
        });
        this.observableService.getList('THREE');
      }
    });
  }
  inTwo(e: any) {
    e.userName.setValue(this.userName);
    e.userIdx.setValue(this.userName);
    const data = this.formservice.formToData(e);
    this.common.httpCallPost('service/two/twos', data).subscribe((res: any) => {
      if (res.resultCode === 'OK') {
        this.twoForm.reset({
          contentOne: '',
          contentTwo: '',
          userName: '',
          userIdx: '',
        });
        this.observableService.getList('TWO');
      }
    });
  }
}