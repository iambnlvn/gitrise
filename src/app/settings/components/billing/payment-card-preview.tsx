"use client";

import { useState, useEffect, useMemo } from "react";
import { CreditCard } from "lucide-react";

import { CardFormData } from "./add-payment-dialog";
import { CARD_GRADIENTS } from "./constants";
import { CardType } from "./billing-types";
// TODO: get fancy with this and make the card onClick switch to the appropriate input field

interface PaymentCardPreviewProps {
  cardData: CardFormData;
  isFlipped: boolean;
}

/**
 * Formats a credit card number string with proper spacing and masking
 * based on the card type.
 *
 * @param number - The raw card number string to format
 * @param type - The type of credit card (amex, visa, mastercard, discover, or unknown)
 * @returns A formatted card number string with proper spacing and masking
 *
 * @example
 * // Returns "4242 •••• •••• ••••" (for a Visa card)
 * formatCardNumber("4242", "visa")
 *
 * @example
 * // Returns "3782 •••••• •••••" (for an American Express card)
 * formatCardNumber("3782", "amex")
 *
 * @remarks
 * - American Express cards use format: XXXX XXXXXX XXXXX (4-6-5)
 * - All other card types use format: XXXX XXXX XXXX XXXX (4-4-4-4)
 * - Incomplete numbers are padded with bullet characters (•)
 * - Spaces in the input string are removed before processing
 * @deprecated This function will be replaced with a relatively more efficient implementation by reducing memory allocations
 */

const formatCardNumber = (number: string, type: CardType): string => {
  const cleaned = number.replace(/\s/g, "");
  if (!cleaned) return "•••• •••• •••• ••••";

  if (type === "amex") {
    const part1 = cleaned.slice(0, 4);
    const part2 = cleaned.slice(4, 10).padEnd(6, "•");
    const part3 = cleaned.slice(10, 15).padEnd(5, "•");
    return `${part1} ${part2} ${part3}`;
  } else {
    const parts = [];
    for (let i = 0; i < 16; i += 4) {
      parts.push(cleaned.slice(i, i + 4).padEnd(4, "•"));
    }
    return parts.join(" ");
  }
};

const detectCardType = (cardNumber: string): CardType => {
  if (!cardNumber) return "unknown";
  // Remove spaces once at beginning
  const cleaned = cardNumber.replace(/\s/g, "");
  if (!cleaned) return "unknown";
  // initial card categ
  const firstChar = cleaned.charAt(0);
  switch (firstChar) {
    case "4":
      return "visa";
    case "5":
      // 1-5 for traditional Mastercard
      const secondChar = cleaned.charAt(1);
      if (secondChar >= "1" && secondChar <= "5") {
        return "mastercard";
      }
      break;
    case "2":
      // New Mastercard BIN range starting with 2
      const secondDigit = cleaned.charAt(1);
      if (secondDigit === "2") {
        const thirdDigit = cleaned.charAt(2);
        // Check if  22xx-27xx range
        if (thirdDigit >= "0" && thirdDigit <= "7") {
          return "mastercard";
        }
      }
      break;
    case "3":
      // American Express 34 or 37
      const amexSecondChar = cleaned.charAt(1);
      if (amexSecondChar === "4" || amexSecondChar === "7") {
        return "amex";
      }
      break;
    case "6":
      // Discover cards start with 6
      const discoverSecondChar = cleaned.charAt(1);
      if (
        discoverSecondChar === "0" ||
        discoverSecondChar === "4" ||
        discoverSecondChar === "5" ||
        (discoverSecondChar === "2" && cleaned.charAt(2) === "2")
      ) {
        return "discover";
      }
      break;
  }

  return "unknown";
};

const CardLogo = ({ type }: { type: CardType }) => {
  switch (type) {
    case "visa":
      return (
        <svg className="h-8 w-12" viewBox="0 0 48 32" fill="none">
          <path
            d="M18.7 20.2L20.8 12h3.4l-2.1 8.2h-3.4zm9.6-5c-0.7-0.3-1.1-0.5-1.1-0.9 0-0.3 0.4-0.6 1.1-0.6 0.9-0.1 1.7 0.1 2.4 0.5l0.3-2.1c-0.8-0.3-1.7-0.5-2.7-0.5-3 0-5 1.6-5 3.8 0 1.7 1.5 2.6 2.6 3.1 1.2 0.6 1.6 1 1.6 1.5 0 0.8-1 1.1-1.8 1.1-1.1 0-2.1-0.2-3.1-0.8l-0.3 2.2c1 0.4 2.1 0.7 3.2 0.7 3.4 0 5.5-1.6 5.5-4 0-1.4-0.8-2.4-2.7-3zm8.3-3.3c-0.7 0-1.3 0.4-1.5 1.1l-3.6 7.3h3.4l0.5-1.4h3.1l0.3 1.4h3L39 12h-2.4zm-0.5 5.2l1.3-3.4 0.7 3.4h-2zm-16.2-5.2l-2.7 8.2h-3.2l-2.7-6.7c-0.2-0.4-0.3-0.6-0.8-0.8-0.7-0.3-2-0.7-2.5-0.8h0l3.1-0.1c0.8 0 1.5 0.6 1.7 1.3l1.5 5.1 2.4-6.3h3.2z"
            fill="white"
          />
        </svg>
      );
    case "mastercard":
      return (
        <svg className="h-8 w-12" viewBox="0 0 48 32" fill="none">
          <circle cx="18" cy="16" r="9" fill="#EB001B" fillOpacity="0.95" />
          <circle cx="30" cy="16" r="9" fill="#F79E1B" fillOpacity="0.95" />
          <path
            d="M24 10c2.5 1.5 4 4.1 4 7s-1.5 5.5-4 7c-2.5-1.5-4-4.1-4-7s1.5-5.5 4-7z"
            fill="#FF5F00"
            fillOpacity="0.8"
          />
        </svg>
      );
    case "amex":
      return (
        <svg className="h-8 w-12" viewBox="0 0 48 32" fill="none">
          <path
            d="M44 5H4C2.3 5 1 6.3 1 8v16c0 1.7 1.3 3 3 3h40c1.7 0 3-1.3 3-3V8c0-1.7-1.3-3-3-3z"
            fill="#016FD0"
          />
          <path
            d="M24 16l-2.2-5.2h-5.1v7.5l-4.5-7.5h-3.7v10.4h2.2v-7.7l4.7 7.7h2.2v-7.5c0.8 1.8 1.7 3.7 2.5 5.5h1.9l2.4-5.5v7.5h2.2v-10.4h-3.2L24 16zm17.7-5.2h-7.1v10.4h7.1v-2.2h-4.9v-2h4.8v-2.1h-4.8v-1.9h4.9v-2.2z"
            fill="white"
          />
        </svg>
      );
    case "discover":
      return (
        <svg className="h-8 w-12" viewBox="0 0 48 32" fill="none">
          <path
            d="M32 16c0 3.5-2.8 6.4-6.4 6.4-3.5 0-6.4-2.8-6.4-6.4 0-3.5 2.8-6.4 6.4-6.4 3.5 0 6.4 2.8 6.4 6.4z"
            fill="#FF6600"
          />
          <path
            d="M7.4 23.2h3.4c2.1 0 3.6-1.3 3.6-3.5v-0.1c0-1.8-1.1-2.9-2.8-3.1 1.2-0.3 2.1-1.3 2.1-2.7v-0.1c0-0.9-0.3-1.6-0.8-2.1-0.6-0.6-1.6-1-2.8-1H7.4v12.6zm2.2-7.7h1c1.1 0 1.8 0.5 1.8 1.4v0.1c0 0.9-0.7 1.4-1.8 1.4h-1v-2.9zm0-5h0.8c1.1 0 1.7 0.4 1.7 1.3v0.1c0 0.8-0.6 1.3-1.7 1.3h-0.8v-2.7zm11.1 12.9c3.8 0 6.6-2.9 6.6-6.5s-2.8-6.5-6.6-6.5c-3.8 0-6.6 2.9-6.6 6.5s2.8 6.5 6.6 6.5zm14.1-0.2h2.5l-4.1-12.6h-2.8l-4.1 12.6h2.4l0.8-2.6h4.5l0.8 2.6zm-5-4.6l1.5-5 1.5 5h-3z"
            fill="white"
          />
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
    <div
      className={`absolute inset-0 bg-gradient-to-br ${gradient} animate-gradient`}
      style={{
        backgroundSize: "200% 200%",
      }}
    />

    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDIiPjwvcmVjdD4KPC9zdmc+')] opacity-30" />

    <div className="absolute inset-0 overflow-hidden">
      <div className="animate-shine absolute top-10 -left-10 h-32 w-64 rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="bg-gradient-radial absolute top-10 right-20 h-40 w-40 rounded-full from-white/10 to-transparent blur-xl" />
      <div className="absolute bottom-5 left-5 h-20 w-20 rounded-full bg-white/5 blur-md" />
    </div>

    <div className="relative z-10 flex h-full flex-col justify-between p-6">
      <div className="flex items-start justify-between">
        {/* EMV chip */}
        <div className="relative h-10 w-14">
          <div className="absolute inset-0 rounded-md bg-gradient-to-br from-yellow-300/90 to-yellow-500/90" />
          <div className="absolute inset-0 rounded-md bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MCAxNiI+PHBhdGggZD0iTTAgMGg0MHYxNkgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDBoNDB2M0gwek0wIDVoNDB2M0gwek0wIDEwaDQwdjNIMHoiIGZpbGw9ImdvbGQiIGZpbGwtb3BhY2l0eT0iLjMiLz48L3N2Zz4=')] bg-cover" />
          <div className="absolute top-1/2 right-1 left-1 h-px -translate-y-1/2 bg-yellow-900/30" />
          <div className="absolute top-1 bottom-1 left-1/2 w-px -translate-x-1/2 bg-yellow-900/30" />
        </div>

        {/* Contactless payment symbol */}
        <div className="mr-2">
          <svg
            className="size-6 text-white/90"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.5 14.5C10 13 10 10 8.5 8.5M11.5 17.5C14 15 14 9 11.5 6.5M14.5 20.5C18 17 18 7 14.5 3.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

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
            {formatCardNumber(cardData.cardNumber, cardType)}
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <div className="mb-1 font-mono text-xs text-white/70">
              Cardholder Name
            </div>
            <div
              className="text-sm font-medium tracking-wide text-white uppercase drop-shadow-lg"
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
    <div
      className={`absolute inset-0 bg-gradient-to-br ${gradient} animate-gradient`}
      style={{
        backgroundSize: "200% 200%",
      }}
    />

    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDIiPjwvcmVjdD4KPC9zdmc+')] opacity-30" />

    <div className="relative z-10 flex h-full flex-col">
      {/* magnetic stripe */}
      <div className="mt-6 h-12 w-full bg-gradient-to-r from-black/90 via-black/80 to-black/90" />

      <div className="mt-6 flex flex-col space-y-4 px-4">
        {/* sig strip */}
        <div className="relative h-10 rounded bg-white/90">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAiPjxwYXRoIGQ9Ik0wLDE1IEMxNSw1LDM1LDI1LDU1LDEwIEM3NSwtNSw5NSwyNSwxMTUsMTAgQzEzNSwtNSwxNTUsMjUsMTc1LDEwIEMxOTUsLTUsMjE1LDI1LDIzNSwxMCBDMjU1LC01LDI3NSwyNSwyOTUsMTAgTDMwMCwzMCBMMCwzMCBaIiBmaWxsPSIjNTU1IiBmaWxsLW9wYWNpdHk9IjAuMiIvPjwvc3ZnPg==')] bg-cover opacity-50" />
          <div className="absolute top-0 right-2 flex h-full items-center">
            <div className="h-8 w-12 bg-white">
              <div className="flex h-full items-center justify-center font-mono text-sm font-bold text-gray-800">
                {cvc || "CVV"}
              </div>
            </div>
          </div>
        </div>

        {/* security info */}
        <div className="space-y-1 pt-2 text-xs text-white/70">
          <p>
            For customer service, call the number on the front of your card.
          </p>
          <p className="text-[10px]">
            This card is issued by Arasaka Bank pursuant to license by
            Visa/Mastercard. Use of this card constitutes acceptance of the
            cardholder agreement.
          </p>
        </div>
      </div>

      {/* Card issuer logo */}
      <div className="mt-auto flex items-center justify-end p-4">
        <div className="text-[10px] text-white/50">
          © {new Date().getFullYear()} Arasaka Bank
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
        className={`transform-style-3d relative h-56 w-full transition-all duration-700 ${isFlipped ? "rotate-y-180" : ""}`}
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
