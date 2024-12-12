import { type StripeGatewayId } from "./StripeElements/types";
import { type PaymentGatewayConfig } from "@/checkout/graphql";

export type PaymentGatewayId = StripeGatewayId;

export type ParsedStripeGateway = ParsedPaymentGateway<StripeGatewayId, {}>;

export type ParsedPaymentGateways = ReadonlyArray<ParsedStripeGateway>;

export interface ParsedPaymentGateway<ID extends string, TData extends Record<string, any>>
	extends Omit<PaymentGatewayConfig, "data" | "id"> {
	data: TData;
	id: ID;
}

export type PaymentStatus = "paidInFull" | "overpaid" | "none" | "authorized";
