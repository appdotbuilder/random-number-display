
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { trpc } from '@/utils/trpc';
import { useState } from 'react';
import type { RandomNumber } from '../../server/src/schema';

function App() {
  const [randomNumber, setRandomNumber] = useState<RandomNumber | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateNumber = async () => {
    setIsLoading(true);
    try {
      const result = await trpc.generateRandomNumber.mutate({});
      setRandomNumber(result);
    } catch (error) {
      console.error('Failed to generate random number:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-light text-gray-900 mb-2">Random Number Generator</h1>
          <p className="text-gray-600 text-sm">Generate a random number between 0 and 10,000</p>
        </div>

        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-8 text-center">
            {randomNumber ? (
              <div className="space-y-4">
                <div className="text-6xl font-light text-blue-600 tabular-nums">
                  {randomNumber.value.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">
                  Generated at {randomNumber.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ) : (
              <div className="py-12">
                <div className="text-gray-400 text-lg mb-2">🎲</div>
                <p className="text-gray-500 text-sm">Press the button to generate a random number</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center">
          <Button
            onClick={generateNumber}
            disabled={isLoading}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-colors duration-200 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Generating...</span>
              </div>
            ) : (
              'Generate Random Number'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
