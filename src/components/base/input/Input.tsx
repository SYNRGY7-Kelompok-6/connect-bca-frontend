import { ChangeEventHandler, MouseEventHandler } from 'react'

interface InputComponentProps {
  id?: string;
  iconSrc?: string;
  iconAlt?: string;
  iconPosition?: 'left' | 'right';
  placeholder?: string;
  disabled?: boolean;
  type?: string;
  ariaLabel?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: ChangeEventHandler<HTMLInputElement>;
  onClick?: MouseEventHandler<HTMLInputElement>;
  value?: string;
}

function Input ({
  id,
  iconSrc,
  iconAlt,
  iconPosition,
  placeholder,
  disabled = false,
  onChange,
  onFocus,
  onClick,
  type = 'text',
  value,
}: Readonly<InputComponentProps>) {
  return (
    <div id="input-component" className={
      `relative flex ${iconPosition === 'left' ? (
        'flex-row'
      )  : (
        'flex-row-reverse'
      ) } items-center`
      }>
      {
        iconSrc && <img src={iconSrc} alt={iconAlt} className='absolute pointer-events-none mr-3' />
      }
      <input onClick={onClick} id={id} value={value} onChange={onChange} onFocus={onFocus} type={type} placeholder={placeholder} aria-placeholder={placeholder} className={`bg-white p-[10px] gap-[10px] border border-primary-dark-blue rounded-[10px] flex text-primary-blue font-semibold text-base w-full ${iconPosition === 'left' ? (
        'pl-10'
      ) : (
        'pr-10'
      )}`} disabled={disabled} />
    </div>
  )
}

export default Input
