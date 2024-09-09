const isPrime = (n) => {
    return new Promise((resolve, reject) => {
        if (n <= 1) {
            reject({ prime: false });
            return;
        }

        for (let i = 2, s = Math.sqrt(n); i <= s; i++) {
            if (n % i === 0) {
                reject({ prime: false });
                return;
            }
        }

        resolve({ prime: true });
    });
};

const testPrime = async () => {
    console.log('start');

    try {
        const result = await isPrime(7);
        console.log(result);
    } catch (error) {
        console.error(error);
    }

    console.log('end');
};

console.log('start');
isPrime(7)
    .then(console.log)
    .catch(console.error);
console.log('end');