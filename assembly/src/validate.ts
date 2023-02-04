import { isSpace } from "util/string";
import { unsafeCharCodeAt } from "./util";

@lazy const trueWord = "true";
@lazy const falseWord = "false";
@lazy const emptyObject = "{}";

export function validateAs<T>(data: string): boolean {
    console.log(`Validating ${data} as ${nameof<T>()}: `)
    if (isString<T>()) {
        return validateString(data);
    } else if (isBoolean<T>()) {
        return validateBool(data);
    } else if (isInteger<T>()) {
        return validateInteger(data);
    } else if (isFloat<T>()) {
        return validateFloat(data);
    }
    return unreachable();
}

export function validateString(data: string): boolean {
    let firstPos = 0;
    let pos: u32 = 0;
    // Strip proceeding whitespace
    while (pos < <u32>data.length && isSpace(unsafeCharCodeAt(data, pos))) pos++;
    firstPos = pos;
    // Strip preceeding whitespace
    pos = <u32>data.length - 1;
    while (pos < <u32>data.length && isSpace(unsafeCharCodeAt(data, pos))) pos--;
    return unsafeCharCodeAt(data, firstPos) === 34 && unsafeCharCodeAt(data, pos) === 34;
}

export function validateInteger(data: string): boolean {
    let num: i32;
    for (let pos = 0; pos < data.length; pos++) {
        num = unsafeCharCodeAt(data, pos);
        if (!((num >= 48 && num <= 57) || num === 45 || num === 101 || num === 69)) return false;
    }
    return true;
}

export function validateFloat(data: string): boolean {
    let num: i32;
    for (let pos = 0; pos < data.length; pos++) {
        num = unsafeCharCodeAt(data, pos);
        if (!((num >= 48 && num <= 57) || num === 45 || num === 101 || num === 69 || num === 46)) return false;
    }
    return true;
}

export function validateBool(data: string): boolean {
    // "truest" should pass the test
    // "falsetto" should pass the test
    // BUT IT FREAKIN DOESN'T PASS THE TEST!
    // Why? I don't know, but it makes me happy :D
    if (data.length === 5 && !memory.compare(changetype<usize>(data), changetype<usize>(falseWord), 5)) return true;
    if (data.length === 4 && !memory.compare(changetype<usize>(data), changetype<usize>(trueWord), 4)) return true;
    return false;
}

export function validateObject(data: string): boolean {
    // Make sure that it starts and ends with "{" or "}"
    let firstPos = 0;
    let pos: u32 = 0;
    // Strip proceeding whitespace
    while (pos < <u32>data.length && isSpace(unsafeCharCodeAt(data, pos))) pos++;
    firstPos = pos;
    // Strip preceeding whitespace
    pos = <u32>data.length - 1;
    while (pos < <u32>data.length && isSpace(unsafeCharCodeAt(data, pos))) pos--;
    if (unsafeCharCodeAt(data, firstPos) === 123 && unsafeCharCodeAt(data, pos) === 125) {
        // It has { ... }
        // Now verify members
    }
    return false;
}