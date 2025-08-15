'use client'

import { IoRemoveOutline, IoAddOutline } from 'react-icons/io5'

interface Props {
  quantity: number;
  inStock: number;
  onQuantityChanged: (value: number) => void;
}

export const QuantitySelector = ({ quantity, inStock, onQuantityChanged }: Props) => {

  const onValueChanged = (value: number) => {
    if (quantity + value <= 0) return;
    if (quantity + value >= inStock) return;
    
    onQuantityChanged(quantity + value);
  }

  const isDecrementDisabled = quantity <= 1;
  const isIncrementDisabled = quantity >= inStock - 0; // mantener misma lógica límite

  return (
    <div className="inline-flex items-center gap-2">
      <button
        aria-label="Disminuir cantidad"
        disabled={isDecrementDisabled}
        className={`h-10 w-10 rounded-full flex items-center justify-center border transition-all
          ${isDecrementDisabled
            ? 'border-gray-200 text-gray-800 bg-gray-100 cursor-not-allowed'
            : 'border-gray-300 hover:border-blue-500 hover:text-blue-600 text-gray-800 hover:shadow-sm bg-white'}`}
        onClick={() => onValueChanged(-1)}
      >
        <IoRemoveOutline className="h-5 w-5" />
      </button>

      <span className="min-w-[3rem] text-center font-semibold text-gray-800 select-none">
        {quantity}
      </span>

      <button
        aria-label="Aumentar cantidad"
        disabled={isIncrementDisabled}
        className={`h-10 w-10 rounded-full flex items-center justify-center border transition-all
          ${isIncrementDisabled
            ? 'border-gray-200 text-gray-800 bg-gray-100 cursor-not-allowed'
            : 'border-gray-300 hover:border-green-500 hover:text-green-600 text-gray-800 hover:shadow-sm bg-white'}`}
        onClick={() => onValueChanged(+1)}
      >
        <IoAddOutline className="h-5 w-5" />
      </button>
    </div>
  )
}
