import { SnotifyToastConfig } from '../interfaces/snotify-toast-config.interface';
import { Subject } from 'rxjs';
import { SnotifyEventType } from '../types/snotify-event.type';
/**
 * Toast main model
 */
export declare class SnotifyToast {
    id: number;
    title: string;
    body: string;
    config: SnotifyToastConfig;
    /**
     * Emits SnotifyEventType
     */
    readonly eventEmitter: Subject<SnotifyEventType>;
    /**
     * Holds all subscribers because we need to unsubscribe from all before toast get destroyed
     */
    private eventsHolder;
    /**
     * Toast prompt value
     */
    value: string;
    /**
     * Toast validator
     */
    valid: boolean;
    constructor(id: number, title: string, body: string, config: SnotifyToastConfig);
    /**
     * Subscribe to toast events
     * @returns this
     * @param event SnotifyEventType
     * @param action (toast: this) => void
     */
    on(event: SnotifyEventType, action: (toast: this) => void): this;
    /**
     * Tests if a toast equals this toast.
     * @returns boolean true then equals else false.
     * @param toast SnotifyToast
     */
    equals(toast: SnotifyToast): boolean;
}
