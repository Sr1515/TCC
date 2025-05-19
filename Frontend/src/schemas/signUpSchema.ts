import { z } from "zod";


export const signUpSchema = z.object({
    username: z
        .string()
        .nonempty("Username é obrigatório"),

    email: z
        .string()
        .email("Formato de e-mail inválido")
        .nonempty("Email é obrigatório"),

    password: z
        .string()
        .min(6, "A senha deve ter no mínimo 6 caracteres")
        .nonempty("A senha é obrigatória"),
});

export type SignUpData = z.infer<typeof signUpSchema>;