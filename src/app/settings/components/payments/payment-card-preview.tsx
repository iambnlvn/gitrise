"use client";

import { useState, useEffect, useMemo } from "react";
import { CreditCard } from "lucide-react";
import { CardType } from "../../types";
import { CardFormData } from "./add-payment-dialog";
// TODO: get fancy with this and make the card onClick switch to the appropriate input field

interface PaymentCardPreviewProps {
  cardData: CardFormData;
  isFlipped: boolean;
}

const CARD_GRADIENTS: Record<CardType, string> = {
  visa: "from-blue-500/30 via-blue-600/20 to-purple-600/30",
  mastercard: "from-orange-500/30 via-red-500/20 to-pink-600/30",
  amex: "from-teal-500/30 via-cyan-600/20 to-blue-600/30",
  discover: "from-orange-400/30 via-amber-500/20 to-yellow-600/30",
  unknown: "from-purple-500/30 via-violet-600/20 to-fuchsia-600/30",
};

const detectCardType = (cardNumber: string): CardType => {
  const firstDigit = cardNumber.replace(/\s/g, "")[0];
  const cardTypeMap: Record<string, CardType> = {
    "4": "visa",
    "5": "mastercard",
    "3": "amex",
    "6": "discover",
  };
  return cardTypeMap[firstDigit] || "unknown";
};

const CardLogo = ({ type }: { type: CardType }) => {
  switch (type) {
    case "visa":
      return (
        <svg className="h-8 w-12" viewBox="0 0 48 32" fill="none">
          <rect width="48" height="32" rx="4" fill="white" fillOpacity="0.3" />
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
          <circle cx="18" cy="16" r="10" fill="#EB001B" fillOpacity="0.9" />
          <circle cx="30" cy="16" r="10" fill="#F79E1B" fillOpacity="0.9" />
        </svg>
      );
    case "amex":
      return (
        <svg className="h-8 w-12" viewBox="0 0 48 32" fill="none">
          <rect width="48" height="32" rx="4" fill="white" fillOpacity="0.3" />
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
      return <CreditCard className="size-8 text-white/80" />;
  }
};

const CardFront = ({
  cardData,
  gradient,
  cardType,
}: {
  cardData: CardFormData;
  gradient: string;
  cardType: CardType;
}) => (
  <div
    className={`group pointer-events-none absolute inset-0 overflow-hidden rounded-2xl shadow-2xl transition-all duration-300 backface-hidden hover:scale-[1.02]`}
    role="img"
    aria-label={`Front of ${cardType} credit card ending in ${cardData.cardNumber.slice(-4) || "0000"}`}
  >
    {/* Glassmorphic bg */}
    <div
      className={`absolute inset-0 bg-gradient-to-br ${gradient} animate-gradient backdrop-blur-xl`}
      style={{
        backgroundSize: "200% 200%",
      }}
    />
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="animate-move-lr absolute size-20 rounded-full bg-white/10 backdrop-blur-md"
        style={{ top: "20%", left: "10%" }}
      />
      <div
        className="animate-move-rl absolute size-32 rounded-full bg-white/10 backdrop-blur-md"
        style={{ bottom: "15%", right: "10%" }}
      />
      <div
        className="animate-move-tb absolute size-16 rounded-full bg-white/10 backdrop-blur-md"
        style={{ top: "10%", left: "45%" }}
      />
      <div
        className="animate-move-bt absolute size-24 rounded-full bg-white/5 backdrop-blur-sm"
        style={{ bottom: "15%", left: "30%" }}
      />
      <div
        className="animate-move-diag1 absolute size-28 rounded-full bg-white/5 backdrop-blur-sm"
        style={{ top: "20%", right: "15%" }}
      />
    </div>

    {/* Glass overlay */}
    <div className="absolute inset-0 bg-transparent backdrop-blur-sm" />

    <div className="relative z-10 flex h-full flex-col justify-between p-6">
      <div className="flex items-start justify-between">
        <div
          className="h-10 w-12 rounded-lg bg-gradient-to-br from-yellow-200/80 to-yellow-400/80 shadow-lg backdrop-blur-sm"
          aria-label="EMV chip"
        />
        <CardLogo type={cardType} />
      </div>

      <div className="space-y-4">
        <div>
          <div className="mb-1 font-mono text-xs text-white/70">
            Card Number
          </div>
          <div
            className="font-mono text-xl tracking-wider text-white drop-shadow-lg"
            aria-label={`Card number: ${cardData.cardNumber || "not entered"}`}
          >
            {cardData.cardNumber || "•••• •••• •••• ••••"}
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <div className="mb-1 font-mono text-xs text-white/70">
              Cardholder Name
            </div>
            <div
              className="text-sm font-semibold tracking-wide text-white uppercase drop-shadow-lg"
              aria-label={`Cardholder name: ${cardData.cardName || "not entered"}`}
            >
              {cardData.cardName || "YOUR NAME"}
            </div>
          </div>
          <div>
            <div className="mb-1 font-mono text-xs text-white/70">Expires</div>
            <div
              className="font-mono text-sm text-white drop-shadow-lg"
              aria-label={`Expiry date: ${cardData.expiryDate || "not entered"}`}
            >
              {cardData.expiryDate || "MM/YY"}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CardBack = ({ cvc, gradient }: { cvc: string; gradient: string }) => (
  <div
    className={`group pointer-events-none absolute inset-0 rotate-y-180 overflow-hidden rounded-2xl shadow-2xl backface-hidden`}
    role="img"
    aria-label={`Back of credit card with security code ${cvc ? "entered" : "not entered"}`}
  >
    {/* Glassmorphic bg */}
    <div
      className={`absolute inset-0 bg-gradient-to-br ${gradient} animate-gradient backdrop-blur-xl`}
      style={{
        backgroundSize: "200% 200%",
      }}
    />
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="animate-move-rl absolute size-20 rounded-full bg-white/10 backdrop-blur-md"
        style={{ top: "25%", right: "10%" }}
      />
      <div
        className="animate-move-lr absolute size-28 rounded-full bg-white/10 backdrop-blur-md"
        style={{ bottom: "15%", left: "10%" }}
      />
      <div
        className="animate-move-tb absolute size-24 rounded-full bg-white/5 backdrop-blur-sm"
        style={{ top: "15%", left: "30%" }}
      />
      <div
        className="animate-move-diag2 absolute size-16 rounded-full bg-white/5 backdrop-blur-sm"
        style={{ top: "50%", right: "15%" }}
      />
    </div>

    <div className="relative z-10 flex h-full flex-col">
      <div
        className="mt-6 h-12 w-full bg-black/50 backdrop-blur-sm"
        aria-label="Magnetic stripe"
      />
      <div className="flex flex-1 flex-col justify-between p-6">
        <div className="flex h-10 items-center justify-end rounded-lg border border-white/40 bg-white/90 px-4 shadow-lg backdrop-blur-sm">
          <span
            className="font-mono text-lg tracking-wider text-black/80"
            aria-label={`Security code: ${cvc ? "entered" : "not entered"}`}
          >
            {cvc || "•••"}
          </span>
        </div>
        <div
          className="font-mono text-xs text-white/70 drop-shadow"
          aria-label="Card security notice"
        >
          This card is property of the cardholder. Misuse is criminal offense.
        </div>
      </div>
    </div>
  </div>
);

export function PaymentCardPreview({
  cardData,
  isFlipped,
}: PaymentCardPreviewProps) {
  const [cardType, setCardType] = useState<CardType>("unknown");

  useEffect(() => {
    setCardType(detectCardType(cardData.cardNumber));
  }, [cardData.cardNumber]);

  const gradient = useMemo(() => CARD_GRADIENTS[cardType], [cardType]);

  return (
    <div
      className="perspective-1000 mx-auto mb-6 w-full max-w-sm"
      role="region"
      aria-label="Payment card preview"
    >
      <div
        className={`transform-style-3d relative h-52 w-full transition-all duration-700 ${isFlipped ? "rotate-y-180" : ""}`}
        aria-live="polite"
        aria-atomic="true"
      >
        <CardFront
          cardData={cardData}
          gradient={gradient}
          cardType={cardType}
        />
        <CardBack cvc={cardData.cvc} gradient={gradient} />
      </div>
    </div>
  );
}
