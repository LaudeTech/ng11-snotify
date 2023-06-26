import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { SnotifyService } from '../../services/snotify.service';
/**
 * Buttons component
 */
export class ButtonsComponent {
    constructor(service) {
        this.service = service;
    }
    /**
     * remove toast
     */
    remove() {
        this.service.remove(this.toast.id);
    }
}
ButtonsComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-snotify-button',
                template: "<div class=\"snotifyToast__buttons\">\n  <button\n    type=\"button\"\n    *ngFor=\"let button of toast.config.buttons\"\n    [ngClass]=\"{ 'snotifyToast__buttons--bold': button.bold }\"\n    (click)=\"button.action ? button.action(toast) : remove()\"\n  >\n    {{ button.text }}\n  </button>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            },] }
];
ButtonsComponent.ctorParameters = () => [
    { type: SnotifyService }
];
ButtonsComponent.propDecorators = {
    toast: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvbXBvbmVudHMvYnV0dG9ucy9idXR0b25zLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFVaEU7O0dBRUc7QUFDSCxNQUFNLE9BQU8sZ0JBQWdCO0lBSzNCLFlBQW9CLE9BQXVCO1FBQXZCLFlBQU8sR0FBUCxPQUFPLENBQWdCO0lBQUcsQ0FBQztJQUUvQzs7T0FFRztJQUNILE1BQU07UUFDSixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7OztZQXRCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsMFRBQXVDO2dCQUN2QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7YUFDdEM7OztZQVJRLGNBQWM7OztvQkFpQnBCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNub3RpZnlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvc25vdGlmeS5zZXJ2aWNlJztcbmltcG9ydCB7IFNub3RpZnlUb2FzdCB9IGZyb20gJy4uLy4uL21vZGVscy9zbm90aWZ5LXRvYXN0Lm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctc25vdGlmeS1idXR0b24nLFxuICB0ZW1wbGF0ZVVybDogJy4vYnV0dG9ucy5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuXG4vKipcbiAqIEJ1dHRvbnMgY29tcG9uZW50XG4gKi9cbmV4cG9ydCBjbGFzcyBCdXR0b25zQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIEdldCBidXR0b25zIEFycmF5XG4gICAqL1xuICBASW5wdXQoKSB0b2FzdDogU25vdGlmeVRvYXN0O1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNlcnZpY2U6IFNub3RpZnlTZXJ2aWNlKSB7fVxuXG4gIC8qKlxuICAgKiByZW1vdmUgdG9hc3RcbiAgICovXG4gIHJlbW92ZSgpIHtcbiAgICB0aGlzLnNlcnZpY2UucmVtb3ZlKHRoaXMudG9hc3QuaWQpO1xuICB9XG59XG4iXX0=