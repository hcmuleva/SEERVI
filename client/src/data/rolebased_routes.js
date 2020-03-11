export default function() {
    return [
      {
        title: "superadmin",
        to: "/SuperAdmin",
        htmlBefore: '<i class="material-icons">edit</i>',
        
      },
      {
        title: "orgadmin",
        to: "/OrgAdmin",
        htmlBefore: '<i class="material-icons">edit</i>',
        
      },
      {
        title: "groupadmin",
        to: "/GroupAdmin",
        htmlBefore: '<i class="material-icons">edit</i>',
        
      },
      {
        title: "subgroupadmin",
        to: "/SubGroupAdmin",
        htmlBefore: '<i class="material-icons">edit</i>',
        
      },
      {
        title: "principal",
        htmlBefore: '<i class="material-icons">line_style</i>',
        to: "/Principal",
      },
      {
        title: "teacher",
        htmlBefore: '<i class="material-icons">line_style</i>',
        to: "/Teacher",
      },
      {
        title: "student",
        htmlBefore: '<i class="material-icons">line_style</i>',
        to: "/Student",
      },

      {
        title: "parent",
        htmlBefore: '<i class="material-icons">line_style</i>',
        to: "/Parent",
      },
      {
        title: "Forgot Password",
        htmlBefore: '<i class="material-icons">list</i>',
        to: "/ForgotPassword",
      }
    ];
  }
  