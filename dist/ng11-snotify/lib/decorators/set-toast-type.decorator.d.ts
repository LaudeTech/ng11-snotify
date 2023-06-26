import { SnotifyTypeType } from '../types/snotify-type.type';
/**
 * Defines toast style depending on method name
 * @param target any
 * @param propertyKey SnotifyTypeType
 * @param descriptor PropertyDescriptor
 * @returns value: ((...args: any[]) => any)
 */
export declare function SetToastType(target: any, propertyKey: SnotifyTypeType, descriptor: PropertyDescriptor): {
    value(...args: any[]): any;
};
