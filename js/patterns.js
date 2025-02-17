// Global object to store pattern implementations
window.patternImplementations = {
    // Creational Patterns
    singleton: function(container) {
        class DatabaseConnection {
            constructor() {
                if (DatabaseConnection.instance) {
                    return DatabaseConnection.instance;
                }
                this.connected = false;
                DatabaseConnection.instance = this;
            }

            connect() {
                if (!this.connected) {
                    this.connected = true;
                    return "Database connected!";
                }
                return "Already connected!";
            }

            disconnect() {
                if (this.connected) {
                    this.connected = false;
                    return "Database disconnected!";
                }
                return "Already disconnected!";
            }

            getStatus() {
                return this.connected ? "Connected" : "Disconnected";
            }
        }

        container.innerHTML = `
            <div class="pattern-example">
                <h3>Singleton Pattern - Database Connection</h3>
                <p>This example demonstrates a singleton database connection. Try creating multiple instances:</p>
                <div class="demo-controls">
                    <button id="createInstance">Create New Instance</button>
                    <button id="connect">Connect</button>
                    <button id="disconnect">Disconnect</button>
                </div>
                <div class="output" id="singletonOutput"></div>
            </div>
        `;

        const output = container.querySelector('#singletonOutput');
        const instances = [];

        container.querySelector('#createInstance').addEventListener('click', () => {
            const instance = new DatabaseConnection();
            instances.push(instance);
            output.innerHTML = `
                Instances created: ${instances.length}<br>
                All instances are the same object: ${instances.every(inst => inst === instances[0])}<br>
                Current status: ${instance.getStatus()}
            `;
        });

        container.querySelector('#connect').addEventListener('click', () => {
            if (instances.length === 0) {
                output.innerHTML = "Create an instance first!";
                return;
            }
            const result = instances[0].connect();
            output.innerHTML = `${result}<br>Status: ${instances[0].getStatus()}`;
        });

        container.querySelector('#disconnect').addEventListener('click', () => {
            if (instances.length === 0) {
                output.innerHTML = "Create an instance first!";
                return;
            }
            const result = instances[0].disconnect();
            output.innerHTML = `${result}<br>Status: ${instances[0].getStatus()}`;
        });
    },

    factory: function(container) {
        class Vehicle {
            constructor(type, color) {
                this.type = type;
                this.color = color;
            }

            getInfo() {
                return `A ${this.color} ${this.type}`;
            }
        }

        class Car extends Vehicle {
            constructor(color) {
                super('Car', color);
                this.wheels = 4;
            }
        }

        class Motorcycle extends Vehicle {
            constructor(color) {
                super('Motorcycle', color);
                this.wheels = 2;
            }
        }

        class Truck extends Vehicle {
            constructor(color) {
                super('Truck', color);
                this.wheels = 6;
            }
        }

        class VehicleFactory {
            createVehicle(type, color) {
                switch(type.toLowerCase()) {
                    case 'car':
                        return new Car(color);
                    case 'motorcycle':
                        return new Motorcycle(color);
                    case 'truck':
                        return new Truck(color);
                    default:
                        throw new Error('Invalid vehicle type');
                }
            }
        }

        container.innerHTML = `
            <div class="pattern-example">
                <h3>Factory Pattern - Vehicle Factory</h3>
                <p>Create different types of vehicles using the factory:</p>
                <div class="demo-controls">
                    <select id="vehicleType">
                        <option value="car">Car</option>
                        <option value="motorcycle">Motorcycle</option>
                        <option value="truck">Truck</option>
                    </select>
                    <select id="vehicleColor">
                        <option value="red">Red</option>
                        <option value="blue">Blue</option>
                        <option value="green">Green</option>
                        <option value="black">Black</option>
                    </select>
                    <button id="createVehicle">Create Vehicle</button>
                </div>
                <div class="output" id="factoryOutput"></div>
            </div>
        `;

        const factory = new VehicleFactory();
        const output = container.querySelector('#factoryOutput');
        const vehicles = [];

        container.querySelector('#createVehicle').addEventListener('click', () => {
            const type = container.querySelector('#vehicleType').value;
            const color = container.querySelector('#vehicleColor').value;
            
            try {
                const vehicle = factory.createVehicle(type, color);
                vehicles.push(vehicle);
                output.innerHTML = `
                    Created: ${vehicle.getInfo()}<br>
                    Number of wheels: ${vehicle.wheels}<br>
                    Total vehicles created: ${vehicles.length}
                `;
            } catch (error) {
                output.innerHTML = `Error: ${error.message}`;
            }
        });
    },

    builder: function(container) {
        class Computer {
            constructor() {
                this.cpu = '';
                this.ram = '';
                this.storage = '';
                this.gpu = '';
            }

            getSpecs() {
                return `
                    CPU: ${this.cpu}
                    RAM: ${this.ram}
                    Storage: ${this.storage}
                    GPU: ${this.gpu}
                `;
            }
        }

        class ComputerBuilder {
            constructor() {
                this.computer = new Computer();
            }

            setCPU(cpu) {
                this.computer.cpu = cpu;
                return this;
            }

            setRAM(ram) {
                this.computer.ram = ram;
                return this;
            }

            setStorage(storage) {
                this.computer.storage = storage;
                return this;
            }

            setGPU(gpu) {
                this.computer.gpu = gpu;
                return this;
            }

            build() {
                return this.computer;
            }
        }

        container.innerHTML = `
            <div class="pattern-example">
                <h3>Builder Pattern - Computer Configuration</h3>
                <p>Build a custom computer by selecting components:</p>
                <div class="demo-controls">
                    <select id="cpu">
                        <option value="Intel i5">Intel i5</option>
                        <option value="Intel i7">Intel i7</option>
                        <option value="AMD Ryzen 5">AMD Ryzen 5</option>
                        <option value="AMD Ryzen 7">AMD Ryzen 7</option>
                    </select>
                    <select id="ram">
                        <option value="8GB">8GB</option>
                        <option value="16GB">16GB</option>
                        <option value="32GB">32GB</option>
                    </select>
                    <select id="storage">
                        <option value="256GB SSD">256GB SSD</option>
                        <option value="512GB SSD">512GB SSD</option>
                        <option value="1TB SSD">1TB SSD</option>
                    </select>
                    <select id="gpu">
                        <option value="NVIDIA GTX 1660">NVIDIA GTX 1660</option>
                        <option value="NVIDIA RTX 3060">NVIDIA RTX 3060</option>
                        <option value="AMD RX 6600">AMD RX 6600</option>
                    </select>
                    <button id="buildComputer">Build Computer</button>
                </div>
                <div class="output" id="builderOutput"></div>
            </div>
        `;

        const output = container.querySelector('#builderOutput');

        container.querySelector('#buildComputer').addEventListener('click', () => {
            const builder = new ComputerBuilder();
            const computer = builder
                .setCPU(container.querySelector('#cpu').value)
                .setRAM(container.querySelector('#ram').value)
                .setStorage(container.querySelector('#storage').value)
                .setGPU(container.querySelector('#gpu').value)
                .build();

            output.innerHTML = `Computer built with specifications:\n${computer.getSpecs()}`;
        });
    },

    // Structural Patterns
    adapter: function(container) {
        // Legacy Temperature System (Celsius)
        class CelsiusTemperature {
            constructor() {
                this.temperature = 0;
            }

            setTemperature(celsius) {
                this.temperature = celsius;
            }

            getTemperature() {
                return `${this.temperature}°C`;
            }
        }

        // Modern Temperature System (Fahrenheit)
        class FahrenheitTemperature {
            setFahrenheit(fahrenheit) {
                this.fahrenheit = fahrenheit;
            }

            getFahrenheit() {
                return `${this.fahrenheit}°F`;
            }
        }

        // Adapter
        class TemperatureAdapter {
            constructor(celsiusSystem) {
                this.celsiusSystem = celsiusSystem;
            }

            setFahrenheit(fahrenheit) {
                const celsius = (fahrenheit - 32) * 5/9;
                this.celsiusSystem.setTemperature(celsius);
            }

            getFahrenheit() {
                const celsius = parseFloat(this.celsiusSystem.getTemperature());
                const fahrenheit = (celsius * 9/5) + 32;
                return `${fahrenheit.toFixed(1)}°F`;
            }
        }

        container.innerHTML = `
            <div class="pattern-example">
                <h3>Adapter Pattern - Temperature Converter</h3>
                <p>Convert between Celsius and Fahrenheit using an adapter:</p>
                <div class="demo-controls">
                    <input type="number" id="temperature" placeholder="Enter temperature">
                    <select id="unit">
                        <option value="celsius">Celsius</option>
                        <option value="fahrenheit">Fahrenheit</option>
                    </select>
                    <button id="convertTemp">Convert</button>
                </div>
                <div class="output" id="adapterOutput"></div>
            </div>
        `;

        const celsiusSystem = new CelsiusTemperature();
        const adapter = new TemperatureAdapter(celsiusSystem);
        const output = container.querySelector('#adapterOutput');

        container.querySelector('#convertTemp').addEventListener('click', () => {
            const temp = parseFloat(container.querySelector('#temperature').value);
            const unit = container.querySelector('#unit').value;

            if (isNaN(temp)) {
                output.innerHTML = 'Please enter a valid number';
                return;
            }

            if (unit === 'celsius') {
                celsiusSystem.setTemperature(temp);
                output.innerHTML = `
                    Original (Celsius): ${celsiusSystem.getTemperature()}<br>
                    Converted (Fahrenheit): ${adapter.getFahrenheit()}
                `;
            } else {
                adapter.setFahrenheit(temp);
                output.innerHTML = `
                    Original (Fahrenheit): ${temp}°F<br>
                    Converted (Celsius): ${celsiusSystem.getTemperature()}
                `;
            }
        });
    },

    decorator: function(container) {
        // Base Coffee class
        class Coffee {
            cost() {
                return 3;
            }

            description() {
                return "Basic Coffee";
            }
        }

        // Decorator base class
        class CoffeeDecorator {
            constructor(coffee) {
                this.coffee = coffee;
            }

            cost() {
                return this.coffee.cost();
            }

            description() {
                return this.coffee.description();
            }
        }

        // Concrete decorators
        class MilkDecorator extends CoffeeDecorator {
            cost() {
                return this.coffee.cost() + 0.5;
            }

            description() {
                return `${this.coffee.description()} + Milk`;
            }
        }

        class CaramelDecorator extends CoffeeDecorator {
            cost() {
                return this.coffee.cost() + 0.7;
            }

            description() {
                return `${this.coffee.description()} + Caramel`;
            }
        }

        class WhippedCreamDecorator extends CoffeeDecorator {
            cost() {
                return this.coffee.cost() + 0.6;
            }

            description() {
                return `${this.coffee.description()} + Whipped Cream`;
            }
        }

        container.innerHTML = `
            <div class="pattern-example">
                <h3>Decorator Pattern - Coffee Shop</h3>
                <p>Customize your coffee with different add-ons:</p>
                <div class="demo-controls">
                    <div>
                        <input type="checkbox" id="milk"> Milk (+$0.50)
                        <input type="checkbox" id="caramel"> Caramel (+$0.70)
                        <input type="checkbox" id="whippedCream"> Whipped Cream (+$0.60)
                    </div>
                    <button id="orderCoffee">Order Coffee</button>
                </div>
                <div class="output" id="decoratorOutput"></div>
            </div>
        `;

        const output = container.querySelector('#decoratorOutput');

        container.querySelector('#orderCoffee').addEventListener('click', () => {
            let coffee = new Coffee();

            if (container.querySelector('#milk').checked) {
                coffee = new MilkDecorator(coffee);
            }
            if (container.querySelector('#caramel').checked) {
                coffee = new CaramelDecorator(coffee);
            }
            if (container.querySelector('#whippedCream').checked) {
                coffee = new WhippedCreamDecorator(coffee);
            }

            output.innerHTML = `
                Order: ${coffee.description()}<br>
                Total Cost: $${coffee.cost().toFixed(2)}
            `;
        });
    },

    facade: function(container) {
        // Complex subsystems
        class CPU {
            freeze() { return "CPU: Freezing processor"; }
            jump(position) { return `CPU: Jumping to position ${position}`; }
            execute() { return "CPU: Executing commands"; }
        }

        class Memory {
            load(position, data) {
                return `Memory: Loading data "${data}" at position ${position}`;
            }
        }

        class HardDrive {
            read(position, size) {
                return `HardDrive: Reading ${size} bytes from position ${position}`;
            }
        }

        // Facade
        class ComputerFacade {
            constructor() {
                this.cpu = new CPU();
                this.memory = new Memory();
                this.hardDrive = new HardDrive();
            }

            start() {
                const bootSteps = [];
                bootSteps.push(this.cpu.freeze());
                bootSteps.push(this.hardDrive.read(0, 1024));
                bootSteps.push(this.memory.load(0, "boot_data"));
                bootSteps.push(this.cpu.jump(0));
                bootSteps.push(this.cpu.execute());
                return bootSteps;
            }
        }

        container.innerHTML = `
            <div class="pattern-example">
                <h3>Facade Pattern - Computer Boot Process</h3>
                <p>Simplify the complex boot process using a facade:</p>
                <div class="demo-controls">
                    <button id="bootComputer">Boot Computer</button>
                </div>
                <div class="output" id="facadeOutput"></div>
            </div>
        `;

        const computer = new ComputerFacade();
        const output = container.querySelector('#facadeOutput');

        container.querySelector('#bootComputer').addEventListener('click', () => {
            const bootSteps = computer.start();
            output.innerHTML = "Boot sequence started:<br>" + 
                bootSteps.map((step, index) => `${index + 1}. ${step}`).join('<br>');
        });
    },

    // Behavioral Patterns
    observer: function(container) {
        class NewsAgency {
            constructor() {
                this.subscribers = [];
                this.news = '';
            }

            subscribe(subscriber) {
                this.subscribers.push(subscriber);
            }

            unsubscribe(subscriber) {
                this.subscribers = this.subscribers.filter(s => s !== subscriber);
            }

            publishNews(news) {
                this.news = news;
                this.notifySubscribers();
            }

            notifySubscribers() {
                this.subscribers.forEach(subscriber => 
                    subscriber.update(this.news)
                );
            }
        }

        class NewsSubscriber {
            constructor(name) {
                this.name = name;
            }

            update(news) {
                return `${this.name} received news: ${news}`;
            }
        }

        container.innerHTML = `
            <div class="pattern-example">
                <h3>Observer Pattern - News Agency</h3>
                <p>Subscribe to news updates:</p>
                <div class="demo-controls">
                    <input type="text" id="subscriberName" placeholder="Subscriber name">
                    <button id="addSubscriber">Add Subscriber</button>
                    <input type="text" id="newsInput" placeholder="Enter news">
                    <button id="publishNews">Publish News</button>
                </div>
                <div class="output" id="observerOutput"></div>
            </div>
        `;

        const newsAgency = new NewsAgency();
        const output = container.querySelector('#observerOutput');
        const subscribers = new Map();

        container.querySelector('#addSubscriber').addEventListener('click', () => {
            const name = container.querySelector('#subscriberName').value.trim();
            if (name && !subscribers.has(name)) {
                const subscriber = new NewsSubscriber(name);
                subscribers.set(name, subscriber);
                newsAgency.subscribe(subscriber);
                output.innerHTML = `Subscriber "${name}" added successfully!<br>` +
                    `Total subscribers: ${subscribers.size}`;
            }
        });

        container.querySelector('#publishNews').addEventListener('click', () => {
            const news = container.querySelector('#newsInput').value.trim();
            if (news) {
                newsAgency.publishNews(news);
                output.innerHTML = "News published! Notifications sent:<br>" +
                    Array.from(subscribers.values())
                        .map(subscriber => subscriber.update(news))
                        .join('<br>');
            }
        });
    },

    strategy: function(container) {
        // Payment strategies
        class PaymentStrategy {
            pay(amount) {}
        }

        class CreditCardPayment extends PaymentStrategy {
            constructor(cardNumber) {
                super();
                this.cardNumber = cardNumber;
            }

            pay(amount) {
                return `Paid $${amount} using Credit Card (${this.cardNumber})`;
            }
        }

        class PayPalPayment extends PaymentStrategy {
            constructor(email) {
                super();
                this.email = email;
            }

            pay(amount) {
                return `Paid $${amount} using PayPal (${this.email})`;
            }
        }

        class CryptoPayment extends PaymentStrategy {
            constructor(wallet) {
                super();
                this.wallet = wallet;
            }

            pay(amount) {
                return `Paid $${amount} using Cryptocurrency (${this.wallet})`;
            }
        }

        // Shopping cart using payment strategy
        class ShoppingCart {
            constructor() {
                this.paymentStrategy = null;
            }

            setPaymentStrategy(strategy) {
                this.paymentStrategy = strategy;
            }

            checkout(amount) {
                if (this.paymentStrategy) {
                    return this.paymentStrategy.pay(amount);
                }
                return "No payment method selected!";
            }
        }

        container.innerHTML = `
            <div class="pattern-example">
                <h3>Strategy Pattern - Payment Processing</h3>
                <p>Choose a payment method and process payment:</p>
                <div class="demo-controls">
                    <select id="paymentMethod">
                        <option value="">Select payment method</option>
                        <option value="creditCard">Credit Card</option>
                        <option value="paypal">PayPal</option>
                        <option value="crypto">Cryptocurrency</option>
                    </select>
                    <input type="text" id="paymentDetails" placeholder="Enter payment details">
                    <input type="number" id="amount" placeholder="Enter amount">
                    <button id="processPayment">Process Payment</button>
                </div>
                <div class="output" id="strategyOutput"></div>
            </div>
        `;

        const cart = new ShoppingCart();
        const output = container.querySelector('#strategyOutput');

        container.querySelector('#paymentMethod').addEventListener('change', () => {
            const method = container.querySelector('#paymentMethod').value;
            const detailsInput = container.querySelector('#paymentDetails');
            
            switch(method) {
                case 'creditCard':
                    detailsInput.placeholder = "Enter card number";
                    break;
                case 'paypal':
                    detailsInput.placeholder = "Enter PayPal email";
                    break;
                case 'crypto':
                    detailsInput.placeholder = "Enter wallet address";
                    break;
                default:
                    detailsInput.placeholder = "Enter payment details";
            }
        });

        container.querySelector('#processPayment').addEventListener('click', () => {
            const method = container.querySelector('#paymentMethod').value;
            const details = container.querySelector('#paymentDetails').value;
            const amount = container.querySelector('#amount').value;

            if (!method || !details || !amount) {
                output.innerHTML = "Please fill in all fields!";
                return;
            }

            switch(method) {
                case 'creditCard':
                    cart.setPaymentStrategy(new CreditCardPayment(details));
                    break;
                case 'paypal':
                    cart.setPaymentStrategy(new PayPalPayment(details));
                    break;
                case 'crypto':
                    cart.setPaymentStrategy(new CryptoPayment(details));
                    break;
            }

            output.innerHTML = cart.checkout(amount);
        });
    },

    command: function(container) {
        // Receiver
        class Light {
            constructor(location) {
                this.location = location;
                this.isOn = false;
            }

            turnOn() {
                this.isOn = true;
                return `${this.location} light turned on`;
            }

            turnOff() {
                this.isOn = false;
                return `${this.location} light turned off`;
            }
        }

        // Commands
        class Command {
            execute() {}
            undo() {}
        }

        class TurnOnCommand extends Command {
            constructor(light) {
                super();
                this.light = light;
            }

            execute() {
                return this.light.turnOn();
            }

            undo() {
                return this.light.turnOff();
            }
        }

        class TurnOffCommand extends Command {
            constructor(light) {
                super();
                this.light = light;
            }

            execute() {
                return this.light.turnOff();
            }

            undo() {
                return this.light.turnOn();
            }
        }

        // Invoker
        class RemoteControl {
            constructor() {
                this.commands = [];
                this.currentIndex = -1;
            }

            executeCommand(command) {
                const result = command.execute();
                this.commands.push(command);
                this.currentIndex++;
                return result;
            }

            undo() {
                if (this.currentIndex >= 0) {
                    const result = this.commands[this.currentIndex].undo();
                    this.currentIndex--;
                    return result;
                }
                return "No commands to undo";
            }

            redo() {
                if (this.currentIndex < this.commands.length - 1) {
                    this.currentIndex++;
                    return this.commands[this.currentIndex].execute();
                }
                return "No commands to redo";
            }
        }

        container.innerHTML = `
            <div class="pattern-example">
                <h3>Command Pattern - Smart Home Lighting</h3>
                <p>Control lights with commands that can be undone/redone:</p>
                <div class="demo-controls">
                    <select id="location">
                        <option value="Living Room">Living Room</option>
                        <option value="Kitchen">Kitchen</option>
                        <option value="Bedroom">Bedroom</option>
                    </select>
                    <button id="turnOn">Turn On</button>
                    <button id="turnOff">Turn Off</button>
                    <button id="undo">Undo</button>
                    <button id="redo">Redo</button>
                </div>
                <div class="output" id="commandOutput"></div>
            </div>
        `;

        const remote = new RemoteControl();
        const lights = new Map();
        const output = container.querySelector('#commandOutput');

        function getLight(location) {
            if (!lights.has(location)) {
                lights.set(location, new Light(location));
            }
            return lights.get(location);
        }

        container.querySelector('#turnOn').addEventListener('click', () => {
            const location = container.querySelector('#location').value;
            const light = getLight(location);
            const command = new TurnOnCommand(light);
            output.innerHTML = remote.executeCommand(command);
        });

        container.querySelector('#turnOff').addEventListener('click', () => {
            const location = container.querySelector('#location').value;
            const light = getLight(location);
            const command = new TurnOffCommand(light);
            output.innerHTML = remote.executeCommand(command);
        });

        container.querySelector('#undo').addEventListener('click', () => {
            output.innerHTML = remote.undo();
        });

        container.querySelector('#redo').addEventListener('click', () => {
            output.innerHTML = remote.redo();
        });
    },

    // Abstract Factory Pattern
    abstractFactory: function(container) {
        // Abstract Product interfaces
        class Button {
            render() {}
            onClick() {}
        }

        class Checkbox {
            render() {}
            toggle() {}
        }

        // Concrete Products for Light Theme
        class LightButton extends Button {
            render() {
                return `<button class="light-theme">Light Button</button>`;
            }

            onClick() {
                return "Light button clicked";
            }
        }

        class LightCheckbox extends Checkbox {
            render() {
                return `<input type="checkbox" class="light-theme"> Light Checkbox`;
            }

            toggle() {
                return "Light checkbox toggled";
            }
        }

        // Concrete Products for Dark Theme
        class DarkButton extends Button {
            render() {
                return `<button class="dark-theme">Dark Button</button>`;
            }

            onClick() {
                return "Dark button clicked";
            }
        }

        class DarkCheckbox extends Checkbox {
            render() {
                return `<input type="checkbox" class="dark-theme"> Dark Checkbox`;
            }

            toggle() {
                return "Dark checkbox toggled";
            }
        }

        // Abstract Factory interface
        class UIFactory {
            createButton() {}
            createCheckbox() {}
        }

        // Concrete Factories
        class LightThemeFactory extends UIFactory {
            createButton() {
                return new LightButton();
            }

            createCheckbox() {
                return new LightCheckbox();
            }
        }

        class DarkThemeFactory extends UIFactory {
            createButton() {
                return new DarkButton();
            }

            createCheckbox() {
                return new DarkCheckbox();
            }
        }

        // Client code
        container.innerHTML = `
            <div class="pattern-example">
                <h3>Abstract Factory Pattern - UI Theme Factory</h3>
                <p>Create UI elements with consistent themes:</p>
                <div class="demo-controls">
                    <select id="themeSelect">
                        <option value="light">Light Theme</option>
                        <option value="dark">Dark Theme</option>
                    </select>
                    <button id="createElements">Create UI Elements</button>
                </div>
                <div id="uiContainer" style="margin-top: 1rem;"></div>
                <div class="output" id="abstractFactoryOutput"></div>
            </div>
        `;

        const output = container.querySelector('#abstractFactoryOutput');
        const uiContainer = container.querySelector('#uiContainer');
        let currentFactory = new LightThemeFactory();

        // Add theme-specific styles
        const style = document.createElement('style');
        style.textContent = `
            .light-theme {
                background-color: #ffffff;
                color: #000000;
                border: 1px solid #cccccc;
                padding: 5px 10px;
                margin: 5px;
            }
            .dark-theme {
                background-color: #333333;
                color: #ffffff;
                border: 1px solid #666666;
                padding: 5px 10px;
                margin: 5px;
            }
        `;
        document.head.appendChild(style);

        container.querySelector('#themeSelect').addEventListener('change', (e) => {
            currentFactory = e.target.value === 'light' ? 
                new LightThemeFactory() : 
                new DarkThemeFactory();
        });

        container.querySelector('#createElements').addEventListener('click', () => {
            const button = currentFactory.createButton();
            const checkbox = currentFactory.createCheckbox();

            uiContainer.innerHTML = button.render() + '<br>' + checkbox.render();
            
            // Add event listeners to the created elements
            const btnElement = uiContainer.querySelector('button');
            const cbElement = uiContainer.querySelector('input[type="checkbox"]');

            btnElement.addEventListener('click', () => {
                output.innerHTML = button.onClick();
            });

            cbElement.addEventListener('change', () => {
                output.innerHTML = checkbox.toggle();
            });
        });
    },

    // Prototype Pattern
    prototype: function(container) {
        // Base prototype
        class Shape {
            constructor() {
                this.x = 0;
                this.y = 0;
                this.color = "black";
            }

            clone() {
                const clone = new this.constructor();
                clone.x = this.x;
                clone.y = this.y;
                clone.color = this.color;
                return clone;
            }

            getInfo() {
                return `${this.constructor.name} at (${this.x}, ${this.y}) in ${this.color}`;
            }
        }

        // Concrete prototypes
        class Rectangle extends Shape {
            constructor() {
                super();
                this.width = 100;
                this.height = 50;
            }

            clone() {
                const clone = super.clone();
                clone.width = this.width;
                clone.height = this.height;
                return clone;
            }

            getInfo() {
                return `${super.getInfo()} - ${this.width}x${this.height}`;
            }
        }

        class Circle extends Shape {
            constructor() {
                super();
                this.radius = 30;
            }

            clone() {
                const clone = super.clone();
                clone.radius = this.radius;
                return clone;
            }

            getInfo() {
                return `${super.getInfo()} - radius: ${this.radius}`;
            }
        }

        container.innerHTML = `
            <div class="pattern-example">
                <h3>Prototype Pattern - Shape Cloning</h3>
                <p>Create and clone shapes with different properties:</p>
                <div class="demo-controls">
                    <select id="shapeType">
                        <option value="rectangle">Rectangle</option>
                        <option value="circle">Circle</option>
                    </select>
                    <input type="color" id="shapeColor" value="#000000">
                    <input type="number" id="xPos" placeholder="X Position" value="0">
                    <input type="number" id="yPos" placeholder="Y Position" value="0">
                    <button id="createShape">Create Shape</button>
                    <button id="cloneShape">Clone Shape</button>
                </div>
                <div class="output" id="prototypeOutput"></div>
                <div id="shapeContainer" style="margin-top: 1rem; border: 1px solid #ccc; padding: 1rem;"></div>
            </div>
        `;

        const output = container.querySelector('#prototypeOutput');
        const shapeContainer = container.querySelector('#shapeContainer');
        let currentShape = null;

        // Add SVG rendering styles
        const style = document.createElement('style');
        style.textContent = `
            .shape-svg {
                margin: 10px;
                display: inline-block;
            }
        `;
        document.head.appendChild(style);

        function renderShape(shape) {
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("width", "150");
            svg.setAttribute("height", "150");
            svg.classList.add("shape-svg");

            if (shape instanceof Rectangle) {
                const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                rect.setAttribute("x", shape.x + 25);
                rect.setAttribute("y", shape.y + 50);
                rect.setAttribute("width", shape.width);
                rect.setAttribute("height", shape.height);
                rect.setAttribute("fill", shape.color);
                svg.appendChild(rect);
            } else if (shape instanceof Circle) {
                const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                circle.setAttribute("cx", shape.x + 75);
                circle.setAttribute("cy", shape.y + 75);
                circle.setAttribute("r", shape.radius);
                circle.setAttribute("fill", shape.color);
                svg.appendChild(circle);
            }

            return svg;
        }

        container.querySelector('#createShape').addEventListener('click', () => {
            const type = container.querySelector('#shapeType').value;
            const color = container.querySelector('#shapeColor').value;
            const x = parseInt(container.querySelector('#xPos').value);
            const y = parseInt(container.querySelector('#yPos').value);

            currentShape = type === 'rectangle' ? new Rectangle() : new Circle();
            currentShape.color = color;
            currentShape.x = x;
            currentShape.y = y;

            shapeContainer.innerHTML = '';
            shapeContainer.appendChild(renderShape(currentShape));
            output.innerHTML = `Created: ${currentShape.getInfo()}`;
        });

        container.querySelector('#cloneShape').addEventListener('click', () => {
            if (!currentShape) {
                output.innerHTML = "Create a shape first!";
                return;
            }

            const clone = currentShape.clone();
            clone.x += 20;
            clone.y += 20;
            
            shapeContainer.appendChild(renderShape(clone));
            output.innerHTML = `Cloned: ${clone.getInfo()}`;
        });
    },

    // Object Pool Pattern
    objectPool: function(container) {
        class Particle {
            constructor() {
                this.x = 0;
                this.y = 0;
                this.speed = 0;
                this.angle = 0;
                this.active = false;
                this.element = document.createElement('div');
                this.element.className = 'particle';
            }

            init(x, y, speed, angle) {
                this.x = x;
                this.y = y;
                this.speed = speed;
                this.angle = angle;
                this.active = true;
                this.element.style.left = `${x}px`;
                this.element.style.top = `${y}px`;
            }

            update() {
                if (!this.active) return;

                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed;
                
                this.element.style.left = `${this.x}px`;
                this.element.style.top = `${this.y}px`;

                // Deactivate if out of bounds
                if (this.x < 0 || this.x > 400 || this.y < 0 || this.y > 400) {
                    this.active = false;
                }
            }
        }

        class ParticlePool {
            constructor(size) {
                this.size = size;
                this.pool = [];
                this.activeCount = 0;

                // Initialize pool with particles
                for (let i = 0; i < size; i++) {
                    this.pool.push(new Particle());
                }
            }

            acquire(x, y, speed, angle) {
                for (let particle of this.pool) {
                    if (!particle.active) {
                        particle.init(x, y, speed, angle);
                        this.activeCount++;
                        return particle;
                    }
                }
                return null; // Pool is exhausted
            }

            release(particle) {
                particle.active = false;
                this.activeCount--;
            }

            updateAll() {
                this.pool.forEach(particle => particle.update());
            }
        }

        container.innerHTML = `
            <div class="pattern-example">
                <h3>Object Pool Pattern - Particle System</h3>
                <p>Click in the particle area to create particles. The pool will reuse inactive particles:</p>
                <div class="demo-controls">
                    <button id="spawnParticles">Spawn Particles</button>
                    <span id="activeCount">Active: 0</span>
                </div>
                <div id="particleContainer" style="width: 400px; height: 400px; border: 1px solid #ccc; position: relative; overflow: hidden; margin-top: 1rem;"></div>
                <div class="output" id="poolOutput"></div>
            </div>
        `;

        // Add particle styles
        const style = document.createElement('style');
        style.textContent = `
            .particle {
                position: absolute;
                width: 5px;
                height: 5px;
                background-color: #00ff00;
                border-radius: 50%;
                pointer-events: none;
            }
        `;
        document.head.appendChild(style);

        const particleContainer = container.querySelector('#particleContainer');
        const output = container.querySelector('#poolOutput');
        const activeCountDisplay = container.querySelector('#activeCount');
        const pool = new ParticlePool(50);
        let animationId;

        function spawnParticles(x, y) {
            for (let i = 0; i < 5; i++) {
                const angle = (Math.random() * Math.PI * 2);
                const speed = 2 + Math.random() * 2;
                const particle = pool.acquire(x, y, speed, angle);
                
                if (particle) {
                    if (!particleContainer.contains(particle.element)) {
                        particleContainer.appendChild(particle.element);
                    }
                } else {
                    output.innerHTML = "Pool exhausted!";
                }
            }
        }

        function update() {
            pool.updateAll();
            activeCountDisplay.textContent = `Active: ${pool.activeCount}`;
            animationId = requestAnimationFrame(update);
        }

        particleContainer.addEventListener('click', (e) => {
            const rect = particleContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            spawnParticles(x, y);
        });

        container.querySelector('#spawnParticles').addEventListener('click', () => {
            const x = 200;
            const y = 200;
            spawnParticles(x, y);
        });

        // Start animation loop
        update();

        // Cleanup when switching patterns
        return () => {
            cancelAnimationFrame(animationId);
        };
    },

    // Composite Pattern
    composite: function(container) {
        // Component interface
        class FileSystemComponent {
            constructor(name) {
                this.name = name;
            }

            getSize() {}
            display(indent = 0) {}
            add(component) {}
            remove(component) {}
        }

        // Leaf
        class File extends FileSystemComponent {
            constructor(name, size) {
                super(name);
                this.size = size;
            }

            getSize() {
                return this.size;
            }

            display(indent = 0) {
                return `${' '.repeat(indent)}📄 ${this.name} (${this.size} KB)`;
            }

            add(component) {
                return false; // Files can't have children
            }

            remove(component) {
                return false;
            }
        }

        // Composite
        class Directory extends FileSystemComponent {
            constructor(name) {
                super(name);
                this.children = [];
            }

            add(component) {
                this.children.push(component);
                return true;
            }

            remove(component) {
                const index = this.children.indexOf(component);
                if (index > -1) {
                    this.children.splice(index, 1);
                    return true;
                }
                return false;
            }

            getSize() {
                return this.children.reduce((sum, child) => sum + child.getSize(), 0);
            }

            display(indent = 0) {
                let output = `${' '.repeat(indent)}📁 ${this.name} (${this.getSize()} KB)\n`;
                this.children.forEach(child => {
                    output += child.display(indent + 2) + '\n';
                });
                return output.trim();
            }
        }

        container.innerHTML = `
            <div class="pattern-example">
                <h3>Composite Pattern - File System</h3>
                <p>Create a file system structure with files and directories:</p>
                <div class="demo-controls">
                    <input type="text" id="componentName" placeholder="Name">
                    <input type="number" id="fileSize" placeholder="Size (KB)">
                    <select id="componentType">
                        <option value="file">File</option>
                        <option value="directory">Directory</option>
                    </select>
                    <button id="addComponent">Add Component</button>
                    <button id="removeSelected">Remove Selected</button>
                </div>
                <div style="display: flex; margin-top: 1rem;">
                    <div id="fileTree" style="flex: 1; font-family: monospace; white-space: pre;"></div>
                    <div class="output" id="compositeOutput" style="flex: 1;"></div>
                </div>
            </div>
        `;

        const output = container.querySelector('#compositeOutput');
        const fileTree = container.querySelector('#fileTree');
        
        // Create root directory
        const root = new Directory('root');
        let selectedPath = [];

        function updateDisplay() {
            fileTree.innerHTML = root.display();
            output.innerHTML = `Total size: ${root.getSize()} KB`;

            // Make the file system interactive
            const lines = fileTree.innerHTML.split('\n');
            fileTree.innerHTML = lines.map((line, index) => 
                `<div class="fs-item" data-index="${index}">${line}</div>`
            ).join('\n');

            // Add click handlers
            document.querySelectorAll('.fs-item').forEach((item, index) => {
                item.addEventListener('click', () => {
                    document.querySelectorAll('.fs-item').forEach(i => 
                        i.classList.remove('selected'));
                    item.classList.add('selected');
                    selectedPath = [];
                    
                    // Calculate path to selected item
                    let currentLine = item;
                    while (currentLine) {
                        const indent = currentLine.textContent.search(/\S/);
                        const name = currentLine.textContent.trim().split(' ')[1];
                        selectedPath.unshift({ name, indent: indent / 2 });
                        
                        let prev = currentLine.previousElementSibling;
                        while (prev) {
                            const prevIndent = prev.textContent.search(/\S/);
                            if (prevIndent < indent) {
                                currentLine = prev;
                                break;
                            }
                            prev = prev.previousElementSibling;
                        }
                        if (!prev) break;
                    }
                });
            });
        }

        // Add styles for the file system display
        const style = document.createElement('style');
        style.textContent = `
            .fs-item {
                cursor: pointer;
                padding: 2px 4px;
            }
            .fs-item:hover {
                background-color: rgba(0, 255, 0, 0.1);
            }
            .fs-item.selected {
                background-color: rgba(0, 255, 0, 0.2);
            }
        `;
        document.head.appendChild(style);

        function findComponent(path) {
            let current = root;
            for (let i = 1; i < path.length; i++) {
                const component = current.children.find(c => c.name === path[i].name);
                if (!component) return null;
                current = component;
            }
            return current;
        }

        container.querySelector('#addComponent').addEventListener('click', () => {
            const name = container.querySelector('#componentName').value.trim();
            const type = container.querySelector('#componentType').value;
            const size = parseInt(container.querySelector('#fileSize').value) || 0;

            if (!name) {
                output.innerHTML = "Please enter a name!";
                return;
            }

            const component = type === 'file' 
                ? new File(name, size)
                : new Directory(name);

            if (selectedPath.length === 0) {
                root.add(component);
            } else {
                const parent = findComponent(selectedPath);
                if (parent instanceof Directory) {
                    parent.add(component);
                } else {
                    output.innerHTML = "Cannot add to a file!";
                    return;
                }
            }

            updateDisplay();
        });

        container.querySelector('#removeSelected').addEventListener('click', () => {
            if (selectedPath.length <= 1) {
                output.innerHTML = "Cannot remove root directory!";
                return;
            }

            const parentPath = selectedPath.slice(0, -1);
            const parent = findComponent(parentPath);
            const componentToRemove = findComponent(selectedPath);

            if (parent && componentToRemove) {
                parent.remove(componentToRemove);
                updateDisplay();
            }
        });

        // Initialize display
        updateDisplay();
    },

    // Bridge Pattern
    bridge: function(container) {
        // Implementation interface
        class DrawingAPI {
            drawCircle(x, y, radius, color) {}
            drawSquare(x, y, size, color) {}
        }

        // Concrete Implementation 1
        class CanvasAPI extends DrawingAPI {
            constructor(canvas) {
                super();
                this.ctx = canvas.getContext('2d');
            }

            clear() {
                this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            }

            drawCircle(x, y, radius, color) {
                this.ctx.beginPath();
                this.ctx.arc(x, y, radius, 0, Math.PI * 2);
                this.ctx.fillStyle = color;
                this.ctx.fill();
            }

            drawSquare(x, y, size, color) {
                this.ctx.fillStyle = color;
                this.ctx.fillRect(x - size/2, y - size/2, size, size);
            }
        }

        // Concrete Implementation 2
        class SVGAPI extends DrawingAPI {
            constructor(container) {
                super();
                this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                this.svg.setAttribute("width", "300");
                this.svg.setAttribute("height", "300");
                container.appendChild(this.svg);
            }

            clear() {
                while (this.svg.firstChild) {
                    this.svg.removeChild(this.svg.firstChild);
                }
            }

            drawCircle(x, y, radius, color) {
                const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                circle.setAttribute("cx", x);
                circle.setAttribute("cy", y);
                circle.setAttribute("r", radius);
                circle.setAttribute("fill", color);
                this.svg.appendChild(circle);
            }

            drawSquare(x, y, size, color) {
                const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                rect.setAttribute("x", x - size/2);
                rect.setAttribute("y", y - size/2);
                rect.setAttribute("width", size);
                rect.setAttribute("height", size);
                rect.setAttribute("fill", color);
                this.svg.appendChild(rect);
            }
        }

        // Abstraction
        class Shape {
            constructor(api) {
                this.api = api;
            }

            draw() {}
            animate() {}
        }

        // Refined Abstractions
        class CircleShape extends Shape {
            constructor(api, x, y, radius, color) {
                super(api);
                this.x = x;
                this.y = y;
                this.radius = radius;
                this.color = color;
            }

            draw() {
                this.api.drawCircle(this.x, this.y, this.radius, this.color);
            }

            animate(time) {
                this.radius = 20 + Math.sin(time / 500) * 10;
                this.draw();
            }
        }

        class SquareShape extends Shape {
            constructor(api, x, y, size, color) {
                super(api);
                this.x = x;
                this.y = y;
                this.size = size;
                this.color = color;
            }

            draw() {
                this.api.drawSquare(this.x, this.y, this.size, this.color);
            }

            animate(time) {
                this.size = 40 + Math.sin(time / 500) * 20;
                this.draw();
            }
        }

        container.innerHTML = `
            <div class="pattern-example">
                <h3>Bridge Pattern - Drawing Shapes</h3>
                <p>Draw shapes using different rendering APIs:</p>
                <div class="demo-controls">
                    <select id="apiType">
                        <option value="canvas">Canvas API</option>
                        <option value="svg">SVG API</option>
                    </select>
                    <select id="shapeType">
                        <option value="circle">Circle</option>
                        <option value="square">Square</option>
                    </select>
                    <input type="color" id="shapeColor" value="#00ff00">
                    <button id="toggleAnimation">Toggle Animation</button>
                </div>
                <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                    <div id="canvasContainer">
                        <canvas width="300" height="300" style="border: 1px solid #ccc;"></canvas>
                    </div>
                    <div id="svgContainer" style="border: 1px solid #ccc;"></div>
                </div>
                <div class="output" id="bridgeOutput"></div>
            </div>
        `;

        const output = container.querySelector('#bridgeOutput');
        const canvas = container.querySelector('canvas');
        const svgContainer = container.querySelector('#svgContainer');

        let currentAPI;
        let currentShape;
        let animating = false;
        let animationId;

        function createAPI(type) {
            if (type === 'canvas') {
                svgContainer.style.display = 'none';
                canvas.style.display = 'block';
                return new CanvasAPI(canvas);
            } else {
                canvas.style.display = 'none';
                svgContainer.style.display = 'block';
                svgContainer.innerHTML = '';
                return new SVGAPI(svgContainer);
            }
        }

        function createShape(api, type) {
            const color = container.querySelector('#shapeColor').value;
            if (type === 'circle') {
                return new CircleShape(api, 150, 150, 30, color);
            } else {
                return new SquareShape(api, 150, 150, 60, color);
            }
        }

        function animate(timestamp) {
            if (!animating) return;
            currentAPI.clear();
            currentShape.animate(timestamp);
            animationId = requestAnimationFrame(animate);
        }

        container.querySelector('#apiType').addEventListener('change', updateShape);
        container.querySelector('#shapeType').addEventListener('change', updateShape);
        container.querySelector('#shapeColor').addEventListener('change', updateShape);

        function updateShape() {
            const apiType = container.querySelector('#apiType').value;
            const shapeType = container.querySelector('#shapeType').value;
            
            currentAPI = createAPI(apiType);
            currentShape = createShape(currentAPI, shapeType);
            currentShape.draw();

            output.innerHTML = `Using ${apiType.toUpperCase()} to render a ${shapeType}`;
        }

        container.querySelector('#toggleAnimation').addEventListener('click', () => {
            animating = !animating;
            if (animating) {
                animate();
                container.querySelector('#toggleAnimation').textContent = 'Stop Animation';
            } else {
                cancelAnimationFrame(animationId);
                container.querySelector('#toggleAnimation').textContent = 'Start Animation';
                currentShape.draw(); // Reset to static shape
            }
        });

        // Initialize with default values
        updateShape();

        // Cleanup when switching patterns
        return () => {
            animating = false;
            cancelAnimationFrame(animationId);
        };
    },

    // Flyweight Pattern
    flyweight: function(container) {
        // Flyweight class - intrinsic state
        class TextStyle {
            constructor(fontFamily, fontSize, fontWeight, color) {
                this.fontFamily = fontFamily;
                this.fontSize = fontSize;
                this.fontWeight = fontWeight;
                this.color = color;
            }

            render(text, x, y) {
                return `<div style="
                    font-family: ${this.fontFamily};
                    font-size: ${this.fontSize}px;
                    font-weight: ${this.fontWeight};
                    color: ${this.color};
                    position: absolute;
                    left: ${x}px;
                    top: ${y}px;
                ">${text}</div>`;
            }
        }

        // Flyweight Factory
        class TextStyleFactory {
            constructor() {
                this.styles = new Map();
            }

            getStyle(fontFamily, fontSize, fontWeight, color) {
                const key = `${fontFamily}-${fontSize}-${fontWeight}-${color}`;
                if (!this.styles.has(key)) {
                    this.styles.set(
                        key,
                        new TextStyle(fontFamily, fontSize, fontWeight, color)
                    );
                }
                return this.styles.get(key);
            }

            getStylesCount() {
                return this.styles.size;
            }
        }

        // Context class - extrinsic state
        class TextEditor {
            constructor(factory) {
                this.factory = factory;
                this.texts = [];
            }

            addText(text, x, y, fontFamily, fontSize, fontWeight, color) {
                const style = this.factory.getStyle(fontFamily, fontSize, fontWeight, color);
                this.texts.push({ text, x, y, style });
            }

            render() {
                return this.texts.map(({ text, x, y, style }) => 
                    style.render(text, x, y)
                ).join('');
            }
        }

        container.innerHTML = `
            <div class="pattern-example">
                <h3>Flyweight Pattern - Text Editor</h3>
                <p>Create text with shared styles to save memory:</p>
                <div class="demo-controls">
                    <input type="text" id="textInput" placeholder="Enter text">
                    <select id="fontFamily">
                        <option value="Arial">Arial</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Courier New">Courier New</option>
                    </select>
                    <select id="fontSize">
                        <option value="12">12px</option>
                        <option value="16">16px</option>
                        <option value="20">20px</option>
                        <option value="24">24px</option>
                    </select>
                    <select id="fontWeight">
                        <option value="normal">Normal</option>
                        <option value="bold">Bold</option>
                    </select>
                    <input type="color" id="textColor" value="#00ff00">
                    <button id="addText">Add Text</button>
                    <button id="randomText">Add Random Text</button>
                </div>
                <div id="editorContainer" style="position: relative; width: 600px; height: 400px; border: 1px solid #ccc; margin-top: 1rem; overflow: hidden;"></div>
                <div class="output" id="flyweightOutput"></div>
            </div>
        `;

        const factory = new TextStyleFactory();
        const editor = new TextEditor(factory);
        const editorContainer = container.querySelector('#editorContainer');
        const output = container.querySelector('#flyweightOutput');

        function getRandomText() {
            const texts = [
                "Hello, World!", "Design Patterns", "Flyweight Pattern",
                "Memory Efficient", "Text Editor", "Shared Styles"
            ];
            return texts[Math.floor(Math.random() * texts.length)];
        }

        function updateDisplay() {
            editorContainer.innerHTML = editor.render();
            output.innerHTML = `Total style objects created: ${factory.getStylesCount()}`;
        }

        container.querySelector('#addText').addEventListener('click', () => {
            const text = container.querySelector('#textInput').value || "Sample Text";
            const fontFamily = container.querySelector('#fontFamily').value;
            const fontSize = container.querySelector('#fontSize').value;
            const fontWeight = container.querySelector('#fontWeight').value;
            const color = container.querySelector('#textColor').value;

            const x = Math.random() * (editorContainer.offsetWidth - 100);
            const y = Math.random() * (editorContainer.offsetHeight - 30);

            editor.addText(text, x, y, fontFamily, fontSize, fontWeight, color);
            updateDisplay();
        });

        container.querySelector('#randomText').addEventListener('click', () => {
            const fontFamilies = ['Arial', 'Times New Roman', 'Courier New'];
            const fontSizes = ['12', '16', '20', '24'];
            const fontWeights = ['normal', 'bold'];
            const colors = ['#00ff00', '#ff0000', '#0000ff', '#ffff00', '#00ffff'];

            for (let i = 0; i < 5; i++) {
                const text = getRandomText();
                const fontFamily = fontFamilies[Math.floor(Math.random() * fontFamilies.length)];
                const fontSize = fontSizes[Math.floor(Math.random() * fontSizes.length)];
                const fontWeight = fontWeights[Math.floor(Math.random() * fontWeights.length)];
                const color = colors[Math.floor(Math.random() * colors.length)];

                const x = Math.random() * (editorContainer.offsetWidth - 100);
                const y = Math.random() * (editorContainer.offsetHeight - 30);

                editor.addText(text, x, y, fontFamily, fontSize, fontWeight, color);
            }
            updateDisplay();
        });

        // Initialize with some random text
        container.querySelector('#randomText').click();
    },

    // Proxy Pattern
    proxy: function(container) {
        // Subject Interface
        class ImageInterface {
            display() {}
            getInfo() {}
        }

        // Real Subject
        class RealImage extends ImageInterface {
            constructor(filename, width, height) {
                super();
                this.filename = filename;
                this.width = width;
                this.height = height;
                this.loaded = false;
            }

            loadImage() {
                // Simulate loading delay
                return new Promise(resolve => {
                    setTimeout(() => {
                        this.loaded = true;
                        resolve();
                    }, 1500);
                });
            }

            display() {
                if (!this.loaded) {
                    return `<div class="loading-placeholder" style="
                        width: ${this.width}px;
                        height: ${this.height}px;
                        background: linear-gradient(45deg, #1a1a1a 25%, #333 50%, #1a1a1a 75%);
                        background-size: 200% 200%;
                        animation: loading 2s ease infinite;
                    "></div>`;
                }
                return `<div class="image" style="
                    width: ${this.width}px;
                    height: ${this.height}px;
                    background-color: #00ff00;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: monospace;
                ">${this.filename}</div>`;
            }

            getInfo() {
                return `${this.filename} (${this.width}x${this.height})`;
            }
        }

        // Proxy
        class ImageProxy extends ImageInterface {
            constructor(filename, width, height) {
                super();
                this.filename = filename;
                this.width = width;
                this.height = height;
                this.realImage = null;
            }

            async loadRealImage() {
                if (!this.realImage) {
                    this.realImage = new RealImage(this.filename, this.width, this.height);
                    await this.realImage.loadImage();
                }
            }

            display() {
                if (!this.realImage) {
                    return `<div class="placeholder" style="
                        width: ${this.width}px;
                        height: ${this.height}px;
                        background-color: #333;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-family: monospace;
                    ">Click to load</div>`;
                }
                return this.realImage.display();
            }

            getInfo() {
                if (!this.realImage) {
                    return `${this.filename} (not loaded)`;
                }
                return this.realImage.getInfo();
            }
        }

        // Image Gallery using proxies
        class ImageGallery {
            constructor() {
                this.images = new Map();
            }

            addImage(id, filename, width, height) {
                this.images.set(id, new ImageProxy(filename, width, height));
            }

            async loadImage(id) {
                const image = this.images.get(id);
                if (image) {
                    await image.loadRealImage();
                }
            }

            display() {
                return Array.from(this.images.entries()).map(([id, image]) => `
                    <div class="image-container" data-id="${id}">
                        ${image.display()}
                        <div class="image-info">${image.getInfo()}</div>
                    </div>
                `).join('');
            }
        }

        container.innerHTML = `
            <div class="pattern-example">
                <h3>Proxy Pattern - Image Gallery</h3>
                <p>Click on images to load them (proxy loads images on demand):</p>
                <div class="demo-controls">
                    <input type="text" id="filename" placeholder="Image filename">
                    <button id="addImage">Add Image</button>
                </div>
                <div id="galleryContainer" style="display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 1rem;"></div>
                <div class="output" id="proxyOutput"></div>
            </div>
        `;

        // Add gallery styles
        const style = document.createElement('style');
        style.textContent = `
            .image-container {
                border: 1px solid #ccc;
                padding: 10px;
                cursor: pointer;
            }
            .image-info {
                margin-top: 5px;
                font-size: 12px;
                text-align: center;
            }
            @keyframes loading {
                0% { background-position: 200% 200%; }
                100% { background-position: -200% -200%; }
            }
        `;
        document.head.appendChild(style);

        const gallery = new ImageGallery();
        const galleryContainer = container.querySelector('#galleryContainer');
        const output = container.querySelector('#proxyOutput');
        let imageCounter = 1;

        function updateGallery() {
            galleryContainer.innerHTML = gallery.display();
            
            // Add click handlers to load images
            document.querySelectorAll('.image-container').forEach(container => {
                container.addEventListener('click', async () => {
                    const id = container.dataset.id;
                    output.innerHTML = `Loading image ${id}...`;
                    await gallery.loadImage(id);
                    updateGallery();
                    output.innerHTML = `Image ${id} loaded!`;
                });
            });
        }

        container.querySelector('#addImage').addEventListener('click', () => {
            const filename = container.querySelector('#filename').value || `image${imageCounter}.jpg`;
            const width = 150 + Math.floor(Math.random() * 50);
            const height = 150 + Math.floor(Math.random() * 50);
            
            gallery.addImage(imageCounter, filename, width, height);
            updateGallery();
            imageCounter++;
        });

        // Add some initial images
        for (let i = 0; i < 4; i++) {
            container.querySelector('#addImage').click();
        }
    },

    // State Pattern
    state: function(container) {
        // State interface
        class DocumentState {
            constructor(document) {
                this.document = document;
            }
            edit() {}
            review() {}
            approve() {}
            reject() {}
            getStatus() {}
        }

        // Concrete States
        class DraftState extends DocumentState {
            edit() {
                return "Document edited in draft state";
            }

            review() {
                this.document.setState(new ReviewState(this.document));
                return "Document submitted for review";
            }

            approve() {
                return "Cannot approve document in draft state";
            }

            reject() {
                return "Cannot reject document in draft state";
            }

            getStatus() {
                return "Draft";
            }
        }

        class ReviewState extends DocumentState {
            edit() {
                return "Cannot edit document in review state";
            }

            review() {
                return "Document is already under review";
            }

            approve() {
                this.document.setState(new ApprovedState(this.document));
                return "Document approved";
            }

            reject() {
                this.document.setState(new DraftState(this.document));
                return "Document rejected, returned to draft";
            }

            getStatus() {
                return "Under Review";
            }
        }

        class ApprovedState extends DocumentState {
            edit() {
                this.document.setState(new DraftState(this.document));
                return "Document changed to draft for editing";
            }

            review() {
                return "Cannot review an approved document";
            }

            approve() {
                return "Document is already approved";
            }

            reject() {
                this.document.setState(new DraftState(this.document));
                return "Document rejected, returned to draft";
            }

            getStatus() {
                return "Approved";
            }
        }

        // Context
        class Document {
            constructor(title) {
                this.title = title;
                this.content = "";
                this.setState(new DraftState(this));
            }

            setState(state) {
                this.state = state;
                return this.getStatus();
            }

            edit() {
                return this.state.edit();
            }

            review() {
                return this.state.review();
            }

            approve() {
                return this.state.approve();
            }

            reject() {
                return this.state.reject();
            }

            getStatus() {
                return this.state.getStatus();
            }

            updateContent(content) {
                this.content = content;
                return `Content updated: ${content}`;
            }
        }

        container.innerHTML = `
            <div class="pattern-example">
                <h3>State Pattern - Document Management System</h3>
                <p>Manage a document through different states (Draft → Review → Approved):</p>
                <div class="demo-controls">
                    <div class="document-info">
                        <input type="text" id="documentTitle" placeholder="Document title">
                        <button id="createDocument">Create Document</button>
                    </div>
                    <div class="document-actions" style="display: none;">
                        <textarea id="documentContent" placeholder="Document content"></textarea>
                        <div class="action-buttons">
                            <button id="editDocument">Edit</button>
                            <button id="reviewDocument">Submit for Review</button>
                            <button id="approveDocument">Approve</button>
                            <button id="rejectDocument">Reject</button>
                        </div>
                        <div id="documentStatus"></div>
                    </div>
                </div>
                <div class="output" id="stateOutput"></div>
            </div>
        `;

        // Add document management styles
        const style = document.createElement('style');
        style.textContent = `
            .document-info, .document-actions {
                margin-bottom: 1rem;
            }
            #documentContent {
                width: 100%;
                min-height: 100px;
                margin: 1rem 0;
                padding: 0.5rem;
                font-family: monospace;
            }
            .action-buttons {
                display: flex;
                gap: 0.5rem;
                margin-bottom: 1rem;
            }
            #documentStatus {
                padding: 0.5rem;
                background-color: rgba(0, 255, 0, 0.1);
                border-radius: 4px;
                margin-top: 1rem;
            }
        `;
        document.head.appendChild(style);

        const output = container.querySelector('#stateOutput');
        const documentActions = container.querySelector('.document-actions');
        const statusDisplay = container.querySelector('#documentStatus');
        let currentDocument = null;

        function updateStatus() {
            if (currentDocument) {
                statusDisplay.textContent = `Current State: ${currentDocument.getStatus()}`;
            }
        }

        function logAction(action) {
            output.innerHTML = action;
            updateStatus();
        }

        container.querySelector('#createDocument').addEventListener('click', () => {
            const title = container.querySelector('#documentTitle').value.trim();
            if (!title) {
                output.innerHTML = "Please enter a document title";
                return;
            }

            currentDocument = new Document(title);
            documentActions.style.display = 'block';
            logAction(`Document "${title}" created in ${currentDocument.getStatus()} state`);
        });

        container.querySelector('#documentContent').addEventListener('input', (e) => {
            if (currentDocument) {
                logAction(currentDocument.updateContent(e.target.value));
            }
        });

        container.querySelector('#editDocument').addEventListener('click', () => {
            if (currentDocument) {
                logAction(currentDocument.edit());
            }
        });

        container.querySelector('#reviewDocument').addEventListener('click', () => {
            if (currentDocument) {
                logAction(currentDocument.review());
            }
        });

        container.querySelector('#approveDocument').addEventListener('click', () => {
            if (currentDocument) {
                logAction(currentDocument.approve());
            }
        });

        container.querySelector('#rejectDocument').addEventListener('click', () => {
            if (currentDocument) {
                logAction(currentDocument.reject());
            }
        });
    },

    // Template Method Pattern
    template: function(container) {
        // Abstract class with template method
        class DataMiner {
            mine(path) {
                const data = this.extractData(path);
                const cleanedData = this.cleanData(data);
                const analysis = this.analyzeData(cleanedData);
                return this.formatOutput(analysis);
            }

            extractData(path) { throw new Error("extractData must be implemented"); }
            cleanData(data) { throw new Error("cleanData must be implemented"); }
            analyzeData(data) { throw new Error("analyzeData must be implemented"); }
            formatOutput(analysis) { throw new Error("formatOutput must be implemented"); }
        }

        // Concrete implementations
        class PDFMiner extends DataMiner {
            extractData(path) {
                // Simulate PDF extraction
                return `Raw PDF data from ${path}: Lorem ipsum dolor sit amet...`;
            }

            cleanData(data) {
                // Remove PDF-specific artifacts
                return data.replace("Raw PDF data from ", "Cleaned: ");
            }

            analyzeData(data) {
                // Simple word count analysis
                const words = data.split(" ").length;
                return {
                    wordCount: words,
                    type: "PDF Document",
                    summary: data.substring(0, 50) + "..."
                };
            }

            formatOutput(analysis) {
                return `
                    <div class="analysis-result pdf">
                        <h4>PDF Analysis</h4>
                        <p>Word Count: ${analysis.wordCount}</p>
                        <p>Type: ${analysis.type}</p>
                        <p>Summary: ${analysis.summary}</p>
                    </div>
                `;
            }
        }

        class CSVMiner extends DataMiner {
            extractData(path) {
                // Simulate CSV extraction
                return `id,name,value\n1,item1,100\n2,item2,200\n3,item3,300`;
            }

            cleanData(data) {
                // Convert CSV to array of objects
                const [headers, ...rows] = data.split("\n");
                const headerArray = headers.split(",");
                return rows.map(row => {
                    const values = row.split(",");
                    return headerArray.reduce((obj, header, index) => {
                        obj[header] = values[index];
                        return obj;
                    }, {});
                });
            }

            analyzeData(data) {
                // Calculate basic statistics
                const total = data.reduce((sum, row) => sum + parseInt(row.value), 0);
                return {
                    rowCount: data.length,
                    total: total,
                    average: total / data.length,
                    type: "CSV Document"
                };
            }

            formatOutput(analysis) {
                return `
                    <div class="analysis-result csv">
                        <h4>CSV Analysis</h4>
                        <p>Row Count: ${analysis.rowCount}</p>
                        <p>Total Value: ${analysis.total}</p>
                        <p>Average: ${analysis.average.toFixed(2)}</p>
                        <p>Type: ${analysis.type}</p>
                    </div>
                `;
            }
        }

        class LogMiner extends DataMiner {
            extractData(path) {
                // Simulate log file extraction
                return `
                    [2024-01-01 10:00:00] INFO: System started
                    [2024-01-01 10:01:00] ERROR: Connection failed
                    [2024-01-01 10:02:00] INFO: Retry connection
                    [2024-01-01 10:02:30] INFO: Connection established
                `;
            }

            cleanData(data) {
                // Parse log entries
                return data.trim().split("\n").map(line => {
                    const match = line.match(/\[(.*?)\] (\w+): (.*)/);
                    if (match) {
                        return {
                            timestamp: match[1],
                            level: match[2],
                            message: match[3]
                        };
                    }
                    return null;
                }).filter(entry => entry !== null);
            }

            analyzeData(data) {
                // Analyze log patterns
                const levels = data.reduce((counts, entry) => {
                    counts[entry.level] = (counts[entry.level] || 0) + 1;
                    return counts;
                }, {});

                return {
                    entryCount: data.length,
                    levels: levels,
                    type: "Log File"
                };
            }

            formatOutput(analysis) {
                const levelsList = Object.entries(analysis.levels)
                    .map(([level, count]) => `<li>${level}: ${count}</li>`)
                    .join("");

                return `
                    <div class="analysis-result log">
                        <h4>Log Analysis</h4>
                        <p>Total Entries: ${analysis.entryCount}</p>
                        <p>Type: ${analysis.type}</p>
                        <p>Level Distribution:</p>
                        <ul>${levelsList}</ul>
                    </div>
                `;
            }
        }

        container.innerHTML = `
            <div class="pattern-example">
                <h3>Template Method Pattern - Data Mining System</h3>
                <p>Analyze different types of data using the same template process:</p>
                <div class="demo-controls">
                    <select id="dataType">
                        <option value="pdf">PDF Document</option>
                        <option value="csv">CSV File</option>
                        <option value="log">Log File</option>
                    </select>
                    <input type="text" id="filePath" placeholder="File path" value="example.pdf">
                    <button id="analyze">Analyze Data</button>
                </div>
                <div id="resultsContainer" style="margin-top: 1rem;"></div>
                <div class="output" id="templateOutput"></div>
            </div>
        `;

        // Add analysis result styles
        const style = document.createElement('style');
        style.textContent = `
            .analysis-result {
                padding: 1rem;
                margin: 1rem 0;
                border-radius: 4px;
            }
            .analysis-result.pdf {
                background-color: rgba(255, 0, 0, 0.1);
            }
            .analysis-result.csv {
                background-color: rgba(0, 255, 0, 0.1);
            }
            .analysis-result.log {
                background-color: rgba(0, 0, 255, 0.1);
            }
            .analysis-result h4 {
                margin-top: 0;
            }
            .analysis-result ul {
                margin: 0;
                padding-left: 1.5rem;
            }
        `;
        document.head.appendChild(style);

        const output = container.querySelector('#templateOutput');
        const resultsContainer = container.querySelector('#resultsContainer');
        const miners = {
            pdf: new PDFMiner(),
            csv: new CSVMiner(),
            log: new LogMiner()
        };

        container.querySelector('#analyze').addEventListener('click', () => {
            const type = container.querySelector('#dataType').value;
            const path = container.querySelector('#filePath').value;
            
            try {
                const miner = miners[type];
                const result = miner.mine(path);
                resultsContainer.innerHTML = result;
                output.innerHTML = `Analysis completed for ${path}`;
            } catch (error) {
                output.innerHTML = `Error: ${error.message}`;
            }
        });
    },

    // Chain of Responsibility Pattern
    chain: function(container) {
        // Handler interface
        class SupportHandler {
            constructor() {
                this.nextHandler = null;
            }

            setNext(handler) {
                this.nextHandler = handler;
                return handler;
            }

            handle(request) {
                if (this.nextHandler) {
                    return this.nextHandler.handle(request);
                }
                return `End of chain. Request unhandled: ${request.type}`;
            }
        }

        // Concrete handlers
        class TechnicalSupportHandler extends SupportHandler {
            handle(request) {
                if (request.type === 'technical') {
                    return `Technical Support: Resolved ${request.issue} (Priority: ${request.priority})`;
                }
                return super.handle(request);
            }
        }

        class BillingSupportHandler extends SupportHandler {
            handle(request) {
                if (request.type === 'billing') {
                    return `Billing Support: Processed ${request.issue} (Amount: $${request.amount})`;
                }
                return super.handle(request);
            }
        }

        class GeneralSupportHandler extends SupportHandler {
            handle(request) {
                if (request.type === 'general') {
                    return `General Support: Answered ${request.issue}`;
                }
                return super.handle(request);
            }
        }

        class SecuritySupportHandler extends SupportHandler {
            handle(request) {
                if (request.type === 'security') {
                    return `Security Team: Investigated ${request.issue} (Severity: ${request.severity})`;
                }
                return super.handle(request);
            }
        }

        container.innerHTML = `
            <div class="pattern-example">
                <h3>Chain of Responsibility Pattern - Support Ticket System</h3>
                <p>Submit support tickets that will be handled by the appropriate department:</p>
                <div class="demo-controls">
                    <select id="requestType">
                        <option value="technical">Technical Issue</option>
                        <option value="billing">Billing Issue</option>
                        <option value="general">General Inquiry</option>
                        <option value="security">Security Issue</option>
                    </select>
                    <input type="text" id="issueDescription" placeholder="Describe the issue">
                    <div id="additionalFields"></div>
                    <button id="submitRequest">Submit Request</button>
                </div>
                <div id="requestHistory" style="margin-top: 1rem;"></div>
                <div class="output" id="chainOutput"></div>
            </div>
        `;

        // Add support ticket styles
        const style = document.createElement('style');
        style.textContent = `
            #requestHistory {
                max-height: 200px;
                overflow-y: auto;
                padding: 1rem;
                background-color: rgba(0, 255, 0, 0.05);
                border-radius: 4px;
            }
            .ticket {
                padding: 0.5rem;
                margin-bottom: 0.5rem;
                border-left: 3px solid var(--accent-color);
                background-color: rgba(0, 255, 0, 0.1);
            }
            #additionalFields {
                margin: 0.5rem 0;
            }
        `;
        document.head.appendChild(style);

        const output = container.querySelector('#chainOutput');
        const requestHistory = container.querySelector('#requestHistory');
        const additionalFields = container.querySelector('#additionalFields');

        // Create support chain
        const technicalSupport = new TechnicalSupportHandler();
        const billingSupport = new BillingSupportHandler();
        const generalSupport = new GeneralSupportHandler();
        const securitySupport = new SecuritySupportHandler();

        // Set up the chain
        technicalSupport
            .setNext(billingSupport)
            .setNext(generalSupport)
            .setNext(securitySupport);

        // Update additional fields based on request type
        container.querySelector('#requestType').addEventListener('change', (e) => {
            const type = e.target.value;
            let fields = '';
            
            switch(type) {
                case 'technical':
                    fields = `
                        <select id="priority">
                            <option value="Low">Low Priority</option>
                            <option value="Medium">Medium Priority</option>
                            <option value="High">High Priority</option>
                        </select>
                    `;
                    break;
                case 'billing':
                    fields = `
                        <input type="number" id="amount" placeholder="Amount in dispute">
                    `;
                    break;
                case 'security':
                    fields = `
                        <select id="severity">
                            <option value="Low">Low Severity</option>
                            <option value="Medium">Medium Severity</option>
                            <option value="High">High Severity</option>
                            <option value="Critical">Critical Severity</option>
                        </select>
                    `;
                    break;
            }
            additionalFields.innerHTML = fields;
        });

        // Trigger initial fields update
        container.querySelector('#requestType').dispatchEvent(new Event('change'));

        container.querySelector('#submitRequest').addEventListener('click', () => {
            const type = container.querySelector('#requestType').value;
            const issue = container.querySelector('#issueDescription').value;

            if (!issue) {
                output.innerHTML = "Please describe the issue";
                return;
            }

            const request = { type, issue };

            // Add type-specific properties
            switch(type) {
                case 'technical':
                    request.priority = container.querySelector('#priority').value;
                    break;
                case 'billing':
                    request.amount = container.querySelector('#amount').value || 0;
                    break;
                case 'security':
                    request.severity = container.querySelector('#severity').value;
                    break;
            }

            const result = technicalSupport.handle(request);
            
            // Add to history
            const ticketElement = document.createElement('div');
            ticketElement.className = 'ticket';
            ticketElement.textContent = result;
            requestHistory.insertBefore(ticketElement, requestHistory.firstChild);

            output.innerHTML = `Request submitted: ${result}`;
        });
    },

    // Mediator Pattern
    mediator: function(container) {
        // Mediator interface
        class ChatMediator {
            sendMessage(message, sender) {}
            addUser(user) {}
        }

        // Concrete Mediator
        class ChatRoom extends ChatMediator {
            constructor() {
                super();
                this.users = new Map();
            }

            addUser(user) {
                this.users.set(user.name, user);
            }

            sendMessage(message, sender) {
                for (let [name, user] of this.users) {
                    // Don't send message back to sender
                    if (name !== sender.name) {
                        user.receiveMessage(message, sender.name);
                    }
                }
            }

            sendPrivateMessage(message, sender, recipient) {
                const user = this.users.get(recipient);
                if (user) {
                    user.receivePrivateMessage(message, sender.name);
                }
            }

            getUserList() {
                return Array.from(this.users.keys());
            }
        }

        // User class (Colleague)
        class User {
            constructor(name, mediator) {
                this.name = name;
                this.mediator = mediator;
                this.chatLog = [];
            }

            send(message) {
                this.mediator.sendMessage(message, this);
                this.logMessage("You", message, false);
            }

            sendPrivate(message, recipient) {
                this.mediator.sendPrivateMessage(message, this, recipient);
                this.logMessage("You", message, true, recipient);
            }

            receiveMessage(message, sender) {
                this.logMessage(sender, message, false);
            }

            receivePrivateMessage(message, sender) {
                this.logMessage(sender, message, true);
            }

            logMessage(sender, message, isPrivate, recipient = null) {
                const timestamp = new Date().toLocaleTimeString();
                const prefix = isPrivate ? "Private" : "Public";
                const recipientText = recipient ? ` to ${recipient}` : "";
                this.chatLog.push(`[${timestamp}] ${prefix} - ${sender}${recipientText}: ${message}`);
            }

            getChatLog() {
                return this.chatLog;
            }
        }

        container.innerHTML = `
            <div class="pattern-example">
                <h3>Mediator Pattern - Chat Room</h3>
                <p>Simulate a chat room where users communicate through a mediator:</p>
                <div class="demo-controls">
                    <div class="user-controls">
                        <input type="text" id="userName" placeholder="Enter user name">
                        <button id="addUser">Join Chat</button>
                    </div>
                    <div class="chat-controls" style="display: none;">
                        <div class="message-input">
                            <input type="text" id="messageInput" placeholder="Type your message">
                            <select id="messageType">
                                <option value="public">Public Message</option>
                                <option value="private">Private Message</option>
                            </select>
                            <select id="recipient" style="display: none;"></select>
                            <button id="sendMessage">Send</button>
                        </div>
                        <div class="chat-window">
                            <div id="chatLog"></div>
                        </div>
                    </div>
                </div>
                <div class="output" id="mediatorOutput"></div>
            </div>
        `;

        // Add chat room styles
        const style = document.createElement('style');
        style.textContent = `
            .chat-window {
                margin-top: 1rem;
                border: 1px solid var(--accent-color);
                border-radius: 4px;
                height: 300px;
                overflow-y: auto;
                padding: 1rem;
                background-color: rgba(0, 255, 0, 0.05);
            }
            .message-input {
                display: flex;
                gap: 0.5rem;
                margin-top: 1rem;
            }
            .chat-message {
                padding: 0.5rem;
                margin-bottom: 0.5rem;
                border-radius: 4px;
                background-color: rgba(0, 255, 0, 0.1);
            }
            .private-message {
                background-color: rgba(255, 255, 0, 0.1);
            }
            #chatLog {
                font-family: monospace;
            }
        `;
        document.head.appendChild(style);

        const output = container.querySelector('#mediatorOutput');
        const chatRoom = new ChatRoom();
        let currentUser = null;

        function updateChatLog() {
            if (currentUser) {
                const chatLog = document.querySelector('#chatLog');
                chatLog.innerHTML = currentUser.getChatLog()
                    .map(msg => `<div class="chat-message${msg.includes('Private') ? ' private-message' : ''}">${msg}</div>`)
                    .join('');
                chatLog.scrollTop = chatLog.scrollHeight;
            }
        }

        function updateRecipientList() {
            const recipientSelect = container.querySelector('#recipient');
            const users = chatRoom.getUserList().filter(name => name !== currentUser.name);
            recipientSelect.innerHTML = users.map(name => 
                `<option value="${name}">${name}</option>`
            ).join('');
        }

        container.querySelector('#messageType').addEventListener('change', (e) => {
            const recipientSelect = container.querySelector('#recipient');
            recipientSelect.style.display = e.target.value === 'private' ? 'block' : 'none';
        });

        container.querySelector('#addUser').addEventListener('click', () => {
            const userName = container.querySelector('#userName').value.trim();
            if (!userName) {
                output.innerHTML = "Please enter a user name";
                return;
            }

            if (chatRoom.users.has(userName)) {
                output.innerHTML = "User name already taken";
                return;
            }

            currentUser = new User(userName, chatRoom);
            chatRoom.addUser(currentUser);

            container.querySelector('.user-controls').style.display = 'none';
            container.querySelector('.chat-controls').style.display = 'block';
            updateRecipientList();
            output.innerHTML = `${userName} joined the chat`;
        });

        container.querySelector('#sendMessage').addEventListener('click', () => {
            const messageInput = container.querySelector('#messageInput');
            const message = messageInput.value.trim();
            const messageType = container.querySelector('#messageType').value;

            if (!message) {
                output.innerHTML = "Please enter a message";
                return;
            }

            if (messageType === 'private') {
                const recipient = container.querySelector('#recipient').value;
                currentUser.sendPrivate(message, recipient);
            } else {
                currentUser.send(message);
            }

            messageInput.value = '';
            updateChatLog();
        });

        // Handle Enter key in message input
        container.querySelector('#messageInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                container.querySelector('#sendMessage').click();
            }
        });
    },

    // Memento Pattern
    memento: function(container) {
        // Originator
        class TextEditor {
            constructor() {
                this.content = '';
                this.cursorPosition = 0;
                this.selectedText = '';
                this.fontSize = 16;
                this.fontFamily = 'Arial';
                this.isBold = false;
            }

            createMemento() {
                return new TextEditorMemento(
                    this.content,
                    this.cursorPosition,
                    this.selectedText,
                    this.fontSize,
                    this.fontFamily,
                    this.isBold
                );
            }

            restore(memento) {
                this.content = memento.getState().content;
                this.cursorPosition = memento.getState().cursorPosition;
                this.selectedText = memento.getState().selectedText;
                this.fontSize = memento.getState().fontSize;
                this.fontFamily = memento.getState().fontFamily;
                this.isBold = memento.getState().isBold;
            }

            getFormattedContent() {
                return `<div style="
                    font-family: ${this.fontFamily};
                    font-size: ${this.fontSize}px;
                    font-weight: ${this.isBold ? 'bold' : 'normal'};
                ">${this.content}</div>`;
            }

            updateContent(content) {
                this.content = content;
            }

            updateFont(fontSize, fontFamily) {
                this.fontSize = fontSize;
                this.fontFamily = fontFamily;
            }

            toggleBold() {
                this.isBold = !this.isBold;
            }
        }

        // Memento
        class TextEditorMemento {
            constructor(content, cursorPosition, selectedText, fontSize, fontFamily, isBold) {
                this.state = {
                    content,
                    cursorPosition,
                    selectedText,
                    fontSize,
                    fontFamily,
                    isBold,
                    timestamp: new Date().toLocaleString()
                };
            }

            getState() {
                return this.state;
            }

            getInfo() {
                return `${this.state.timestamp} - Length: ${this.state.content.length} chars`;
            }
        }

        // Caretaker
        class History {
            constructor() {
                this.mementos = [];
                this.currentIndex = -1;
            }

            push(memento) {
                // Remove any future states if we're not at the end
                if (this.currentIndex < this.mementos.length - 1) {
                    this.mementos = this.mementos.slice(0, this.currentIndex + 1);
                }
                this.mementos.push(memento);
                this.currentIndex++;
            }

            undo() {
                if (this.currentIndex > 0) {
                    this.currentIndex--;
                    return this.mementos[this.currentIndex];
                }
                return null;
            }

            redo() {
                if (this.currentIndex < this.mementos.length - 1) {
                    this.currentIndex++;
                    return this.mementos[this.currentIndex];
                }
                return null;
            }

            getHistory() {
                return this.mementos.map((memento, index) => ({
                    info: memento.getInfo(),
                    isCurrent: index === this.currentIndex
                }));
            }
        }

        container.innerHTML = `
            <div class="pattern-example">
                <h3>Memento Pattern - Rich Text Editor</h3>
                <p>Edit text with formatting and undo/redo capabilities:</p>
                <div class="demo-controls">
                    <div class="formatting-controls">
                        <select id="fontFamily">
                            <option value="Arial">Arial</option>
                            <option value="Times New Roman">Times New Roman</option>
                            <option value="Courier New">Courier New</option>
                            <option value="Georgia">Georgia</option>
                        </select>
                        <select id="fontSize">
                            <option value="12">12px</option>
                            <option value="14">14px</option>
                            <option value="16">16px</option>
                            <option value="18">18px</option>
                            <option value="20">20px</option>
                        </select>
                        <button id="toggleBold">Toggle Bold</button>
                        <button id="undo">Undo</button>
                        <button id="redo">Redo</button>
                    </div>
                    <div class="editor-container">
                        <textarea id="editor" rows="5" placeholder="Start typing..."></textarea>
                    </div>
                    <div class="preview-container">
                        <h4>Preview:</h4>
                        <div id="preview"></div>
                    </div>
                    <div class="history-container">
                        <h4>History:</h4>
                        <div id="history"></div>
                    </div>
                </div>
                <div class="output" id="mementoOutput"></div>
            </div>
        `;

        // Add editor styles
        const style = document.createElement('style');
        style.textContent = `
            .formatting-controls {
                display: flex;
                gap: 0.5rem;
                margin-bottom: 1rem;
            }
            .editor-container {
                margin-bottom: 1rem;
            }
            #editor {
                width: 100%;
                padding: 0.5rem;
                font-family: monospace;
            }
            .preview-container {
                margin-bottom: 1rem;
                padding: 1rem;
                border: 1px solid var(--accent-color);
                border-radius: 4px;
                background-color: rgba(0, 255, 0, 0.05);
            }
            .history-container {
                max-height: 200px;
                overflow-y: auto;
                padding: 1rem;
                background-color: rgba(0, 255, 0, 0.05);
                border-radius: 4px;
            }
            .history-item {
                padding: 0.5rem;
                margin-bottom: 0.5rem;
                border-radius: 4px;
                background-color: rgba(0, 255, 0, 0.1);
                cursor: pointer;
            }
            .history-item.current {
                border: 1px solid var(--accent-color);
                background-color: rgba(0, 255, 0, 0.2);
            }
        `;
        document.head.appendChild(style);

        const editor = new TextEditor();
        const history = new History();
        const output = container.querySelector('#mementoOutput');

        // Save initial state
        history.push(editor.createMemento());

        function updateUI() {
            // Update preview
            const preview = container.querySelector('#preview');
            preview.innerHTML = editor.getFormattedContent();

            // Update history
            const historyContainer = container.querySelector('#history');
            historyContainer.innerHTML = history.getHistory()
                .map((item, index) => `
                    <div class="history-item${item.isCurrent ? ' current' : ''}" data-index="${index}">
                        ${item.info}
                    </div>
                `)
                .join('');

            // Update editor font
            const textArea = container.querySelector('#editor');
            textArea.style.fontFamily = editor.fontFamily;
            textArea.style.fontSize = editor.fontSize + 'px';
            textArea.style.fontWeight = editor.isBold ? 'bold' : 'normal';
        }

        // Event Listeners
        container.querySelector('#editor').addEventListener('input', (e) => {
            editor.updateContent(e.target.value);
            history.push(editor.createMemento());
            updateUI();
        });

        container.querySelector('#fontFamily').addEventListener('change', (e) => {
            editor.updateFont(editor.fontSize, e.target.value);
            history.push(editor.createMemento());
            updateUI();
        });

        container.querySelector('#fontSize').addEventListener('change', (e) => {
            editor.updateFont(parseInt(e.target.value), editor.fontFamily);
            history.push(editor.createMemento());
            updateUI();
        });

        container.querySelector('#toggleBold').addEventListener('click', () => {
            editor.toggleBold();
            history.push(editor.createMemento());
            updateUI();
        });

        container.querySelector('#undo').addEventListener('click', () => {
            const memento = history.undo();
            if (memento) {
                editor.restore(memento);
                container.querySelector('#editor').value = editor.content;
                updateUI();
                output.innerHTML = "Undo successful";
            } else {
                output.innerHTML = "Nothing to undo";
            }
        });

        container.querySelector('#redo').addEventListener('click', () => {
            const memento = history.redo();
            if (memento) {
                editor.restore(memento);
                container.querySelector('#editor').value = editor.content;
                updateUI();
                output.innerHTML = "Redo successful";
            } else {
                output.innerHTML = "Nothing to redo";
            }
        });

        // Allow clicking on history items to restore that state
        container.querySelector('#history').addEventListener('click', (e) => {
            const historyItem = e.target.closest('.history-item');
            if (historyItem) {
                const index = parseInt(historyItem.dataset.index);
                const memento = history.mementos[index];
                editor.restore(memento);
                history.currentIndex = index;
                container.querySelector('#editor').value = editor.content;
                updateUI();
                output.innerHTML = "Restored state from history";
            }
        });

        // Initialize UI
        updateUI();
    }
};

// Update styles for pattern demonstrations
const style = document.createElement('style');
style.textContent = `
    .pattern-example {
        padding: 1rem;
        background-color: var(--surface-color);
        border-radius: var(--border-radius);
        border: 1px solid rgba(255, 255, 255, 0.05);
    }

    .demo-controls {
        margin: 1rem 0;
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .output {
        margin-top: 1rem;
        padding: 1.5rem;
        background-color: var(--box-color);
        border-radius: var(--border-radius);
        min-height: 100px;
        border: 1px solid rgba(255, 255, 255, 0.05);
        color: var(--text-color);
        font-family: 'Roboto Mono', monospace;
        line-height: 1.6;
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
        position: relative;
        overflow: hidden;
    }

    .output::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(0, 255, 0, 0.1) 50%, 
            transparent 100%);
    }

    .pattern-item {
        padding: 0.75rem 1rem;
        cursor: pointer;
        border-radius: var(--border-radius);
        margin-bottom: 0.5rem;
        background-color: var(--surface-color);
        border: 1px solid rgba(255, 255, 255, 0.05);
        color: var(--text-color);
        transition: var(--transition);
    }

    .pattern-item:hover {
        background-color: var(--surface-color-hover);
        transform: translateX(5px);
        border-color: rgba(0, 255, 0, 0.2);
    }

    .pattern-item.selected {
        background-color: rgba(0, 255, 0, 0.1);
        color: var(--accent-color);
        border-color: var(--accent-color);
    }

    button {
        padding: 0.75rem 1.5rem;
        background-color: var(--surface-color);
        color: var(--text-color);
        border: 1px solid var(--accent-color);
        border-radius: var(--border-radius);
        cursor: pointer;
        transition: var(--transition);
        text-transform: uppercase;
        letter-spacing: 1px;
        font-size: 0.9rem;
        position: relative;
        overflow: hidden;
    }

    button:hover {
        background-color: var(--surface-color-hover);
        color: var(--accent-color);
        box-shadow: 0 0 15px rgba(0, 255, 0, 0.2);
    }

    button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        border-color: rgba(255, 255, 255, 0.1);
    }

    select, input {
        padding: 0.75rem;
        background-color: var(--surface-color);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: var(--border-radius);
        color: var(--text-color);
        transition: var(--transition);
    }

    select:focus, input:focus {
        border-color: var(--accent-color);
        outline: none;
        box-shadow: 0 0 10px rgba(0, 255, 0, 0.1);
    }

    .text-editor {
        background-color: var(--box-color);
        padding: 1.5rem;
        margin: 1rem 0;
        border: 1px solid rgba(0, 255, 0, 0.2);
        border-radius: var(--border-radius);
        min-height: 100px;
        color: var(--text-color);
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
    }

    .editor-controls {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
    }

    /* Style for checkboxes in decorator pattern */
    input[type="checkbox"] {
        accent-color: var(--accent-color);
        margin-right: 0.5rem;
    }

    /* Style for labels */
    label {
        color: var(--text-color);
        margin-right: 1rem;
    }

    /* Style for code and pre elements in output */
    .output code, .output pre {
        font-family: 'Roboto Mono', monospace;
        color: var(--accent-color);
        background-color: rgba(0, 255, 0, 0.05);
        padding: 0.2em 0.4em;
        border-radius: 3px;
    }

    /* Add subtle animation for output updates */
    .output.updating {
        animation: outputUpdate 0.3s ease-out;
    }

    @keyframes outputUpdate {
        0% { opacity: 0.5; }
        100% { opacity: 1; }
    }
`;
document.head.appendChild(style); 