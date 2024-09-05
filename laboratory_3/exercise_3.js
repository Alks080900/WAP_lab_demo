const getNewArray = function(arr){
    return arr
        .filter(array => array.length >= 5 )
        .filter(array => array.includes('a'));

}
const sampleArray = ['alexander', 'abby', 'apple'];
console.log(getNewArray(sampleArray));

/*
Lesson learned: its kinda similar to Java API streams, at first
* I had the right code for it, but I got an error by using
* contains() hahaha lol, but I now I know that the right
function for it is incudes()
*/