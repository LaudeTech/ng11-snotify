import { SnotifyTypeType } from '../types/snotify-type.type';
/**
 * Transform arguments to Snotify object
 * @param target any
 * @param propertyKey SnotifyTypeType
 * @param descriptor PropertyDescriptor
 * @returns Snotify
 */
export declare function TransformArgument(target: any, propertyKey: SnotifyTypeType, descriptor: PropertyDescriptor): {
    value(...args: any[]): any;
};
