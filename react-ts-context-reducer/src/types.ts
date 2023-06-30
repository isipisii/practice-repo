export type Item = {
    itemName: string;
    img: string;
    price: number;
    id: string;
    quantity: number;
};

export enum ActionType {
    ADD_TO_CART = "ADD_TO_CART",
    REMOVE_TO_CART = "REMOVE_TO_CART",
    INCREASE_QTY = "INCREASE_QTY",
    DECREASE_QTY = "DECREASE_QTY",
    CALCULATE_TOTAL = "CALCULATE_TOTAL",
    GET_ITEMS = "GET_ITEMS",
}

export type ItemActions =
    | { type: ActionType.ADD_TO_CART; payload: Item }
    | { type: ActionType.REMOVE_TO_CART; payload: string }
    | { type: ActionType.INCREASE_QTY; payload: string }
    | { type: ActionType.DECREASE_QTY; payload: string }
    | { type: ActionType.CALCULATE_TOTAL }
    | { type: ActionType.GET_ITEMS; payload: Item[] };

export type States = {
    items: Item[];
    cartItems: Item[];
    cartItemQuantity: number;
    total: number;
};
