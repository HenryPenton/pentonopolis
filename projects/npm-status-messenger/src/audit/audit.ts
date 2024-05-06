import { IClient } from "../client/client";
import { IConfig } from "../startup";

export type NPMAuditData = {
  metadata: {
    vulnerabilities: {
      info: number;
      low: number;
      moderate: number;
      high: number;
      critical: number;
    };
  };
};

export interface IReader<T> {
  read: () => Promise<T>;
}

export interface IAudit {
  fire: () => Promise<void>;
}

export interface IAuditReader extends IReader<NPMAuditData> {}

export class NPMAudit implements IAudit {
  constructor(
    private config: IConfig,
    private client: IClient,
    private reader: IAuditReader
  ) {}

  fire = async (): Promise<void> => {
    const auditData = await this.reader.read();
    const message = mapAuditToMessage(auditData);
    const chatId = this.config.getConfigurationVariable("telegramChatId");

    this.client.sendMessage(message, chatId);
  };
}

export const mapAuditToMessage = (audit: NPMAuditData): string => {
  const vulnerabilityMap = new Map(
    Object.entries(audit.metadata.vulnerabilities)
  );

  let message = `Vulnerabilities: `;

  vulnerabilityMap.forEach((vulnerabilityCount, vulnerabilityName) => {
    message += `${vulnerabilityName}: ${vulnerabilityCount}, `;
  });

  return message.slice(0, message.length - 2);
};
