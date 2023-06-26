import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
/**
 * Prompt component. Part of PROMPT type
 */
export class PromptComponent {
    constructor() {
        /**
         * Is PROMPT focused
         */
        this.isPromptFocused = false;
    }
}
PromptComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-snotify-prompt',
                template: "<span class=\"snotifyToast__input\" [ngClass]=\"{ 'snotifyToast__input--filled': isPromptFocused }\">\n  <input\n    (input)=\"toast.value = $event.target.value; toast.eventEmitter.next('input')\"\n    autofocus\n    class=\"snotifyToast__input__field\"\n    type=\"text\"\n    [id]=\"toast.id\"\n    (focus)=\"isPromptFocused = true\"\n    (blur)=\"isPromptFocused = !!toast.value.length\"\n  />\n  <label class=\"snotifyToast__input__label\" [for]=\"toast.id\">\n    <span class=\"snotifyToast__input__labelContent\">{{ toast.config.placeholder | truncate }}</span>\n  </label>\n</span>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            },] }
];
PromptComponent.propDecorators = {
    toast: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbXB0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29tcG9uZW50cy9wcm9tcHQvcHJvbXB0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVU3Rjs7R0FFRztBQUNILE1BQU0sT0FBTyxlQUFlO0lBVjVCO1FBZUU7O1dBRUc7UUFDSCxvQkFBZSxHQUFHLEtBQUssQ0FBQztJQUMxQixDQUFDOzs7WUFuQkEsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLDBsQkFBc0M7Z0JBQ3RDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTthQUN0Qzs7O29CQVNFLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNub3RpZnlUb2FzdCB9IGZyb20gJy4uLy4uL21vZGVscy9zbm90aWZ5LXRvYXN0Lm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctc25vdGlmeS1wcm9tcHQnLFxuICB0ZW1wbGF0ZVVybDogJy4vcHJvbXB0LmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5cbi8qKlxuICogUHJvbXB0IGNvbXBvbmVudC4gUGFydCBvZiBQUk9NUFQgdHlwZVxuICovXG5leHBvcnQgY2xhc3MgUHJvbXB0Q29tcG9uZW50IHtcbiAgLyoqXG4gICAqIEdldCBQUk9NUFQgcGxhY2Vob2xkZXJcbiAgICovXG4gIEBJbnB1dCgpIHRvYXN0OiBTbm90aWZ5VG9hc3Q7XG4gIC8qKlxuICAgKiBJcyBQUk9NUFQgZm9jdXNlZFxuICAgKi9cbiAgaXNQcm9tcHRGb2N1c2VkID0gZmFsc2U7XG59XG4iXX0=