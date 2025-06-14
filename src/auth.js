import NextAuth, { CredentialsSignin } from "next-auth"
import credentials from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/credentials"
import UserModel from "./lib/models/UserModel";
import { compare } from 'bcryptjs'
import { ConnectDB } from "./lib/config/db";

// TODO
// connect with db
//custom page for login and signup both

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET
        }),
        credentials({
            name: "Credentials",
            email: {
                label: "Email",
                type: "email",
            },
            password: {
                label: "Password",
                type: "password"
            },
            authorize: async (credentials) => {
                console.log(email, password);
                const email = credentials.email;
                const password = credentials.password;

                if (!email || !password) {
                    throw new CredentialsSignin("Please provide both email and password");
                }

                // connect with database
                await ConnectDB();

                const user = await UserModel.findOne({ email }).select("password");

                if (!user) {
                    throw new CredentialsSignin("Invalid email or password");
                }

                if (!user.password) {
                    throw new CredentialsSignin("Invalid email or password");
                }

                const isMatch = await compare(password, user.password);
                if (!isMatch) {
                    throw new CredentialsSignin("Password not matched!");
                }

                return { name: user.name, email: user.email, id: user._id }
            }
        })
    ],
    callbacks: {},
    pages: { signIn: '/login', error: '/login?error' }
})
