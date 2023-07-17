import * as moment from 'moment';

export function getAge(date: Date): number {
    const currentDate = moment();
    const age = currentDate.diff(date, 'years');
    
    return age
}