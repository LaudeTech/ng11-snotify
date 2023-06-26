import { SnotifyStyle } from '../enums/snotify-style.enum';
/**
 * Transform arguments to Snotify object
 * @param target any
 * @param propertyKey SnotifyTypeType
 * @param descriptor PropertyDescriptor
 * @returns Snotify
 */
export function TransformArgument(target, propertyKey, descriptor) {
    if (propertyKey === SnotifyStyle.async) {
        return {
            value(...args) {
                let result;
                if (args.length === 2) {
                    result = {
                        title: null,
                        body: args[0],
                        config: null,
                        action: args[1]
                    };
                }
                else if (args.length === 3) {
                    if (typeof args[1] === 'string') {
                        result = {
                            title: args[1],
                            body: args[0],
                            config: null,
                            action: args[2]
                        };
                    }
                    else {
                        result = {
                            title: null,
                            body: args[0],
                            config: args[2],
                            action: args[1]
                        };
                    }
                }
                else {
                    result = {
                        title: args[1],
                        body: args[0],
                        config: args[3],
                        action: args[2]
                    };
                }
                return descriptor.value.apply(this, [result]);
            }
        };
    }
    else {
        return {
            value(...args) {
                let result;
                if (args.length === 1) {
                    result = {
                        title: null,
                        body: args[0],
                        config: null
                    };
                }
                else if (args.length === 3) {
                    result = {
                        title: args[1],
                        body: args[0],
                        config: args[2]
                    };
                }
                else {
                    result = {
                        title: null,
                        config: null,
                        body: args[0],
                        [typeof args[1] === 'string' ? 'title' : 'config']: args[1]
                    };
                }
                return descriptor.value.apply(this, [result]);
            }
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmb3JtLWFyZ3VtZW50LmRlY29yYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvZGVjb3JhdG9ycy90cmFuc2Zvcm0tYXJndW1lbnQuZGVjb3JhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUUzRDs7Ozs7O0dBTUc7QUFDSCxNQUFNLFVBQVUsaUJBQWlCLENBQUMsTUFBVyxFQUFFLFdBQTRCLEVBQUUsVUFBOEI7SUFDekcsSUFBSSxXQUFXLEtBQUssWUFBWSxDQUFDLEtBQUssRUFBRTtRQUN0QyxPQUFPO1lBQ0wsS0FBSyxDQUFDLEdBQUcsSUFBVztnQkFDbEIsSUFBSSxNQUFNLENBQUM7Z0JBQ1gsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtvQkFDckIsTUFBTSxHQUFHO3dCQUNQLEtBQUssRUFBRSxJQUFJO3dCQUNYLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNiLE1BQU0sRUFBRSxJQUFJO3dCQUNaLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO3FCQUNoQixDQUFDO2lCQUNIO3FCQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7b0JBQzVCLElBQUksT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxFQUFFO3dCQUMvQixNQUFNLEdBQUc7NEJBQ1AsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7NEJBQ2QsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7NEJBQ2IsTUFBTSxFQUFFLElBQUk7NEJBQ1osTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7eUJBQ2hCLENBQUM7cUJBQ0g7eUJBQU07d0JBQ0wsTUFBTSxHQUFHOzRCQUNQLEtBQUssRUFBRSxJQUFJOzRCQUNYLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDOzRCQUNiLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDOzRCQUNmLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO3lCQUNoQixDQUFDO3FCQUNIO2lCQUNGO3FCQUFNO29CQUNMLE1BQU0sR0FBRzt3QkFDUCxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDZCxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDYixNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDZixNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztxQkFDaEIsQ0FBQztpQkFDSDtnQkFDRCxPQUFPLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLE1BQWlCLENBQUMsQ0FBQyxDQUFDO1lBQzNELENBQUM7U0FDRixDQUFDO0tBQ0g7U0FBTTtRQUNMLE9BQU87WUFDTCxLQUFLLENBQUMsR0FBRyxJQUFXO2dCQUNsQixJQUFJLE1BQU0sQ0FBQztnQkFDWCxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO29CQUNyQixNQUFNLEdBQUc7d0JBQ1AsS0FBSyxFQUFFLElBQUk7d0JBQ1gsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ2IsTUFBTSxFQUFFLElBQUk7cUJBQ2IsQ0FBQztpQkFDSDtxQkFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO29CQUM1QixNQUFNLEdBQUc7d0JBQ1AsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ2QsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ2IsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7cUJBQ2hCLENBQUM7aUJBQ0g7cUJBQU07b0JBQ0wsTUFBTSxHQUFHO3dCQUNQLEtBQUssRUFBRSxJQUFJO3dCQUNYLE1BQU0sRUFBRSxJQUFJO3dCQUNaLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNiLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7cUJBQzVELENBQUM7aUJBQ0g7Z0JBQ0QsT0FBTyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFpQixDQUFDLENBQUMsQ0FBQztZQUMzRCxDQUFDO1NBQ0YsQ0FBQztLQUNIO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNub3RpZnkgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3Nub3RpZnkuaW50ZXJmYWNlJztcbmltcG9ydCB7IFNub3RpZnlUeXBlVHlwZSB9IGZyb20gJy4uL3R5cGVzL3Nub3RpZnktdHlwZS50eXBlJztcbmltcG9ydCB7IFNub3RpZnlTdHlsZSB9IGZyb20gJy4uL2VudW1zL3Nub3RpZnktc3R5bGUuZW51bSc7XG5cbi8qKlxuICogVHJhbnNmb3JtIGFyZ3VtZW50cyB0byBTbm90aWZ5IG9iamVjdFxuICogQHBhcmFtIHRhcmdldCBhbnlcbiAqIEBwYXJhbSBwcm9wZXJ0eUtleSBTbm90aWZ5VHlwZVR5cGVcbiAqIEBwYXJhbSBkZXNjcmlwdG9yIFByb3BlcnR5RGVzY3JpcHRvclxuICogQHJldHVybnMgU25vdGlmeVxuICovXG5leHBvcnQgZnVuY3Rpb24gVHJhbnNmb3JtQXJndW1lbnQodGFyZ2V0OiBhbnksIHByb3BlcnR5S2V5OiBTbm90aWZ5VHlwZVR5cGUsIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvcikge1xuICBpZiAocHJvcGVydHlLZXkgPT09IFNub3RpZnlTdHlsZS5hc3luYykge1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZSguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBsZXQgcmVzdWx0O1xuICAgICAgICBpZiAoYXJncy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICByZXN1bHQgPSB7XG4gICAgICAgICAgICB0aXRsZTogbnVsbCxcbiAgICAgICAgICAgIGJvZHk6IGFyZ3NbMF0sXG4gICAgICAgICAgICBjb25maWc6IG51bGwsXG4gICAgICAgICAgICBhY3Rpb246IGFyZ3NbMV1cbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MubGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBhcmdzWzFdID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmVzdWx0ID0ge1xuICAgICAgICAgICAgICB0aXRsZTogYXJnc1sxXSxcbiAgICAgICAgICAgICAgYm9keTogYXJnc1swXSxcbiAgICAgICAgICAgICAgY29uZmlnOiBudWxsLFxuICAgICAgICAgICAgICBhY3Rpb246IGFyZ3NbMl1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgICAgICAgdGl0bGU6IG51bGwsXG4gICAgICAgICAgICAgIGJvZHk6IGFyZ3NbMF0sXG4gICAgICAgICAgICAgIGNvbmZpZzogYXJnc1syXSxcbiAgICAgICAgICAgICAgYWN0aW9uOiBhcmdzWzFdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXN1bHQgPSB7XG4gICAgICAgICAgICB0aXRsZTogYXJnc1sxXSxcbiAgICAgICAgICAgIGJvZHk6IGFyZ3NbMF0sXG4gICAgICAgICAgICBjb25maWc6IGFyZ3NbM10sXG4gICAgICAgICAgICBhY3Rpb246IGFyZ3NbMl1cbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZXNjcmlwdG9yLnZhbHVlLmFwcGx5KHRoaXMsIFtyZXN1bHQgYXMgU25vdGlmeV0pO1xuICAgICAgfVxuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgICAgIHRpdGxlOiBudWxsLFxuICAgICAgICAgICAgYm9keTogYXJnc1swXSxcbiAgICAgICAgICAgIGNvbmZpZzogbnVsbFxuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAoYXJncy5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgICByZXN1bHQgPSB7XG4gICAgICAgICAgICB0aXRsZTogYXJnc1sxXSxcbiAgICAgICAgICAgIGJvZHk6IGFyZ3NbMF0sXG4gICAgICAgICAgICBjb25maWc6IGFyZ3NbMl1cbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgICAgIHRpdGxlOiBudWxsLFxuICAgICAgICAgICAgY29uZmlnOiBudWxsLFxuICAgICAgICAgICAgYm9keTogYXJnc1swXSxcbiAgICAgICAgICAgIFt0eXBlb2YgYXJnc1sxXSA9PT0gJ3N0cmluZycgPyAndGl0bGUnIDogJ2NvbmZpZyddOiBhcmdzWzFdXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVzY3JpcHRvci52YWx1ZS5hcHBseSh0aGlzLCBbcmVzdWx0IGFzIFNub3RpZnldKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59XG4iXX0=