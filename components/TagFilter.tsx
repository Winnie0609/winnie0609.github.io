'use client';

import React, { useState } from 'react';
import { ChevronDownIcon, XIcon } from 'lucide-react';

interface TagFilterProps {
  allTags: Array<{ tag: string; count: number }>;
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

const TagFilter: React.FC<TagFilterProps> = ({
  allTags,
  selectedTags,
  onTagsChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const handleTagRemove = (tag: string) => {
    onTagsChange(selectedTags.filter((t) => t !== tag));
  };

  const clearAllTags = () => {
    onTagsChange([]);
  };

  return (
    <div className="space-y-3">
      <div
        className="flex items-center gap-1 cursor-pointer text-content-tertiary"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        #Tags
        <ChevronDownIcon
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </div>

      {isOpen && (
        <div className="flex flex-wrap gap-2 items-center">
          {allTags.map((tagData) => (
            <div
              key={tagData.tag}
              className="cursor-pointer bg-muted text-content-primary text-sm px-2 py-0.5 rounded-sm hover:bg-accent transition-colors"
              onClick={() => handleTagToggle(tagData.tag)}
            >
              {tagData.tag} ({tagData.count})
            </div>
          ))}
        </div>
      )}

      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          {selectedTags.map((tag) => (
            <div
              key={tag}
              className="flex items-center gap-1 bg-accent text-accent-foreground text-sm px-2 py-0.5 rounded-sm"
            >
              <span>{tag}</span>
              <button
                onClick={() => handleTagRemove(tag)}
                className="hover:bg-muted rounded-full p-0.5 transition-colors"
                aria-label={`Remove ${tag} tag`}
              >
                <XIcon className="h-3 w-3" />
              </button>
            </div>
          ))}
          {selectedTags.length > 1 && (
            <button
              onClick={clearAllTags}
              className="text-content-tertiary hover:text-content-secondary text-xs underline"
            >
              Clear all
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TagFilter;
