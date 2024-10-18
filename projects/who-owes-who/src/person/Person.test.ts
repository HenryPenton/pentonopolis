import { PaymentSetDoesNotExistError } from "../exceptions/Payment";
import { DebtMap } from "../interfaces/debt";
import { PaymentMap } from "../interfaces/payment";
import { Person } from "./Person";

describe("Person", () => {
  describe("payment", () => {
    test("add payment to person history", () => {
      const payingFor = new Person();
      const person = new Person();
      person.addPaymentSet(new Set([{ to: payingFor.id, amount: 123 }]));

      const expectedPaymentHistory: PaymentMap = new Map().set(
        expect.any(String),

        new Set([
          {
            id: expect.any(String),
            to: payingFor.id,
            amount: 123
          }
        ])
      );

      expect(person.getPaymentHistory()).toEqual(expectedPaymentHistory);
    });
    describe("getPaymentSetById", () => {
      test("get a single payment from a person's history", () => {
        const payingFor = new Person();
        const person = new Person();
        const paymentSetId = person.addPaymentSet(
          new Set([{ to: payingFor.id, amount: 123 }])
        );

        expect(person.getPaymentSetById(paymentSetId)).toEqual(
          new Set([
            {
              id: expect.any(String),
              to: payingFor.id,
              amount: 123
            }
          ])
        );
      });
      test("throws an error if the payment id does not relate to a payment", () => {
        const payingFor = new Person();
        const person = new Person();
        person.addPaymentSet(new Set([{ to: payingFor.id, amount: 123 }]));

        expect(() => person.getPaymentSetById("some-non-existent-id")).toThrow(
          PaymentSetDoesNotExistError
        );
      });
    });
    test("adding payment returns the new id of that payment set", () => {
      const payingFor = new Person();
      const person = new Person();
      const paymentSetId = person.addPaymentSet(
        new Set([{ to: payingFor.id, amount: 123 }])
      );

      expect(paymentSetId).toEqual(expect.any(String));
    });

    test("add multiple payments to person history", () => {
      const payingFor1 = new Person();
      const payingFor2 = new Person();
      const person = new Person();
      person.addPaymentSet(
        new Set([
          { to: payingFor1.id, amount: 123 },
          { to: payingFor2.id, amount: 321 }
        ])
      );

      const expectedPaymentHistory: PaymentMap = new Map().set(
        expect.any(String),
        new Set([
          {
            id: expect.any(String),
            to: payingFor1.id,
            amount: 123
          },
          {
            id: expect.any(String),
            to: payingFor2.id,
            amount: 321
          }
        ])
      );

      expect(person.getPaymentHistory()).toEqual(expectedPaymentHistory);
    });

    test("delete payment set by id when there is one payment set", () => {
      const payingFor1 = new Person();
      const payingFor2 = new Person();
      const person = new Person();
      const paymentSetId = person.addPaymentSet(
        new Set([
          { to: payingFor1.id, amount: 123 },
          { to: payingFor2.id, amount: 321 }
        ])
      );

      person.deletePaymentSetById(paymentSetId);
      expect(person.getPaymentHistory()).toEqual(new Map());
    });

    test("delete payment set by id when there are multiple payment sets", () => {
      const payingFor1 = new Person();
      const payingFor2 = new Person();
      const person = new Person();
      const paymentSetId = person.addPaymentSet(
        new Set([
          { to: payingFor1.id, amount: 123 },
          { to: payingFor2.id, amount: 321 }
        ])
      );

      person.addPaymentSet(
        new Set([
          { to: payingFor1.id, amount: 111 },
          { to: payingFor2.id, amount: 222 }
        ])
      );

      person.deletePaymentSetById(paymentSetId);

      expect(person.getPaymentHistory()).toEqual(
        new Map().set(
          expect.any(String),
          new Set([
            { to: payingFor1.id, amount: 111, id: expect.any(String) },
            { to: payingFor2.id, amount: 222, id: expect.any(String) }
          ])
        )
      );
    });

    test("deleting a payment set that exists returns true", () => {
      const payingFor1 = new Person();
      const payingFor2 = new Person();
      const person = new Person();
      const paymentSetId = person.addPaymentSet(
        new Set([
          { to: payingFor1.id, amount: 123 },
          { to: payingFor2.id, amount: 321 }
        ])
      );

      const didDelete = person.deletePaymentSetById(paymentSetId);

      expect(didDelete).toBeTruthy();
    });

    test("deleting a payment set that doesn't exist returns false", () => {
      const payingFor1 = new Person();
      const payingFor2 = new Person();
      const person = new Person();
      person.addPaymentSet(
        new Set([
          { to: payingFor1.id, amount: 123 },
          { to: payingFor2.id, amount: 321 }
        ])
      );

      person.addPaymentSet(
        new Set([
          { to: payingFor1.id, amount: 111 },
          { to: payingFor2.id, amount: 222 }
        ])
      );

      const didDelete = person.deletePaymentSetById("some-non-existent-id");

      expect(didDelete).toBeFalsy();
    });
  });

  describe("debt", () => {
    test("add negative payments from other people", () => {
      const person = new Person();

      person.addDebt(123, "some-id-1");
      person.addDebt(321, "some-id-2");

      const expectedDebts: DebtMap = new Map()
        .set("some-id-1", { amount: 123 })
        .set("some-id-2", { amount: 321 });

      expect(person.getDebts()).toEqual(expectedDebts);
    });

    test("debts can be deleted", () => {
      const person = new Person();

      person.addDebt(123, "some-id-1");
      person.addDebt(321, "some-id-2");

      person.deleteDebt("some-id-1");
      person.deleteDebt("some-id-2");

      const expectedDebts: DebtMap = new Map();

      expect(person.getDebts()).toEqual(expectedDebts);
    });

    test("deleting a debt that exists returns true", () => {
      const person = new Person();

      person.addDebt(123, "some-id-1");
      person.addDebt(321, "some-id-2");

      const didDelete = person.deleteDebt("some-id-1");

      expect(didDelete).toBeTruthy();
    });

    test("deleting a debt that doesn't exist returns false", () => {
      const person = new Person();

      person.addDebt(123, "some-id-1");
      person.addDebt(321, "some-id-2");

      const didDelete = person.deleteDebt("some-non-existent-id");

      expect(didDelete).toBeFalsy();
    });
  });

  describe("metadata", () => {
    test("a person has an id", () => {
      const person = new Person();
      expect(person.id).toEqual(expect.any(String));
    });
  });
});
