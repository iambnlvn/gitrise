"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Plus, Send } from "lucide-react";
import { COLOR_OPTIONS, mockNotes, QUICK_REACTIONS } from "../constants";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

//TODO:Note this is a beta feature and may not be present is a production release
//This feature will be abandoned or heavily modified in the future
export default function HighlightNote() {
  const [selectedNote, setSelectedNote] = useState<
    (typeof mockNotes)[0] | null
  >(null);
  const [showAddNote, setShowAddNote] = useState(false);
  const isMobile = useIsMobile();

  return (
    <>
      <HighlightsList
        onAddNote={() => setShowAddNote(true)}
        onSelectNote={setSelectedNote}
      />

      <AddNoteModal
        isOpen={showAddNote}
        onClose={() => setShowAddNote(false)}
        isMobile={isMobile}
      />

      <ViewNoteModal
        selectedNote={selectedNote}
        onClose={() => setSelectedNote(null)}
        isMobile={isMobile}
      />
    </>
  );
}

interface HighlightsListProps {
  onAddNote: () => void;
  onSelectNote: (note: (typeof mockNotes)[0]) => void;
}

const HighlightsList = ({ onAddNote, onSelectNote }: HighlightsListProps) => {
  return (
    <div className="mb-8">
      <HighlightsHeader />
      <ScrollArea className="bg-card w-full rounded-md border p-4 whitespace-nowrap shadow-lg transition-shadow duration-200 hover:shadow-xl">
        <div className="flex items-end space-x-6 pt-8 pb-2">
          <AddNoteButton onClick={onAddNote} />
          {mockNotes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: note.id * 0.05 }}
            >
              <StoryCircle note={note} onClick={() => onSelectNote(note)} />
            </motion.div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

const HighlightsHeader = () => (
  <div className="mb-4 flex items-center justify-between">
    <h3 className="text-muted-foreground mb-3 text-sm font-semibold">
      Highlights
    </h3>
    <span className="bg-muted-foreground/50 rounded-md px-2 py-1 text-xs font-medium">
      BETA
    </span>
  </div>
);

const AddNoteButton = ({ onClick }: { onClick: () => void }) => (
  <div className="flex cursor-pointer flex-col items-center gap-2">
    <div className="border-muted-foreground/50 hover:bg-accent relative flex size-16 items-center justify-center rounded-full border-2 border-dashed transition-colors">
      <Plus className="text-muted-foreground size-6" onClick={onClick} />
    </div>
    <span className="text-xs font-medium">Add Note</span>
  </div>
);

const StoryCircle = ({
  note,
  onClick,
}: {
  note: (typeof mockNotes)[0];
  onClick: () => void;
}) => {
  return (
    <div
      className="group relative mt-2 flex cursor-pointer flex-col items-center gap-2 space-x-2"
      onClick={onClick}
    >
      <div className="absolute -top-8 left-1/2 z-10 -translate-x-1/2 transform">
        <div className="relative">
          <div
            className={cn(
              "text-muted max-w-[100px] rounded-full px-3 py-2 text-center shadow-lg transition-all group-hover:scale-105",
              note.color,
            )}
          >
            <p className="truncate text-xs font-medium">
              {note.content.slice(0, 11)}...
            </p>
          </div>
        </div>
      </div>

      <Avatar className="size-16 transition-all group-hover:scale-105">
        <AvatarImage src={note.avatar} />
        <AvatarFallback>{note.avatar}</AvatarFallback>
      </Avatar>

      <span className="group-hover:text-primary text-xs font-medium transition-colors">
        {note.user}
      </span>
    </div>
  );
};

interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile: boolean;
}

const AddNoteModal = ({ isOpen, onClose, isMobile }: AddNoteModalProps) => {
  const content = <AddNoteForm onClose={onClose} />;

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Create a Note</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-4">{content}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create a Note</DialogTitle>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
};

const AddNoteForm = ({ onClose }: { onClose: () => void }) => {
  const [noteText, setNoteText] = useState("");
  const [selectedColor, setSelectedColor] = useState(
    "bg-blue-100 text-blue-800",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (noteText.trim()) {
      onClose();
      setNoteText("");
      setSelectedColor("bg-blue-400 text-blue-800");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 overflow-hidden p-1">
      <NoteTextInput value={noteText} onChange={setNoteText} />

      <ColorSelection
        selectedColor={selectedColor}
        onColorChange={setSelectedColor}
        noteText={noteText}
      />

      <FormActions onCancel={onClose} canSubmit={!!noteText.trim()} />
    </form>
  );
};

const NoteTextInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => (
  <div className="space-y-3">
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="What's on your mind?"
      className="focus:ring-primary min-h-[120px] w-full max-w-full resize-none rounded-lg border p-3 focus:ring-2 focus:outline-none"
      maxLength={280}
      required
    />
    <div className="text-muted-foreground flex justify-between text-xs">
      <span>Share your thoughts with the community</span>
      <span>{value.length}/280</span>
    </div>
  </div>
);

const ColorSelection = ({
  selectedColor,
  onColorChange,
  noteText,
}: {
  selectedColor: string;
  onColorChange: (color: string) => void;
  noteText: string;
}) => (
  <div className="space-y-3">
    <label className="text-sm font-medium">Choose a Color</label>
    <div className="flex flex-wrap gap-2">
      {COLOR_OPTIONS.map((color, index) => (
        <motion.button
          key={color}
          type="button"
          onClick={() => onColorChange(color)}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.3,
            delay: index * 0.1,
            ease: "backOut",
          }}
          className={cn(
            "size-8 rounded-full border-2 transition-all",
            color.split(" ")[0],
            selectedColor === color
              ? "border-foreground scale-110"
              : "border-muted-foreground/30 hover:border-muted-foreground/60",
          )}
        />
      ))}
    </div>

    <ColorPreview selectedColor={selectedColor} noteText={noteText} />
  </div>
);

const ColorPreview = ({
  selectedColor,
  noteText,
}: {
  selectedColor: string;
  noteText: string;
}) => (
  <div className="mt-4">
    <p className="mb-2 text-sm font-medium">Preview:</p>
    <div
      className={cn(
        "w-full overflow-hidden rounded-lg p-3 text-sm break-words whitespace-normal",
        selectedColor,
      )}
    >
      {noteText || "Your note will appear like this..."}
    </div>
  </div>
);

const FormActions = ({
  onCancel,
  canSubmit,
}: {
  onCancel: () => void;
  canSubmit: boolean;
}) => (
  <div className="flex gap-3">
    <Button
      type="button"
      variant="outline"
      onClick={onCancel}
      className="flex-1"
    >
      Cancel
    </Button>
    <Button type="submit" disabled={!canSubmit} className="flex-1">
      <Send className="mr-2 size-4" />
      Post Note
    </Button>
  </div>
);

interface ViewNoteModalProps {
  selectedNote: (typeof mockNotes)[0] | null;
  onClose: () => void;
  isMobile: boolean;
}

const ViewNoteModal = ({
  selectedNote,
  onClose,
  isMobile,
}: ViewNoteModalProps) => {
  if (!selectedNote) return null;

  const content = <SelectedNoteContent selectedNote={selectedNote} />;

  if (isMobile) {
    return (
      <Drawer open={!!selectedNote} onOpenChange={onClose}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              <NoteHeader selectedNote={selectedNote} />
            </DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-4">{content}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={!!selectedNote} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            <NoteHeader selectedNote={selectedNote} />
          </DialogTitle>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
};

const NoteHeader = ({
  selectedNote,
}: {
  selectedNote: (typeof mockNotes)[0];
}) => (
  <div className="flex items-center gap-3">
    <Link href={`/${selectedNote.user}`}>
      <Avatar className="size-16">
        <AvatarImage src={selectedNote.avatar} />
        <AvatarFallback>{selectedNote.avatar}</AvatarFallback>
      </Avatar>
    </Link>
    <div>
      <h3 className="font-semibold">{selectedNote.user}</h3>
      <p className="text-muted-foreground text-sm">
        {selectedNote.timestamp || "2h ago"}
      </p>
    </div>
  </div>
);

const SelectedNoteContent = ({
  selectedNote,
}: {
  selectedNote: (typeof mockNotes)[0];
}) => {
  return (
    <div className="mt-4">
      <NoteDisplay selectedNote={selectedNote} />
      <ActivitySection note={selectedNote} />
      <NoteResponseInput />
    </div>
  );
};

const NoteDisplay = ({
  selectedNote,
}: {
  selectedNote: (typeof mockNotes)[0];
}) => (
  <div className={cn("bg-muted/50 rounded-lg p-4", selectedNote.color)}>
    <p className="text-sm leading-relaxed">{selectedNote.content}</p>
  </div>
);

const ActivitySection = ({ note }: { note: (typeof mockNotes)[0] }) => (
  <div className="space-y-4 pb-4">
    <div className="flex items-center gap-4">
      <div className="bg-border h-px flex-1" />
      <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
        Activity
      </span>
      <div className="bg-border h-px flex-1" />
    </div>
    {note.replies && note.replies.length === 0 ? (
      <p className="text-muted-foreground text-center text-sm">
        No activity yet. Be the first to respond!
      </p>
    ) : (
      <NoteInteractionView note={note} />
    )}
  </div>
);

const NoteResponseInput = () => {
  return (
    <div className="relative space-y-4">
      <NoteQuickReactions />
      <div className="flex w-full items-center space-x-2">
        <Input
          className="focus:ring-primary w-full flex-1 rounded-md border p-2 pr-12 focus:ring-2 focus:outline-none"
          required
          maxLength={500}
          placeholder="Write a response..."
        />
        <Button>
          <Send className="size-4" />
        </Button>
      </div>
    </div>
  );
};

const NoteQuickReactions = () => {
  return (
    <div className="flex space-x-1">
      {QUICK_REACTIONS.map((reaction) => (
        <Button
          variant={"ghost"}
          key={reaction}
          className="hover:bg-muted rounded-md p-2 text-2xl"
        >
          {reaction}
        </Button>
      ))}
    </div>
  );
};

const NoteInteractionView = ({ note }: { note: (typeof mockNotes)[0] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  return (
    <div className="flex h-full flex-col">
      <div
        ref={scrollRef}
        className="no-scrollbar min-h-0 flex-1 space-y-4 overflow-y-auto scroll-smooth px-1 pb-4"
      >
        <AnimatePresence initial={false}>
          {note.replies?.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn(
                "flex items-end gap-2",
                msg.user === "You" ? "flex-row-reverse" : "flex-row",
              )}
            >
              <Avatar className="size-6 shrink-0">
                {msg.user === "You" ? (
                  <AvatarFallback className="bg-primary text-primary-foreground text-[8px]">
                    ME
                  </AvatarFallback>
                ) : (
                  <AvatarImage src={msg.avatar} />
                )}
              </Avatar>

              {msg.type === "reaction" ? (
                <span className="animate-in zoom-in text-2xl duration-300">
                  {msg.content}
                </span>
              ) : (
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-3 py-2 text-sm",
                    msg.user === "You"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-muted rounded-bl-none",
                  )}
                >
                  {msg.content}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
