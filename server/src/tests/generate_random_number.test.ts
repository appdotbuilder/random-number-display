
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { type GenerateRandomNumberInput } from '../schema';
import { generateRandomNumber } from '../handlers/generate_random_number';

const testInput: GenerateRandomNumberInput = {};

describe('generateRandomNumber', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should generate a random number within valid range', async () => {
    const result = await generateRandomNumber(testInput);

    // Verify the value is within the expected range (0-10000)
    expect(result.value).toBeGreaterThanOrEqual(0);
    expect(result.value).toBeLessThanOrEqual(10000);
    expect(Number.isInteger(result.value)).toBe(true);
  });

  it('should include a timestamp', async () => {
    const beforeCall = new Date();
    const result = await generateRandomNumber(testInput);
    const afterCall = new Date();

    // Verify timestamp is a Date object and within reasonable time bounds
    expect(result.timestamp).toBeInstanceOf(Date);
    expect(result.timestamp.getTime()).toBeGreaterThanOrEqual(beforeCall.getTime());
    expect(result.timestamp.getTime()).toBeLessThanOrEqual(afterCall.getTime());
  });

  it('should generate different values on multiple calls', async () => {
    const results = await Promise.all([
      generateRandomNumber(testInput),
      generateRandomNumber(testInput),
      generateRandomNumber(testInput),
      generateRandomNumber(testInput),
      generateRandomNumber(testInput)
    ]);

    // Check that we have 5 results
    expect(results).toHaveLength(5);

    // Extract all values
    const values = results.map(r => r.value);

    // While theoretically possible, it's extremely unlikely all 5 values are identical
    // This test verifies the randomness is working
    const uniqueValues = new Set(values);
    expect(uniqueValues.size).toBeGreaterThan(1);

    // Verify all values are in valid range
    values.forEach(value => {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(10000);
      expect(Number.isInteger(value)).toBe(true);
    });
  });

  it('should work with empty input object', async () => {
    const result = await generateRandomNumber({});

    expect(result.value).toBeGreaterThanOrEqual(0);
    expect(result.value).toBeLessThanOrEqual(10000);
    expect(result.timestamp).toBeInstanceOf(Date);
  });
});
