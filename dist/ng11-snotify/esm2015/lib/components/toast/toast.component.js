import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { SnotifyService } from '../../services/snotify.service';
import { SnotifyStyle } from '../../enums/snotify-style.enum';
export class ToastComponent {
    constructor(service) {
        this.service = service;
        this.stateChanged = new EventEmitter();
        /**
         * Toast state
         */
        this.state = {
            paused: false,
            progress: 0,
            animation: '',
            isDestroying: false,
            promptType: SnotifyStyle.prompt
        };
    }
    // Lifecycles
    /**
     * Init base options. Subscribe to toast changed, toast deleted
     */
    ngOnInit() {
        this.toastChangedSubscription = this.service.toastChanged.subscribe((toast) => {
            if (this.toast.id === toast.id) {
                this.initToast();
            }
        });
        this.toastDeletedSubscription = this.service.toastDeleted.subscribe(id => {
            if (this.toast.id === id) {
                this.onRemove();
            }
        });
        if (!this.toast.config.timeout) {
            this.toast.config.showProgressBar = false;
        }
        this.toast.eventEmitter.next('mounted');
        this.state.animation = 'snotifyToast--in';
    }
    ngAfterContentInit() {
        setTimeout(() => {
            this.stateChanged.emit('beforeShow');
            this.toast.eventEmitter.next('beforeShow');
            this.state.animation = this.toast.config.animation.enter;
        }, this.service.config.toast.animation.time / 5); // time to show toast push animation (snotifyToast--in)
    }
    /**
     * Unsubscribe subscriptions
     */
    ngOnDestroy() {
        cancelAnimationFrame(this.animationFrame);
        this.toast.eventEmitter.next('destroyed');
        this.toastChangedSubscription.unsubscribe();
        this.toastDeletedSubscription.unsubscribe();
    }
    /*
    Event hooks
     */
    /**
     * Trigger OnClick lifecycle
     */
    onClick() {
        this.toast.eventEmitter.next('click');
        if (this.toast.config.closeOnClick) {
            this.service.remove(this.toast.id);
        }
    }
    /**
     * Trigger beforeDestroy lifecycle. Removes toast
     */
    onRemove() {
        this.state.isDestroying = true;
        this.toast.eventEmitter.next('beforeHide');
        this.stateChanged.emit('beforeHide');
        this.state.animation = this.toast.config.animation.exit;
        setTimeout(() => {
            this.stateChanged.emit('hidden');
            this.state.animation = 'snotifyToast--out';
            this.toast.eventEmitter.next('hidden');
            setTimeout(() => this.service.remove(this.toast.id, true), this.toast.config.animation.time / 2);
        }, this.toast.config.animation.time / 2);
    }
    /**
     * Trigger onHoverEnter lifecycle
     */
    onMouseEnter() {
        this.toast.eventEmitter.next('mouseenter');
        if (this.toast.config.pauseOnHover) {
            this.state.paused = true;
        }
    }
    /**
     * Trigger onHoverLeave lifecycle
     */
    onMouseLeave() {
        if (this.toast.config.pauseOnHover && this.toast.config.timeout) {
            this.state.paused = false;
            this.startTimeout(this.toast.config.timeout * this.state.progress);
        }
        this.toast.eventEmitter.next('mouseleave');
    }
    /**
     * Remove toast completely after animation
     */
    onExitTransitionEnd() {
        if (this.state.isDestroying) {
            return;
        }
        this.initToast();
        this.toast.eventEmitter.next('shown');
    }
    /*
     Common
     */
    /**
     * Initialize base toast config
     *
     */
    initToast() {
        if (this.toast.config.timeout > 0) {
            this.startTimeout(0);
        }
    }
    /**
     * Start progress bar
     * @param startTime number
     */
    startTimeout(startTime = 0) {
        const start = performance.now();
        const calculate = () => {
            this.animationFrame = requestAnimationFrame(timestamp => {
                const runtime = timestamp + startTime - start;
                const progress = Math.min(runtime / this.toast.config.timeout, 1);
                if (this.state.paused) {
                    cancelAnimationFrame(this.animationFrame);
                }
                else if (runtime < this.toast.config.timeout) {
                    this.state.progress = progress;
                    calculate();
                }
                else {
                    this.state.progress = 1;
                    cancelAnimationFrame(this.animationFrame);
                    this.service.remove(this.toast.id);
                }
            });
        };
        calculate();
    }
}
ToastComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-snotify-toast',
                template: "<div\n  [attr.role]=\"toast.config.type === state.promptType ? 'dialog' : 'alert'\"\n  [attr.aria-labelledby]=\"'snotify_' + toast.id\"\n  [attr.aria-modal]=\"toast.config.type === state.promptType\"\n  [ngClass]=\"[\n    'snotifyToast animated',\n    'snotify-' + toast.config.type,\n    state.animation,\n    toast.valid === undefined ? '' : toast.valid ? 'snotifyToast--valid' : 'snotifyToast--invalid'\n  ]\"\n  [ngStyle]=\"{\n    '-webkit-transition': toast.config.animation.time + 'ms',\n    transition: toast.config.animation.time + 'ms',\n    '-webkit-animation-duration': toast.config.animation.time + 'ms',\n    'animation-duration': toast.config.animation.time + 'ms'\n  }\"\n  (animationend)=\"onExitTransitionEnd()\"\n  (click)=\"onClick()\"\n  (mouseenter)=\"onMouseEnter()\"\n  (mouseleave)=\"onMouseLeave()\"\n>\n  <div class=\"snotifyToast__progressBar\" *ngIf=\"toast.config.showProgressBar\">\n    <span class=\"snotifyToast__progressBar__percentage\" [ngStyle]=\"{ width: state.progress * 100 + '%' }\"></span>\n  </div>\n  <div class=\"snotifyToast__inner\" *ngIf=\"!toast.config.html; else toastHTML\">\n    <div class=\"snotifyToast__title\" [attr.id]=\"'snotify_' + toast.id\" *ngIf=\"toast.title\">\n      {{ toast.title | truncate: toast.config.titleMaxLength }}\n    </div>\n    <div class=\"snotifyToast__body\" *ngIf=\"toast.body\">{{ toast.body | truncate: toast.config.bodyMaxLength }}</div>\n    <ng-snotify-prompt *ngIf=\"toast.config.type === state.promptType\" [toast]=\"toast\"> </ng-snotify-prompt>\n    <div\n      *ngIf=\"!toast.config.icon; else elseBlock\"\n      [ngClass]=\"['snotify-icon', toast.config.iconClass || 'snotify-icon--' + toast.config.type]\"\n    ></div>\n    <ng-template #elseBlock>\n      <img class=\"snotify-icon\" [src]=\"toast.config.icon\" />\n    </ng-template>\n  </div>\n  <ng-template #toastHTML>\n    <div class=\"snotifyToast__inner\" [innerHTML]=\"toast.config.html\"></div>\n  </ng-template>\n  <ng-snotify-button *ngIf=\"toast.config.buttons\" [toast]=\"toast\"></ng-snotify-button>\n</div>\n",
                encapsulation: ViewEncapsulation.None
            },] }
];
ToastComponent.ctorParameters = () => [
    { type: SnotifyService }
];
ToastComponent.propDecorators = {
    toast: [{ type: Input }],
    stateChanged: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb21wb25lbnRzL3RvYXN0L3RvYXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxFQUNOLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFJaEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBTzlELE1BQU0sT0FBTyxjQUFjO0lBMEJ6QixZQUFvQixPQUF1QjtRQUF2QixZQUFPLEdBQVAsT0FBTyxDQUFnQjtRQXJCakMsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBb0IsQ0FBQztRQVU5RDs7V0FFRztRQUNILFVBQUssR0FBRztZQUNOLE1BQU0sRUFBRSxLQUFLO1lBQ2IsUUFBUSxFQUFFLENBQUM7WUFDWCxTQUFTLEVBQUUsRUFBRTtZQUNiLFlBQVksRUFBRSxLQUFLO1lBQ25CLFVBQVUsRUFBRSxZQUFZLENBQUMsTUFBTTtTQUNoQyxDQUFDO0lBRTRDLENBQUM7SUFFL0MsYUFBYTtJQUViOztPQUVHO0lBQ0gsUUFBUTtRQUNOLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFtQixFQUFFLEVBQUU7WUFDMUYsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxLQUFLLENBQUMsRUFBRSxFQUFFO2dCQUM5QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDbEI7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsRUFB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QkFBaUIsQ0FBQyxJQUFJO2FBQ3RDOzs7WUFWUSxjQUFjOzs7b0JBZXBCLEtBQUs7MkJBQ0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTbm90aWZ5U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3Nub3RpZnkuc2VydmljZSc7XG5pbXBvcnQgeyBTbm90aWZ5VG9hc3QgfSBmcm9tICcuLi8uLi9tb2RlbHMvc25vdGlmeS10b2FzdC5tb2RlbCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFNub3RpZnlFdmVudFR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9zbm90aWZ5LWV2ZW50LnR5cGUnO1xuaW1wb3J0IHsgU25vdGlmeVN0eWxlIH0gZnJvbSAnLi4vLi4vZW51bXMvc25vdGlmeS1zdHlsZS5lbnVtJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctc25vdGlmeS10b2FzdCcsXG4gIHRlbXBsYXRlVXJsOiAnLi90b2FzdC5jb21wb25lbnQuaHRtbCcsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgVG9hc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIC8qKlxuICAgKiBHZXQgdG9hc3QgZnJvbSBub3RpZmljYXRpb25zIGFycmF5XG4gICAqL1xuICBASW5wdXQoKSB0b2FzdDogU25vdGlmeVRvYXN0O1xuICBAT3V0cHV0KCkgc3RhdGVDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxTbm90aWZ5RXZlbnRUeXBlPigpO1xuXG4gIHRvYXN0RGVsZXRlZFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICB0b2FzdENoYW5nZWRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKipcbiAgICogcmVxdWVzdEFuaW1hdGlvbkZyYW1lIGlkXG4gICAqL1xuICBhbmltYXRpb25GcmFtZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUb2FzdCBzdGF0ZVxuICAgKi9cbiAgc3RhdGUgPSB7XG4gICAgcGF1c2VkOiBmYWxzZSxcbiAgICBwcm9ncmVzczogMCxcbiAgICBhbmltYXRpb246ICcnLFxuICAgIGlzRGVzdHJveWluZzogZmFsc2UsXG4gICAgcHJvbXB0VHlwZTogU25vdGlmeVN0eWxlLnByb21wdFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VydmljZTogU25vdGlmeVNlcnZpY2UpIHt9XG5cbiAgLy8gTGlmZWN5Y2xlc1xuXG4gIC8qKlxuICAgKiBJbml0IGJhc2Ugb3B0aW9ucy4gU3Vic2NyaWJlIHRvIHRvYXN0IGNoYW5nZWQsIHRvYXN0IGRlbGV0ZWRcbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMudG9hc3RDaGFuZ2VkU3Vic2NyaXB0aW9uID0gdGhpcy5zZXJ2aWNlLnRvYXN0Q2hhbmdlZC5zdWJzY3JpYmUoKHRvYXN0OiBTbm90aWZ5VG9hc3QpID0+IHtcbiAgICAgIGlmICh0aGlzLnRvYXN0LmlkID09PSB0b2FzdC5pZCkge1xuICAgICAgICB0aGlzLmluaXRUb2FzdCgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMudG9hc3REZWxldGVkU3Vic2NyaXB0aW9uID0gdGhpcy5zZXJ2aWNlLnRvYXN0RGVsZXRlZC5zdWJzY3JpYmUoaWQgPT4ge1xuICAgICAgaWYgKHRoaXMudG9hc3QuaWQgPT09IGlkKSB7XG4gICAgICAgIHRoaXMub25SZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoIXRoaXMudG9hc3QuY29uZmlnLnRpbWVvdXQpIHtcbiAgICAgIHRoaXMudG9hc3QuY29uZmlnLnNob3dQcm9ncmVzc0JhciA9IGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLnRvYXN0LmV2ZW50RW1pdHRlci5uZXh0KCdtb3VudGVkJyk7XG4gICAgdGhpcy5zdGF0ZS5hbmltYXRpb24gPSAnc25vdGlmeVRvYXN0LS1pbic7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnN0YXRlQ2hhbmdlZC5lbWl0KCdiZWZvcmVTaG93Jyk7XG4gICAgICB0aGlzLnRvYXN0LmV2ZW50RW1pdHRlci5uZXh0KCdiZWZvcmVTaG93Jyk7XG4gICAgICB0aGlzLnN0YXRlLmFuaW1hdGlvbiA9IHRoaXMudG9hc3QuY29uZmlnLmFuaW1hdGlvbi5lbnRlcjtcbiAgICB9LCB0aGlzLnNlcnZpY2UuY29uZmlnLnRvYXN0LmFuaW1hdGlvbi50aW1lIC8gNSk7IC8vIHRpbWUgdG8gc2hvdyB0b2FzdCBwdXNoIGFuaW1hdGlvbiAoc25vdGlmeVRvYXN0LS1pbilcbiAgfVxuXG4gIC8qKlxuICAgKiBVbnN1YnNjcmliZSBzdWJzY3JpcHRpb25zXG4gICAqL1xuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGlvbkZyYW1lKTtcbiAgICB0aGlzLnRvYXN0LmV2ZW50RW1pdHRlci5uZXh0KCdkZXN0cm95ZWQnKTtcbiAgICB0aGlzLnRvYXN0Q2hhbmdlZFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMudG9hc3REZWxldGVkU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKlxuICBFdmVudCBob29rc1xuICAgKi9cblxuICAvKipcbiAgICogVHJpZ2dlciBPbkNsaWNrIGxpZmVjeWNsZVxuICAgKi9cbiAgb25DbGljaygpIHtcbiAgICB0aGlzLnRvYXN0LmV2ZW50RW1pdHRlci5uZXh0KCdjbGljaycpO1xuICAgIGlmICh0aGlzLnRvYXN0LmNvbmZpZy5jbG9zZU9uQ2xpY2spIHtcbiAgICAgIHRoaXMuc2VydmljZS5yZW1vdmUodGhpcy50b2FzdC5pZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRyaWdnZXIgYmVmb3JlRGVzdHJveSBsaWZlY3ljbGUuIFJlbW92ZXMgdG9hc3RcbiAgICovXG4gIG9uUmVtb3ZlKCkge1xuICAgIHRoaXMuc3RhdGUuaXNEZXN0cm95aW5nID0gdHJ1ZTtcbiAgICB0aGlzLnRvYXN0LmV2ZW50RW1pdHRlci5uZXh0KCdiZWZvcmVIaWRlJyk7XG4gICAgdGhpcy5zdGF0ZUNoYW5nZWQuZW1pdCgnYmVmb3JlSGlkZScpO1xuICAgIHRoaXMuc3RhdGUuYW5pbWF0aW9uID0gdGhpcy50b2FzdC5jb25maWcuYW5pbWF0aW9uLmV4aXQ7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnN0YXRlQ2hhbmdlZC5lbWl0KCdoaWRkZW4nKTtcbiAgICAgIHRoaXMuc3RhdGUuYW5pbWF0aW9uID0gJ3Nub3RpZnlUb2FzdC0tb3V0JztcbiAgICAgIHRoaXMudG9hc3QuZXZlbnRFbWl0dGVyLm5leHQoJ2hpZGRlbicpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnNlcnZpY2UucmVtb3ZlKHRoaXMudG9hc3QuaWQsIHRydWUpLCB0aGlzLnRvYXN0LmNvbmZpZy5hbmltYXRpb24udGltZSAvIDIpO1xuICAgIH0sIHRoaXMudG9hc3QuY29uZmlnLmFuaW1hdGlvbi50aW1lIC8gMik7XG4gIH1cblxuICAvKipcbiAgICogVHJpZ2dlciBvbkhvdmVyRW50ZXIgbGlmZWN5Y2xlXG4gICAqL1xuICBvbk1vdXNlRW50ZXIoKSB7XG4gICAgdGhpcy50b2FzdC5ldmVudEVtaXR0ZXIubmV4dCgnbW91c2VlbnRlcicpO1xuICAgIGlmICh0aGlzLnRvYXN0LmNvbmZpZy5wYXVzZU9uSG92ZXIpIHtcbiAgICAgIHRoaXMuc3RhdGUucGF1c2VkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVHJpZ2dlciBvbkhvdmVyTGVhdmUgbGlmZWN5Y2xlXG4gICAqL1xuICBvbk1vdXNlTGVhdmUoKSB7XG4gICAgaWYgKHRoaXMudG9hc3QuY29uZmlnLnBhdXNlT25Ib3ZlciAmJiB0aGlzLnRvYXN0LmNvbmZpZy50aW1lb3V0KSB7XG4gICAgICB0aGlzLnN0YXRlLnBhdXNlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5zdGFydFRpbWVvdXQodGhpcy50b2FzdC5jb25maWcudGltZW91dCAqIHRoaXMuc3RhdGUucHJvZ3Jlc3MpO1xuICAgIH1cbiAgICB0aGlzLnRvYXN0LmV2ZW50RW1pdHRlci5uZXh0KCdtb3VzZWxlYXZlJyk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIHRvYXN0IGNvbXBsZXRlbHkgYWZ0ZXIgYW5pbWF0aW9uXG4gICAqL1xuICBvbkV4aXRUcmFuc2l0aW9uRW5kKCkge1xuICAgIGlmICh0aGlzLnN0YXRlLmlzRGVzdHJveWluZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmluaXRUb2FzdCgpO1xuICAgIHRoaXMudG9hc3QuZXZlbnRFbWl0dGVyLm5leHQoJ3Nob3duJyk7XG4gIH1cblxuICAvKlxuICAgQ29tbW9uXG4gICAqL1xuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIGJhc2UgdG9hc3QgY29uZmlnXG4gICAqXG4gICAqL1xuICBpbml0VG9hc3QoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudG9hc3QuY29uZmlnLnRpbWVvdXQgPiAwKSB7XG4gICAgICB0aGlzLnN0YXJ0VGltZW91dCgwKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3RhcnQgcHJvZ3Jlc3MgYmFyXG4gICAqIEBwYXJhbSBzdGFydFRpbWUgbnVtYmVyXG4gICAqL1xuICBzdGFydFRpbWVvdXQoc3RhcnRUaW1lOiBudW1iZXIgPSAwKSB7XG4gICAgY29uc3Qgc3RhcnQgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICBjb25zdCBjYWxjdWxhdGUgPSAoKSA9PiB7XG4gICAgICB0aGlzLmFuaW1hdGlvbkZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRpbWVzdGFtcCA9PiB7XG4gICAgICAgIGNvbnN0IHJ1bnRpbWUgPSB0aW1lc3RhbXAgKyBzdGFydFRpbWUgLSBzdGFydDtcbiAgICAgICAgY29uc3QgcHJvZ3Jlc3MgPSBNYXRoLm1pbihydW50aW1lIC8gdGhpcy50b2FzdC5jb25maWcudGltZW91dCwgMSk7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnBhdXNlZCkge1xuICAgICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0aW9uRnJhbWUpO1xuICAgICAgICB9IGVsc2UgaWYgKHJ1bnRpbWUgPCB0aGlzLnRvYXN0LmNvbmZpZy50aW1lb3V0KSB7XG4gICAgICAgICAgdGhpcy5zdGF0ZS5wcm9ncmVzcyA9IHByb2dyZXNzO1xuICAgICAgICAgIGNhbGN1bGF0ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc3RhdGUucHJvZ3Jlc3MgPSAxO1xuICAgICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0aW9uRnJhbWUpO1xuICAgICAgICAgIHRoaXMuc2VydmljZS5yZW1vdmUodGhpcy50b2FzdC5pZCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gICAgY2FsY3VsYXRlKCk7XG4gIH1cbn1cbiJdfQ==