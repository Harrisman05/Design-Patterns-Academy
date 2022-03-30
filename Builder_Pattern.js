/* Builder Pattern is useful when you have many different working parts that need to all come together to create 
   a single object. In this case, we want to create a User class dynamically using a builder. */

// No design pattern below

class Address {
    constructor(zip, street) {
        this.zip = zip;
        this.street = street;
    }
}

class User1 {
    constructor(name, age, phone, address) {
        this.name = name;
        this.age = age;
        this.phone = phone;
        this.address = address;
    }
}

const user = new User1("Bob");

console.log(user); // User { name: 'Bob', age: undefined, phone: undefined, address: undefined }

// with this structure you have to pass in every argument in the correct order, high chance of error

// Builder helps solve this

class User {
    constructor(name) {
        this.name = name;
    }
}

class UserBuilder { 
    constructor(name) {             // name is only parameter needed to created a UserBuilder
        this.user = new User(name);
    }

    setAge(age) {
        this.user.age = age;
        return this;                // return the builder back so the methods can be chained in one line
    }

    setPhone(phone) {
        this.user.phone = phone;
        return this;
    }

    setAddress(address) {
        this.user.address = address;
        return this;
    }

    build() {
        return this.user; // return user object so that we can use user object instead of builder
    }
}

let harleyUser = new UserBuilder("Harley").build();

console.log(harleyUser); // User { name: 'Harley' }

// All the other parameters are optional now, don't have to specify undefined for the rest of the users

let travisUser = new UserBuilder("Travis").setAge(18).setPhone(111222333).setAddress("123 Loom Avenue").build();

console.log(travisUser); 

/* User {
    name: 'Travis',
    age: 18,
    phone: 111222333,
    address: '123 Loom Avenue'
  } */

// Second Method (JavaScript specific) - No need for builder class

// Optional parameters in JS can be created by passing them in as a JSON object at the end of a function declaration

class jsUser {
    constructor(name, {age, phone = "default", address} = {}) { // last parameter is a JS object is going to have 
        this.name = name;                                       // the keys of age, phone and address. Default parameter 
        this.age = age;                                         // used for phone parameter
        this.phone = phone;
        this.address = address;
    }
}

let tomUser = new jsUser("Tom", {age: 22});

console.log(tomUser); // jsUser { name: 'Tom', age: 22, phone: 'default', address: undefined }

let steveUser = new jsUser("Steve", {address: "456 Beck Street"});

console.log(steveUser); // age and phone still undefined

/* jsUser {
  name: 'Steve',
  age: undefined,
  phone: 'default',
  address: '456 Beck Street'
} */