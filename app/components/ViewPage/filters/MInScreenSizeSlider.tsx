import { Slider } from '@/components/ui/slider'
import React from 'react'

const MinScreenSizeSlider = (props: {minScreenSize: number, setMinScreenSize: (num: number)=>void}) => {
    const { minScreenSize, setMinScreenSize }= props;
  return (
    <div className="flex flex-row gap-1">
              <label className="text-sm" htmlFor="screenSizeSlider">Set Min Screen Size: </label>
              <Slider
                  className="w-[40%]"
                  value={[minScreenSize]}
                  onValueChange={(value) => setMinScreenSize(value[0])}
                  max={100}
                  min={0}
                  step={0.05}
              />
              {`Selected Min. Screen Size: ${minScreenSize}`}
            </div>
  )
}

export default MinScreenSizeSlider