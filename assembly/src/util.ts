// @ts-ignore
@inline
export function unsafeCharCodeAt(data: string, pos: i32): i32 {
    return load<u16>(changetype<usize>(data) + ((<usize>pos) << 1));
}