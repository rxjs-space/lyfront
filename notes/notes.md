#notes

## Multiple child component inside form - Angular 2
https://stackoverflow.com/questions/42203135/multiple-child-component-inside-form-angular-2
```js
// in root form component.ts
  ...
  useraccount: this.formBuilder.group({
    useracc: '',
  })
  ...
```

```html
<!-- in root form component.html -->
<!-- use formgroup.controls.control -->
<app-useracc [useraccount]="formDetail.controls.useraccount"></app-useracc>
```

```js
// in child form component.ts
@Input() useraccount: FormGroup;
```

```html
<!-- in child form component.html -->
<!-- use formGroup/formControl/formArray, not formGroupName/.../... -->
<div [formGroup]="useraccount">
  <input formControlName="useracc">
</div>
```

```html
  <md-card class="info-card">
    <md-card-header>
      <md-card-title>类别信息</md-card-title>
    </md-card-header>
    <md-card-content>
      
    </md-card-content>
  </md-card>
```


## to activate input[type="date"],
1) about:config
2) dom.forms.datetime -> set to true

## ssh
eval $(ssh-agent -s)
ssh-add ~/.ssh/ly_rsa
ssh -vT git@git.coding.net

## photos on wd via internet
thumbnail:
https://device4870044-5412196c-local.wd2go.com/api/2.7/rest/file_contents/paizhao/JinPingGuo/%E7%9B%B8%E6%9C%BA%E8%83%B6%E5%8D%B7/IMG_0151.JPG?tn_type=i1024s1&device_user_id=29242892&device_user_auth_code=19e0e010d0f73d06a6490e456453d0cb

full pic:
https://device4870044-5412196c-local.wd2go.com/api/2.7/rest/file_contents/paizhao/JinPingGuo/%E7%9B%B8%E6%9C%BA%E8%83%B6%E5%8D%B7/IMG_0151.JPG?device_user_id=29242892&device_user_auth_code=19e0e010d0f73d06a6490e456453d0cb


## the component which will take ngContent's place, need its own *ngIf