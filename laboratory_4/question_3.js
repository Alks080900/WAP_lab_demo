"use strict";
function describePerson(person) {
    return `${person.name} is ${person.age} years old and is ${person.isStudent ? "a student" : "not a student"}.`;
}
const person = { name: "Alice", age: 25, isStudent: true };
console.log(describePerson(person));
