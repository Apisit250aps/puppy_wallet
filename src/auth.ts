import { MongoDBAdapter } from '@auth/mongodb-adapter';
import NextAuth from 'next-auth'
import client from './lib/db';
import authConfig from './auth.config';

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(client),
  ...authConfig
})