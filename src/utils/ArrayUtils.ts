export class ArrayUtils {

    public static getMaxNum(nums: number[]): number | undefined {
        if (nums.length === 0) {
            return undefined;
        }

        let maxNum = nums[0];
        for (const num of nums) {
            if (num > maxNum) {
                maxNum = num;
            }
        }
        return maxNum;
    }
}