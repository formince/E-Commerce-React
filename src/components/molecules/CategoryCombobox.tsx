import * as React from "react";
import { Check, ChevronsUpDown, Tags } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "../../lib/utils";

interface Category {
  id: number;
  name: string;
}

interface CategoryComboboxProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  placeholder?: string;
}

export function CategoryCombobox({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  placeholder = "Kategori Seçin" 
}: CategoryComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(selectedCategory || placeholder);

  React.useEffect(() => {
    setValue(selectedCategory || placeholder);
  }, [selectedCategory, placeholder]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          className={cn(
            "flex items-center justify-between w-full rounded-lg border border-border/50",
            "bg-background/50 backdrop-blur-sm px-4 py-2 text-sm",
            "hover:bg-accent/50 hover:border-border/80 transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-primary/30"
          )}
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <Tags className="h-4 w-4" />
            <span>{value}</span>
          </div>
          <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content
          className={cn(
            "fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%]",
            "bg-background border border-border/50 rounded-lg shadow-lg",
            "focus:outline-none"
          )}
        >
          <CommandPrimitive className="overflow-hidden rounded-lg">
            <div className="border-b border-border/50">
              <div className="flex items-center gap-2 px-4 py-3">
                <Tags className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">{placeholder}</p>
              </div>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              {categories.length === 0 ? (
                <div className="px-4 py-2 text-sm text-muted-foreground">
                  Kategori bulunamadı
                </div>
              ) : (
                categories.map((category) => (
                  <div
                    key={category.id}
                    onClick={() => {
                      setValue(category.name);
                      onCategoryChange(category.name);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 text-sm cursor-pointer",
                      "hover:bg-accent/50 transition-colors",
                      "focus:bg-accent focus:outline-none",
                      value === category.name && "bg-accent/50"
                    )}
                  >
                    <div className="flex items-center justify-center w-4 h-4">
                      {value === category.name && <Check className="h-4 w-4 text-primary" />}
                    </div>
                    <span>{category.name}</span>
                  </div>
                ))
              )}
            </div>
          </CommandPrimitive>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
} 