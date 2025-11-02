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
import { mockNotes, QUICK_REACTIONS } from "../constants";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

//TODO:Note this is a beta feature and may not be present is a production release

export default function HighlightNote() {
  const [selectedNote, setSelectedNote] = useState<
    (typeof mockNotes)[0] | null
  >(null);
  const isMobile = useIsMobile();

  return (
    <>
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-muted-foreground mb-3 text-sm font-semibold">
            Highlights
          </h3>
          <span className="bg-muted-foreground/50 rounded-md px-2 py-1 text-xs font-medium">
            BETA
          </span>
        </div>
        <ScrollArea className="bg-card w-full rounded-md border p-4 whitespace-nowrap shadow-lg transition-shadow duration-200 hover:shadow-xl">
          <div className="flex items-end space-x-6 pt-8 pb-2">
            <div className="flex cursor-pointer flex-col items-center gap-2">
              <div className="border-muted-foreground/50 hover:bg-accent relative flex size-16 items-center justify-center rounded-full border-2 border-dashed transition-colors">
                <Plus className="text-muted-foreground size-6" />
              </div>
              <span className="text-xs font-medium">Add Note</span>
            </div>
            {mockNotes.map((note) => (
              <StoryCircle
                key={note.id}
                note={note}
                onClick={() => setSelectedNote(note)}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {isMobile ? (
        <Drawer
          open={!!selectedNote}
          onOpenChange={() => setSelectedNote(null)}
        >
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>
                <NoteHeader selectedNote={selectedNote || undefined} />
              </DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-4">
              <SelectedNoteContent selectedNote={selectedNote || undefined} />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog
          open={!!selectedNote}
          onOpenChange={() => setSelectedNote(null)}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                <NoteHeader selectedNote={selectedNote || undefined} />
              </DialogTitle>
            </DialogHeader>
            <SelectedNoteContent selectedNote={selectedNote || undefined} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
const StoryCircle = ({
  note,
  onClick,
}: {
  note: (typeof mockNotes)[0];
  onClick: () => void;
}) => {
  return (
    <div
      key={note.id}
      className="group relative mt-2 flex cursor-pointer flex-col items-center gap-2 space-x-2"
      onClick={() => onClick()}
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
const SelectedNoteContent = ({
  selectedNote,
}: {
  selectedNote?: (typeof mockNotes)[0] | null;
}) => {
  return (
    <div className="mt-4">
      <div className={cn("bg-muted/50 rounded-lg p-4", selectedNote?.color)}>
        <p className="text-sm leading-relaxed">{selectedNote?.content}</p>
      </div>

      <div className="space-y-4 pb-4">
        <div className="flex items-center gap-4">
          <div className="bg-border h-px flex-1" />
          <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
            Activity
          </span>
          <div className="bg-border h-px flex-1" />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-muted-foreground py-8 text-center text-sm"
        >
          No replies yet. Be the first!
        </motion.div>
      </div>
      <NoteResponseInput />
    </div>
  );
};

const NoteHeader = ({
  selectedNote,
}: {
  selectedNote?: (typeof mockNotes)[0] | null;
}) => (
  <div className="flex items-center gap-3">
    <Link href={`/${selectedNote?.user}`}>
      <Avatar className="size-16">
        <AvatarImage src={selectedNote?.avatar} />
        <AvatarFallback>{selectedNote?.avatar}</AvatarFallback>
      </Avatar>
    </Link>
    <div>
      <h3 className="font-semibold">{selectedNote?.user}</h3>
      <p className="text-muted-foreground text-sm">
        {selectedNote?.timestamp || "2h ago"}
      </p>
    </div>
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
