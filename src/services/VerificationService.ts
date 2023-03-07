import crypto from "crypto-js";

export class VerificationService {

    public static getData(delimiter: string = "\n"): string {
        const searchParams = new URLSearchParams(Telegram.WebApp.initData);
        const dict: Map<string, string> = new Map<string, string>();
        searchParams.forEach((value, key) => {
            dict.set(key, value)
        });
        dict.delete("hash");

        const pairs: string[] = [];
        dict.forEach((value, key) => pairs.push(`${key}=${value}`));
        return pairs.sort().join(delimiter);
    }

    public static getDataHash(): string {
        const searchParams = new URLSearchParams(Telegram.WebApp.initData);
        return searchParams.get("hash") ?? "";
    }

    public static verify(): boolean {
        const data = this.getData();
        const hash = this.getDataHash();

        const botToken = process.env.REACT_APP_BOT_TOKEN ?? "";
        const secretKey = crypto.HmacSHA256(botToken, "WebAppData");

        const checkHash = crypto.enc.Hex.stringify(crypto.HmacSHA256(data, secretKey));

        return checkHash === hash;
    }

}