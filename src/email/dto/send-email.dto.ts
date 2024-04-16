export type SendEmailDto = {
    to: string;
    from: string;
    subject: string;
    template: string;
    context: object;
}