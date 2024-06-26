import type {AfterViewChecked} from '@angular/core';
import {
    afterNextRender,
    Directive,
    EventEmitter,
    HostListener,
    inject,
    INJECTOR,
    Input,
    Output,
} from '@angular/core';
import {tuiInjectElement, tuiMoveFocus, tuiWithStyles} from '@taiga-ui/cdk';
import type {TuiSizeL} from '@taiga-ui/core';

import {TUI_TAB_ACTIVATE} from './tab.directive';
import {TuiTabsComponent} from './tabs.component';
import {TUI_TABS_OPTIONS} from './tabs.options';

@Directive({
    standalone: true,
    selector: 'tui-tabs:is(never)',
    host: {
        '[attr.data-size]': 'size',
    },
})
export class TuiTabsDirective implements AfterViewChecked {
    private readonly el = tuiInjectElement();
    private readonly injector = inject(INJECTOR);

    @Input()
    public size: TuiSizeL = inject(TUI_TABS_OPTIONS).size;

    @Input()
    public activeItemIndex = 0;

    @Output()
    public readonly activeItemIndexChange = new EventEmitter<number>();

    protected readonly nothing = tuiWithStyles(TuiTabsComponent);

    public get tabs(): readonly HTMLElement[] {
        return Array.from(this.el.querySelectorAll<HTMLElement>('[tuiTab]'));
    }

    public get activeElement(): HTMLElement | null {
        return this.tabs[this.activeItemIndex] || null;
    }

    public moveFocus(current: HTMLElement, step: number): void {
        const {tabs} = this;

        tuiMoveFocus(tabs.indexOf(current), tabs, step);
    }

    public ngAfterViewChecked(): void {
        afterNextRender(
            () => {
                this.markTabAsActive();
            },
            {injector: this.injector},
        );
    }

    @HostListener(TUI_TAB_ACTIVATE, ['$event', '$event.target'])
    protected onActivate(event: Event, element: HTMLElement): void {
        const index = this.tabs.findIndex(tab => tab === element);

        event.stopPropagation();

        if (index === this.activeItemIndex) {
            return;
        }

        this.activeItemIndexChange.emit(index);
        this.activeItemIndex = index;
    }

    protected markTabAsActive(): void {
        const {tabs, activeElement} = this;

        tabs.forEach(nativeElement => {
            const active = nativeElement === activeElement;

            nativeElement.classList.toggle('_active', active);
            nativeElement.setAttribute('tabIndex', active ? '0' : '-1');
        });
    }
}
