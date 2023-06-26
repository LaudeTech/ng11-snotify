import { Pipe } from '@angular/core';
/**
 * Extract object keys pipe
 */
export class KeysPipe {
    transform(value, args = null) {
        if (!value) {
            return value;
        }
        return Object.keys(value);
    }
}
KeysPipe.decorators = [
    { type: Pipe, args: [{
                name: 'keys',
                pure: false
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5cy5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9waXBlcy9rZXlzLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFNcEQ7O0dBRUc7QUFDSCxNQUFNLE9BQU8sUUFBUTtJQUNuQixTQUFTLENBQUMsS0FBVSxFQUFFLE9BQWMsSUFBSTtRQUN0QyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QixDQUFDOzs7WUFiRixJQUFJLFNBQUM7Z0JBQ0osSUFBSSxFQUFFLE1BQU07Z0JBQ1osSUFBSSxFQUFFLEtBQUs7YUFDWiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoe1xuICBuYW1lOiAna2V5cycsXG4gIHB1cmU6IGZhbHNlXG59KVxuLyoqXG4gKiBFeHRyYWN0IG9iamVjdCBrZXlzIHBpcGVcbiAqL1xuZXhwb3J0IGNsYXNzIEtleXNQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBhcmdzOiBhbnlbXSA9IG51bGwpOiBhbnkge1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHZhbHVlKTtcbiAgfVxufVxuIl19