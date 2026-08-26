let message1 : string = "Hello";
message1 = "bye";
console.log(message1);

let age1: number = 20;
console.log(age1);
let isActive: boolean = false;
console.log(isActive);

let numbers1: number[] = [1,2,3];
console.log(numbers1[0]);

let data: any = "This could be anything"
//If you do not know the data type put any key word.
data = 42;

function add(a:number, b:number): number{
    return a+b;
};

add(3, 4);

let user: {name:string, age:number} = {name: "Bob", age: 34};