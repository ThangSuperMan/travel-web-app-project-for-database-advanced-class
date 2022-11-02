import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcryptjs'
import User from '../models/user'

export default function setUpPassport(passport: any) {

  // done: (error: any, user?: any, options?: IVerifyOptions) => void
  passport.use(
    new LocalStrategy({ usernameField: "email", passwordField: "password" }, (email: string, password: string, done: any) => {
      console.log(`passport: ${done}`)
      console.log('new LocalStrategy')
      console.log(`email: ${email}`)
      console.log(`passport: ${password}`)

      // Match user
      User.findOne({ email: email })
        .then((user: any) => {
          console.log("then")
          if (user == null) {
            console.log('User is null')
            return done(null, false, { message: 'That email is not registered' })
          }

          // Match password
          bcrypt.compare(password, user.password, (err: Error, isMatch: boolean) => {
            if (err) throw err

            if (isMatch) {
              console.log(`isMatch: ${isMatch}`)
              return done(null, user)
            } else {
              console.log(`isMatch: ${isMatch}`)
              return done(null, false, { message: "Password incorrect" })
            }
          })
        })
        .catch((err: any) => {
          console.log(err)
        })
    })
  )

  // passport.serializeUser(function(user: any, done: any) {
  //   done(null, user.id);
  // });
  //
  // passport.deserializeUser(function(id: any, done: any) {
  //   User.findById(id, (err: Error, user: any) => {
  //     done(err, user);
  //   });
  // });
}
