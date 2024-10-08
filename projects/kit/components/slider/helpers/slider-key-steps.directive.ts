import {Directive, forwardRef, inject, Input} from '@angular/core';
import {TuiControl} from '@taiga-ui/cdk/classes';
import {tuiFallbackValueProvider} from '@taiga-ui/cdk/tokens';
import {tuiClamp} from '@taiga-ui/cdk/utils/math';

import {TuiSliderComponent} from '../slider.component';
import type {TuiKeySteps} from './key-steps';
import {tuiKeyStepValueToPercentage, tuiPercentageToKeyStepValue} from './key-steps';

@Directive({
    standalone: true,
    selector: 'input[tuiSlider][keySteps]',
    providers: [tuiFallbackValueProvider(0)],
    host: {
        '[attr.aria-valuenow]': 'value()',
        '[attr.aria-valuemin]': 'min',
        '[attr.aria-valuemax]': 'max',
        '[disabled]': 'disabled()',
        '(blur)': 'onTouched()',
        '(input)': 'updateControlValue()',
        '(change)': 'updateControlValue()',
    },
})
export class TuiSliderKeySteps extends TuiControl<number> {
    private readonly slider = inject<TuiSliderComponent>(
        forwardRef(() => TuiSliderComponent),
    );

    @Input()
    public keySteps!: TuiKeySteps;

    public override writeValue(controlValue: number | null): void {
        if (controlValue === null) {
            return;
        }

        const clampedControlValue = tuiClamp(controlValue, this.min, this.max);

        ngDevMode &&
            console.assert(
                controlValue === clampedControlValue,
                '\n[SliderKeySteps]: You cannot programmatically set value which is less/more than min/max',
            );

        this.slider.value = this.transformToNativeValue(clampedControlValue);
    }

    protected get min(): number {
        return this.keySteps[0][1];
    }

    protected get max(): number {
        return this.keySteps[this.keySteps.length - 1]?.[1] ?? 0;
    }

    protected updateControlValue(): void {
        this.onChange(
            tuiPercentageToKeyStepValue(this.slider.valueRatio * 100, this.keySteps),
        );
    }

    private transformToNativeValue(controlValue: number): number {
        const {min, max} = this.slider;
        const newValuePercentage = tuiKeyStepValueToPercentage(
            controlValue,
            this.keySteps,
        );

        return (newValuePercentage * (max - min)) / 100 + min;
    }
}
