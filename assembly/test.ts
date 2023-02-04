import { validateAs, validateString } from ".";

console.log(validateAs<string>('"hello world"').toString());
console.log(validateAs<string>("1\"234\"").toString());

console.log(validateAs<i32>("314").toString());
console.log(validateAs<i32>("3.14").toString());

console.log(validateAs<f32>("3.14").toString());
console.log(validateAs<f32>("314").toString());

console.log(validateAs<boolean>("true").toString());
console.log(validateAs<boolean>("false").toString());

// Should not pass
console.log(validateAs<boolean>("truest").toString());
console.log(validateAs<boolean>("falsetto").toString());