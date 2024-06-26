# Gold Loan Journey (Frontend)

This is a responsive loan application frontend built with Next.js, Tailwind CSS, and Material UI. It consists of a multi-step form that guides the user through signing up, verifying their phone number with an OTP, entering address details, and selecting loan details.

---

## Features

Responsive Design: Optimized for both mobile and laptop devices.

Multi-Step Form: Includes a sign-up page, address details page, and loan details page with a dynamic stepper component.

OTP Verification: Users can only proceed after verifying their phone number with an OTP.

Loan Amount Selection: Users can select a loan amount using a slider.

---

## Technologies Used

Next.js - The React framework for production.

Tailwind CSS - A utility-first CSS framework for rapid UI development.

Material UI - React components for faster and easier web development.

---

## Pages

### Sign-Up Page

Users must enter their name, phone number, and agree to the terms and conditions.
Clicking the "Verify" button opens an OTP dialog box.
Users must enter the OTP to proceed to the next step.

***

### Address Details Page

Users must enter their address details.
A dynamic stepper component indicates the current step in the form.

___

### Loan Details Page

Users select a loan amount using a slider.
Users select the loan mode.
The dynamic stepper component continues to indicate the current step.

---

## Getting Started

### Prerequisites

Node.js, npm, Next.js, Material-UI, TailwindCSS


### Installation

Clone the repository:

```
git clone https://github.com/abbas-13/kashti-gold-journey.git
```
```
cd loan-application-frontend
```

Install dependencies:

```
npm install
```

Run the development server:

```
npm run dev
```

Open ```http://localhost:3000``` with your browser to see the result.

---

### Folder Structure

```
├── components
│   ├── AddressDetails.js
│   ├── LoanDetails.js
│   ├── OTPDialog.js
│   ├── SignUp.js
│   ├── Stepper.js
├── pages
│   ├── _app.js
│   ├── index.js
│   ├── address.js
│   ├── loan.js
│   ├── signup.js
├── styles
│   ├── globals.css
│   ├── tailwind.css
├── public
│   ├── images
│   ├── logos
├── .gitignore
├── package.json
├── tailwind.config.js
└── README.md
```

---

### Customization

Tailwind CSS: Customize the tailwind.config.js file to change the default styles.
Material UI: Override Material UI styles by using the sx prop or creating custom theme settings.


### License
This project is licensed under the MIT License.

###Contact
For any questions or inquiries, please contact mo98abbas@gmail.com.
