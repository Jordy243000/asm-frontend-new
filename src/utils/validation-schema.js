import * as Yup from "yup";

// law_schema
export const law_schema = Yup.object().shape({
  firstName: Yup.string().required().label("First Name"),
  lastName: Yup.string().required().label("Last Name"),
  email: Yup.string().required().email().label("Email"),
  phone: Yup.string().required().min(11).label("Phone"),
  msg: Yup.string().required().min(20).label("Message"),
});

// contact_schema
export const contact_schema = Yup.object().shape({
  name: Yup.string().required("Le nom est requis.").label("Nom"),
  email: Yup.string()
    .required("L'email est requis.")
    .email("Veuillez entrer une adresse email valide.")
    .label("Email"),
  phone: Yup.string()
    .required("Le numéro de téléphone est requis.")
    .matches(
      /^[0-9]{10,15}$/,
      "Entrer uniquement des chiffres(entre 10 et 15 chiffres)"
    )
    .label("Téléphone"),
  subject: Yup.string()
    .required("Veuillez sélectionner un sujet.")
    .label("Sujet"),
  msg: Yup.string()
    .required("Le message ne peut pas être vide.")
    .label("Message"),
});

// contact_schema
export const portfolio_schema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  phone: Yup.string().required().min(11).label("Phone"),
  subject: Yup.string().required().label("Subject"),
  msg: Yup.string().required().min(20).label("Message"),
});

export const register_schema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

export const login_schema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

export const blogSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  number: Yup.string().required().min(11).label("Number"),
  msg: Yup.string().required().min(20).label("Message"),
  terms: Yup.bool().oneOf([
    true,
    "You need to accept the terms and conditions",
  ]),
});
