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

export interface IAudit {
  fire: () => Promise<void>;
}

export interface IClient {
  sendMessage: (message: string, chatid: string) => Promise<void>;
}

export interface IReader<T> {
  read: () => Promise<T>;
}

export class NPMAudit implements IAudit {
  constructor(
    private client: IClient,
    private reader: IReader<NPMAuditData>,
  ) {}

  fire = async (): Promise<void> => {
    const auditData = await this.reader.read();
    const message = mapAuditToMessage(auditData);

    this.client.sendMessage(message, "chatid");
  };
}

export const mapAuditToMessage = (audit: NPMAuditData): string => {
  const vulnerabilityMap = new Map(
    Object.entries(audit.metadata.vulnerabilities),
  );

  let message = `Vulnerabilities: `;
  vulnerabilityMap.forEach((vulnerabilityCount, vulnerabilityName) => {
    message += `${vulnerabilityName}: ${vulnerabilityCount}, `;
  });

  return message.slice(0, message.length - 2);
};
