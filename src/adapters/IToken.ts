export interface IToken {
    assin(userID: string): string;
    verify(token: string): void;
}
