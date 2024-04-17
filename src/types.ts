export type User = {
    id: string;
    username: string;
    password: string;
    name: string;
    email: string;
    phoneNo: string;
    isValidated: boolean;
}

export type Email = {
    to: string;
    data: any;
}

export type SalaryHead = {
    id: number,
    formula?: string,
    value?: number,
}