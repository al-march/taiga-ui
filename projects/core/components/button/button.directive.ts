import {Directive, inject, Input} from '@angular/core';
import {tuiWithStyles} from '@taiga-ui/cdk';
import {
    TuiAppearanceDirective,
    tuiAppearanceOptionsProvider,
} from '@taiga-ui/core/directives/appearance';
import {TuiIconsDirective} from '@taiga-ui/core/directives/icons';

import {TuiButtonComponent} from './button.component';
import {TUI_BUTTON_OPTIONS} from './button.options';

@Directive({
    standalone: true,
    selector: 'a[tuiButton],button[tuiButton],a[tuiIconButton],button[tuiIconButton]',
    providers: [tuiAppearanceOptionsProvider(TUI_BUTTON_OPTIONS)],
    hostDirectives: [
        {
            directive: TuiAppearanceDirective,
            inputs: [
                'tuiAppearance: appearance',
                'tuiAppearanceState',
                'tuiAppearanceFocus',
            ],
        },
        {
            directive: TuiIconsDirective,
            inputs: ['iconLeft', 'iconRight'],
        },
    ],
    host: {
        '[attr.data-size]': 'size',
    },
})
export class TuiButtonDirective {
    private readonly options = inject(TUI_BUTTON_OPTIONS);

    @Input()
    public size = this.options.size;

    protected readonly nothing = tuiWithStyles(TuiButtonComponent);
}
