export interface IToken {
    assin(userID: string): string;
    signEmailToken(userId: string): string;
    verify(token: string): void;
}
