"use client";

import { useState, useEffect } from "react";
import { CreditCard } from "lucide-react";
import { CardType } from "../../types";
import { CardFormData } from "./add-payment-dialog";
// TODO: get fancy with this and make the card onClick switch to the appropriate input field

interface PaymentCardPreviewProps {
  cardData: CardFormData;
  isFlipped: boolean;
}

export function PaymentCardPreview({
  cardData,
  isFlipped,
}: PaymentCardPreviewProps) {
  const [cardType, setCardType] = useState<CardType>("unknown");
  const { cardName, cardNumber, cvc, expiryDate } = cardData;
  useEffect(() => {
    const firstDigit = cardNumber.replace(/\s/g, "")[0];

    if (firstDigit === "4") setCardType("visa");
    else if (firstDigit === "5") setCardType("mastercard");
    else if (firstDigit === "3") setCardType("amex");
    else if (firstDigit === "6") setCardType("discover");
    else setCardType("unknown");
  }, [cardNumber]);

  const getCardGradient = () => {
    switch (cardType) {
      case "visa":
        return "from-blue-600 via-blue-700 to-blue-900";
      case "mastercard":
        return "from-orange-600 via-red-600 to-red-800";
      case "amex":
        return "from-teal-600 via-teal-700 to-teal-900";
      case "discover":
        return "from-orange-500 via-orange-600 to-orange-800";
      default:
        return "from-[#7C3AED] via-purple-700 to-purple-900";
    }
  };

  const getCardLogo = () => {
    switch (cardType) {
      case "visa":
        return (
          <svg className="h-8 w-12" viewBox="0 0 48 32" fill="none">
            <rect
              width="48"
              height="32"
              rx="4"
              fill="white"
              fillOpacity="0.2"
            />
            <text
              x="24"
              y="20"
              textAnchor="middle"
              fill="white"
              fontSize="12"
              fontWeight="bold"
            >
              VISA
            </text>
          </svg>
        );
      case "mastercard":
        return (
          <svg className="h-8 w-12" viewBox="0 0 48 32" fill="none">
            <circle cx="18" cy="16" r="10" fill="#EB001B" fillOpacity="0.8" />
            <circle cx="30" cy="16" r="10" fill="#F79E1B" fillOpacity="0.8" />
          </svg>
        );
      case "amex":
        return (
          <svg className="h-8 w-12" viewBox="0 0 48 32" fill="none">
            <rect
              width="48"
              height="32"
              rx="4"
              fill="white"
              fillOpacity="0.2"
            />
            <text
              x="24"
              y="20"
              textAnchor="middle"
              fill="white"
              fontSize="10"
              fontWeight="bold"
            >
              AMEX
            </text>
          </svg>
        );
      default:
        return <CreditCard className="size-8 text-white/60" />;
    }
  };

  return (
    <div className="perspective-1000 mx-auto mb-6 w-full max-w-sm">
      <div
        className={`transform-style-3d relative h-52 w-full transition-all duration-700 ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front of card */}
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br backface-hidden ${getCardGradient()} p-6 shadow-2xl transition-all duration-300 hover:scale-105`}
        >
          <div className="mb-8 flex items-start justify-between">
            <div className="h-10 w-12 rounded bg-gradient-to-br from-yellow-200 to-yellow-400 opacity-80" />
            {getCardLogo()}
          </div>

          <div className="mb-4">
            <div className="mb-1 font-mono text-xs text-white/60">
              Card Number
            </div>
            <div className="font-mono text-xl tracking-wider text-white">
              {cardNumber || "•••• •••• •••• ••••"}
            </div>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <div className="mb-1 font-mono text-xs text-white/60">
                Cardholder Name
              </div>
              <div className="text-sm font-semibold tracking-wide text-white uppercase">
                {cardName || "YOUR NAME"}
              </div>
            </div>
            <div>
              <div className="mb-1 font-mono text-xs text-white/60">
                Expires
              </div>
              <div className="font-mono text-sm text-white">
                {expiryDate || "MM/YY"}
              </div>
            </div>
          </div>

          {/* Decoration stuff */}
          <div className="absolute top-0 right-0 size-32 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 size-24 rounded-full bg-white/5 blur-2xl" />
        </div>

        {/* Back of card */}
        <div
          className={`absolute inset-0 rotate-y-180 rounded-2xl bg-gradient-to-br backface-hidden ${getCardGradient()} shadow-2xl`}
        >
          <div className="mt-6 h-12 w-full bg-black/40" />
          <div className="p-6">
            <div className="mb-4 flex h-10 items-center justify-end rounded bg-white/90 px-4">
              <span className="font-mono text-lg tracking-wider text-black">
                {cvc || "•••"}
              </span>
            </div>
            <div className="font-mono text-xs text-white/60">
              This card is property of the cardholder. Misuse is criminal
              offense.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
