// imports
import { getDays, formatDate, formatDateShort } from '../client/js/data.js';

// test getDays function
describe('Test the getDays function', () => {
    test('It should return the number of days between two dates', () => {
        const date1 = new Date('2022-09-10');
        const date2 = new Date('2022-09-15');
        expect(getDays(date1, date2)).toBe(5);
    });
})

// test formatDate function
describe('Test the formatDate function', () => {
    test('It should return the date in a readable format', () => {
        const date = '2022-09-15';
        expect(formatDate(date)).toBe('Thursday, September 15, 2022');
    });
})

// test formatDateShort function
describe('Test the formatDateShort function', () => {
    test('It should return the date in a readable format', () => {
        const date = '2022-09-15';
        expect(formatDateShort(date)).toBe('9/15');
    });
})


