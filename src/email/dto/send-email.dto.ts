export type SendEmailDto = {
    to: string;
    from: string;
    subject: string;
    text: string;
    html: string;
}