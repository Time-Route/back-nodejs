const { parse } = require("src/schedule/controller/scheduleController");

const testCases = [
    {
        input: '월(7)',
        expected: [
            { day: '월', start: '7', end: '7' }
        ]
    },
    {
        input: '월(1 ~ 5)',
        expected: [
            { day: '월', start: '1', end: '5' }
        ]
    },
    {
        input: '화(1, 3)',
        expected: [
            { day: '화', start: '1', end: '1' },
            { day: '화', start: '3', end: '3' }
        ]
    },
    {
        input: '화(1, 2 ~ 4)',
        expected: [
            { day: '화', start: '1', end: '1' },
            { day: '화', start: '2', end: '4' }
        ]
    },
    {
        input: '화(2 ~ 4, 5)',
        expected: [
            { day: '화', start: '2', end: '4' },
            { day: '화', start: '5', end: '5' }
        ]
    },
    {
        input: '화(2 ~ 4, 4 ~ 6)',
        expected: [
            { day: '화', start: '2', end: '4' },
            { day: '화', start: '4', end: '6' }
        ]
    },
    {
        input: '수(1, 2, 3)',
        expected: [
            { day: '수', start: '1', end: '1' },
            { day: '수', start: '2', end: '2' },
            { day: '수', start: '3', end: '3' }
        ]
    },
    {
        input: '수(1 ~ 3, 4, 6)',
        expected: [
            { day: '수', start: '1', end: '3' },
            { day: '수', start: '4', end: '4' },
            { day: '수', start: '6', end: '6' }
        ]
    },
    {
        input: '수(1, 4 ~ 6, 7)',
        expected: [
            { day: '수', start: '1', end: '1' },
            { day: '수', start: '4', end: '6' },
            { day: '수', start: '7', end: '7' }
        ]
    },
    {
        input: '수(1, 4 ~ 6, 7)',
        expected: [
            { day: '수', start: '1', end: '1' },
            { day: '수', start: '4', end: '6' },
            { day: '수', start: '7', end: '7' }
        ]
    },
    {
        input: '수(1, 4, 7 ~ 8)',
        expected: [
            { day: '수', start: '1', end: '1' },
            { day: '수', start: '4', end: '4' },
            { day: '수', start: '7', end: '8' }
        ]
    },
    {
        input: '수(1 ~ 3, 5 ~ 6, 7)',
        expected: [
            { day: '수', start: '1', end: '3' },
            { day: '수', start: '5', end: '6' },
            { day: '수', start: '7', end: '7' }
        ]
    },
    {
        input: '수(1, 5 ~ 6, 7 ~ 8)',
        expected: [
            { day: '수', start: '1', end: '1' },
            { day: '수', start: '5', end: '6' },
            { day: '수', start: '7', end: '8' }
        ]
    },
    {
        input: '수(1 ~ 3, 4, 7 ~ 8)',
        expected: [
            { day: '수', start: '1', end: '3' },
            { day: '수', start: '4', end: '4' },
            { day: '수', start: '7', end: '8' }
        ]
    },
    {
        input: '수(1 ~ 3, 4 ~ 6, 7 ~ 8)',
        expected: [
            { day: '수', start: '1', end: '3' },
            { day: '수', start: '4', end: '6' },
            { day: '수', start: '7', end: '8' }
        ]
    },
    {
        input: '목(1A)',
        expected: [
            { day: '목', start: '1A', end: '1A' }
        ]
    },
    {
        input: '목(1A ~ 3A)',
        expected: [
            { day: '목', start: '1A', end: '3A' }
        ]
    },
    {
        input: '금(1A, 2B)',
        expected: [
            { day: '금', start: '1A', end: '1A' },
            { day: '금', start: '2B', end: '2B' }
        ]
    },
    {
        input: '금(1A, 2B ~ 4A)',
        expected: [
            { day: '금', start: '1A', end: '1A' },
            { day: '금', start: '2B', end: '4A' }
        ]
    },
    {
        input: '금(1A ~ 3A, 4B)',
        expected: [
            { day: '금', start: '1A', end: '3A' },
            { day: '금', start: '4B', end: '4B' }
        ]
    },
    {
        input: '금(1A ~ 3A, 4B ~ 6A)',
        expected: [
            { day: '금', start: '1A', end: '3A' },
            { day: '금', start: '4B', end: '6A' }
        ]
    },
    {
        input: '월(7), 수(1, 4 ~ 6, 7 ~ 8)',
        expected: [
            { day: '월', start: '7', end: '7' },
            { day: '수', start: '1', end: '1' },
            { day: '수', start: '4', end: '6' },
            { day: '수', start: '7', end: '8' }
        ]
    },
    {
        input: '화(1, 3), 목(1A ~ 3A)',
        expected: [
            { day: '화', start: '1', end: '1' },
            { day: '화', start: '3', end: '3' },
            { day: '목', start: '1A', end: '3A' }
        ]
    },
    {
        input: '수(1, 4 ~ 6, 7), 금(1A ~ 3A, 4B ~ 6A)',
        expected: [
            { day: '수', start: '1', end: '1' },
            { day: '수', start: '4', end: '6' },
            { day: '수', start: '7', end: '7' },
            { day: '금', start: '1A', end: '3A' },
            { day: '금', start: '4B', end: '6A' }
        ]
    },
    {
        input: '화(2 ~ 4, 4 ~ 6), 목(1A)',
        expected: [
            { day: '화', start: '2', end: '4' },
            { day: '화', start: '4', end: '6' },
            { day: '목', start: '1A', end: '1A' }
        ]
    }, {
        input: '월(7), 수(1, 4 ~ 6, 7 ~ 8), 금(1A ~ 3A, 4B ~ 6A)',
        expected: [
            { day: '월', start: '7', end: '7' },
            { day: '수', start: '1', end: '1' },
            { day: '수', start: '4', end: '6' },
            { day: '수', start: '7', end: '8' },
            { day: '금', start: '1A', end: '3A' },
            { day: '금', start: '4B', end: '6A' }
        ]
    }, {
        input: '화(1, 3), 목(1A ~ 3A), 토(1 ~ 3)',
        expected: [
            { day: '화', start: '1', end: '1' },
            { day: '화', start: '3', end: '3' },
            { day: '목', start: '1A', end: '3A' },
            { day: '토', start: '1', end: '3' }
        ]
    }, {
        input: '수(1, 4 ~ 6, 7), 금(1A ~ 3A, 4B ~ 6A), 토(4 ~ 6)',
        expected: [
            { day: '수', start: '1', end: '1' },
            { day: '수', start: '4', end: '6' },
            { day: '수', start: '7', end: '7' },
            { day: '금', start: '1A', end: '3A' },
            { day: '금', start: '4B', end: '6A' },
            { day: '토', start: '4', end: '6' }
        ]
    }, {
        input: '화(2 ~ 4, 4 ~ 6), 목(1A), 토(7 ~ 8)',
        expected: [
            { day: '화', start: '2', end: '4' },
            { day: '화', start: '4', end: '6' },
            { day: '목', start: '1A', end: '1A' },
            { day: '토', start: '7', end: '8' }
        ]
    }, {
        input: '수(1 ~ 3, 4, 7 ~ 8), 금(1A, 2B), 토(9 ~ 10)',
        expected: [
            { day: '수', start: '1', end: '3' },
            { day: '수', start: '4', end: '4' },
            { day: '수', start: '7', end: '8' },
            { day: '금', start: '1A', end: '1A' },
            { day: '금', start: '2B', end: '2B' },
            { day: '토', start: '9', end: '10' }
        ]
    }

];

describe("scheduleController", () => {
    describe("parse", () => {
        testCases.forEach(({ input, expected }) => {
            it(`should parse ${input} to ${JSON.stringify(expected)}`, () => {
                expect(parse(input)).toEqual(expected);
            });
        });
    });
});