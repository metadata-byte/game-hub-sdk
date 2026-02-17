/* eslint-disable @typescript-eslint/naming-convention */
/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from "pocketbase";
import type { RecordService } from "pocketbase";

export enum Collections {
  Authorigins = "_authOrigins",
  Companies = "companies",
  Externalauths = "_externalAuths",
  Games = "games",
  Genres = "genres",
  Links = "links",
  LinkTypes = "linkTypes",
  Mfas = "_mfas",
  Otps = "_otps",
  Superusers = "_superusers",
  Tags = "tags",
  Users = "users"
}

// Alias types for improved usability
export type IsoDateString = string;
export type IsoAutoDateString = { readonly autodate: unique symbol } & string;
export type RecordIdString = string;
export type FileNameString = { readonly filename: unique symbol } & string;
export type HTMLString = string;

type ExpandType<T> = unknown extends T
  ? T extends unknown
    ? { expand?: unknown }
    : { expand: T }
  : { expand: T };

// System fields
export type BaseSystemFields<T = unknown> = {
  collectionId: string;
  collectionName: Collections;
  id: RecordIdString;
} & ExpandType<T>;

export type AuthSystemFields<T = unknown> = {
  email: string;
  emailVisibility: boolean;
  username: string;
  verified: boolean;
} & BaseSystemFields<T>;

// Record types for each collection

export type AuthoriginsRecord = {
  collectionRef: string;
  created: IsoAutoDateString;
  fingerprint: string;
  id: string;
  recordRef: string;
  updated: IsoAutoDateString;
};

export type ExternalauthsRecord = {
  collectionRef: string;
  created: IsoAutoDateString;
  id: string;
  provider: string;
  providerId: string;
  recordRef: string;
  updated: IsoAutoDateString;
};

export type MfasRecord = {
  collectionRef: string;
  created: IsoAutoDateString;
  id: string;
  method: string;
  recordRef: string;
  updated: IsoAutoDateString;
};

export type OtpsRecord = {
  collectionRef: string;
  created: IsoAutoDateString;
  id: string;
  password: string;
  recordRef: string;
  sentTo?: string;
  updated: IsoAutoDateString;
};

export type SuperusersRecord = {
  created: IsoAutoDateString;
  email: string;
  emailVisibility?: boolean;
  id: string;
  password: string;
  tokenKey: string;
  updated: IsoAutoDateString;
  verified?: boolean;
};

export type CompaniesRecord = {
  banner?: FileNameString;
  created: IsoAutoDateString;
  description?: string;
  founded?: IsoDateString;
  icon?: FileNameString;
  id: string;
  links?: RecordIdString[];
  name: string;
  summary?: string;
  updated: IsoAutoDateString;
};

export type GamesRecord = {
  ageRating?: number;
  background?: FileNameString;
  banner?: FileNameString;
  cover?: FileNameString;
  created: IsoAutoDateString;
  description?: string;
  developers?: RecordIdString[];
  genres?: RecordIdString[];
  icon?: FileNameString;
  id: string;
  links?: RecordIdString[];
  matchName?: string;
  name: string;
  note?: string;
  publishers?: RecordIdString[];
  rating?: number;
  released?: IsoDateString;
  screenshots?: FileNameString[];
  summary?: string;
  tags?: RecordIdString[];
  updated: IsoAutoDateString;
};

export type GenresRecord = {
  created: IsoAutoDateString;
  id: string;
  name: string;
  updated: IsoAutoDateString;
};

export type LinkTypesRecord = {
  code: string;
  created: IsoAutoDateString;
  icon?: FileNameString;
  id: string;
  name: string;
  updated: IsoAutoDateString;
  url: string;
};

export type LinksRecord = {
  created: IsoAutoDateString;
  id: string;
  type: RecordIdString;
  updated: IsoAutoDateString;
  url: string;
};

export type TagsRecord = {
  created: IsoAutoDateString;
  id: string;
  name: string;
  updated: IsoAutoDateString;
};

export type UsersRecord = {
  avatar?: FileNameString;
  created: IsoAutoDateString;
  email: string;
  emailVisibility?: boolean;
  id: string;
  name?: string;
  password: string;
  tokenKey: string;
  updated: IsoAutoDateString;
  verified?: boolean;
};

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> = BaseSystemFields<Texpand> & Required<AuthoriginsRecord>;
export type ExternalauthsResponse<Texpand = unknown> = BaseSystemFields<Texpand> & Required<ExternalauthsRecord>;
export type MfasResponse<Texpand = unknown> = BaseSystemFields<Texpand> & Required<MfasRecord>;
export type OtpsResponse<Texpand = unknown> = BaseSystemFields<Texpand> & Required<OtpsRecord>;
export type SuperusersResponse<Texpand = unknown> = AuthSystemFields<Texpand> & Required<SuperusersRecord>;
export type CompaniesResponse<Texpand = unknown> = BaseSystemFields<Texpand> & Required<CompaniesRecord>;
export type GamesResponse<Texpand = unknown> = BaseSystemFields<Texpand> & Required<GamesRecord>;
export type GenresResponse<Texpand = unknown> = BaseSystemFields<Texpand> & Required<GenresRecord>;
export type LinkTypesResponse<Texpand = unknown> = BaseSystemFields<Texpand> & Required<LinkTypesRecord>;
export type LinksResponse<Texpand = unknown> = BaseSystemFields<Texpand> & Required<LinksRecord>;
export type TagsResponse<Texpand = unknown> = BaseSystemFields<Texpand> & Required<TagsRecord>;
export type UsersResponse<Texpand = unknown> = AuthSystemFields<Texpand> & Required<UsersRecord>;

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
  _authOrigins: AuthoriginsRecord;
  _externalAuths: ExternalauthsRecord;
  _mfas: MfasRecord;
  _otps: OtpsRecord;
  _superusers: SuperusersRecord;
  companies: CompaniesRecord;
  games: GamesRecord;
  genres: GenresRecord;
  links: LinksRecord;
  linkTypes: LinkTypesRecord;
  tags: TagsRecord;
  users: UsersRecord;
};

export type CollectionResponses = {
  _authOrigins: AuthoriginsResponse;
  _externalAuths: ExternalauthsResponse;
  _mfas: MfasResponse;
  _otps: OtpsResponse;
  _superusers: SuperusersResponse;
  companies: CompaniesResponse;
  games: GamesResponse;
  genres: GenresResponse;
  links: LinksResponse;
  linkTypes: LinkTypesResponse;
  tags: TagsResponse;
  users: UsersResponse;
};

// Utility types for create/update operations

type ProcessCreateAndUpdateFields<T> = Omit<{
  // Omit AutoDate fields
  [K in keyof T as Extract<T[K], IsoAutoDateString> extends never ? K : never]:
  // Convert FileNameString to File
  T[K] extends infer U
    ? U extends (FileNameString | FileNameString[])
      ? U extends any[] ? File[] : File
      : U
    : never
}, "id">;

// Create type for Auth collections
export type CreateAuth<T> = {
  email: string;
  emailVisibility?: boolean;
  id?: RecordIdString;
  password: string;
  passwordConfirm: string;
  verified?: boolean;
} & ProcessCreateAndUpdateFields<T>;

// Create type for Base collections
export type CreateBase<T> = {
  id?: RecordIdString;
} & ProcessCreateAndUpdateFields<T>;

// Update type for Auth collections
export type UpdateAuth<T> = {
  email?: string;
  emailVisibility?: boolean;
  oldPassword?: string;
  password?: string;
  passwordConfirm?: string;
  verified?: boolean;
} & Partial<
  Omit<ProcessCreateAndUpdateFields<T>, keyof AuthSystemFields>
>;

// Update type for Base collections
export type UpdateBase<T> = Partial<
  Omit<ProcessCreateAndUpdateFields<T>, keyof BaseSystemFields>
>;

// Get the correct create type for any collection
export type Create<T extends keyof CollectionResponses> =
  CollectionResponses[T] extends AuthSystemFields
    ? CreateAuth<CollectionRecords[T]>
    : CreateBase<CollectionRecords[T]>;

// Get the correct update type for any collection
export type Update<T extends keyof CollectionResponses> =
  CollectionResponses[T] extends AuthSystemFields
    ? UpdateAuth<CollectionRecords[T]>
    : UpdateBase<CollectionRecords[T]>;

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = {
  collection<T extends keyof CollectionResponses>(
    idOrName: T
  ): RecordService<CollectionResponses[T]>;
} & PocketBase;
