function getTicketNo() {
    return parseInt(Math.random() * 2000); // TODO: get a decent
}

function getSpace() {
    const space = parseInt(Math.random() * 1000); // TODO: get nearest free parking space
    registerSpace(space);
    return space;
}

function registerSpace(space) {
    const register = space; // TODO: DB-Backend to store stuff
    return true;
}

function payTicket(space, token) {
    const sum = 12.5; // TODO: Compute sum out of time factors
    const ret = pay(sum);
    const checkedToken = token * ret.checkMulti;
    if (ret.paid) {
        if (isNearGate()) {
            openGate(checkedToken);
        }
        return checkedToken;
    } else {
        throw ('Could not pay ticket');
    }
}

function pay(sum) {
    const retObj = {// In production put credit-card API-call (async) here
        paid: Math.random() > 0.7 ? false : true, // 70% chance to pay ;-)
        checkMulti: 42 // TODO: use a decent crypto library for security
    };
    return retObj;
}

function isTokenPaid(token) {
    const oldToken = token / 42;
    if (token / oldToken == 42) { // TODO: get old token from db for this check
        return true;
    } else {
        return false;
    }
}

function isNearGate() {
    return true; // TODO: Read sensors
}

function openGate(token) {
    if (isTokenPaid(token)) { // TODO: token check
        return true;
    }
    return false;
}



exports.getSpace = getSpace;
exports.payTicket = payTicket;
exports.openGate = openGate;
exports.getTicketNo = getTicketNo;
