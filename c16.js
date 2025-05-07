function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

class Tyre {
  constructor(brand, size) {
    this.brand = brand;
    this.size = size;
  }

  toString() {
    return `${this.brand} ${this.size}`;
  }
}

class Car {
  constructor(varian, sn, door, seat, tyre, year, warranty) {
    this.varian = varian;
    this.sn = sn;
    this.door = door;
    this.seat = seat;
    this.tyre = tyre;
    this.year = year;
    this.warranty = warranty;
  }

  print() {
    console.log(`varian : ${this.varian}`);
    console.log(`sn     : ${this.sn}`);
    console.log(`door   : ${this.door}`);
    console.log(`seat   : ${this.seat}`);
    console.log(`tyre   : ${this.tyre}`);
    console.log(`year   : ${this.year}`);
    console.log(`warranty : ${this.warranty} year`);
    console.log();
  }
}

class Agya extends Car {
  constructor(sn, year) {
    const tyre = new Tyre("Dunlop", "15 inch");
    super("Agya", sn, 5, 5, tyre.toString(), year, 1);
  }
}

class Rush extends Car {
  constructor(sn, year) {
    const tyre = new Tyre("Bridgestone", "17 inch");
    super("Rush", sn, 5, 5, tyre.toString(), year, 3);
  }
}

class CarFactory {
  constructor() {
    this.cars = [];
  }

  produce(year) {
    const amount = Math.floor(Math.random() * 6) + 1;
    for (let i = 0; i < amount; i++) {
      const sn = generateUUID();
      const car = Math.random() < 0.5 ? new Agya(sn, year) : new Rush(sn, year);
      this.cars.push(car);
    }
  }

  result() {
    this.cars.forEach((car, index) => {
      console.log(`no. ${index + 1}`);
      car.print();
    });
  }

  guaranteeSimulation(simulationYear) {
    console.log(
      `Hasil simulasi garansi semua mobil pada tahun ${simulationYear} :\n`
    );
    this.cars.forEach((car, index) => {
      const warrantyExpirationYear = car.year + car.warranty;
      const isWarrantyActive = warrantyExpirationYear >= simulationYear;

      console.log(`no. ${index + 1}`);
      car.print();
      console.log(
        `status on ${simulationYear} this guarantee satatus is ${
          isWarrantyActive ? "active" : "expired"
        }`
      );
      console.log();
    });
  }
}

const toyota = new CarFactory();
toyota.produce(2020);
toyota.produce(2022);
toyota.result();
toyota.guaranteeSimulation(2025);
