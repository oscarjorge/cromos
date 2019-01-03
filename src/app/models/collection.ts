export interface ICollection {
  uid?: string;
  name: string;
  description?: string;
  image?: string;
}
export class Collection implements ICollection {
  uid?: string;
  name: string;
  description?: string;
  image?: string;
  constructor() {

  }
}

