import { generateNewId } from "@henrypenton/uuid";
import { PaymentSetDoesNotExistError } from "../exceptions/Payment";
import { DebtMap } from "../interfaces/debt";
import {
  PaymentMap,
  PaymentModel,
  PaymentSet,
  PaymentSetDTO
} from "../interfaces/payment";

export interface IPerson {
  id: string;
  addPaymentSet: (payments: PaymentSetDTO) => string;
  getPaymentSetById: (paymentSetId: string) => PaymentSet;
  getPaymentHistory: () => PaymentMap;
  deletePaymentSetById: (paymentSetId: string) => boolean;
  getDebts: () => DebtMap;
  deleteDebt: (debtId: string) => boolean;
  addDebt: (amount: number, debtId: string) => void;
}

export class Person implements IPerson {
  private payments: PaymentMap = new Map();
  private debts: DebtMap = new Map();
  public id = generateNewId();

  addPaymentSet(payments: PaymentSetDTO): string {
    const paymentsWithId: Set<PaymentModel> = new Set();
    payments.forEach((payment) =>
      paymentsWithId.add({ ...payment, id: generateNewId() })
    );

    const paymentSetId = generateNewId();
    this.payments.set(paymentSetId, paymentsWithId);

    return paymentSetId;
  }

  getPaymentSetById(paymentSetId: string): PaymentSet {
    const paymentSet = this.payments.get(paymentSetId);
    if (!paymentSet) throw new PaymentSetDoesNotExistError();
    return paymentSet;
  }

  getPaymentHistory(): PaymentMap {
    return this.payments;
  }

  deletePaymentSetById(paymentSetId: string): boolean {
    return this.payments.delete(paymentSetId);
  }

  getDebts(): DebtMap {
    return this.debts;
  }

  deleteDebt(debtId: string): boolean {
    return this.debts.delete(debtId);
  }

  addDebt(amount: number, debtId: string): void {
    this.debts.set(debtId, { amount });
  }
}
