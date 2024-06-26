import {Directive, HostBinding, inject, Input, NgZone} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {
    MUTATION_OBSERVER_INIT,
    MutationObserverService,
} from '@ng-web-apis/mutation-observer';
import {ResizeObserverService} from '@ng-web-apis/resize-observer';
import {tuiInjectElement, tuiWithStyles, tuiZonefree} from '@taiga-ui/cdk';
import type {TuiOrientation} from '@taiga-ui/core';
import {fromEvent, merge} from 'rxjs';

import {TuiFadeComponent} from './fade.component';

const BUFFER = 1; // buffer for rounding issues

@Directive({
    standalone: true,
    selector: '[tuiFade]',
    providers: [
        ResizeObserverService,
        MutationObserverService,
        {
            provide: MUTATION_OBSERVER_INIT,
            useValue: {characterData: true, subtree: true},
        },
    ],
})
export class TuiFadeDirective {
    // TODO: Remove when lh CSS units are supported: https://caniuse.com/mdn-css_types_length_lh
    @Input('tuiFadeHeight')
    @HostBinding('style.line-height')
    @HostBinding('style.--line-height')
    public lineHeight: string | null = null;

    @Input('tuiFadeSize')
    @HostBinding('style.--fade-size')
    public size = '1.5em';

    @Input('tuiFadeOffset')
    @HostBinding('style.--fade-offset')
    public offset = '0em';

    @Input('tuiFade')
    @HostBinding('attr.data-orientation')
    public orientation: TuiOrientation | '' = 'horizontal';

    constructor() {
        const el = tuiInjectElement();

        tuiWithStyles(TuiFadeComponent);
        merge(
            inject(ResizeObserverService),
            inject(MutationObserverService),
            fromEvent(el, 'scroll'),
        )
            .pipe(tuiZonefree(inject(NgZone)), takeUntilDestroyed())
            .subscribe(() => {
                el.classList.toggle('_start', !!el.scrollLeft || !!el.scrollTop);
                el.classList.toggle('_end', this.isEnd(el));
            });
    }

    private isEnd(el: HTMLElement): boolean {
        if (this.orientation === 'vertical') {
            return Math.round(el.scrollTop) < el.scrollHeight - el.clientHeight - BUFFER;
        }

        return (
            Math.round(el.scrollLeft) < el.scrollWidth - el.clientWidth - BUFFER ||
            // horizontal multiline fade can kick in early due to hanging elements of fonts so using bigger buffer
            el.scrollHeight > el.clientHeight + 4 * BUFFER
        );
    }
}
