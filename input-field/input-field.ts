import { CommonModule } from "@angular/common";
import { Component, forwardRef, Injector, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from "@angular/forms";

@Component({
  selector: 'input-field',
  templateUrl: './input-field.html',
  styleUrl: './input-field.scss',
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputField),
      multi: true,
    },
  ]
})
export class InputField implements ControlValueAccessor {

  @Input()
  label = "";

  @Input()
  placeholder = "";

  value = '';

  disabled = false;

  private onChange = (value: string) => {};
  private onTouched = () => {};

  constructor(private injector: Injector) {}

  ngControl: NgControl | null = null;

  ngOnInit() {
    this.ngControl = this.injector.get(NgControl, null, {
      self: true,
      optional: true,
    });
  }

  writeValue(value: string): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(value: string) {
    this.value = value;
    this.onChange(value);
  }

  handleBlur() {
    this.onTouched();
  }

  get control() {
    return this.ngControl?.control ?? null;
  }
}
