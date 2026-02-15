import React from 'react'
import { Slider } from '@/components/ui/slider'

const MinStorageSlider = (props: {minStorage: any, setMinStorage: (number: any)=> void}) => {
    const { minStorage, setMinStorage }= props;
    const displayStorage= minStorage % 1000 == 0 ? minStorage/1000+"TB" : minStorage+"GB";
    return (<div className="flex flex-row gap-1">
    <label className="text-sm" htmlFor="priceSlider">Set Min. Storage (in GB): </label>
    <Slider
      className="w-[40%]"
      defaultValue={[parseFloat(minStorage)]}
      onValueChange={(value) => setMinStorage(value[0].toString())}
      max={4000}
      min={0}
      step={128}
    />
    {`Selected Min. Storage: ${minStorage < 1 ? "0GB" : displayStorage}`}
  </div>)
}

export default MinStorageSlider;