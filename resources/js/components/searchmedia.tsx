'use client';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

interface Item {
    label: string;
    value: string | number;
}

interface ComboboxProps {
    items: Item[];
    placeholder?: string;
    onChange: (item: Item) => void;
}

export function SearchableCombobox({ items, placeholder, onChange }: ComboboxProps) {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);

    const handleSelect = (item: Item) => {
        setSelectedItem(item);
        onChange(item);
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="w-[250px] justify-between">
                    {selectedItem ? selectedItem.label : placeholder || 'Search images...'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] p-0">
                <Command>
                    <CommandInput placeholder="Search..." className="h-9" />
                    <CommandEmpty>No items found.</CommandEmpty>
                    <CommandGroup>
                        {items.map((item) => (
                            <CommandItem key={item.value} value={item.label} onSelect={() => handleSelect(item)}>
                                <Check className={cn('mr-2 h-4 w-4', selectedItem?.value === item.value ? 'opacity-100' : 'opacity-0')} />
                                {item.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
