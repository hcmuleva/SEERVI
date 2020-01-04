
export default function () {
    return [
        {
            title: "Blog Dashboard",
            to: "/blog-overview",
            htmlBefore: '<i class="material-icons">edit</i>',
            htmlAfter: ""
          },
         
          {
            title: "Blog Posts",
            htmlBefore: '<i class="material-icons">vertical_split</i>',
            to: "/blog-posts",
          }
    ]
}
