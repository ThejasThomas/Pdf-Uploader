import { z } from "zod";

export const extractPdfSchema = z.object({
  fileName: z.string().min(1, "File name is required"),
  pages: z.array(z.number().int().nonnegative())
});

export type ExtractPdfDTO = z.infer<typeof extractPdfSchema>;
