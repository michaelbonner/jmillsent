module.exports = {
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io'],
  },
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  async redirects() {
    return [
      {
        source: '/client-question-form',
        destination: '/contact',
        permanent: true,
      },
      { source: '/rentals-request', destination: '/contact', permanent: true },
      { source: '/sample-page', destination: '/', permanent: true },
      { source: '/front-page/films', destination: '/work', permanent: true },
      { source: '/roster', destination: '/about#team', permanent: true },
      { source: '/services', destination: '/about#services', permanent: true },
      { source: '/reel', destination: '/about#reel', permanent: true },
      {
        source: '/casestudies/webb-who-we-are',
        destination: '/work/webb-who-we-are',
        permanent: true,
      },
      {
        source: '/casestudies/university-of-mississippi-medical-center',
        destination: '/work/ummc-here-in-mississippi',
        permanent: true,
      },
      {
        source: '/casestudies/panasonic-toughbook',
        destination: '/work/verizon-fire',
        permanent: true,
      },
      { source: '/casestudies', destination: '/work', permanent: true },
      {
        source: '/casestudies/ford-imagine',
        destination: '/work/ford-imagine',
        permanent: true,
      },
      {
        source: '/casestudies/packsize-mission',
        destination: '/work/packsize-mission',
        permanent: true,
      },
      {
        source: '/casestudies/doterra-all-yours',
        destination: '/work/doterra-all-yours',
        permanent: true,
      },
      {
        source: '/casestudies/doterra-special-gift',
        destination: '/work/doterra-special-gift',
        permanent: true,
      },
      {
        source: '/casestudies/lincoln-aviator',
        destination: '/work/lincoln-sunday-drive',
        permanent: true,
      },
      {
        source: '/casestudies/k12',
        destination: '/work/k12-education-for-any-one',
        permanent: true,
      },
      {
        source: '/films/panasonic-toughbook-police',
        destination: '/work/verizon-police',
        permanent: true,
      },
      {
        source: '/films/panasonic-toughbook-fire',
        destination: '/work/verizon-fire',
        permanent: true,
      },
      { source: '/films', destination: '/work', permanent: true },
      {
        source: '/films/panasonic-toughbook-ems',
        destination: '/work/verizon-emt',
        permanent: true,
      },
      { source: '/films/613', destination: '/work', permanent: true },
      {
        source: '/films/webb-who-we-are',
        destination: '/work/webb-who-we-are',
        permanent: true,
      },
      {
        source: '/films/traeger-grills-d2',
        destination: '/work/traeger-d2',
        permanent: true,
      },
      {
        source: '/films/ford-f-150',
        destination: '/work/ford-imagine',
        permanent: true,
      },
      {
        source: '/films/yes-gum',
        destination: '/work/back-to-work',
        permanent: true,
      },
      {
        source: '/films/k12-education-for-any-one',
        destination: '/work/k12-education-for-any-one',
        permanent: true,
      },
      {
        source: '/films/traeger-all-new-app',
        destination: '/work/traeger-all-new-app',
        permanent: true,
      },
      {
        source: '/films/built-bar',
        destination: '/work/built-bar-all-the-flavor',
        permanent: true,
      },
      {
        source: '/films/ram-trucks',
        destination: '/work/ram-hey-america',
        permanent: true,
      },
      {
        source: '/films/packsize-mission',
        destination: '/work/packsize-mission',
        permanent: true,
      },
      {
        source: '/films/viruserv',
        destination: '/work/viruserv-restoring-life',
        permanent: true,
      },
      {
        source: '/films/doterra-special-gift',
        destination: '/work/doterra-special-gift',
        permanent: true,
      },
      {
        source: '/films/doterra-all-yours',
        destination: '/work/doterra-all-yours',
        permanent: true,
      },
      {
        source: '/films/tesla-model-x',
        destination: '/work/tesla-model-x',
        permanent: true,
      },
      {
        source: '/films/ummc',
        destination: '/work/ummc-here-in-mississippi',
        permanent: true,
      },
      {
        source: '/films/lincoln',
        destination: '/work/lincoln-sunday-drive',
        permanent: true,
      },
      {
        source: '/films/pattern-accelerate',
        destination: '/work/pattern-accelerate',
        permanent: true,
      },
      { source: '/author/drew', destination: '/news', permanent: true },
      { source: '/position/homepage', destination: '/', permanent: true },
      { source: '/position/template-1', destination: '/', permanent: true },
      { source: '/position/template-2', destination: '/', permanent: true },
      { source: '/position/template-3', destination: '/', permanent: true },
      {
        source: '/filmcategory/commercial',
        destination: '/work',
        permanent: true,
      },
      {
        source: '/category/uncategorized',
        destination: '/news',
        permanent: true,
      },
      { source: '/films/amber', destination: '/work', permanent: true },
      {
        source: '/films/workfront',
        destination: '/work/workfront-tmobile',
        permanent: true,
      },
      { source: '/author/jmills', destination: '/news', permanent: true },
      { source: '/films/ford-gt', destination: '/work', permanent: true },
      {
        source: '/films/pluralsight-role-iq',
        destination: '/work',
        permanent: true,
      },
      {
        source: '/films/webb-who-we-are',
        destination: '/work/webb-who-we-are',
        permanent: true,
      },
      {
        source: '/2017/06/15/hello-world',
        destination: '/news',
        permanent: true,
      },
      {
        source: '/films/pattern-accelerate-coming-soon',
        destination: '/work/pattern-accelerate',
        permanent: true,
      },
    ]
  },
}
