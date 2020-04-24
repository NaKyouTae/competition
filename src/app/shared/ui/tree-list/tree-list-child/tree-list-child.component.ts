import { Component, OnInit, Input } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common/common-http.service';
import { FormGroup, FormControl } from '@angular/forms';
import { FormsService } from 'src/app/shared/util/forms.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'nkt-tree-list-child',
  templateUrl: './tree-list-child.component.html',
  styleUrls: ['./tree-list-child.component.css'],
})
export class TreeListChildComponent implements OnInit {
  @Input() public data: any;

  public rowData: any;
  public child: any;
  public fieldsNum: any;

  public form = new FormGroup({
    title: new FormControl(''),
    menuGroup: new FormControl(''),
    url: new FormControl(''),
    menuOrder: new FormControl(''),
    level: new FormControl(''),
    child: new FormControl(''),
    insertDate: new FormControl(''),
    idx: new FormControl(''),
    parent: new FormControl(''),
  });

  constructor(private common: CommonHttpService, private forms: FormsService) { }

  ngOnInit() {
    this.fieldsNum = Object.keys(this.data[0]).length;
  }

  onFields(data: any) {
    const fields = Object.keys(data);

    fields.forEach((item) => {
      if (item === 'children') {
        fields.splice(fields.indexOf(item), 1);
      }
    });

    return fields;
  }
  onData(data, field) {
    // tslint:disable-next-line: no-eval
    return eval('data.' + field);
  }

  onExpand(e: any) {
    let children = new Array();
    const data = this.data;
    const params = {
      pidx: e === null || e === undefined ? null : e.idx,
    };
    this.common.httpCallGet('service/menu/levels', params).subscribe((res: any) => {
      children = res.result;
      data[data.indexOf(e)].children = children;
    });
  }

  onCollapse(data: any) {
    data.children.forEach((item) => {
      document.querySelector('#' + item.menugroup + '_treelist').remove();
    });
    delete data.children;
  }

  onClose(e: any) {
    e.style.display = 'none';
  }
  onUpdate(data: any, template: any) {
    const params: any = this.forms.formToData(data);

    this.common.httpCallPut('service/menu/menus/' + params.idx, params).subscribe((res: any) => {
      if (res.resultCode === 'OK') {
        template.style.display = 'none';
        this.resetChildLevel(params.parent);
      }
    });
  }

  onDblClick(data: any) {
    this.form.patchValue({
      title: data.title,
      menuGroup: data.menuGroup,
      url: data.url,
      menuOrder: data.menuOrder,
      level: data.level,
      child: data.child,
      insertDate: data.insertDate,
      idx: data.idx,
      parent: data.parent,
    });
  }

  onCreate(data: any, template: any) {
    const params: any = this.forms.formToData(data);

    this.common.httpCallPost('service/menu/menus', params).subscribe((res: any) => {
      if (res.resultCode === 'OK') {
        template.style.display = 'none';
        this.resetMyLevel(params);
      }
    });
  }

  onCreateModal(data: any, temp: any) {
    temp.style.display = 'block';

    this.form.patchValue({
      title: null,
      menuGroup: null,
      url: '/',
      menuOrder: null,
      level: data.level + 1,
      child: false,
      insertDate: null,
      parent: data.idx,
    });
  }

  onDelete(data: any, template: any) {
    const params: any = this.forms.formToData(data);

    this.common.httpCallDelete('service/menu/menus/' + params.idx, params).subscribe((res: any) => {
      if (res.resultCode === 'OK') {
        template.style.display = 'none';
        this.resetChildLevel(params.parent);
      }
    });
  }

  resetMyLevel(e: any) {
    let children = new Array();
    const data = this.data;

    this.common.httpCallGet('service/menu/levels', { pidx: e.parent }).subscribe((res: any) => {
      data.forEach((menu) => {
        if (menu.idx === e.parent) {
          children = res.result;
          menu.children = children;
        }
      });
    });
  }

  resetChildLevel(pidx: any) {
    this.common.httpCallGet('service/menu/levels', { pidx }).subscribe((newRes: any) => {
      this.data = newRes.result;
    });
  }
}
