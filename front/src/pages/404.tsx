import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { graphql, PageProps } from 'gatsby'
import { Strapi_Global } from 'gatsby-graphql'
import { theme } from 'src/theme/ThemeProvider'
import { IPageContext } from '@/types/pages'
import '../styles/404.css'
import { Grid, Box } from '@mui/material'
import { StaticImage } from 'gatsby-plugin-image'

const NotFoundPage: React.FC<PageProps<any>> = ({ data, pageContext }) => {
  const global = data?.strapiGlobal as Strapi_Global

  return (
    <>
      <SEO metaData={{ MetaTitle: '404: Not found' }} global={global} />
      <Layout pageContext={pageContext as IPageContext} global={global} theme={theme}>
        <Grid
          container
          className="container"
          sx={{
            minHeight: { xs: '60vh' },
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <div className="stars"></div>
          <Box className="central-body" sx={{ maxWidth: '100%', width: { xs: '100%', sm: '600px', md: '800px' } }}>
            <StaticImage
              placeholder="blurred"
              className="image-404"
              src="../images/404/404-text.svg"
              alt="404 Not Found"
            />
          </Box>
          <div className="objects">
            <div className="rocket">
              <StaticImage
                placeholder="blurred"
                className="object_rocket"
                src="../images/404/rocket.svg"
                width={120}
                alt="Rocket"
              />
            </div>
            <div className="earth">
              <StaticImage placeholder="blurred" src="../images/404/earth.svg" width={500} alt="Earth" />
            </div>
            <div className="moon">
              <StaticImage placeholder="blurred" src="../images/404/moon.svg" width={100} alt="Moon" />
            </div>
            <div className="box_astronaut">
              <StaticImage
                placeholder="blurred"
                className="object_astronaut"
                src="../images/404/space-suit.svg"
                width={140}
                alt="Astronaut"
              />
            </div>
          </div>
          <div className="glowing_stars">
            <StaticImage placeholder="blurred" className="star" src="../images/404/star.png" alt="Star" />
            <StaticImage placeholder="blurred" className="star" src="../images/404/star.png" alt="Star" />
            <StaticImage placeholder="blurred" className="star" src="../images/404/star.png" alt="Star" />
            <StaticImage placeholder="blurred" className="star" src="../images/404/star.png" alt="Star" />
            <StaticImage placeholder="blurred" className="star" src="../images/404/star.png" alt="Star" />
          </div>
        </Grid>
      </Layout>
    </>
  )
}

export default NotFoundPage

export const query = graphql`
  query NotFound {
    site {
      siteMetadata {
        languages {
          defaultLocale
        }
      }
    }
    strapiGlobal {
      ...GlobalData
    }
  }
`
