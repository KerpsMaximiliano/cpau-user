import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

// * Environment.
import { environment } from "@environments/environment";

// * Services.
import { FormService } from "./../_services/form.service";

// * Forms.
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"],
  encapsulation: ViewEncapsulation.Emulated,
})
export class FormComponent implements OnInit {
  fields: any;
  error: any;
  form: FormGroup;
  showForm = true;
  errorLE = false;
  messageLE = false;
  captcha = null;
  siteKey: string;
  response: any;
  idForm: string;
  constructor(
    private _Activatedroute: ActivatedRoute,
    private formService: FormService,
    private router: Router
  ) {
    this.siteKey = environment.recaptcha;
    this.form = new FormGroup({});
  }

  ngOnInit() {
    const id = this._Activatedroute.snapshot.paramMap.get("idFormulario");
    const idInt = id == null ? 0 : parseInt(id);
    this.formService.getForm(idInt).subscribe(
      (response) => {
        if (response.error === "YICC") {
          this.router.navigate(["/formularios/constancia", response.data]);
        }
        if (response.error === "UNR") {
          this.router.navigate(["/login"], {
            queryParams: { returnUrl: this.router.routerState.snapshot.url },
          });
        }
        this.error = response.error;
        this.response = response;
        this.idForm = response.data.id;
        if (!response.data.fields) {
          this.fields = [];
        } else {
          if (response.error === "LE") {
            this.errorLE = true;
            this.showForm = false;
          }
          let parseF = JSON.parse(response.data.fields);
          let jsonResponseArray = [];
          parseF.forEach(function (f) {
            let jsonResponse = {};
            jsonResponse["id"] = f.IdFormField;
            jsonResponse["idFormField"] = f.IdFormField;
            jsonResponse["name"] = f.Name;
            jsonResponse["type"] = f.Type;
            jsonResponse["dependentFieldId"] =
              f.DependentField && f.DependentField.IdFormField !== ""
                ? f.DependentField.IdFormField
                : null;
            jsonResponse["dependentValue"] =
              f.DependentValue &&
              f.DependentValue.Value !== null &&
              f.DependentValue.Value !== undefined
                ? f.DependentValue.Value
                : null;
            jsonResponse["required"] = f.Required;
            jsonResponse["value"] = f.Value;
            jsonResponse["minValue"] = f.MinValue;
            jsonResponse["maxValue"] = f.MaxValue;
            jsonResponse["unique"] = f.Unique;
            jsonResponse["options"] = [];
            if (f.Options) {
              f.Options.forEach(function (o) {
                let jsonOption = {};
                jsonOption["id"] = o.IdFormFieldOption;
                jsonOption["text"] = o.Text;
                jsonOption["value"] = o.Value;
                jsonOption["allowcomments"] = o.allowComments;
                jsonOption["comments"] = o.comments;
                jsonResponse["options"].push(jsonOption);
              });
            }
            jsonResponseArray.push(jsonResponse);
          });
          this.fields = jsonResponseArray;
          this.fields.forEach((field) => {
            field.disabled =
              field.dependentFieldId && field.dependentValue ? true : false;
            if (field.type !== "label" && field.type !== "hidden") {
              const validators = this.getValidators(field);
              this.form.addControl(
                field.id,
                validators.length > 0
                  ? new FormControl(
                      { value: "", disabled: field.disabled },
                      validators
                    )
                  : new FormControl({ value: "", disabled: field.disabled })
              );
            }
          });
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onClick() {
    const requestArr = [];
    this.fields.forEach((element) => {
      if (element.disabled !== true) {
        const jsonRequest = {};
        jsonRequest["id"] = element.id;
        jsonRequest["idFormField"] = element.idFormField;
        jsonRequest["unique"] = element.unique;
        jsonRequest["name"] = element.Name;
        jsonRequest["value"] = this.form.value[element.id] || "";
        jsonRequest["options"] = [];
        if (element.options.length >= 1) {
          element.options.forEach((option) => {
            let jsonOption = {};
            jsonOption["id"] = option.id;
            jsonOption["allowcomments"] = option.allowcomments;
            if (option.allowcomments && this.form.get(option.id) !== null) {
              jsonOption["comments"] = this.form.value[option.id];
            }
            jsonRequest["options"].push(jsonOption);
          });
        }
        requestArr.push(jsonRequest);
      }
    });

    this.formService.sendForm(this.idForm, requestArr).subscribe(
      (res) => {
        if (!res.ok) {
          alert(res.error);
          return;
        }

        if (res.data.le === true) {
          this.messageLE = true;
          this.showForm = false;
        } else if (res.data.showReceipt) {
          this.router.navigate(["/formularios/constancia", res.data.guid]);
        } else if (res.data.showReceipt === false && res.data.finalMessage) {
          this.router.navigate(["/formularios/mensajefinal"], {
            state: { finalMessage: res.data.finalMessage },
          });
        } else {
          this.showForm = false;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onShowForm() {
    this.showForm = true;
    this.errorLE = false;
  }

  resolved(captchaResponse: string) {
    this.captcha = captchaResponse;
  }

  changeEmit(ev) {
    if (typeof ev.parentValue === "object") {
      this.fields.forEach((field) => {
        if (
          field.dependentFieldId &&
          field.dependentFieldId === ev.data.id &&
          field.dependentValue &&
          Object.values(ev.parentValue).includes(field.dependentValue)
        ) {
          if (this.form.get(field.id)) {
            this.form.controls[field.id].enable();
          }
          field.disabled = false;
        } else if (
          field.dependentFieldId &&
          field.dependentFieldId === ev.data.id &&
          field.dependentValue &&
          !Object.values(ev.parentValue).includes(field.dependentValue) &&
          field.disabled === false
        ) {
          if (this.form.get(field.id)) {
            this.form.controls[field.id].disable();
            this.form.controls[field.id].patchValue("");
          }
          field.disabled = true;
        }
      });
    } else {
      this.fields.forEach((field) => {
        if (
          field.dependentFieldId &&
          field.dependentFieldId === ev.data.id &&
          field.dependentValue &&
          field.dependentValue === ev.parentValue
        ) {
          if (this.form.get(field.id)) {
            this.form.controls[field.id].enable();
          }
          field.disabled = false;
        }
        if (
          field.dependentFieldId &&
          field.dependentFieldId === ev.data.id &&
          field.dependentValue &&
          field.dependentValue !== ev.parentValue &&
          field.disabled === false
        ) {
          if (this.form.get(field.id)) {
            this.form.controls[field.id].disable();
            this.form.controls[field.id].patchValue("");
          }
          field.disabled = true;
        }
      });
    }
  }

  getValidators(field) {
    const validators = [];
    if (field.required) {
      validators.push(Validators.required);
    }
    if (field.type === "email") {
      validators.push(
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
        Validators.email
      );
    }
    if (
      field.type === "checkbox" &&
      field.minValue !== undefined &&
      field.minValue !== "" &&
      field.minValue !== 0
    ) {
      validators.push(Validators.minLength(field.minValue));
    }
    if (
      field.type === "checkbox" &&
      field.maxValue !== undefined &&
      field.maxValue !== "" &&
      field.maxValue !== 0
    ) {
      validators.push(Validators.maxLength(field.maxValue));
    }
    return validators;
  }
}
