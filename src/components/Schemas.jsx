import * as yup from "yup";

export const LoginSchama = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(10).required()
});

export const EmailCfSchama = yup.object({
  email: yup.string().email().required("Email Required"),
});
export const OtpSchama = yup.object({
  // otp: yup.string().required("Otp Required"),
  otp: yup.string().trim().min(4,"otp length must be 4 digit").max(4,"otp length maximum 4 digit").required("Otp Required"),
});
export const EmailOtpSchama = yup.object({
  // otp: yup.string().required("Otp Required"),
  otp: yup.string().trim().min(4,"otp length must be 4 digit").max(4,"otp length maximum 4 digit").required("Otp Required"),
});
export const CommentSchama = yup.object({
  // otp: yup.string().required("Otp Required"),
  comment: yup.string().required("Comment Required"),
});
export const ChangePasswordSchama= yup.object({
  password: yup.string().trim().min(10,"password length must be 10 characters").required("password required"),
  confirmpassword: yup.string().trim().min(10,"confirm password length must be 10 characters").required().oneOf([yup.ref("password")], "confirm password not match"),
});

const phoneRegExps = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


export const SellerSchema = yup.object().shape({
  address1: yup.string().required("Address1 Name Required"),
  address2: yup.string().required("Address2 Name Required"),
  city: yup.string().required("city required"),
  state: yup.string().required("state required"),
  zipcode: yup.string().required("Zipcode required"),
  country: yup.string().required("Country Name Required"),
})
export const CarlistSchema = yup.object().shape({
  fullName: yup.string().required("Fullname required"),
  address: yup.string().required("Address  required"),
  city: yup.string().required("City required"),
  phoneNumber: yup.string().required("Phone number required"),
  seller: yup.string().required("Seller required"),
  email: yup.string().required("Email required"),

  year: yup.string().required("Year required"),
  brand: yup.string().required("Brand required"),
  fuelType: yup.string().required("Fuel type required"),
  carType: yup.string().required("Car type required"),
  transmissionType: yup.string().required("Transmission type required"),
  mileage: yup.string().required("Mileage required"),
  condition: yup.string().required("Condition required"),
  model: yup.string().required("Model required"),
  numberOfOwners: yup.string().required("Number of owners required"),
  additionalInformation: yup.string().required("Additional information required"),
  significantDamages: yup.string().required("Significant damage required"),
  reservePrice: yup.string().required("Reverse Price required"),
  ownerName: yup.string().required("Owner name required"),
  carCity: yup.string().required("City required"),
  carZipcode: yup.string().required("Zipcode required"),
})
export const Carlist2Schema = yup.object().shape({
  reservePrice: yup.string().required("Reverse Price required"),
  ownerName: yup.string().required("Owner name required"),
  carCity: yup.string().required("City required"),
  carZipcode: yup.string().required("Zipcode required"),

  carOwnedBy: yup.string().required("Car owned by required"),
 
  Price: yup.string().required("Price required"),
  referral: yup.string().required("Referral required"),
})
export const CredicardSchema = yup.object().shape({
  name: yup.string().required("Full Name Required"),
  cardNumber: yup.string().matches(phoneRegExps, 'Card number is not valid'),
  cvv: yup.string().matches(/^\d{3}$/, 'CVV must be a 3-digit number').required('CVV is required'),
  expirationDate: yup
    .string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiration Date must be in the format MM/YY')
    .required('Expiration Date is required'),
  
})

export const RegistrationSchema = yup.object().shape({
  fullName: yup.string().required("Full Name Required"),
  phoneNumber: yup.string().matches(phoneRegExps, 'Phone number is not valid'),
  email: yup.string().email().required("email required"),
  password: yup.string().min(10).required(),
//   confirmPassword: yup.string().min(10).required().oneOf([yup.ref("password")], "confirm password not match"),

})

export const EmployeeRegistrationSchema = yup.object().shape({
  firstName: yup.string().required("First Name Required"),
  lastName: yup.string().required("Last Name Required"),
  phoneNumber: yup.string().matches(phoneRegExps, 'Phone number is not valid'),
  email: yup.string().email().required("email required"),
  password: yup.string().min(10).required(),
//   confirmPassword: yup.string().min(10).required().oneOf([yup.ref("password")], "confirm password not match"),

})
export const EmployerStep1Schema = yup.object().shape({
  firstName: yup.string().required("First name required"),
  lastName: yup.string().required("Last name required"),
  email: yup.string().email("Invalid email").required("Email required"),
  designation: yup.string().required("Designation required"),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number required"),
});
export const EmployerStep2Schema = yup.object().shape({
  organizationName: yup.string().required("Organization name required"),
  organizationCity: yup.string().required("City required"),
  industry: yup.string().required("Industry required"),
  numberOfEmployees: yup.string().required("Number of employees required"),
  organizationDescription: yup
    .string()
    .min(20, "Description must be at least 20 characters")
    .required("Description required"),
});
export const EmployerStep3Schema = yup.object().shape({
  opportunityType: yup.string().required("Select opportunity type"),
  title: yup.string().required("Job/Internship title required"),
  skillsRequired: yup.string().required("Skills required"),
  jobType: yup.string().required("Select job type"),
  partFullTime: yup.string().required("Select part/full time"),
  numberOfOpenings: yup
    .number()
    .typeError("Must be a number")
    .positive("Must be positive")
    .required("Number of openings required"),
  description: yup
    .string()
    .min(50, "Description must be at least 50 characters")
    .required("Description required"),
});

function getExtension(path) {

  if (path !== undefined) {

      var basename = path.split(/[\\/]/).pop(),  // extract file name from full path ...
          // (supports `\\` and `/` separators)
          pos = basename.lastIndexOf(".");       // get last position of `.`

      if (basename === "" || pos < 1)            // if file name is empty or ...
          return "";                             //  `.` not found (-1) or comes first (0)

      return basename.slice(pos + 1);            // extract extension ignoring `.`
  } else {
      return "";
  }
}