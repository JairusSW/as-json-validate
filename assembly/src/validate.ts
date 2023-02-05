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
    let start: u32 = 0;
    let end: u32 = data.length;
    while (start < <u32>data.length && isSpace(unsafeCharCodeAt(data, start))) start++;
    while (end < <u32>data.length && isSpace(unsafeCharCodeAt(data, end))) end--;
    if ((end -= start) === 4 && !memory.compare(changetype<usize>(data) + <usize>start, changetype<usize>(trueWord), 4)) return true;
    if (end === 5 && !memory.compare(changetype<usize>(data) + <usize>start, changetype<usize>(falseWord), 5)) return true;
    return false;
}

export function validateArray(data: string, start: i32 = 1, end: i32 = 0): boolean {
    let char = 0;
    let depth = 0;
    let lastPos = start;
    let isString = false;
    for (; start < (end !== 0 ? end : data.length - 1); start++) {
        char = unsafeCharCodeAt(data, start);
        if (char === 91 || char === 123) {
            if (depth === 0) lastPos = start;
            depth++;
            //console.log("open " + depth.toString());
        } else if ((!isString && char === 34)) {
            if (depth === 0) lastPos = start;
            isString = true;
            depth++;
            //console.log("open " + depth.toString());
        } else if (char === 93 || char === 125) {
            depth--;
            //console.log("close " + depth.toString());
            if (depth === 0) {
                console.log(data.slice(lastPos, ++start));
            }
        } else if (isString && char === 34) {
            isString = false;
            depth--;
            //console.log("close " + depth.toString());
            if (depth === 0) {
                console.log(data.slice(lastPos, ++start));
            }
        }
    }
    return false;
}

export function validateStringArray(data: string, start: i32 = 1, end: i32 = 0): boolean {
    let char = 0;
    let depth = 0;
    let lastPos = start;
    let isString = false;
    for (; start < (end !== 0 ? end : data.length - 1); start++) {
        char = unsafeCharCodeAt(data, start);
        if (char === 91 || char === 123) {
            if (depth === 0) lastPos = start;
            depth++;
            //console.log("open " + depth.toString());
        } else if ((!isString && char === 34)) {
            if (depth === 0) lastPos = start;
            isString = true;
            depth++;
            //console.log("open " + depth.toString());
        } else if (char === 93 || char === 125) {
            depth--;
            //console.log("close " + depth.toString());
            if (depth === 0) {
                console.log(data.slice(lastPos, ++start));
            }
        } else if (isString && char === 34) {
            isString = false;
            depth--;
            //console.log("close " + depth.toString());
            if (depth === 0) {
                console.log(data.slice(lastPos, ++start));
            }
        }
    }
    return false;
}