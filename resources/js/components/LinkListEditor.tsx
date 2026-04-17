import React, { useState, useEffect } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface LinkItem {
    label: string;
    url: string;
}

interface LinkListEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export default function LinkListEditor({ value, onChange }: LinkListEditorProps) {
    const [links, setLinks] = useState<LinkItem[]>([]);

    // Parse the string value into an array of objects
    useEffect(() => {
        if (!value) {
            setLinks([]);
            return;
        }

        const parsedLinks = value.split('\n')
            .filter(line => line.trim())
            .map(line => {
                const [label, url] = line.split('|');
                return { label: label?.trim() || '', url: url?.trim() || '' };
            });
        
        // Only update if the string representation has actually changed to avoid infinite loops
        const currentString = links.map(l => `${l.label}|${l.url}`).join('\n');
        if (currentString !== value) {
            setLinks(parsedLinks);
        }
    }, [value]);

    const updateParent = (newLinks: LinkItem[]) => {
        const valueString = newLinks
            .filter(l => l.label || l.url)
            .map(l => `${l.label}|${l.url}`)
            .join('\n');
        onChange(valueString);
    };

    const handleAdd = () => {
        const newLinks = [...links, { label: '', url: '' }];
        setLinks(newLinks);
        // Don't update parent yet to avoid empty lines in DB until they type something
    };

    const handleRemove = (index: number) => {
        const newLinks = links.filter((_, i) => i !== index);
        setLinks(newLinks);
        updateParent(newLinks);
    };

    const handleChange = (index: number, field: keyof LinkItem, newValue: string) => {
        const newLinks = links.map((link, i) => 
            i === index ? { ...link, [field]: newValue } : link
        );
        setLinks(newLinks);
        updateParent(newLinks);
    };

    return (
        <div className="space-y-3">
            {links.map((link, index) => (
                <div key={index} className="flex gap-2 items-center group animate-in slide-in-from-top-1 duration-200">
                    <div className="grid grid-cols-2 gap-2 flex-1">
                        <Input 
                            placeholder="Label" 
                            value={link.label} 
                            onChange={(e) => handleChange(index, 'label', e.target.value)}
                            className="bg-background"
                        />
                        <Input 
                            placeholder="URL" 
                            value={link.url} 
                            onChange={(e) => handleChange(index, 'url', e.target.value)}
                            className="bg-background"
                        />
                    </div>
                    <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleRemove(index)}
                        className="text-muted-foreground hover:text-destructive shrink-0"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ))}
            
            {links.length === 0 && (
                <div className="text-sm text-muted-foreground italic py-2">
                    No links added yet.
                </div>
            )}

            <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={handleAdd}
                className="w-full border-dashed flex items-center gap-2 mt-2"
            >
                <Plus className="h-4 w-4" />
                Add Link
            </Button>
        </div>
    );
}
