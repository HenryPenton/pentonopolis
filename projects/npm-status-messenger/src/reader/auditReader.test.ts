import { AuditReader } from "./auditReader";
describe("Telegram Client", () => {
  test("reader reads", () => {
    const reader = new AuditReader();
    const data = reader.read();

    expect(data).toEqual({
      metadata: {
        vulnerabilities: { info: 1, low: 1, high: 1, moderate: 1, critical: 1 }
      }
    });
  });
});
