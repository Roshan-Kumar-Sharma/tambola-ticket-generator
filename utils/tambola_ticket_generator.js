/*
-- Select random 5 range for 5 columns
-- Generate random unique number between the selected range
-- Add the generated numbers in the repective range set

-- If any column is not filled that is not having a single number then
*/

let ticketSet = [];
let nTickets = 6;

const sortAsc = (a, b) => a - b;
const sortTicketColumns = (ticket) => {
    for (let col = 0; col < 9; col++) {
        let filledIndices = [];
        let numbers = [];
        ticket.forEach((row, index) => {
            if (ticket[index][col]) {
                filledIndices.push(index);
                numbers.push(ticket[index][col]);
            }
        });

        // console.log("filledIndices: ", filledIndices)
        // console.log("numbers: ", numbers)

        numbers.sort(sortAsc);

        filledIndices.forEach((row, index) => {
            ticket[row][col] = numbers[index];
        });
    }

    return ticket;
};

let selectRandomUniqueRange = (min, max, count) => {
    let randomRangeSet = new Set();
    while (count) {
        let randomRange = Math.floor(Math.random() * (max - min + 1) + min);
        if (randomRangeSet.has(randomRange)) continue;
        randomRangeSet.add(randomRange);
        count--;
    }

    return Array.from(randomRangeSet).sort(sortAsc);
};

// let randomRanges = selectRandomUniqueRange(1, 9, 5);

// console.log(randomRanges);

let generateRandomNumbersInRange = (rangeArr, colRange) => {
    let column = new Array(9).fill(0);
    rangeArr.forEach((range) => {
        let { max, min, set } = colRange[range];
        let count = 1;
        let randomNumber = undefined;

        while (count) {
            randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
            if (set.has(randomNumber)) continue;
            set.add(randomNumber);
            count--;
        }

        column[range - 1] = randomNumber;
    });

    return column;
};

let unfilledColumns = (ticket) => {
    let columnIndices = [];
    for (let col = 0; col < 9; col++) {
        if (
            ticket[0][col] === 0 &&
            ticket[1][col] === 0 &&
            ticket[2][col] === 0
        )
            columnIndices.push(col);
    }

    return columnIndices;
};

let generateAllRowsOfTicket = (colRange) => {
    let ticket = [];
    let filledColumns = [];
    for (let row = 1; row <= 3; row++) {
        let randomRanges = selectRandomUniqueRange(1, 9, 5);
        filledColumns.push(randomRanges);
        let column = generateRandomNumbersInRange(randomRanges, colRange);
        ticket.push(column);
    }

    // console.log("ticket 1: \n", ticket.join("\n"));

    let unfilledColumnIndices = unfilledColumns(ticket);

    // console.log("unfilledColumnIndices: ", unfilledColumnIndices);

    for (let column = 0; column < unfilledColumnIndices.length; column++) {
        let col = unfilledColumnIndices[column];
        let nRowToFill = Math.floor(Math.random() * (3 - 1 + 1) + 1);
        // console.log("nRowToFill: ", nRowToFill);
        for (let row = 0; row < nRowToFill; row++) {
            let { max, min, set } = colRange[col + 1];
            let count = 1;
            let randomNumber = undefined;
            let index = undefined;

            while (count) {
                randomNumber = Math.floor(
                    Math.random() * (max - min + 1) + min
                );
                if (set.has(randomNumber)) continue;
                set.add(randomNumber);
                count--;
            }

            ticket[row][col] = randomNumber;

            while (1) {
                index = Math.floor(Math.random() * (4 - 0 + 1) + 0);
                let count = 0;
                filledColumns.forEach((row, i) => {
                    if (ticket[i][filledColumns[i][index] - 1]) count++;
                });

                if (count >= 2) break;
            }

            ticket[row][filledColumns[row][index] - 1] = 0;
        }
    }

    return ticket;
};

const checkSetSize = (ticketSet, colRange) => {
    for (let [key, value] of Object.entries(colRange)) {
        key = parseInt(key);
        let SET_SIZE = value.set.size;
        let MAX_SET_SIZE = value.max - value.min + 1;
        if (
            SET_SIZE === MAX_SET_SIZE ||
            MAX_SET_SIZE - SET_SIZE < (nTickets - ticketSet.length) * 3
        ) {
            let nTicketsRemaining = nTickets - ticketSet.length;
            let nFreeBlocks = nTicketsRemaining * 3 - ticketSet.length;

            ticketSet.forEach((ticket) => {
                let count = 0;
                ticket.forEach((row, index) => {
                    if (ticket[index][key - 1]) count++;
                });

                if (count < 2) return;

                ticket.forEach((row, index) => {
                    if (ticket[index][key - 1] && count > 1) {
                        value.set.delete(ticket[index][key - 1]);
                        ticket[index][key - 1] = 0;
                        count--;
                    }
                });
            });
        }
    }
};

function generateTicketSet(totalTicket) {
    let tambolaTicketSet = [];
    let colRange = {
        1: {
            min: 1,
            max: 9,
            set: new Set(),
        },
        2: {
            min: 10,
            max: 19,
            set: new Set(),
        },
        3: {
            min: 20,
            max: 29,
            set: new Set(),
        },
        4: {
            min: 30,
            max: 39,
            set: new Set(),
        },
        5: {
            min: 40,
            max: 49,
            set: new Set(),
        },
        6: {
            min: 50,
            max: 59,
            set: new Set(),
        },
        7: {
            min: 60,
            max: 69,
            set: new Set(),
        },
        8: {
            min: 70,
            max: 79,
            set: new Set(),
        },
        9: {
            min: 80,
            max: 90,
            set: new Set(),
        },
    };

    for (let ticket = 1; ticket <= totalTicket; ticket++) {
        let currTambolaTicket = generateAllRowsOfTicket(colRange);
        currTambolaTicket = sortTicketColumns(currTambolaTicket);
        tambolaTicketSet.push(currTambolaTicket);
        checkSetSize(tambolaTicketSet, colRange);

        console.log(currTambolaTicket.join("\n"));
    }

    return tambolaTicketSet;
}

// let tambola = generateTicketSet(6);

export { generateTicketSet };
