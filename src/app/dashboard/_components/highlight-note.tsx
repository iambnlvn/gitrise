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
import { Plus } from "lucide-react";
import { mockNotes } from "../constants";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

//TODO:Note this is a beta feature and may not be present is a production release
export default function HighlightNote() {
  const [selectedNote, setSelectedNote] = useState<
    (typeof mockNotes)[0] | null
  >(null);
  const isMobile = useIsMobile();

  const selectedNoteContent = () => {
    return (
      <div className="mt-4">
        <div className="bg-muted/50 rounded-lg p-4">
          <p className="text-sm leading-relaxed">{selectedNote?.content}</p>
        </div>

        <div className="text-muted-foreground mt-4 flex items-center justify-between text-xs">
          <span>Tap to reply</span>
          <span>
            {selectedNote
              ? `❤️ ${selectedNote.reactions.love}   👍 ${selectedNote.reactions.like}   😂 ${selectedNote.reactions.laugh}`
              : ""}
          </span>
        </div>
      </div>
    );
  };

  const noteHeader = () => (
    <div className="flex items-center gap-3">
      <Avatar className="size-16">
        <AvatarImage src={selectedNote?.avatar} />
        <AvatarFallback>{selectedNote?.avatar}</AvatarFallback>
      </Avatar>
      <div>
        <h3 className="font-semibold">{selectedNote?.user}</h3>
        <p className="text-muted-foreground text-sm">
          {selectedNote?.timestamp || "2h ago"}
        </p>
      </div>
    </div>
  );

  return (
    <>
      <div className="mb-8">
        <h3 className="text-muted-foreground mb-3 text-sm font-semibold">
          Highlights
        </h3>
        <ScrollArea className="bg-card w-full rounded-md border p-4 whitespace-nowrap shadow-lg transition-shadow duration-200 hover:shadow-xl">
          <div className="flex items-end space-x-6 pt-8 pb-2">
            <div className="flex cursor-pointer flex-col items-center gap-2">
              <div className="border-muted-foreground/50 hover:bg-accent relative flex size-16 items-center justify-center rounded-full border-2 border-dashed transition-colors">
                <Plus className="text-muted-foreground size-6" />
              </div>
              <span className="text-xs font-medium">Add Note</span>
            </div>
            {mockNotes.map((note) => (
              <div
                key={note.id}
                className="group relative mt-2 flex cursor-pointer flex-col items-center gap-2 space-x-2"
                onClick={() => setSelectedNote(note)}
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
              <DrawerTitle>{noteHeader()}</DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-4">{selectedNoteContent()}</div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog
          open={!!selectedNote}
          onOpenChange={() => setSelectedNote(null)}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{noteHeader()}</DialogTitle>
            </DialogHeader>
            {selectedNoteContent()}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
