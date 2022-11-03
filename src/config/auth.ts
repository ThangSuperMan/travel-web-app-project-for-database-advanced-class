import { Request, Response, NextFunction } from "express"

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  console.log('ensureAuthenticated')
  console.log(`path: ${req.path}`)
  if (req.isAuthenticated()) {
    return next()
  }

  // if (req.isAuthenticated() && req.path === "/users/login") {
  //   console.log('req.isAuthenticated() && req.path === "/users/login"')
  //   return next()
  // }

  console.log(`req.isAuthenticated(): ${req.isAuthenticated()}`)
  req.flash("error_msg", "Please log in to view this resources")
  res.redirect("/users/login")
}

