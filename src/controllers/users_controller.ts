import { Request, Response } from "express";
import { IUsers } from "../types/interfaces";
const UsersModel = require("../models/users_model");

// Get Users
exports.GetUsers = (req: Request, res: Response) => {
  UsersModel.find()
    .then((users: Array<IUsers>) => {
      res.send(users);
    })
    .catch((err: any) => {
      console.log(err);
      res.send("Error!")
    });
};

// Get User
exports.getUser = (req: Request, res: Response) => {
  UsersModel.findById(req.params.id)
    .then((user: IUsers) => {
      res.send(user);
    })
    .catch((err: any) => {
      console.log(err);
      res.send("Error!")
    });
};

// Create User
exports.createUser = (req: any, res: Response) => {

  // Example on string
  const email = req.body.email;

  const phoneNumber = req.body.phoneNumber;
  const password = req.body.password;
  const profilePicture = req.body.profilePicture;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  // Example on Enum
  

  const book = new BookModel({
    title,
    author,
    summary,
    isbn,
    genre,
  });
  book
    .save()
    .then(async (e: any) => {
      res.json("Book inserted!");
    })
    .catch((err: any) => res.status(400).json(err));
};

// Handle book delete on POST.
exports.book_delete_post = (req: Request, res: Response) => {
  BookModel.findByIdAndDelete(req.params.id)
    .then((e: any) => {
      res.json("Book deleted");
    })
    .catch((err: any) => res.status(400).json(err));
};

// Handle book update on POST.
exports.book_update_post = (req: Request, res: Response) => {
  BookModel.findById(req.params.id)
    .then((book: any) => {
      book.title = req.body.title??book.title;
      book.author = req.body.author == null?book.author:req.body.author;
      book.summary = req.body.summary;
      book.isbn = req.body.isbn;
      book.genre = req.body.genre;
      book
        .save()
        .then((e: any) => {
          res.json("Book updated!");
        })
        .catch((err: any) => res.status(400).json(err));
    })
    .catch((err: any) => res.status(400).json(err));
};