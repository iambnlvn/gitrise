"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Loader2 } from "lucide-react";
import { Invoice } from "../../types";

type BillingHistoryCardProps = {
  invoices: Invoice[];
  isDownloading: string | null;
  onDownload: (invoiceId: string) => void;
};

export function BillingHistoryCard({
  invoices,
  isDownloading,
  onDownload,
}: BillingHistoryCardProps) {
  return (
    <Card className="bg-card border-border p-6 transition-all duration-200 hover:shadow-lg hover:shadow-[#947bd3]/5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Billing History</h3>
        <Button
          variant="outline"
          size="sm"
          className="bg-transparent transition-all duration-200"
        >
          View All
        </Button>
      </div>
      <div className="space-y-3">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="border-border bg-accent/50 hover:bg-accent flex flex-col justify-between gap-3 rounded-lg border p-3 transition-all duration-200 sm:flex-row sm:items-center"
          >
            <div className="flex-1">
              <p className="font-medium">{invoice.description}</p>
              <p className="text-muted-foreground text-sm">{invoice.date}</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge
                className={
                  invoice.status === "paid"
                    ? "border-green-500/20 bg-green-500/10 text-green-500"
                    : invoice.status === "pending"
                      ? "border-yellow-500/20 bg-yellow-500/10 text-yellow-500"
                      : "border-red-500/20 bg-red-500/10 text-red-500"
                }
              >
                {invoice.status}
              </Badge>
              <span className="font-semibold">
                ${invoice.amount.toFixed(2)}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDownload(invoice.id)}
                disabled={isDownloading === invoice.id}
                className="transition-all duration-200"
              >
                {isDownloading === invoice.id ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Download className="size-4" />
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
