import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges, HostListener } from '@angular/core';
import { JwtService } from '../../../common/jwt/jwt.service';

@Component({
  selector: 'app-admin-grid',
  templateUrl: './admin-grid.component.html',
  styleUrls: ['./admin-grid.component.css'],
})
export class AdminGridComponent implements OnInit, OnChanges {
  @Input() public data: any;
  @Input() public fields: any;
  @Input() public gridWidth?: string;
  @Input() public btnUse?: any;

  // Row Double Click - Update Modal
  @Input() public upModal?: any = {};

  // Create Button Click - Create Modal
  @Input() public creModal?: any = {};

  @Output() dbldata: EventEmitter<any> = new EventEmitter<any>();

  public fieldsNum: any;
  public sizeList: any = [
    { field: 10, value: 10 },
    { field: 20, value: 20 },
    { field: 30, value: 30 },
    { field: 40, value: 40 },
    { field: 50, value: 50 },
    { field: 100, value: 100 },
    { field: 200, value: 200 },
  ];
  public size: any = 30;
  public skip: any = 0;
  public take: any = 30;
  public tot: any;
  public nowPage: any;
  public dataCountStart: any = 1;
  public dataCountEnd: any = this.take;
  public pageList: Array<any>;
  public userRoles: any = this.jwt.getJWTUserKey('roles') === null ? [] : this.jwt.getJWTUserKey('roles');

  public sliceData: any;

  public selectState: any = 1;

  constructor(private jwt: JwtService) {}

  ngOnInit() {
    if (this.data !== undefined) {
      this.onInit();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.fields !== undefined) {
      this.fields = changes.fields.currentValue;
    }
    if (changes.data !== undefined) {
      changes.data.previousValue = null;
      this.data = changes.data.currentValue;
    }
    this.onInit();
  }

  onInit() {
    this.fieldsNum = this.fields.length;
    this.tot = this.data.length;
    // tslint:disable-next-line: max-line-length
    this.pageList = new Array(Math.ceil(this.data.length / this.size < 1 ? 1 : this.data.length / this.size)).fill({ field: '', value: '' }).map((item, idx) => {
      item.value = idx + 1;
      item.field = idx + 1;
      return item;
    });
    this.take = this.data.length > this.size ? this.size : this.data.length;
    this.onBind();
  }

  public onBind() {
    this.sliceData = this.data.slice(this.skip, this.take);
  }

  public paging(e) {
    this.skip = e === 1 ? 0 : Number(this.size) * (Number(e) - 1);
    this.take = Math.ceil(this.data.length / this.size) === e ? this.data.length : Number(this.size) * Number(e);
    this.onBind();
  }

  public reSize(e) {
    this.size = Number(e.target.innerText);
    // tslint:disable-next-line: max-line-length
    this.pageList = new Array(Math.ceil(this.data.length / this.size < 1 ? 1 : this.data.length / this.size)).fill({ field: '', value: '' }).map((item, idx) => {
      item.value = idx + 1;
      item.field = idx + 1;
      return item;
    });
    this.selectState = 1;
    this.paging(this.nowPage === undefined ? 1 : this.nowPage);
  }

  // public chagnePageListColor(e) {
  //   for (let i = 1; i <= this.pageList.length; i++) {
  //     const page = document.querySelector('.pageCount_' + i.toString()) as HTMLElement;

  //     if (page.style.backgroundColor === 'rgb(229, 229, 229)') {
  //       page.style.backgroundColor = 'white';
  //     }
  //   }

  //   const newPage = document.querySelector('.pageCount_' + e) as HTMLElement;

  //   newPage.style.backgroundColor = '#e5e5e5';
  // }

  // public getNowPage() {
  //   for (let i = 1; i <= this.pageList.length; i++) {
  //     const page = document.querySelector('.pageCount_' + i.toString()) as HTMLElement;
  //     if (page.style.backgroundColor === 'rgb(229, 229, 229)') {
  //       return i;
  //     }
  //   }
  // }

  // public changePage(e) {
  //   this.nowPage = e.value;
  //   // this.chagnePageListColor(e);
  //   this.paging(this.nowPage === undefined ? 1 : this.nowPage);
  // }

  // public firstPage() {
  //   if (this.getNowPage() !== 1) {
  //     this.chagnePageListColor(1);
  //     this.paging(1);
  //   } else {
  //     // tslint:disable-next-line: deprecation
  //     event.preventDefault();
  //   }
  // }

  public prevPage() {
    // const prev = this.getNowPage();
    if (this.selectState !== 1) {
      // this.chagnePageListColor(prev - 1);
      this.selectState = this.selectState - 1;
      this.paging(this.selectState);
    } else {
      // tslint:disable-next-line: deprecation
      event.preventDefault();
    }
  }

  public nextPage() {
    // const next = this.getNowPage();
    if (this.selectState !== this.pageList.length) {
      // this.chagnePageListColor(next + 1);
      this.selectState = this.selectState + 1;
      this.paging(this.selectState);
    } else {
      // tslint:disable-next-line: deprecation
      event.preventDefault();
    }
  }

  // public endPage() {
  //   if (this.getNowPage() !== this.pageList.length) {
  //     this.chagnePageListColor(this.pageList.length);
  //     this.paging(this.pageList.length);
  //   } else {
  //     // tslint:disable-next-line: deprecation
  //     event.preventDefault();
  //   }
  // }

  public onDblClick(value: any) {
    this.dbldata.emit(value);
  }

  public clickValue(e: any) {
    this.paging(e.target.innerText);
  }
}
