import { SearchInput } from '@/shared/components/SearchInput';
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle } from '@/shared/components/ui/drawer';

interface SearchSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const SearchSheet = ({ open, onOpenChange }: SearchSheetProps) => (
    <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="lg:hidden">
            <DrawerTitle className="sr-only">Search tools</DrawerTitle>
            <DrawerDescription className="sr-only">Type a query and press Enter to filter the tools catalog.</DrawerDescription>
            <div className="p-4">
                {open && <SearchInput onSubmit={() => onOpenChange(false)} autoFocus />}
            </div>
        </DrawerContent>
    </Drawer>
);
