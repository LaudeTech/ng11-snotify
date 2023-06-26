import { Subject } from 'rxjs';
import { SnotifyStyle } from '../enums/snotify-style.enum';
// @TODO remove method in observable way
/**
 * Toast main model
 */
export class SnotifyToast {
    constructor(id, title, body, config) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.config = config;
        /**
         * Emits SnotifyEventType
         */
        this.eventEmitter = new Subject();
        /**
         * Holds all subscribers because we need to unsubscribe from all before toast get destroyed
         */
        this.eventsHolder = [];
        if (this.config.type === SnotifyStyle.prompt) {
            this.value = '';
        }
        this.on('hidden', () => {
            this.eventsHolder.forEach((subscription) => {
                subscription.unsubscribe();
            });
        });
    }
    /**
     * Subscribe to toast events
     * @returns this
     * @param event SnotifyEventType
     * @param action (toast: this) => void
     */
    on(event, action) {
        this.eventsHolder.push(this.eventEmitter.subscribe((e) => {
            if (e === event) {
                action(this);
            }
        }));
        return this;
    }
    /**
     * Tests if a toast equals this toast.
     * @returns boolean true then equals else false.
     * @param toast SnotifyToast
     */
    equals(toast) {
        return this.body === toast.body && this.title === toast.title && this.config.type === toast.config.type;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25vdGlmeS10b2FzdC5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvbW9kZWxzL3Nub3RpZnktdG9hc3QubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFFN0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzNELHdDQUF3QztBQUN4Qzs7R0FFRztBQUNILE1BQU0sT0FBTyxZQUFZO0lBaUJ2QixZQUFtQixFQUFVLEVBQVMsS0FBYSxFQUFTLElBQVksRUFBUyxNQUEwQjtRQUF4RixPQUFFLEdBQUYsRUFBRSxDQUFRO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUFTLFNBQUksR0FBSixJQUFJLENBQVE7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFvQjtRQWhCM0c7O1dBRUc7UUFDTSxpQkFBWSxHQUFHLElBQUksT0FBTyxFQUFvQixDQUFDO1FBQ3hEOztXQUVHO1FBQ0ssaUJBQVksR0FBbUIsRUFBRSxDQUFDO1FBVXhDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssWUFBWSxDQUFDLE1BQU0sRUFBRTtZQUM1QyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztTQUNqQjtRQUNELElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtZQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQTBCLEVBQUUsRUFBRTtnQkFDdkQsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzdCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxFQUFFLENBQUMsS0FBdUIsRUFBRSxNQUE2QjtRQUN2RCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FDcEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFtQixFQUFFLEVBQUU7WUFDbEQsSUFBSSxDQUFDLEtBQUssS0FBSyxFQUFFO2dCQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNkO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUNGLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxNQUFNLENBQUMsS0FBbUI7UUFDeEIsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQzFHLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNub3RpZnlUb2FzdENvbmZpZyB9IGZyb20gJy4uL2ludGVyZmFjZXMvc25vdGlmeS10b2FzdC1jb25maWcuaW50ZXJmYWNlJztcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU25vdGlmeUV2ZW50VHlwZSB9IGZyb20gJy4uL3R5cGVzL3Nub3RpZnktZXZlbnQudHlwZSc7XG5pbXBvcnQgeyBTbm90aWZ5U3R5bGUgfSBmcm9tICcuLi9lbnVtcy9zbm90aWZ5LXN0eWxlLmVudW0nO1xuLy8gQFRPRE8gcmVtb3ZlIG1ldGhvZCBpbiBvYnNlcnZhYmxlIHdheVxuLyoqXG4gKiBUb2FzdCBtYWluIG1vZGVsXG4gKi9cbmV4cG9ydCBjbGFzcyBTbm90aWZ5VG9hc3Qge1xuICAvKipcbiAgICogRW1pdHMgU25vdGlmeUV2ZW50VHlwZVxuICAgKi9cbiAgcmVhZG9ubHkgZXZlbnRFbWl0dGVyID0gbmV3IFN1YmplY3Q8U25vdGlmeUV2ZW50VHlwZT4oKTtcbiAgLyoqXG4gICAqIEhvbGRzIGFsbCBzdWJzY3JpYmVycyBiZWNhdXNlIHdlIG5lZWQgdG8gdW5zdWJzY3JpYmUgZnJvbSBhbGwgYmVmb3JlIHRvYXN0IGdldCBkZXN0cm95ZWRcbiAgICovXG4gIHByaXZhdGUgZXZlbnRzSG9sZGVyOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuICAvKipcbiAgICogVG9hc3QgcHJvbXB0IHZhbHVlXG4gICAqL1xuICB2YWx1ZTogc3RyaW5nO1xuICAvKipcbiAgICogVG9hc3QgdmFsaWRhdG9yXG4gICAqL1xuICB2YWxpZDogYm9vbGVhbjtcbiAgY29uc3RydWN0b3IocHVibGljIGlkOiBudW1iZXIsIHB1YmxpYyB0aXRsZTogc3RyaW5nLCBwdWJsaWMgYm9keTogc3RyaW5nLCBwdWJsaWMgY29uZmlnOiBTbm90aWZ5VG9hc3RDb25maWcpIHtcbiAgICBpZiAodGhpcy5jb25maWcudHlwZSA9PT0gU25vdGlmeVN0eWxlLnByb21wdCkge1xuICAgICAgdGhpcy52YWx1ZSA9ICcnO1xuICAgIH1cbiAgICB0aGlzLm9uKCdoaWRkZW4nLCAoKSA9PiB7XG4gICAgICB0aGlzLmV2ZW50c0hvbGRlci5mb3JFYWNoKChzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbikgPT4ge1xuICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmliZSB0byB0b2FzdCBldmVudHNcbiAgICogQHJldHVybnMgdGhpc1xuICAgKiBAcGFyYW0gZXZlbnQgU25vdGlmeUV2ZW50VHlwZVxuICAgKiBAcGFyYW0gYWN0aW9uICh0b2FzdDogdGhpcykgPT4gdm9pZFxuICAgKi9cbiAgb24oZXZlbnQ6IFNub3RpZnlFdmVudFR5cGUsIGFjdGlvbjogKHRvYXN0OiB0aGlzKSA9PiB2b2lkKTogdGhpcyB7XG4gICAgdGhpcy5ldmVudHNIb2xkZXIucHVzaChcbiAgICAgIHRoaXMuZXZlbnRFbWl0dGVyLnN1YnNjcmliZSgoZTogU25vdGlmeUV2ZW50VHlwZSkgPT4ge1xuICAgICAgICBpZiAoZSA9PT0gZXZlbnQpIHtcbiAgICAgICAgICBhY3Rpb24odGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBUZXN0cyBpZiBhIHRvYXN0IGVxdWFscyB0aGlzIHRvYXN0LlxuICAgKiBAcmV0dXJucyBib29sZWFuIHRydWUgdGhlbiBlcXVhbHMgZWxzZSBmYWxzZS5cbiAgICogQHBhcmFtIHRvYXN0IFNub3RpZnlUb2FzdFxuICAgKi9cbiAgZXF1YWxzKHRvYXN0OiBTbm90aWZ5VG9hc3QpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5ib2R5ID09PSB0b2FzdC5ib2R5ICYmIHRoaXMudGl0bGUgPT09IHRvYXN0LnRpdGxlICYmIHRoaXMuY29uZmlnLnR5cGUgPT09IHRvYXN0LmNvbmZpZy50eXBlO1xuICB9XG59XG4iXX0=