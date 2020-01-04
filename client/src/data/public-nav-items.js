export default function() {
    return [
      {
        title: "Login",
        to: "/",
        htmlBefore: '<i class="material-icons">edit</i>',
        htmlAfter: ""
      },
      {
        title: "Register",
        htmlBefore: '<i class="material-icons">vertical_split</i>',
        to: "/Register",
      },
      {
        title: "Forgot Password",
        htmlBefore: '<i class="material-icons">vertical_split</i>',
        to: "/ForgotPassword",
      }
    ];
  }
  