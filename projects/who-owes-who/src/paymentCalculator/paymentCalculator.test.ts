import { generateNewId } from "@henrypenton/uuid";
import { SuggestedPayment } from "../interfaces/payment";
import { PersonMap } from "../interfaces/person";
import { Person } from "../person/Person";
import { PaymentCalculator } from "./paymentCalculator";
describe("controller", () => {
  describe("suggested payments", () => {
    test("no payments if no debt", () => {
      const paymentCalculator = new PaymentCalculator();

      const personA = new Person();
      const personB = new Person();

      const personMap: PersonMap = new Map()
        .set(personA.id, personA)
        .set(personB.id, personB);

      const expectedSuggestedPayments: SuggestedPayment[] = [];
      const suggestedPayments = paymentCalculator.buildPayments(personMap);
      expect(expectedSuggestedPayments).toEqual(suggestedPayments);
    });

    test("person b owes person a 5.84", () => {
      const paymentCalculator = new PaymentCalculator();

      const personA = new Person();
      const personB = new Person();

      const people: PersonMap = new Map()
        .set(personA.id, personA)
        .set(personB.id, personB);

      personB.addDebt(584, generateNewId());
      personA.addDebt(-584, generateNewId());

      const expectedSuggestedPayments: SuggestedPayment[] = [
        { to: personA.id, amount: 584, from: personB.id }
      ];
      const suggestedPayments = paymentCalculator.buildPayments(people);
      expect(suggestedPayments).toEqual(expectedSuggestedPayments);
    });

    test("person b owes person a 5.84 and person c owes person a 2.61", () => {
      const paymentCalculator = new PaymentCalculator();

      const personA = new Person();
      const personB = new Person();
      const personC = new Person();

      const people: PersonMap = new Map()
        .set(personA.id, personA)
        .set(personB.id, personB)
        .set(personC.id, personC);

      personA.addDebt(-584, generateNewId());
      personB.addDebt(584, generateNewId());

      personA.addDebt(-261, generateNewId());
      personC.addDebt(261, generateNewId());

      const expectedSuggestedPayments: SuggestedPayment[] = [
        { to: personA.id, amount: 584, from: personB.id },
        { to: personA.id, amount: 261, from: personC.id }
      ];
      const suggestedPayments = paymentCalculator.buildPayments(people);
      expect(suggestedPayments).toEqual(expectedSuggestedPayments);
    });

    test("person c owes person a 5.84 and person c owes person b 2.61", () => {
      const paymentCalculator = new PaymentCalculator();

      const personA = new Person();
      const personB = new Person();
      const personC = new Person();

      const people: PersonMap = new Map()
        .set(personA.id, personA)
        .set(personB.id, personB)
        .set(personC.id, personC);

      personA.addDebt(-584, generateNewId());
      personC.addDebt(584, generateNewId());

      personB.addDebt(-261, generateNewId());
      personC.addDebt(261, generateNewId());

      const expectedSuggestedPayments: SuggestedPayment[] = [
        { to: personA.id, amount: 584, from: personC.id },
        { to: personB.id, amount: 261, from: personC.id }
      ];
      const suggestedPayments = paymentCalculator.buildPayments(people);

      expect(expectedSuggestedPayments).toEqual(suggestedPayments);
    });

    test("person c owes person a 5.84 and person c owes person b 2.61 and person d owes person b 1.00", () => {
      const paymentCalculator = new PaymentCalculator();
      const personA = new Person();
      const personB = new Person();
      const personC = new Person();
      const personD = new Person();

      const people: PersonMap = new Map()
        .set(personA.id, personA)
        .set(personB.id, personB)
        .set(personC.id, personC)
        .set(personD.id, personD);

      personA.addDebt(-584, generateNewId());
      personC.addDebt(584, generateNewId());

      personB.addDebt(-261, generateNewId());
      personB.addDebt(-100, generateNewId());
      personC.addDebt(261, generateNewId());
      personD.addDebt(100, generateNewId());

      const expectedSuggestedPayments: SuggestedPayment[] = [
        { to: personA.id, amount: 584, from: personC.id },
        { to: personB.id, amount: 261, from: personC.id },
        { to: personB.id, amount: 100, from: personD.id }
      ];
      const suggestedPayments = paymentCalculator.buildPayments(people);

      expect(suggestedPayments).toEqual(expectedSuggestedPayments);
    });

    test("person c owes person a 5.84 and person c owes person b 2.61 and person d owes person b 1.00", () => {
      const paymentCalculator = new PaymentCalculator();
      const personA = new Person();
      const personB = new Person();
      const personC = new Person();
      const personD = new Person();
      const personE = new Person();

      const people: PersonMap = new Map()
        .set(personA.id, personA)
        .set(personB.id, personB)
        .set(personC.id, personC)
        .set(personD.id, personD)
        .set(personE.id, personE);

      personA.addDebt(-584, generateNewId());
      personC.addDebt(584, generateNewId());

      personA.addDebt(-211, generateNewId());
      personE.addDebt(211, generateNewId());

      personB.addDebt(-261, generateNewId());
      personC.addDebt(261, generateNewId());

      personB.addDebt(-100, generateNewId());
      personD.addDebt(100, generateNewId());

      const expectedSuggestedPayments: SuggestedPayment[] = [
        { to: personA.id, amount: 795, from: personC.id },
        { to: personB.id, amount: 50, from: personC.id },
        { to: personB.id, amount: 211, from: personE.id },
        { to: personB.id, amount: 100, from: personD.id }
      ];
      const suggestedPayments = paymentCalculator.buildPayments(people);

      expect(suggestedPayments).toEqual(expectedSuggestedPayments);
    });

    test("B owes A, C owes B, D owes C, A owes D", () => {
      const paymentCalculator = new PaymentCalculator();
      const personA = new Person();
      const personB = new Person();
      const personC = new Person();
      const personD = new Person();

      const people: PersonMap = new Map()
        .set(personA.id, personA)
        .set(personB.id, personB)
        .set(personC.id, personC)
        .set(personD.id, personD);

      personA.addDebt(-500, generateNewId());
      personB.addDebt(500, generateNewId());

      personB.addDebt(-1000, generateNewId());
      personC.addDebt(1000, generateNewId());

      personC.addDebt(-1500, generateNewId());
      personD.addDebt(1500, generateNewId());

      personD.addDebt(-2000, generateNewId());
      personA.addDebt(2000, generateNewId());

      const expectedSuggestedPayments: SuggestedPayment[] = [
        { to: personB.id, amount: 500, from: personA.id },
        { to: personC.id, amount: 500, from: personA.id },
        { to: personD.id, amount: 500, from: personA.id }
      ];
      const suggestedPayments = paymentCalculator.buildPayments(people);

      expect(suggestedPayments).toEqual(expectedSuggestedPayments);
    });

    test("large number of payments", () => {
      const paymentCalculator = new PaymentCalculator();

      //group 1
      const person1 = new Person();
      const person2 = new Person();
      const person3 = new Person();
      const person4 = new Person();
      const person5 = new Person();

      //group 2
      const person6 = new Person();
      const person7 = new Person();
      const person8 = new Person();
      const person9 = new Person();
      const person10 = new Person();

      //group 3
      const person11 = new Person();
      const person12 = new Person();
      const person13 = new Person();
      const person14 = new Person();
      const person15 = new Person();

      //group 4
      const person16 = new Person();
      const person17 = new Person();
      const person18 = new Person();
      const person19 = new Person();
      const person20 = new Person();

      const people: PersonMap = new Map()
        .set(person1.id, person1)
        .set(person2.id, person2)
        .set(person3.id, person3)
        .set(person4.id, person4)
        .set(person5.id, person5)
        .set(person6.id, person6)
        .set(person7.id, person7)
        .set(person8.id, person8)
        .set(person9.id, person9)
        .set(person10.id, person10)
        .set(person11.id, person11)
        .set(person12.id, person12)
        .set(person13.id, person13)
        .set(person14.id, person14)
        .set(person15.id, person15)
        .set(person16.id, person16)
        .set(person17.id, person17)
        .set(person18.id, person18)
        .set(person19.id, person19)
        .set(person20.id, person20);

      //journey 1

      //person 1 pays for group 1
      person1.addDebt(-573, generateNewId());
      person1.addDebt(-573, generateNewId());
      person1.addDebt(-573, generateNewId());
      person1.addDebt(-573, generateNewId());
      person2.addDebt(573, generateNewId());
      person3.addDebt(573, generateNewId());
      person4.addDebt(573, generateNewId());
      person5.addDebt(573, generateNewId());

      //person 6 pays for group 2
      person6.addDebt(-666, generateNewId());
      person6.addDebt(-666, generateNewId());
      person6.addDebt(-666, generateNewId());
      person6.addDebt(-666, generateNewId());
      person7.addDebt(666, generateNewId());
      person8.addDebt(666, generateNewId());
      person9.addDebt(666, generateNewId());
      person10.addDebt(666, generateNewId());

      //person 11 pays for group 3
      person11.addDebt(-444, generateNewId());
      person11.addDebt(-444, generateNewId());
      person11.addDebt(-444, generateNewId());
      person11.addDebt(-444, generateNewId());
      person12.addDebt(444, generateNewId());
      person13.addDebt(444, generateNewId());
      person14.addDebt(444, generateNewId());
      person15.addDebt(444, generateNewId());

      //person 16 pays for group 4
      person16.addDebt(-333, generateNewId());
      person16.addDebt(-333, generateNewId());
      person16.addDebt(-333, generateNewId());
      person16.addDebt(-333, generateNewId());
      person17.addDebt(333, generateNewId());
      person18.addDebt(333, generateNewId());
      person19.addDebt(333, generateNewId());
      person20.addDebt(333, generateNewId());

      //journey 2

      //person 1 pays for group 1
      person1.addDebt(-777, generateNewId());
      person1.addDebt(-777, generateNewId());
      person1.addDebt(-777, generateNewId());
      person1.addDebt(-777, generateNewId());
      person17.addDebt(777, generateNewId());
      person18.addDebt(777, generateNewId());
      person19.addDebt(777, generateNewId());
      person20.addDebt(777, generateNewId());

      //person 6 pays for group 2
      person6.addDebt(-684, generateNewId());
      person6.addDebt(-684, generateNewId());
      person6.addDebt(-684, generateNewId());
      person6.addDebt(-684, generateNewId());
      person12.addDebt(684, generateNewId());
      person13.addDebt(684, generateNewId());
      person14.addDebt(684, generateNewId());
      person15.addDebt(684, generateNewId());

      //person 11 pays for group 3
      person11.addDebt(-1220, generateNewId());
      person11.addDebt(-1220, generateNewId());
      person11.addDebt(-1220, generateNewId());
      person11.addDebt(-1220, generateNewId());
      person7.addDebt(1220, generateNewId());
      person8.addDebt(1220, generateNewId());
      person9.addDebt(1220, generateNewId());
      person10.addDebt(1220, generateNewId());

      //person 16 pays for group 4
      person16.addDebt(-332, generateNewId());
      person16.addDebt(-332, generateNewId());
      person16.addDebt(-332, generateNewId());
      person16.addDebt(-332, generateNewId());
      person2.addDebt(332, generateNewId());
      person3.addDebt(332, generateNewId());
      person4.addDebt(332, generateNewId());
      person5.addDebt(332, generateNewId());

      const payments = paymentCalculator.buildPayments(people);
      const expectedSuggestedPayments: SuggestedPayment[] = [
        { amount: 1886, from: person7.id, to: person11.id },
        { amount: 1886, from: person8.id, to: person11.id },
        { amount: 1886, from: person9.id, to: person11.id },
        { amount: 998, from: person10.id, to: person11.id },
        { amount: 888, from: person10.id, to: person1.id },
        { amount: 1128, from: person12.id, to: person1.id },
        { amount: 1128, from: person13.id, to: person1.id },
        { amount: 1128, from: person14.id, to: person1.id },
        { amount: 1128, from: person15.id, to: person1.id },
        { amount: 1110, from: person17.id, to: person6.id },
        { amount: 1110, from: person18.id, to: person6.id },
        { amount: 1110, from: person19.id, to: person6.id },
        { amount: 1110, from: person20.id, to: person6.id },
        { amount: 905, from: person2.id, to: person6.id },
        { amount: 55, from: person3.id, to: person6.id },
        { amount: 850, from: person3.id, to: person16.id },
        { amount: 905, from: person4.id, to: person16.id },
        { amount: 905, from: person5.id, to: person16.id }
      ];

      expect(payments).toEqual(expectedSuggestedPayments);
    });
  });
});
