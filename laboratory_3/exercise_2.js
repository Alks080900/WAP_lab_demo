function sum (arr){
    let total = 0;

    for(let i = 0; i<arr.length; i++){
        if (arr[i] > 20){
            total+=arr[i];
        }
    }
    return total;
}
const numbers = [10, 25, 30, 15, 40];
console.log(sum(numbers));