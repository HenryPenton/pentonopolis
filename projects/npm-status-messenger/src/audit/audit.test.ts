import { getDummyConfig } from "../dummyConfig";
import {
  IClient,
  IReader,
  NPMAudit,
  NPMAuditData,
  mapAuditToMessage
} from "./audit";

describe("Audit", () => {
  test("gets audit data from a reader", async () => {
    const stubClient: IClient = { sendMessage: jest.fn() };
    const stubReader: IReader<NPMAuditData> = {
      read: async (): Promise<NPMAuditData> => {
        return {
          metadata: {
            vulnerabilities: {
              info: 1,
              low: 2,
              moderate: 3,
              high: 4,
              critical: 5
            }
          }
        };
      }
    };

    const dummyConfig = getDummyConfig();
    const audit = new NPMAudit(dummyConfig, stubClient, stubReader);
    await audit.fire();

    expect(stubClient.sendMessage).toHaveBeenCalledWith(
      "Vulnerabilities: info: 1, low: 2, moderate: 3, high: 4, critical: 5",
      "chatid"
    );
  });

  describe("formatData", () => {
    test("data formatted correctly", async () => {
      const message = mapAuditToMessage({
        metadata: {
          vulnerabilities: {
            info: 1,
            low: 2,
            moderate: 3,
            high: 4,
            critical: 5
          }
        }
      });

      expect(message).toEqual(
        "Vulnerabilities: info: 1, low: 2, moderate: 3, high: 4, critical: 5"
      );
    });
  });
});