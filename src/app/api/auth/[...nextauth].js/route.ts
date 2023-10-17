import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import api from "@/lib/api"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      name:'credentials',

      credentials: {
        email: { 
          label: 'email', 
          type: 'email',
          placeholder: 'example@example.com'
        },
        password: { 
          label: 'password', 
          type: 'password' 
        }
      },

      async authorize(credentials) {
        const body = {
          email: credentials?.email,
          password: credentials?.password
        }

        await api.post('/auth', body)
        .then(response => {
          console.log(response)
          return response;
        }).catch(error => {
          console.error(error);
        });;
        
        return null;
      }
    })
  ]
}
export default NextAuth(authOptions)