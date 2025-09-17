"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Loader2,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react";
import { Invoice } from "../../types";

const INVOICE_STATUS_CONFIG = {
  paid: {
    color: "border-green-500/20 bg-green-500/10 text-green-500",
    icon: CheckCircle,
  },
  pending: {
    color: "border-yellow-500/20 bg-yellow-500/10 text-yellow-500",
    icon: Clock,
  },
  failed: {
    color: "border-red-500/20 bg-red-500/10 text-red-500",
    icon: AlertCircle,
  },
  default: {
    color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
    icon: null,
  },
};

type BillingHistoryCardProps = {
  invoices: Invoice[];
  isDownloading: string | null;
  onDownload: (invoiceId: string) => void;
};

const StatusBadge = ({ status }: { status: string }) => {
  const config =
    INVOICE_STATUS_CONFIG[status as keyof typeof INVOICE_STATUS_CONFIG] ||
    INVOICE_STATUS_CONFIG.default;

  const Icon = config.icon;

  return (
    <Badge className={`flex w-fit items-center ${config.color} capitalize`}>
      {Icon && <Icon className="mr-1 size-3" />} {status}
    </Badge>
  );
};

const InvoiceRow = ({
  invoice,
  isDownloading,
  onDownload,
}: {
  invoice: Invoice;
  isDownloading: string | null;
  onDownload: (id: string) => void;
}) => (
  <tr
    key={invoice.id}
    className="border-b border-slate-200 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
  >
    <td className="text-foreground px-6 py-4 text-sm">{invoice.date}</td>
    <td className="text-foreground px-6 py-4 text-sm">{invoice.description}</td>
    <td className="text-foreground px-6 py-4 text-sm font-semibold">
      ${invoice.amount.toFixed(2)}
    </td>
    <td className="px-6 py-4">
      <StatusBadge status={invoice.status} />
    </td>
    <td className="px-6 py-4">
      {invoice.status === "paid" ? (
        <DownloadButton
          invoiceId={invoice.id}
          isLoading={isDownloading === invoice.id}
          onDownload={onDownload}
        />
      ) : (
        <span className="text-muted-foreground text-sm italic">
          No Action Available
        </span>
      )}
    </td>
  </tr>
);

const DownloadButton = ({
  invoiceId,
  isLoading,
  onDownload,
}: {
  invoiceId: string;
  isLoading: boolean;
  onDownload: (id: string) => void;
}) => (
  <button
    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 disabled:opacity-50 dark:text-blue-400 dark:hover:text-blue-300"
    onClick={() => onDownload(invoiceId)}
    disabled={isLoading}
    aria-label="Download invoice"
  >
    {isLoading ? (
      <Loader2 className="size-4 animate-spin" aria-hidden="true" />
    ) : (
      <Download size={16} aria-hidden="true" />
    )}
    Download Invoice
  </button>
);

export function BillingHistoryCard({
  invoices,
  isDownloading,
  onDownload,
}: BillingHistoryCardProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-foreground text-2xl font-semibold">
          Billing History
        </h2>
        <Button variant="outline" size="sm">
          Filter
        </Button>
      </div>
      <Card className="overflow-hidden border-0 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                {["Date", "Description", "Amount", "Status", "Action"].map(
                  (header) => (
                    <th
                      key={header}
                      className="text-foreground px-6 py-4 text-left text-sm font-semibold"
                    >
                      {header}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <InvoiceRow
                  key={invoice.id}
                  invoice={invoice}
                  isDownloading={isDownloading}
                  onDownload={onDownload}
                />
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
