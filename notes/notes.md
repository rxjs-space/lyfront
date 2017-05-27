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
