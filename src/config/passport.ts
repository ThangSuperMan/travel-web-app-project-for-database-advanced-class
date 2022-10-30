import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import User from '../models/user'

export default function(passport: any) {
  // err: Error, success: boolean
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email: string, password: string, done: any) => {
      // Match user
      User.findOne({ email: email })
        .then((user: any) => {
          console.log(`type of user: ${typeof user}`)
          if (!user) {
            console.log('We dont have this user inside the db')
            return done(null, user, { message: 'That email is not registered' })
          }

          // Match password
          bcrypt.compare(password, user, (err: Error, isMatch: boolean) => {
            if (err) throw err

            if (isMatch) {
              return done(null, user)
            } else {
              return done(null, false, { messaage: "Password incorrect" })
            }
          })
        })
        .catch((err: any) => {
          console.log(err)
        })

    })
  )
}
