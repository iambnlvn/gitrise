import { CardType } from "../../types";

export const CARD_GRADIENTS: Record<CardType, string> = {
  visa: "from-blue-600/90 via-blue-700/80 to-blue-800/90",
  mastercard: "from-slate-800/95 via-slate-900/90 to-black/95",
  amex: "from-teal-600/95 via-teal-700/90 to-teal-800/95",
  discover: "from-orange-500/95 via-orange-600/90 to-red-700/95",
  unknown: "from-gray-700/95 via-gray-800/90 to-gray-900/95",
};
