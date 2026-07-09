import { faker } from '@faker-js/faker';


export class FakerData {

    static getFirstName(): string {
        return faker.person.firstName();
    }
    static getLastName(): string {
        return faker.person.lastName();
    }
    static getGender(): string {
        return faker.person.gender();
    }
    static getPhoneNumber(): string {
        return faker.phone.number();
    }
    static getCompany(): string {
        return faker.company.name();
    }
    static getEmail(): string {
        return faker.internet.email();
    }
    static getRandomDate(): Date {
        return faker.date.past();
    }
}