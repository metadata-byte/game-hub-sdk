import { Blob } from "node:buffer";
import { RecordService } from "pocketbase";
import type { ListResult, RecordListOptions, RecordOptions } from "pocketbase";
import type { CollectionRecords, CollectionResponses, Collections, FileNameString } from "./pocketbase-types.js";
import type { GameHubSDK } from "./sdk.js";

export interface FilterFunction<T> {
  (template: TemplateStringsArray, ...params: unknown[]): Promise<T>;
}

export type FileBlob = {
  blob: Blob;
  fileName?: string;
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RecordPayload<C extends Collections> = BlobPayload<Optional<CollectionRecords[C], "created" | "id" | "updated">>;

export type BlobPayload<T> = {
  [K in keyof T]: T[K] extends FileNameString | undefined ? FileBlob : T[K] extends FileNameString[] | undefined ? FileBlob[] : T[K]
};

function isFileBlob(value: unknown): value is FileBlob {
  if (!value) {
    return false;
  }
  if (typeof value !== "object") {
    return false;
  }
  return "blob" in value && value.blob instanceof Blob;
}

function setForm(formData: FormData, key: string, value: unknown): void {
  if (isFileBlob(value)) {
    formData.append(key, value.blob, value.fileName);
  } else {
    formData.append(key, value);
  }
}

export class ExtendedRecordService<C extends Collections> extends RecordService<CollectionResponses[C]> {
  public constructor(client: GameHubSDK, collectionIdOrName: string) {
    super(client, collectionIdOrName);
  }

  public first(opts?: Omit<RecordListOptions, "filter">): FilterFunction<CollectionResponses[C] | undefined> {
    return async (template: TemplateStringsArray, ...params: unknown[]) => {
      const filter = this.mdh.f(template, ...params);
      const result = await this.getList(1, 1, { filter, skipTotal: true, ...opts });
      return result.items[0];
    };
  }

  public list(page = 1, perPage = 100, skipTotal = true): FilterFunction<ListResult<CollectionResponses[C]>> {
    return async (template, ...params) => {
      const filter = this.mdh.f(template, ...params);
      return this.getList(page, perPage, { filter, skipTotal });
    };
  }

  public fullList(batch = 200): FilterFunction<CollectionResponses[C][]> {
    return async (template, ...params) => {
      const filter = this.mdh.f(template, ...params);
      return this.getFullList(batch, { filter });
    };
  }

  private mapPayload(payload: Record<string, unknown>): FormData {
    const formData = new FormData();
    for (const [key, value] of Object.entries(payload)) {
      if (Array.isArray(value)) {
        value.forEach(v => {
          setForm(formData, key, v);
        });
      } else {
        setForm(formData, key, value);
      }
    }
    return formData;
  }

  public async createTyped(payload: RecordPayload<C>, options?: RecordOptions): Promise<CollectionResponses[C]> {
    const formData = this.mapPayload(payload);
    return this.create(formData, options);
  }

  public async updateTyped(id: string, payload: Partial<RecordPayload<C>>, options?: RecordOptions): Promise<CollectionResponses[C]> {
    const formData = this.mapPayload(payload);
    return this.update(id, formData, options);
  }

  private get mdh(): GameHubSDK {
    return this.client as GameHubSDK;
  }
}
