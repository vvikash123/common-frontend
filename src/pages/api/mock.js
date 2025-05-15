// pages/api/home-builder.js

export default function handler(req, res) {
  const jsonsample = [
    {
      type: "row",
      id: "DT2j8jLmTU",
      children: [
        {
          type: "column",
          id: "XuD_nEt9C6",
          children: [
            {
              id: "RFab1uALW",
              type: "component",
              content: "widget2"
            }
          ]
        },
        {
          type: "column",
          id: "XuD_nEt9C4",
          children: [
            {
              id: "RFab1uALW",
              type: "component",
              content: "widget3"
            }
          ]
        }
      ]
    },
    {
      type: "row",
      id: "DpvTHGbVdn",
      children: [
        {
          type: "column",
          id: "8s8Y4oVB-l",
          children: [
            {
              id: "jLSMszeXs",
              type: "component",
              content: "widget3"
            },
            {
              id: "nhghFz6u4",
              type: "component",
              content: "widget1"
            },
            {
              id: "HRfjVdYdZ",
              type: "component",
              content: "widget1"
            }
          ]
        },
        {
          type: "column",
          id: "1KY4BrB0OJ",
          children: [
            {
              id: "iTFC5I36y",
              type: "component",
              content: "widget3"
            }
          ]
        },
        {
          type: "column",
          id: "8pMCjQ7pqn",
          children: [
            {
              id: "l59kU-gA9",
              type: "component",
              content: "widget2"
            }
          ]
        }
      ]
    }
  ];

  res.status(200).json({
    status: true,
    response: {
      data: jsonsample,
      seo: {
        title: "Latest Marathi News:Times Now Marathi | Maharashtra news in marathi",
        description:
          "Latest Marathi News: Pune, Nashik, Mumbai  Maharashtra News, Read the latest and breaking news only on Times Now Marathi",
        keywords:
          "Marathi News, Marathi News Latest, Latest News in Marathi, Maharashtra news in marathi, Times Now Marathi, Times Now Marathi news",
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
