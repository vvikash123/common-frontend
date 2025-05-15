// rewrites.js
module.exports = [
  {
    source: "/",
    destination: "/home",
  },
  {
    source: '/:category/(.*)-article-:id',
    destination: '/articleShow'
},
{
    source: '/:category/(.*)-article-:id/amp',
    destination: '/articleShow/amp'
},
 
  {
    source: "/colleges",
    destination: "/CollegeList",
  },
  {
    source: "/college/:collegeNameSlug/:category(courses|fees|admissions|reviews|placements|cut-offs|rankings|infrastructure|faculty|compare|questions-answers|scholarships|news)",
    destination: "/collageDetailPage",
  },
  {
    source: "/colleges/:top-(.*)-in-(.*)",
    destination: "/CollegeList",
  },
  {
    source: '/:category',
    destination: '/articlePhotoList/:category'
    },
    {
      source: "/college/:collegeNameSlug",
      destination: "/collageDetailPage",
    },

];
