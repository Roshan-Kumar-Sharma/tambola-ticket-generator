let maxNum = 90;
let minNum = 1;
let nRows = 3;
let nCols = 9;

function sortAsc(val1, val2) {
    return val1 - val2;
}

function generateTicket(existingNumberSet) {
    let ticket = [];
    let row = 0;
    let nCount = 5;

    let ticketNumbers = generateRandomNumber(existingNumberSet);

    // console.log("ticketNumbers: ", ticketNumbers)

    while (row < nRows) {
        let ticketRow = new Array(nCols).fill(0);
        let currRowNumbers = ticketNumbers.slice(
            row * nCount,
            row * nCount + nCount
        );

        // console.log("currRowNumbers: ", currRowNumbers)

        let randomPositions = generateRandomPosition();

        // console.log("randomPositions: ", randomPositions)

        randomPositions.forEach(
            (position, index) => (ticketRow[position] = currRowNumbers[index])
        );

        // console.log("ticketRow: ", ticketRow)

        ticket.push(ticketRow);
        row++;
    }

    return ticket;
}

function generateRandomNumber(existingNumberSet) {
    let ticketNumbers = [];
    let randomNumber = undefined;
    let randomNumberCount = 15;

    while (randomNumberCount) {
        randomNumber = Math.floor(
            Math.random() * (maxNum - minNum + 1) + minNum
        );
        if (existingNumberSet.has(randomNumber)) continue;
        ticketNumbers.push(randomNumber);
        existingNumberSet.add(randomNumber);
        randomNumberCount--;
    }

    return ticketNumbers.sort(sortAsc);
}

function generateRandomPosition() {
    let randomPosition = undefined;
    let randomPositionCount = 5;
    let randomPositionSet = new Set();
    let maxPos = 8;
    let minPos = 0;

    while (randomPositionSet.size < randomPositionCount) {
        randomPosition = Math.floor(
            Math.random() * (maxPos - minPos + 1) + minPos
        );
        if (!randomPositionSet.has(randomPosition))
            randomPositionSet.add(randomPosition);
    }

    return Array.from(randomPositionSet).sort(sortAsc);
}

function generateTicketSet(totalTicket) {
    let tambolaTicketSet = [];
    let existingNumberSet = new Set();

    for (let ticket = 1; ticket <= totalTicket; ticket++) {
        let currTambolaTicket = generateTicket(existingNumberSet);
        // console.log(currTambolaTicket)
        tambolaTicketSet.push(currTambolaTicket);
    }

    return tambolaTicketSet;
}

export { generateTicketSet };

// console.log(generateTicketSet(2))
// console.log(JSON.stringify(generateTicket()))
// console.log(JSON.stringify(generateTicket()))
// console.log(JSON.stringify(generateTicket()))
// console.log(JSON.stringify(generateTicket()))
// console.log(JSON.stringify(generateTicket()))
