"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useParams } from "next/navigation";
import { useLocale} from "@/locales";

export function Combobox({
  data,
  value,
  onChange,
}: {
  data: any[];
  value: string;
  onChange: (newValue: string) => void;
}) {
  let { locale } = useParams() as { locale: string };
  const translations: any= useLocale();
  const [open, setOpen] = React.useState(false);
  const [modifiedData, setModifiedData] = React.useState(() => [
    ...data,
  ]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[280px] justify-between"
        >
          {value
            ? modifiedData.find((framework) => framework.value === value)?.name
            : translations.viewpage.selectCategory[locale ?? "en-US"]}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[260px] p-0">
        <Command>
          <CommandInput placeholder={translations.viewpage.searchCategory[locale ?? "en-US"]} />
          <CommandList>
            <CommandEmpty>{translations.viewpage.categoryNotFound[locale ?? "en-US"]}</CommandEmpty>
            <CommandGroup>
              {modifiedData.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}