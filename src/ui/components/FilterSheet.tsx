import React, { useMemo } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/ui/sheet";
import { getTailwindColorClass } from '@/lib/getTailwindColorClass';

interface AttributeValue {
  id: string;
  name: string;
  slug: string;
}

interface Attribute {
  attribute: {
    id: string;
    name: string;
    slug: string;
  };
  values: AttributeValue[];
}

interface GroupedAttribute {
  id: string;
  name: string;
  slug: string;
  values: { [key: string]: AttributeValue & { count: number } };
}

interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  attributes: Attribute[];
  selectedFilters: { [key: string]: string[] };
  onFilterChange: (attributeSlug: string, value: string, isChecked: boolean) => void;
}

export function FilterSheet({ isOpen, onClose, attributes, selectedFilters, onFilterChange }: FilterSheetProps) {
  const groupedAttributes = useMemo(() => {
    const groups: { [key: string]: GroupedAttribute } = {};

    attributes.forEach((attr) => {
      const { id, name, slug } = attr.attribute;
      if (!groups[slug]) {
        groups[slug] = { id, name, slug, values: {} };
      }

      attr.values.forEach((value) => {
        if (!groups[slug].values[value.slug]) {
          groups[slug].values[value.slug] = { ...value, count: 1 };
        } else {
          groups[slug].values[value.slug].count++;
        }
      });
    });

    return Object.values(groups);
  }, [attributes]);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter Products</SheetTitle>
        </SheetHeader>
        <div className="mx-1 mt-16 space-y-6">
          {groupedAttributes.map((attribute) => (
            <div key={attribute.id} className="space-y-2">
              <h3 className=" font-titlefont uppercase text-xl font-semibold">{attribute.name}</h3>
              <div className="flex flex-wrap gap-2">
                {Object.values(attribute.values).map((value) => {
                  const isSelected = selectedFilters[attribute.slug]?.includes(value.slug);
                  const isMulticolor = attribute.slug === 'multicolors';
                  const colorClass = isMulticolor ? getTailwindColorClass(value.name) : '';

                  return (
                    <div
                      key={value.id}
                      className={`
                        cursor-pointer rounded-full px-3 py-1 text-sm
                        ${isSelected ? 'border-2 border-black' : 'border border-gray-300'}
                        ${isMulticolor ? colorClass : isSelected ? 'bg-black text-white' : 'bg-white text-black'}
                      `}
                      onClick={() => onFilterChange(attribute.slug, value.slug, !isSelected)}
                    >
                      {value.name} ({value.count})
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

