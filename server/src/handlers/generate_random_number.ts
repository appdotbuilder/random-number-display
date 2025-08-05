
import { type GenerateRandomNumberInput, type RandomNumber } from '../schema';

export const generateRandomNumber = async (input: GenerateRandomNumberInput): Promise<RandomNumber> => {
    // This handler generates a random number between 0 and 10000
    // No database storage is required as per the task requirements
    const randomValue = Math.floor(Math.random() * 10001); // 0 to 10000 inclusive
    
    return {
        value: randomValue,
        timestamp: new Date()
    };
};
