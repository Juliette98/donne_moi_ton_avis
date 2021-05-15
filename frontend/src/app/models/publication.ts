export class Publication {
  _id?: number | string;
  pubTitle: string | undefined;
  pubRef: string | undefined;
  pubDescription: string | undefined;
  pubPrice: number| undefined;
  pubSize: string | undefined;
  pubStore: string | undefined;
  pubLink: string | undefined;
  pubImage: string | undefined;
  createdBy?: string | number;
  creatorName?: string | undefined;
}
