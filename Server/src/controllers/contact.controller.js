import ContactService from "../services/contact.service";
import Contact from "../models/contact";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import otpgenerator from "../util/otpgenerator";

class contactController {
  // Get all
  async getAll(req, res) {
    try {
      const docs = await ContactService.getAll();
      return res.status(200).json(docs);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }
  // Insert
  async create(req, res) {
    const otp = otpgenerator.generateOTP(6);
    try {
      if (!req.body.email || !req.body.userId) {
        res.json({ success: false, msg: "Please pass email " });
      }
      let contact = await Contact.findOne({ email: req.body.email });
      if (contact) {
        return res.status(400).send("Contact with given email already exist!");
      } else {
        const newContant = {
          firstName:req.body.firstName,
          lastName:req.body.lastName,
          address:req.body.address,
          email:req.body.email,
          phone:req.body.phone,
          userId:req.body.userId,
          emailVerificationCode: otp,
        };
        let transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST,
          port: process.env.EMAIL_PORT,
          secure: false, // true for 465
          auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD, // generated ethereal password
          },
        });
      
      let info = await transporter.sendMail({
          to: newUser.email, // list of receivers${otp} 
          subject: 'Email verifaction',
          html: `<p>Enter the otp:<span style="color: tomato;font-size: 25px;letter-spacing: 2px;"> <b> ${otp} </b> </span>to verify your email address</p>`
          
        }); 
        const data = new Contact(newContant);
        const obj = await data.save();
        return res
          .status(200)
          .json({
            message: "An Email sent to your account please verify",
            userId: obj._id,
          });
      }
    } catch (error) {
      res.status(500).send("An error occured");
    }
  }

  async verify(req, res) {
    const { id, otp } = req.body;

    if (!otp || !id) {
      res.status(400).json({ error: "Please Enter Your OTP " });
    }
    try {
      const contact = await Contact.findOne({ _id: id });
      if (contact.emailVerificationCode === otp) {
        if (contact.verified)
          throw new UnauthorizedError("Email already verified.");
        else {
          contact.verified = true;
          contact.emailVerificationCode = undefined;
          const contacts = await contact.save();
          return res.json({
            success: true,
            msg: " Contact is Created successfully.",
            contacts: contacts,
          });
        }
      } else {
        await Contact.deleteOne(contact._id);
        res.status(400).json({ error: "Verification code is wrong" });
      }
    } catch (error) {
      res.status(400).json({ error: "Invalid Details" });
    }
  }

  // Get by id
  async get(req, res) {
    try {
      const obj = await ContactService.getById({ _id: req.params.id });
      if (obj) {
        return res.status(200).json(obj);
      } else {
        return res.status(400).json({ error: "contact not found" });
      }
    } catch (err) {
      return res.status(400).json({ error: "contact not found" });
    }
  }

  // Update by id
  async put(req, res) {
    const data = {
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        address:req.body.address,
        email:req.body.email,
        phone:req.body.phone,
        userId:req.body.userId
    };
    const id = req.params.id;

    try {
      const contact = await ContactService.update(id, data);
      return res
        .status(200)
        .json({ success: true, message: " contact is Updated successfully." });
    } catch (err) {
      return res
        .status(400)
        .json({ success: false, message: "contact does not exist!" });
    }
  }
  // Delete by id
  async delete(req, res) {
    try {
      await ContactService.delete({ _id: req.params.id });
      return res.json({
        success: true,
        message: " contact is Deleted successfully.",
      });
    } catch (err) {
      return res
        .status(400)
        .json({ success: false, message: "contact does not exist!" });
    }
  }
}

export default new contactController();