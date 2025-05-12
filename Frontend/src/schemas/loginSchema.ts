import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .email("Formato de e-mail inválido")
        .nonempty("Email é obrigatório"),

    password: z
        .string()
        .min(6, "A senha deve ter no minimo 6 caracteres")
        .nonempty("A senha é obrigatória")
});

export type LoginData = z.infer<typeof loginSchema>;