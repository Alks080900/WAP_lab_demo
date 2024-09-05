//Practicing object declaration
const car = {
    brandName: 'Nissan',
    brandType: 'Sedan',
    brandModel: 'Altima',
    numOfSeats: 5,
    printCarInfo: function () {
        // I have experimented on how will I show a default color if there is no value and avoid undefined
        this.color=this.color || 'No Color';
        console.log(`${this.brandName} ${this.brandType} ${this.brandModel} ${this.numOfSeats} ${this.color}`);
    }
}
car.printCarInfo();

//I have tried to add a property to the object
car.color = 'Black';
//Added a new function to the object car
car.beep = function () {
    console.log('Beep, Beep');
}

//Modifying a property like a setter
car.brandModel = 'R34';
console.log(car.brandModel); // Output: 2021

console.log(car.color);
car.beep();
car.printCarInfo();

//----------------------------------------------------------------------------------------------------------

//On this part I will do some examples that can happen in the real world to have a visualization of it upon practice

// FUNCTIONAL DECLARATION
const user1 = {
    userName: 'john12345',
    loggedIn: true
}

const user2 = {
    userName: 'john1234567',
    loggedIn: true
}

function isAuthenticated(user) {
    if (user.userName === 'john12345' && user.loggedIn) {
        return true;
    }
    return false;
}

console.log(isAuthenticated(user1)); // Output: true
console.log(isAuthenticated(user2)); // Output: false


//----------------------------------------------------------------------------------------------------------

//FUNCTIONAL EXPRESSION
const sortByPrice = function(products) {
    return products.sort((a, b) => a.price - b.price);
};

// Example usage
const products = [
    { name: 'Laptop', price: 1000 },
    { name: 'Phone', price: 600 },
    { name: 'Tablet', price: 400 }
];

console.log(sortByPrice(products));

//----------------------------------------------------------------------------------------------------------

//ARROW FUNCTION
const processOrders = (orders) => orders
    .filter(order => order.status === 'delivered')
    .map(order => order.total);

const orders = [
    { id: 1, status: 'delivered', total: 30 },
    { id: 2, status: 'pending', total: 20 },
    { id: 3, status: 'delivered', total: 50 }
];

console.log(processOrders(orders));

