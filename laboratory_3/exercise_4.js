const stringsToUpperCase = function(arr) {
    return arr.reduce((result, str) => {
        if (str.length > 5) {
            result.push(str.toUpperCase());
        }
        return result;
    }, []);
}
const sampleArray = ['Goku', 'Naruto', 'Luffy', 'Vegeta'];
console.log(stringsToUpperCase(sampleArray));
