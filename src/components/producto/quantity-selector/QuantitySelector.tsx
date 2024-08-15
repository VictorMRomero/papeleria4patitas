'use client'

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

  return (
    <div className="flex items-center">
      <button className="bg-gray-400 border hover:bg-blue-500 dark:hover:bg-blue-500 dark:bg-gray-700 text-xl px-3 py-1 rounded-l" onClick={() => onValueChanged(-1)}>-</button>
      <span className="bg-gray-500 dark:bg-gray-700 px-4 py-1"> {quantity}</span>
      <button className="bg-gray-400 border dark:border-disabled hover:bg-green-400 dark:hover:bg-green-400 dark:bg-gray-700 text-xl px-3 py-1 rounded-r" onClick={() => onValueChanged(+1)}>+</button>
    </div>
  )
}
