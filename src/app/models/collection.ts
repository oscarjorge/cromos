export interface ICollection {
  uid?: string
  name: string;
  description?: string;
  image?: string;
  brand?: string;
  sticker_type?: string;
  price_packet?: number;
  price_album?: number;
  url_page?: string;
  notes?: string;
  sections?: Section[];
  
}
export class Collection implements ICollection {
  uid?: string;
  name: string;
  description?: string;
  image?: string;
  brand?: string;
  sticker_type?: string;
  price_packet?: number;
  price_album?: number;
  url_page?: string;
  notes?: string;
  sections?: Section[];
  constructor() {

  }
}

export interface ISection {
  uid?: string;
  collection_uid: string;
  section_uid?: string;
  name: string;
  description?: string;
  notes?: string;
  section?: ISection;
  collection?: ICollection;
  stickers?: ISticker[];
}
export class Section implements ISection {
  uid?: string;
  collection_uid: string;
  section_uid?: string;
  name: string;
  description?: string;
  notes?: string;
  section?: ISection;
  collection?: ICollection;
  stickers?: ISticker[];
  constructor()
  {}
}

export interface ISticker {
  uid?: string;
  section_uid?: string;
  official_number: string;
  number: string;
  name?: string;
  description?: string;
  edition?: string;
  type?: string;
  note?: string;
  section?: ISection;
}
export class Sticker implements ISticker {
  uid?: string;
  section_uid?: string;
  official_number: string;
  number: string;
  name?: string;
  description?: string;
  edition?: string;
  type?: string;
  note?: string;
  section?: ISection;
  constructor()
  {}
}