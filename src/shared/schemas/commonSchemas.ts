import { z } from 'zod';

export const idSchema = z.number().int().positive();

export const nonEmptyStringSchema = z.string().min(1);

export const nonNegativeNumberSchema = z.number().nonnegative();

export const isoDateTimeSchema = z.iso.datetime();

export const dateStringSchema = z.iso.date();

export const urlSchema = z.url();

export const emailSchema = z.email();
