import React, { useState } from 'react';
import Button from '../button';
import { useAuth } from '../../../contexts/useAuth';
import { useLoading } from '../../../contexts/useLoading';

const PinInput: React.FC<{ length: number, onPinSubmit: () => void }> = ({ length, onPinSubmit }) => {
  const [pin, setPin] = useState<string[]>(Array(length).fill(''));
  const { setLoading } = useLoading();
  const { validatePin } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newPin = [...pin];
    newPin[index] = e.target.value.slice(0, 1);
    setPin(newPin);

    if (e.target.value && index < length - 1) {
      (e.target.nextSibling as HTMLInputElement)?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    const target = e.target as HTMLInputElement;

    if (e.key === 'Backspace' && index > 0 && !pin[index]) {
      const previousElement = target.previousElementSibling as HTMLInputElement;
      if (previousElement) {
        previousElement.focus();
      }
    }
  };

  function checkPinToken() {
    const pinToken = localStorage.getItem('pinToken')
    if (pinToken) {
      return true
    }
    return false
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const pinString = pin.join('');
    if (pinString.length === length) {
      console.log('PIN entered:', pinString);
      // Handle PIN submission
      await validatePin(pinString)
      setLoading(true)
      if (checkPinToken()) {
        onPinSubmit()
        setLoading(false)
      }
    } else {
      console.error('PIN is incomplete');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-9 flex-col items-center">
      <div className="flex gap-8 mb-4">
        {pin.map((_, index) => (
          <input
            key={index}
            type="password"
            maxLength={1}
            value={pin[index]}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-12 h-12 text-center border-2 border-primary-dark-blue bg-white focus:outline-none focus:border-primary rounded-full"
            placeholder=""
          />
        ))}
      </div>
        <Button
          type="submit"
          ariaLabel={'Konfirmasi'}
          variant="general"
          // colorScheme="primary"
          state="active"
          className='bg-primary-blue text-white hover:bg-primary-dark-blue'
        >
          {"Konfirmasi"}
        </Button>
    </form>
  );
};

export default PinInput;
