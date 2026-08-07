class Car {
  constructor(name) {
    this.name = name;
  }
  start() {
    return <h1>{this.name} has started.</h1>;
  }
  stop() {
    return <h1>{this.name} has stopped.</h1>;
  }
}

export default Car;
