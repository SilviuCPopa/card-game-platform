
export interface Card {
  name: string;
  form: string;
  color: string;
}

export interface PlayerHand {
  cards: Card[];
  limit?: number;
}
