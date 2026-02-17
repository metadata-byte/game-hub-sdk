import PocketBase from "pocketbase";
import { Collections } from "./pocketbase-types.js";
import { ExtendedRecordService } from "./record-service.js";
import type { BaseAuthStore } from "pocketbase";
import type { BaseSystemFields } from "./pocketbase-types.js";

export interface GameHubSDKOptions {
  authStore?: BaseAuthStore | null;
  baseUrl?: string;
  lang?: string;
}

type NotSystem<T> = T extends `_${infer _X}` ? never : T;

export type AuthPayload = { email: string; password: string };

export class GameHubSDK extends PocketBase {
  private readonly services: Record<string, ExtendedRecordService<Collections>> = {};

  public constructor(opts: GameHubSDKOptions = {}) {
    const { authStore, baseUrl, lang } = opts;
    super(baseUrl, authStore, lang);
  }

  public c<C extends NotSystem<Collections>>(name: `${C}`): ExtendedRecordService<C> {
    this.services[name] ??= new ExtendedRecordService(this, name);
    return this.services[name] as ExtendedRecordService<C>;
  }

  public getAdminThumbUrl(record: BaseSystemFields, fileName: string): string {
    return this.files.getURL(record, fileName, { thumb: "100x100" });
  }

  public f(template: TemplateStringsArray, ...params: unknown[]): string {
    let query = template[0];
    if (!query) {
      return "";
    }
    const paramsObj: Record<string, unknown> = {};
    for (const [idx, param] of params.entries()) {
      const key = `param${idx}`;
      paramsObj[key] = param;
      query += `{:${key}}${template[idx + 1]}`;
    }
    return this.filter(query, paramsObj);
  }

  public async authSuperUsers(payload: AuthPayload): Promise<void> {
    const { email, password } = payload;
    await this.collection(Collections.Superusers).authWithPassword(email, password);
  }
}
