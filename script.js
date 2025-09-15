console.log("Instructions: \nfunction triangle() solves different equations of a triangle based on parameters given. Your goal is to type inside a console function itself, like this: function(value1, type1, value2, type2). \nAvailable parameters are: leg, hypotenuse, adjacent angle, opposite angle or angle. But keep in mind, that only certain combinations of parameters are suitable: \n 1. two legs, \n 2. a leg and hypotenuse \n 3. a leg and adjacent angle \n 4. a leg and opposite angle \n 5. hypotenuse and an angle");

const toRad = deg => deg * Math.PI / 180;
const toDeg = rad => rad * 180 / Math.PI;

function validateTriangle(a, b, c, alpha, beta) {
    // перевіряємо чи всі значення скінченні
    if (![a, b, c, alpha, beta].every(v => Number.isFinite(v))) {
        return [false, "Non-finite value (NaN or Infinity)"];
    }

    if (alpha <= 0 || beta <= 0) {
        return [false, "Angles must be > 0"];
    }
    if (alpha >= 90 || beta >= 90) {
        return [false, "Acute angle must be < 90"];
    }

    if (a <= 0 || b <= 0 || c <= 0) {
        return [false, "Zero or negative input"];
    }
    if (a >= c || b >= c) {
        return [false, "Leg cannot be >= hypotenuse"];
    }

    return [true];
}

function LogResults(a, b, c, alpha, beta) {
    console.log(`a = ${a}`);
    console.log(`b = ${b}`);
    console.log(`c = ${c}`);
    console.log(`alpha = ${alpha}`);
    console.log(`beta = ${beta}`);
}

function twoLegs(a, b) {
    let c = Math.sqrt(a * a + b * b);
    let alpha = toDeg(Math.atan(a / b));
    let beta = toDeg(Math.atan(b / a));
    let checked = validateTriangle(a, b, c, alpha, beta);
    if (!checked[0]) return [false, checked[1]];
    LogResults(a, b, c, alpha, beta);
    return [true];
}

function LegAndHypotenuse(b, c) {
    if (c <= b) return [false, "Hypotenuse must be larger than leg"];
    let a = Math.sqrt(c * c - b * b);
    let alpha = toDeg(Math.atan(a / b));
    let beta = toDeg(Math.atan(b / a));
    let checked = validateTriangle(a, b, c, alpha, beta);
    if (!checked[0]) return [false, checked[1]];
    LogResults(a, b, c, alpha, beta);
    return [true];
}

function LegAndAdjacentAngle(b, alpha) {
    if (alpha <= 0 || alpha >= 90) return [false, "Adjacent angle must be between 0 and 90"];
    let c = b / Math.cos(toRad(alpha));
    let a = b * Math.tan(toRad(alpha));
    let beta = 90 - alpha;
    let checked = validateTriangle(a, b, c, alpha, beta);
    if (!checked[0]) return [false, checked[1]];
    LogResults(a, b, c, alpha, beta);
    return [true];
}

function LegAndOppositeAngle(b, beta) {
    if (beta <= 0 || beta >= 90) return [false, "Opposite angle must be between 0 and 90"];
    let alpha = 90 - beta;
    let c = b / Math.sin(toRad(beta));
    let a = b * Math.tan(toRad(alpha));
    let checked = validateTriangle(a, b, c, alpha, beta);
    if (!checked[0]) return [false, checked[1]];
    LogResults(a, b, c, alpha, beta);
    return [true];
}

function HypotenuseAndAcuteAngle(c, beta) {
    if (beta <= 0 || beta >= 90) return [false, "Angle must be between 0 and 90"];
    let alpha = 90 - beta;
    let a = c * Math.sin(toRad(alpha));
    let b = c * Math.sin(toRad(beta));
    let checked = validateTriangle(a, b, c, alpha, beta);
    if (!checked[0]) return [false, checked[1]];
    LogResults(a, b, c, alpha, beta);
    return [true];
}

const triangle = function(v1, t1, v2, t2) {
    if (typeof v1 !== "number" || typeof v2 !== "number") {
        console.log("Read the instructions again");
        return "failed";
    }

    if (t1 === "leg" && t2 === "leg") {
        let res = twoLegs(v1, v2);
        return res[0] ? "success" : res[1];
    }

    if ((t1 === "leg" && t2 === "hypotenuse") || (t1 === "hypotenuse" && t2 === "leg")) {
        let leg = (t1 === "leg" ? v1 : v2);
        let c = (t1 === "hypotenuse" ? v1 : v2);
        let res = LegAndHypotenuse(leg, c);
        return res[0] ? "success" : res[1];
    }

    if ((t1 === "leg" && t2 === "adjacent angle") || (t1 === "adjacent angle" && t2 === "leg")) {
        let leg = (t1 === "leg" ? v1 : v2);
        let angle = (t1 === "adjacent angle" ? v1 : v2);
        let res = LegAndAdjacentAngle(leg, angle);
        return res[0] ? "success" : res[1];
    }

    if ((t1 === "leg" && t2 === "opposite angle") || (t1 === "opposite angle" && t2 === "leg")) {
        let leg = (t1 === "leg" ? v1 : v2);
        let angle = (t1 === "opposite angle" ? v1 : v2);
        let res = LegAndOppositeAngle(leg, angle);
        return res[0] ? "success" : res[1];
    }

    if ((t1 === "hypotenuse" && t2 === "angle") || (t1 === "angle" && t2 === "hypotenuse")) {
        let c = (t1 === "hypotenuse" ? v1 : v2);
        let angle = (t1 === "angle" ? v1 : v2);
        let res = HypotenuseAndAcuteAngle(c, angle);
        return res[0] ? "success" : res[1];
    }

    console.log("Unsupported combination, read instructions again");
    return "failed";
};
