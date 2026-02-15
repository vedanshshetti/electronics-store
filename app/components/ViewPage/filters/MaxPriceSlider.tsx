import React from 'react'
import { Slider } from '@/components/ui/slider'
import { useParams } from 'next/navigation';

const MaxPriceSlider = (props: {maxPrice: number, setMaxPrice: (number: number)=> void}) => {
    const { maxPrice, setMaxPrice }= props;
    const { locale } = useParams() as { locale: string };
  return (<div className="flex flex-row gap-1">
    <label className="text-sm" htmlFor="priceSlider">Set Max Price: </label>
    <Slider
      className="w-[40%]"
      defaultValue={[maxPrice]}
      onValueChange={(value) => setMaxPrice(value[0])}
      max={(locale!=="hi" && locale!=="kn") ? 20000 : 250000}
      min={250}
      step={250}
    />
    {`Selected Max. Price: ${maxPrice}`}
  </div>)
}

export default MaxPriceSlider;