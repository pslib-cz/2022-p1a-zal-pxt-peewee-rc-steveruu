function decode(message: string) {
    let dimensions = [];
    dimensions.push(message.charCodeAt(0));
    dimensions.push(message.charCodeAt(1));

    for (let i = 2; i <= 7; i++) {
        dimensions.push(parseInt(message.charAt(i)));
    }

    return dimensions;
}

function carMotor(ll: number = 0, lr: number = 0) {
    const dimensionX = Math.map(ll, 0, 255, -255, 255)
    const dimensionY = Math.map(lr, 0, 255, -255, 255)

    const rychlost_levy = dimensionY + dimensionX;
    const rychlost_pravy = dimensionY - dimensionX;

    if (rychlost_levy > 255) rychlost_levy = 255;
    if (rychlost_pravy > 255) rychlost_pravy = 255;
    if (rychlost_levy < -255) rychlost_levy = -255;
    if (rychlost_pravy < -255) rychlost_pravy = -255; // at to neprejede


    PCAmotor.MotorRun(PCAmotor.Motors.M1, -rychlost_pravy);
    PCAmotor.MotorRun(PCAmotor.Motors.M4, -rychlost_levy);
}

let instructions = [0];

radio.onReceivedString(function (recievedString) {
    if (radio.receivedPacket(RadioPacketProperty.SerialNumber) != -1584843917) return;
    instructions = decode(recievedString);
})

basic.forever(function () {
    carMotor(instructions[0], instructions[1]);
    
})

// microbit: 4e8096