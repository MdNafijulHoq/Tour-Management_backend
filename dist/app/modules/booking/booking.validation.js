"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookingStatusZodSchema = exports.createBookingZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const booking_intreface_1 = require("./booking.intreface");
exports.createBookingZodSchema = zod_1.default.object({
    tour: zod_1.default.string(),
    guestCount: zod_1.default.number().int().positive()
});
exports.updateBookingStatusZodSchema = zod_1.default.object({
    status: zod_1.default.enum(Object.values(booking_intreface_1.BOOKING_STATUS)),
});
