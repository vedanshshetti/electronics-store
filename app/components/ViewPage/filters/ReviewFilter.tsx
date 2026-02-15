import React from 'react'
import { Slider } from '@/components/ui/slider'


const MinReview = (props: {minReview: number, setMinReview: (number: number)=> void}) => {
    const { minReview, setMinReview }= props;
  return (<div className="flex flex-row gap-1">
    <label className="text-sm" htmlFor="priceSlider">Set Min Review: </label>
    <Slider
      className="w-[40%]"
      defaultValue={[minReview]}
      onValueChange={(value) => setMinReview(value[0])}
      max={5}
      min={0}
      step={0.5}
    />
    {`Selected Min. Review: ${minReview}`}
  </div>)
}

export default MinReview;