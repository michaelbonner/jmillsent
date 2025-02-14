// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'
// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// We import object and document schemas
import blockContent from './blockContent'
import aboutPage from './aboutPage'
import homePage from './homePage'
import workItem from './workItem'
import workItemCategory from './workItemCategory'
import workPage from './workPage'
import service from './service'
import teamMember from './teamMember'
import brand from './brand'
import photo from './photo'
import contactPage from './contactPage'
import studioItem from './studioItem'
import studioPage from './studioPage'
import momentsPage from './momentsPage'
import ravensCard from './ravensCard'
import representationCard from './representationCard'
import newsItem from './newsItem'
import newsPage from './newsPage'
import adFormat from './adFormat'
import portfolioItem from './portfolioItem'
import portfolioPage from './portfolioPage'
import documentaryPage from './documentaryPage'
import episode from './episode'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    homePage,
    workPage,
    workItem,
    workItemCategory,
    aboutPage,
    service,
    studioPage,
    studioItem,
    contactPage,
    teamMember,
    brand,
    photo,
    momentsPage,
    blockContent,
    adFormat,
    ravensCard,
    representationCard,
    newsItem,
    newsPage,
    portfolioItem,
    portfolioPage,
    documentaryPage,
    episode,
  ]),
})
