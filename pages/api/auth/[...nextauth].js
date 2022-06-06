import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

const userCata = {
  csrfToken: "16d5c19d0c22059793de23406140e67dbdc1f8a5ae579b5185ae83d562cda7e6",
  email: "catalin.achim@continental.com",
  password: "Andree@.11",
};

const userDani = {
  csrfToken: "16d5c19d0c22059793de23406140e67dbdc1f8a5ae579b5185ae83d562cda7e6",
  email: "daniel.novotni@continental.com",
  password: "Qwerty1!",
};

const userGabriela = {
  csrfToken: "16d5c19d0c22059793de23406140e67dbdc1f8a5ae579b5185ae83d562cda7e6",
  email: "gabriela.laslau@continental.com",
  password: "qwertyuiop",
};

const userDiana = {
  csrfToken: "16d5c19d0c22059793de23406140e67dbdc1f8a5ae579b5185ae83d562cda7e6",
  email: "diana.iovin@continental.com",
  password: "Continental66",
};

const userVasi = {
  csrfToken: "16d5c19d0c22059793de23406140e67dbdc1f8a5ae579b5185ae83d562cda7e6",
  email: "vasile.culda@continental.com",
  password: "Palinca",
};

const userCipri = {
  csrfToken: "16d5c19d0c22059793de23406140e67dbdc1f8a5ae579b5185ae83d562cda7e6",
  email: "ciprian.butnaru@continental.com",
  password: "hocuspocus",
};

const userAlex = {
  csrfToken: "16d5c19d0c22059793de23406140e67dbdc1f8a5ae579b5185ae83d562cda7e6",
  email: "alexandru.grecu@continental.com",
  password: "12345",
};

const userAdi = {
  csrfToken: "16d5c19d0c22059793de23406140e67dbdc1f8a5ae579b5185ae83d562cda7e6",
  email: "adrian.balan@continental.com",
  password: "3ng1n33r",
};

const userMarius = {
  csrfToken: "16d5c19d0c22059793de23406140e67dbdc1f8a5ae579b5185ae83d562cda7e6",
  email: "marius.raescu@continental.com",
  password: "tm10rma",
};

const userIon = {
  csrfToken: "16d5c19d0c22059793de23406140e67dbdc1f8a5ae579b5185ae83d562cda7e6",
  email: "ion.jerdea@continental.com",
  password: "Tranzistor14",
};

const userNicoleta = {
  csrfToken: "16d5c19d0c22059793de23406140e67dbdc1f8a5ae579b5185ae83d562cda7e6",
  email: "nicoleta.petrasca@continental.com",
  password: "nico1234",
};

export default NextAuth({
  providers: [
    Github({}),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      async authorize(credentials, req) {
        console.log(credentials);
        if (
          userCata.email === credentials.email &&
          userCata.password === credentials.password
        ) {
          console.log("User OK");
          return userCata;
        } else if (
          userDani.email === credentials.email &&
          userDani.password === credentials.password
        ) {
          console.log("User OK");
          return userDani;
        } else if (
          userGabriela.email === credentials.email &&
          userGabriela.password === credentials.password
        ) {
          console.log("User OK");
          return userGabriela;
        } else if (
          userDiana.email === credentials.email &&
          userDiana.password === credentials.password
        ) {
          console.log("User OK");
          return userDiana; 
        } else if (
          userVasi.email === credentials.email &&
          userVasi.password === credentials.password
        ) {
          console.log("User OK");
          return userVasi;
        } else if (
          userCipri.email === credentials.email &&
          userCipri.password === credentials.password
        ) {
          console.log("User OK");
          return userCipri;
        } else if (
          userAlex.email === credentials.email &&
          userAlex.password === credentials.password
        ) {
          console.log("User OK");
          return userAlex;
        } else if (
          userAdi.email === credentials.email &&
          userAdi.password === credentials.password
        ) {
          console.log("User OK");
          return userAdi;
        } else if (
          userMarius.email === credentials.email &&
          userMarius.password === credentials.password
        ) {
          console.log("User OK");
          return userMarius;
        } else if (
          userIon.email === credentials.email &&
          userIon.password === credentials.password
        ) {
          console.log("User OK");
          return userIon;
        } else if (
          userNicoleta.email === credentials.email &&
          userNicoleta.password === credentials.password
        ) {
          console.log("User OK");
          return userNicoleta;      
        } else {
          console.log("User NOK");
          throw new Error("Invalid account");
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  secret: "Sy21b2!G*&JY!GYGaknlngkdsbsi!NUI#GVUYT!^&Vy",
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      const redURL = baseUrl + ":3000" + "/signin";
      return redURL;
    },
    async session({ session, token, user }) {
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
  },
});
