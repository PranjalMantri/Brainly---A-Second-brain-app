import { Schema, Document, model, CallbackError, Types } from "mongoose";
import bcrypt from "bcrypt";

interface CreateUserInput {
  email: string;
  username: string;
  password: string;
}

interface UserDocument extends CreateUserInput, Document {
  _id: Types.ObjectId;
  updateAt: Date;
  createdAt: Date;
  comparePasswords(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as CallbackError);
  }
});

userSchema.methods.comparePasswords = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = model<UserDocument>("User", userSchema);

export { User, CreateUserInput, UserDocument };
