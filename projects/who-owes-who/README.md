# README

![Build](https://github.com/HenryPenton/pentonopolis/actions/workflows/CI-CD.yml/badge.svg)

This is a package for tracking payments made by people within a group. After updating a the system with a payment, a list of suggested payments to balance the debts can be generated.

The system is currency agnostic, however this document will refer to dollars for the purposes of ubiquitous language.

## addPaymentSetToPerson

### Scenario

Greg pays for dinner for Alice and Bob. Dinner was $99 and they agree to split it equally.

A correctly configured payment set added to Greg will set him up as being a 'lender' of $66. Bob and Alice will be 'borrowers' of $33 each.

The payment set in this scenario looks as follows:

```javascript
const controller = new Controller();
const gregId = controller.addNewPerson();
const bobId = controller.addNewPerson();
const aliceId = controller.addNewPerson();

const paymentSetSetup: PaymentSetDTO = new Set([
  { amount: 3300, to: bobId },
  { amount: 3300, to: aliceId },
]);

const paymentSetId = controller.addPaymentSetToPerson(paymentSetSetup, gregId);

//paymentSetId => 688ca822-a075-4d41-85d5-7a383bac10c8
```

The system works based in cents, so Bob and Alice owe 3300 cents each.

## getPaymentsByPerson

This retrieves a list of payments that have been made for a given person. The list should comprise of payment set ids. These ids are returned to you when you add a payment set to a person.

```javascript
const paymentSetId = controller.addPaymentSetToPerson(paymentSetSetup, gregId);
//paymentSetId => fa43c43f-7857-451b-89fb-cf3f9a06a1df

const paymentSets = controller.getPaymentsByPerson([paymentSetId], personId);
```

## addNewPerson

Functionality to add a new person to the group. The ID of the new person is returned when you create them.

```javascript
const newPersonId = controller.addNewPerson();
//newPersonId => ffdec365-376f-4d88-821b-8c425dd13cd5
```

## removePersonById

Functionality to remove a new person from the group. This should be passed the ID returned when the person was created. If a person is removed from the system then the system leaves the following responsibilities to you:

- Deleting any payment sets owned by that person (this should be done before deleting the person).

```javascript
controller.deletePaymentsByPerson(
  [...allPaymentSetIdsForPersonBeingRemoved],
  idOfPersonBeingRemoved
);
```

- Updating payment sets owned by anyone else to remove that person (this can be achieved by deleting and recreating the payment set with an omission of the person that has now been removed). This action can be done before or after person removal, however, the `controller.removePersonById(id)` process will return you a list of payment sets that need updating for each person in the system.

## deletePaymentSetsForPerson

A function for deleting any number of payment sets for a given person.

```javascript
const paymentSetId = controller.addPaymentSetToPerson(paymentSetSetup, gregId);

controller.deletePaymentsByPerson([paymentSetId], personId);
```

## getPaymentSetIdsByPerson

Get all of the paymentSetIds for a given person.

## getSuggestedPayments

The payments suggested to balance all debts.

```javascript
[
  {
    from: "05463ea3-4843-47f9-8f2d-dd0514294eb6",
    to: "9b563cc2-7782-49b3-901a-2c52e3e9f0b0",
    amount: 3300
  },
  {
    from: "107c79ed-e170-4bf3-8963-bae9db791483",
    to: "9b563cc2-7782-49b3-901a-2c52e3e9f0b0",
    amount: 3300
  }
];
```

The `from` and `to` properties are the IDs of people.

## Exceptions

Attempting to perform an action on a person that does not exist will result in a `PersonDoesNotExistError`.

Attempting to perform an action on a payment set that does not exist will result in a `PaymentSetDoesNotExistError`.
