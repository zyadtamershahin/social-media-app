import z, { email } from "zod";

export const login_schema ={
    body : z.object({
        email: z.string().email(),
        password: z.string().min(24),
    })
}
export const signup_schema = {
    body: z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        confirmPassword: z.string().min(6),
        age:z.number().min(12).max(50),
        phone:z.string()
    }).superRefine((data, ctx) => {
        if (data.password !== data.confirmPassword) {
            ctx.addIssue({
                code: "custom",
                message: "Passwords do not match",
                path: ["confirmPassword"],
            })
        }
    }
    )
}

export interface loginDto {
    name: string;
    age: number;
    email: string;
    password: string;
    isVerified: boolean;
}
