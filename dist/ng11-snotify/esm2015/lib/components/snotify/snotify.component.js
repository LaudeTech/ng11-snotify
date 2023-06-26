import { Component, ViewEncapsulation } from '@angular/core';
import { SnotifyService } from '../../services/snotify.service';
import { SnotifyPosition } from '../../enums/snotify-position.enum';
export class SnotifyComponent {
    constructor(service) {
        this.service = service;
        /**
         * Backdrop Opacity
         */
        this.backdrop = -1;
    }
    /**
     * Init base options. Subscribe to options, lifecycle change
     */
    ngOnInit() {
        this.emitter = this.service.emitter.subscribe((toasts) => {
            if (this.service.config.global.newOnTop) {
                this.dockSizeA = -this.service.config.global.maxOnScreen;
                this.dockSizeB = undefined;
                this.blockSizeA = -this.service.config.global.maxAtPosition;
                this.blockSizeB = undefined;
                this.withBackdrop = toasts.filter(toast => toast.config.backdrop >= 0);
            }
            else {
                this.dockSizeA = 0;
                this.dockSizeB = this.service.config.global.maxOnScreen;
                this.blockSizeA = 0;
                this.blockSizeB = this.service.config.global.maxAtPosition;
                this.withBackdrop = toasts.filter(toast => toast.config.backdrop >= 0).reverse();
            }
            this.notifications = this.splitToasts(toasts.slice(this.dockSizeA, this.dockSizeB));
            this.stateChanged('mounted');
        });
    }
    // TODO: fix backdrop if more than one toast called in a row
    /**
     * Changes the backdrop opacity
     * @param event SnotifyEventType
     */
    stateChanged(event) {
        if (!this.withBackdrop.length) {
            if (this.backdrop >= 0) {
                this.backdrop = -1;
            }
            return;
        }
        switch (event) {
            case 'mounted':
                if (this.backdrop < 0) {
                    this.backdrop = 0;
                }
                break;
            case 'beforeShow':
                this.backdrop = this.withBackdrop[this.withBackdrop.length - 1].config.backdrop;
                break;
            case 'beforeHide':
                if (this.withBackdrop.length === 1) {
                    this.backdrop = 0;
                }
                break;
            case 'hidden':
                if (this.withBackdrop.length === 1) {
                    this.backdrop = -1;
                }
                break;
        }
    }
    /**
     * Split toasts toasts into different objects
     * @param toasts SnotifyToast[]
     * @returns SnotifyNotifications
     */
    splitToasts(toasts) {
        const result = {};
        for (const property in SnotifyPosition) {
            if (SnotifyPosition.hasOwnProperty(property)) {
                result[SnotifyPosition[property]] = [];
            }
        }
        toasts.forEach((toast) => {
            result[toast.config.position].push(toast);
        });
        return result;
    }
    /**
     * Unsubscribe subscriptions
     */
    ngOnDestroy() {
        this.emitter.unsubscribe();
    }
}
SnotifyComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-snotify',
                template: "<div class=\"snotify-backdrop\" *ngIf=\"backdrop >= 0\" [style.opacity]=\"backdrop\"></div>\n<div *ngFor=\"let position of notifications | keys\" class=\"snotify snotify-{{ position }}\">\n  <ng-snotify-toast\n    *ngFor=\"let notification of notifications[position] | slice: blockSizeA:blockSizeB\"\n    [toast]=\"notification\"\n    (stateChanged)=\"stateChanged($event)\"\n  >\n  </ng-snotify-toast>\n</div>\n",
                encapsulation: ViewEncapsulation.None
            },] }
];
SnotifyComponent.ctorParameters = () => [
    { type: SnotifyService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25vdGlmeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvbXBvbmVudHMvc25vdGlmeS9zbm90aWZ5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFxQixpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFJaEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBUXBFLE1BQU0sT0FBTyxnQkFBZ0I7SUFrQzNCLFlBQW9CLE9BQXVCO1FBQXZCLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBVDNDOztXQUVHO1FBQ0gsYUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBTWdDLENBQUM7SUFFL0M7O09BRUc7SUFDSCxRQUFRO1FBQ04sSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFzQixFQUFFLEVBQUU7WUFDdkUsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO2dCQUN2QyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztnQkFDekQsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDO2dCQUM1RCxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztnQkFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FB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QUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLHdhQUF1QztnQkFDdkMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7YUFDdEM7OztZQVhRLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uRGVzdHJveSwgT25Jbml0LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU25vdGlmeVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9zbm90aWZ5LnNlcnZpY2UnO1xuaW1wb3J0IHsgU25vdGlmeVRvYXN0IH0gZnJvbSAnLi4vLi4vbW9kZWxzL3Nub3RpZnktdG9hc3QubW9kZWwnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTbm90aWZ5Tm90aWZpY2F0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvc25vdGlmeS1ub3RpZmljYXRpb25zLmludGVyZmFjZSc7XG5pbXBvcnQgeyBTbm90aWZ5UG9zaXRpb24gfSBmcm9tICcuLi8uLi9lbnVtcy9zbm90aWZ5LXBvc2l0aW9uLmVudW0nO1xuaW1wb3J0IHsgU25vdGlmeUV2ZW50VHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL3Nub3RpZnktZXZlbnQudHlwZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLXNub3RpZnknLFxuICB0ZW1wbGF0ZVVybDogJy4vc25vdGlmeS5jb21wb25lbnQuaHRtbCcsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgU25vdGlmeUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIFRvYXN0cyBhcnJheVxuICAgKi9cbiAgbm90aWZpY2F0aW9uczogU25vdGlmeU5vdGlmaWNhdGlvbnM7XG4gIC8qKlxuICAgKiBUb2FzdHMgZW1pdHRlclxuICAgKi9cbiAgZW1pdHRlcjogU3Vic2NyaXB0aW9uO1xuICAvKipcbiAgICogSGVscGVyIGZvciBzbGljZSBwaXBlIChtYXhPblNjcmVlbilcbiAgICovXG4gIGRvY2tTaXplQTogbnVtYmVyO1xuICAvKipcbiAgICogSGVscGVyIGZvciBzbGljZSBwaXBlIChtYXhPblNjcmVlbilcbiAgICovXG4gIGRvY2tTaXplQjogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAvKipcbiAgICogSGVscGVyIGZvciBzbGljZSBwaXBlIChtYXhBdFBvc2l0aW9uKVxuICAgKi9cbiAgYmxvY2tTaXplQTogbnVtYmVyO1xuICAvKipcbiAgICogSGVscGVyIGZvciBzbGljZSBwaXBlIChtYXhBdFBvc2l0aW9uKVxuICAgKi9cbiAgYmxvY2tTaXplQjogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAvKipcbiAgICogQmFja2Ryb3AgT3BhY2l0eVxuICAgKi9cbiAgYmFja2Ryb3AgPSAtMTtcbiAgLyoqXG4gICAqIEhvdyBtYW55IHRvYXN0cyB3aXRoIGJhY2tkcm9wIGluIGN1cnJlbnQgcXVldWVcbiAgICovXG4gIHdpdGhCYWNrZHJvcDogU25vdGlmeVRvYXN0W107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzZXJ2aWNlOiBTbm90aWZ5U2VydmljZSkge31cblxuICAvKipcbiAgICogSW5pdCBiYXNlIG9wdGlvbnMuIFN1YnNjcmliZSB0byBvcHRpb25zLCBsaWZlY3ljbGUgY2hhbmdlXG4gICAqL1xuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmVtaXR0ZXIgPSB0aGlzLnNlcnZpY2UuZW1pdHRlci5zdWJzY3JpYmUoKHRvYXN0czogU25vdGlmeVRvYXN0W10pID0+IHtcbiAgICAgIGlmICh0aGlzLnNlcnZpY2UuY29uZmlnLmdsb2JhbC5uZXdPblRvcCkge1xuICAgICAgICB0aGlzLmRvY2tTaXplQSA9IC10aGlzLnNlcnZpY2UuY29uZmlnLmdsb2JhbC5tYXhPblNjcmVlbjtcbiAgICAgICAgdGhpcy5kb2NrU2l6ZUIgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuYmxvY2tTaXplQSA9IC10aGlzLnNlcnZpY2UuY29uZmlnLmdsb2JhbC5tYXhBdFBvc2l0aW9uO1xuICAgICAgICB0aGlzLmJsb2NrU2l6ZUIgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMud2l0aEJhY2tkcm9wID0gdG9hc3RzLmZpbHRlcih0b2FzdCA9PiB0b2FzdC5jb25maWcuYmFja2Ryb3AgPj0gMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRvY2tTaXplQSA9IDA7XG4gICAgICAgIHRoaXMuZG9ja1NpemVCID0gdGhpcy5zZXJ2aWNlLmNvbmZpZy5nbG9iYWwubWF4T25TY3JlZW47XG4gICAgICAgIHRoaXMuYmxvY2tTaXplQSA9IDA7XG4gICAgICAgIHRoaXMuYmxvY2tTaXplQiA9IHRoaXMuc2VydmljZS5jb25maWcuZ2xvYmFsLm1heEF0UG9zaXRpb247XG4gICAgICAgIHRoaXMud2l0aEJhY2tkcm9wID0gdG9hc3RzLmZpbHRlcih0b2FzdCA9PiB0b2FzdC5jb25maWcuYmFja2Ryb3AgPj0gMCkucmV2ZXJzZSgpO1xuICAgICAgfVxuICAgICAgdGhpcy5ub3RpZmljYXRpb25zID0gdGhpcy5zcGxpdFRvYXN0cyh0b2FzdHMuc2xpY2UodGhpcy5kb2NrU2l6ZUEsIHRoaXMuZG9ja1NpemVCKSk7XG4gICAgICB0aGlzLnN0YXRlQ2hhbmdlZCgnbW91bnRlZCcpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gVE9ETzogZml4IGJhY2tkcm9wIGlmIG1vcmUgdGhhbiBvbmUgdG9hc3QgY2FsbGVkIGluIGEgcm93XG4gIC8qKlxuICAgKiBDaGFuZ2VzIHRoZSBiYWNrZHJvcCBvcGFjaXR5XG4gICAqIEBwYXJhbSBldmVudCBTbm90aWZ5RXZlbnRUeXBlXG4gICAqL1xuICBzdGF0ZUNoYW5nZWQoZXZlbnQ6IFNub3RpZnlFdmVudFR5cGUpIHtcbiAgICBpZiAoIXRoaXMud2l0aEJhY2tkcm9wLmxlbmd0aCkge1xuICAgICAgaWYgKHRoaXMuYmFja2Ryb3AgPj0gMCkge1xuICAgICAgICB0aGlzLmJhY2tkcm9wID0gLTE7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHN3aXRjaCAoZXZlbnQpIHtcbiAgICAgIGNhc2UgJ21vdW50ZWQnOlxuICAgICAgICBpZiAodGhpcy5iYWNrZHJvcCA8IDApIHtcbiAgICAgICAgICB0aGlzLmJhY2tkcm9wID0gMDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2JlZm9yZVNob3cnOlxuICAgICAgICB0aGlzLmJhY2tkcm9wID0gdGhpcy53aXRoQmFja2Ryb3BbdGhpcy53aXRoQmFja2Ryb3AubGVuZ3RoIC0gMV0uY29uZmlnLmJhY2tkcm9wO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2JlZm9yZUhpZGUnOlxuICAgICAgICBpZiAodGhpcy53aXRoQmFja2Ryb3AubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgdGhpcy5iYWNrZHJvcCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdoaWRkZW4nOlxuICAgICAgICBpZiAodGhpcy53aXRoQmFja2Ryb3AubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgdGhpcy5iYWNrZHJvcCA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTcGxpdCB0b2FzdHMgdG9hc3RzIGludG8gZGlmZmVyZW50IG9iamVjdHNcbiAgICogQHBhcmFtIHRvYXN0cyBTbm90aWZ5VG9hc3RbXVxuICAgKiBAcmV0dXJucyBTbm90aWZ5Tm90aWZpY2F0aW9uc1xuICAgKi9cbiAgc3BsaXRUb2FzdHModG9hc3RzOiBTbm90aWZ5VG9hc3RbXSk6IFNub3RpZnlOb3RpZmljYXRpb25zIHtcbiAgICBjb25zdCByZXN1bHQ6IFNub3RpZnlOb3RpZmljYXRpb25zID0ge307XG5cbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIFNub3RpZnlQb3NpdGlvbikge1xuICAgICAgaWYgKFNub3RpZnlQb3NpdGlvbi5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcbiAgICAgICAgcmVzdWx0W1Nub3RpZnlQb3NpdGlvbltwcm9wZXJ0eV1dID0gW107XG4gICAgICB9XG4gICAgfVxuXG4gICAgdG9hc3RzLmZvckVhY2goKHRvYXN0OiBTbm90aWZ5VG9hc3QpID0+IHtcbiAgICAgIHJlc3VsdFt0b2FzdC5jb25maWcucG9zaXRpb24gYXMgc3RyaW5nXS5wdXNoKHRvYXN0KTtcbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogVW5zdWJzY3JpYmUgc3Vic2NyaXB0aW9uc1xuICAgKi9cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5lbWl0dGVyLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==