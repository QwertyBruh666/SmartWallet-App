import { round } from "./round";

export function getShortNumber(number: number): string {
    let count = 0;
    let digit = ""
    while (number / 1000 > 1) {
        number /= 1000;
        count += 1
    }
    switch (count) {
        case 1:
            digit = "K";
            break;
        case 2:
            digit = "M";
            break;
        case 3:
            digit += "B";
            break;
        case 4:
            digit += "T";
            break;
        case 5:
            digit += "P";
            break;
    }
    return round(number, 2) + digit;
}