// pages/api/home-builder.js

export default function handler(req, res) {
  const jsonLayout = [
    {
      type: "component",
      id: "header-1",
      widgetName: "HeaderWidget",
      props: {
        logo: "https://cdn.pixabay.com/photo/2023/09/14/10/27/face-logo-8252748_1280.png",
        menu: ["Home", "Politics", "Sports", "Entertainment"]
      }
    },
    {
      
        type: "component",
        id: "widget-1",
        widgetName: "Widget3",
        props: {
          title: "Top News",
          items: ["Story A", "Story B", "Story C"]
        }
      
    },
    {
      type: "row",
      id: "row-main",
      children: [
        {
          type: "column",
          id: "main-content",
          children: [
            {
              type: "component",
              id: "widget-1",
              widgetName: "Widget1",
              props: {
                title: "Top News",
                items: ["Story A", "Story B", "Story C"]
              }
            },
            {
              type: "component",
              id: "widget-2",
              widgetName: "Widget2",
              props: {
                title: "Featured",
                items: ["Feature A", "Feature B"]
              }
            }
          ]
        },
        {
          type: "column",
          id: "rhs-column",
          children: [
            {
              type: "component",
              id: "rhs-widget-1",
              widgetName: "RHSWidget",
              props: {
                heading: "Sponsored",
                ads: ["Ad1", "Ad2"]
              }
            },
            {
              type: "component",
              id: "rhs-widget-2",
              widgetName: "RHSWidget",
              props: {
                heading: "Editor's Choice",
                items: ["Opinion A", "Opinion B"]
              }
            }
          ]
        }
      ]
    },
    {
      type: "component",
      id: "footer-1",
      widgetName: "FooterWidget",
      props: {
        copyright:
          "© 2025 Times Now Marathi. All Rights Reserved.",
        links: ["Privacy Policy", "Terms of Service", "Contact"]
      }
    }
  ];

  res.status(200).json({
    status: true,
    response: {
      data: jsonLayout,
      seo: {
        title: "Latest Marathi News: Times Now Marathi | Maharashtra news in Marathi",
        description:
          "Latest Marathi News: Pune, Nashik, Mumbai Maharashtra News, Read the latest and breaking news only on Times Now Marathi",
        keywords:
          "Marathi News, Marathi News Latest, Latest News in Marathi, Maharashtra news in Marathi, Times Now Marathi, Times Now Marathi news",
        ogType: "website",
        canonical: "/",
        seopath: "/",
        alternate: "/",
        ogimage: "",
        dateModified: "",
        datePublished: "",
        amplink: "/amp",
        amphtml: "/amp",
        alternateApp: "",
        schema: ""
      }
    }
  });
}
