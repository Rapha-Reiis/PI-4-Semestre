export interface IProfileRepository {
    getUserProfile(rawgId: string): Promise<any>;
}
