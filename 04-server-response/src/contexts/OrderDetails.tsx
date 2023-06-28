import React, { createContext, useContext, useState } from 'react';
import { pricePerItem } from '../constants';

const OrderDetails = createContext(null);

export default function useOrderDetails() {
  const contextValue = useContext(OrderDetails);

  if (!contextValue) {
    throw new Error(
      'useOrderDetails must be called from within an OrderDetailsProvider'
    );
  }

  return contextValue;
}

export function OrderDetailsProvider(props: any) {
  const [optionCounts, setOptionCounts] = useState<any>({
    scoops: {}, // {"Chocolate": 1, "Vanilla": 2}
    toppings: {}, // {"Gummi Bears": 1}
  });

  function updateItemCount(
    itemName: string,
    newItemCount: number,
    optionType: string
  ) {
    const newOptionCounts: any = { ...optionCounts };

    newOptionCounts[optionType][itemName] = newItemCount;

    setOptionCounts(newOptionCounts);
  }

  function resetOrder() {
    setOptionCounts({ scoops: {}, toppings: {} });
  }

  function calculateTotal(optionType: any) {
    const countsArray = Object.values(optionCounts[optionType]);

    const totalCount = countsArray.reduce(
      (total: number, value: any) => total + value,
      0
    );

    return totalCount * pricePerItem[optionType];
  }

  const totals = {
    scoops: calculateTotal('scoops'),
    toppings: calculateTotal('toppings'),
  };

  return (
    <OrderDetails.Provider
      value={{ optionCounts, updateItemCount, resetOrder, totals }}
      {...props}
    />
  );
}
