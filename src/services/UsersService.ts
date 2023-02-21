import {BaseService} from "./base/BaseService";
import {IUser} from "../domain/entity/IUser";
import {IAppState} from "../state/IAppState";
import httpClient from "../http-client";

export class UsersService extends BaseService<IUser> {

    constructor(appState: IAppState) {
        super("/users", appState);
    }

    public async getUserPhotoUrl(userId: string): Promise<string | undefined> {
        const botToken = process.env["mh_bot_token"] ?? "";
        const photos = await this.getUsersPhotosId(userId);
        const photoPath = await this.getPhotoPath(photos[0]);
        return photoPath === undefined ? undefined : `https://api.telegram.org/file/bot${botToken}/${photoPath}`
    }

    private async getUsersPhotosId(userId: string): Promise<string[]> {
        const botToken = process.env["mh_bot_token"] ?? "";
        const getRequest = () =>
            httpClient.get(`https://api.telegram.org/bot${botToken}/getUserProfilePhotos?user_id=${userId}`, this.getConfig());

        const data = (await this.sendRequest<{result: {total_count: number, photos: {file_id: string}[][]}}>(getRequest)).data;
        if (data === undefined) {
            return []
        }
        return data.result.total_count > 0 ? data.result.photos.map(file => file[0].file_id) : [];
    }

    private async getPhotoPath(fileId: string): Promise<string | undefined> {
        const botToken = process.env["mh_bot_token"] ?? "";
        const getRequest = () =>
            httpClient.get(`https://api.telegram.org/bot${botToken}/getFile?file_id=${fileId}`, this.getConfig());

        const data = (await this.sendRequest<{result: {file_path: string}}>(getRequest))?.data;
        if (data === undefined) {
            return undefined
        }
        return data.result.file_path;
    }
}