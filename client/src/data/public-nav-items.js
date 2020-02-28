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
        htmlBefore: '<i class="material-icons">line_style</i>',
        to: "/Register",
      },
      {
        title: "Forgot Password",
        htmlBefore: '<i class="material-icons">list</i>',
        to: "/ForgotPassword",
      }
    ];
  }
  