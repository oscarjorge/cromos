export interface User {
    uid?: string;
    authuid: string;
    name?: string;
    role: string;
    mail:string;
    photo?: string;
    allowShared?: boolean;
    allowLocation?: boolean;

  }