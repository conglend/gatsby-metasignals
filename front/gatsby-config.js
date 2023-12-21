require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  flags: {
    DEV_SSR: false,
    GRAPHQL_PLAYGROUND: false,
    DETECT_NODE_MUTATIONS: true,
  },
  trailingSlash: 'never',
  siteMetadata: {
    title: `JediSignals`,
    siteUrl: `${process.env.GATSBY_SITE_URL || 'http://localhost:9000'}`,
    description: `JediSignals website`,
    languages: { defaultLocale: 'en', locales: [] },
  },
  plugins: [
    'gatsby-plugin-ts-config',
    'gatsby-plugin-sitemap',
    {
      resolve: '@sentry/gatsby',
      options: {
        dsn: process.env.GATSBY_SENTRY_DSN,
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id:process.env.GATSBY_GOOGLE_TAG_CONTAINER_ID,
        includeInDevelopment: true,
        // Defaults to null
        defaultDataLayer: { platform: "gatsby" },
        enableWebVitalsTracking: true,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `MetaSignals`,
        short_name: `MetaSignals`,
        start_url: `/`,
        background_color: `#0042CD`,
        theme_color: `#0042CD`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`,
        crossOrigin: `use-credentials`,
      },
    },
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-source-strapi',
      options: {
        apiURL: process.env.GATSBY_STRAPI_URL || 'http://localhost:1337',
        collectionTypes: [
          {
            singularName: 'blog-post',
            pluginOptions: {
              i18n: {
                locale: 'all',
              },
            },
            queryParams: {
              populate: '*',
            },
          },
        ],
        singleTypes: [
          {
            singularName: 'page-list',
            pluginOptions: {
              i18n: {
                locale: 'all',
              },
            },
            queryParams: {
              populate: {
                StandardPageList: {
                  populate: '*',
                },
                Blog: {
                  populate: '*',
                },
                blog_posts: {
                  populate: '*',
                },
              },
            },
          },
          {
            singularName: 'about',
            pluginOptions: {
              i18n: {
                locale: 'all',
              },
            },
            queryParams: {
              populate: {
                MetaData: {
                  populate: '*',
                },
                About: {
                  populate: '*',
                },
                AboutLite: {
                  populate: '*',
                },
              },
            },
          },
          {
            singularName: 'contact',
            pluginOptions: {
              i18n: {
                locale: 'all',
              },
            },
            queryParams: {
              populate: {
                Contact: {
                  populate: '*',
                },
                MetaData: {
                  populate: '*',
                },
              },
            },
          },
          {
            singularName: 'dashboard',
            pluginOptions: {
              i18n: {
                locale: 'all',
              },
            },
            queryParams: {
              populate: {
                MetaData: {
                  populate: '*',
                },
                Header: {
                  populate: '*',
                },
                AlertsByPair: {
                  populate: '*',
                },
                AlertsGenerated: {
                  populate: '*',
                },
                AlertsByTimeframe: {
                  populate: '*',
                },
                AlertsByTimeframeGroup: {
                  populate: '*',
                },
                AlertsByDirection: {
                  populate: '*',
                },
                AlertsByMembership: {
                  populate: '*',
                },
                TimeframeOptions: {
                  populate: '*',
                },
                MembershipOptions: {
                  populate: '*',
                },
                FreeTrialButton: {
                  populate: '*',
                },
              },
            },
          },
          {
            singularName: 'faqs',
            pluginOptions: {
              i18n: {
                locale: 'all',
              },
            },
            queryParams: {
              populate: {
                MetaData: {
                  populate: '*',
                },
                Faqs: {
                  populate: '*',
                },
              },
            },
          },
          {
            singularName: 'faqs-lite',
            pluginOptions: {
              i18n: {
                locale: 'all',
              },
            },
            queryParams: {
              populate: {
                MetaData: {
                  populate: '*',
                },
                FaqsLite: {
                  populate: '*',
                },
              },
            },
          },
          {
            singularName: 'global',
            pluginOptions: {
              i18n: {
                locale: 'all',
              },
            },
            queryParams: {
              populate: {
                MetaData: {
                  populate: '*',
                },
                Navbar: {
                  populate: '*',
                },
                Footer: {
                  populate: '*',
                },
                Cookies: {
                  populate: '*',
                },
                FinancialAdvicePopup: {
                  populate: '*',
                },
              },
            },
          },
          {
            singularName: 'global-lite',
            pluginOptions: {
              i18n: {
                locale: 'all',
              },
            },
            queryParams: {
              populate: {
                MetaData: {
                  populate: '*',
                },
                Navbar: {
                  populate: '*',
                },
                Footer: {
                  populate: '*',
                },
                Cookies: {
                  populate: '*',
                },
                FinancialAdvicePopup: {
                  populate: '*',
                },
              },
            },
          },
          {
            singularName: 'guide',
            pluginOptions: {
              i18n: {
                locale: 'all',
              },
            },
            queryParams: {
              populate: {
                MetaData: {
                  populate: '*',
                },
                Intro: {
                  populate: '*',
                },
                HowToReadAnAlert: {
                  populate: '*',
                },
                Step1: {
                  populate: '*',
                },
                Step2: {
                  populate: '*',
                },
                Step3: {
                  populate: '*',
                },
              },
            },
          },
          {
            singularName: 'guide-lite',
            pluginOptions: {
              i18n: {
                locale: 'all',
              },
            },
            queryParams: {
              populate: {
                MetaData: {
                  populate: '*',
                },
                Intro: {
                  populate: '*',
                },
                HowToReadAnAlert: {
                  populate: '*',
                },
                Step1: {
                  populate: '*',
                },
                Step2: {
                  populate: '*',
                },
                Step3: {
                  populate: '*',
                },
              },
            },
          },
          {
            singularName: 'home',
            pluginOptions: {
              i18n: {
                locale: 'all',
              },
            },
            queryParams: {
              populate: {
                MetaData: {
                  populate: '*',
                },
                Main: {
                  populate: '*',
                },
                ExplanationBox: {
                  populate: '*',
                },
                ScrollDown: {
                  populate: '*',
                },
                StepByStep: {
                  populate: '*',
                },
                RealWorldExamples: {
                  populate: '*',
                },
                Examples: {
                  populate: '*',
                },
              },
            },
          },
          {
            singularName: 'lite-page',
            pluginOptions: {
              i18n: {
                locale: 'all',
              },
            },
            queryParams: {
              populate: {
                MetaData: {
                  populate: '*',
                },
                Main: {
                  populate: '*',
                },
                StartStep: {
                  populate: '*',
                },
                FreeTrialButton: {
                  populate: '*',
                },
                Faq: {
                  populate: '*',
                },
                FreeTrialButtonEnd: {
                  populate: '*',
                },
              },
            },
          },

          {
            singularName: 'nft',
            pluginOptions: {
              i18n: {
                locale: 'all',
              },
            },
            queryParams: {
              populate: {
                MetaData: {
                  populate: '*',
                },
                Nft: {
                  populate: '*',
                },
                NftTable: {
                  populate: '*',
                },
                NftPrices: {
                  populate: '*',
                },
                NftTermsOfService: {
                  populate: '*',
                },
                Geoblock: {
                  populate: '*',
                },
                MintSection: {
                  populate: '*',
                },
                WelcomePage: {
                  populate: '*',
                },
              },
            },
          },
          {
            singularName: 'partners',
            pluginOptions: {
              i18n: {
                locale: 'all',
              },
            },
            queryParams: {
              populate: {
                MetaData: {
                  populate: '*',
                },
                Advantage: {
                  populate: '*',
                },
                Point: {
                  populate: '*',
                },
                StartButton: {
                  populate: '*',
                },
                Step: {
                  populate: '*',
                },
                PartnerButton: {
                  populate: '*',
                },
              },
            },
          },
          {
            singularName: 'pricing',
            pluginOptions: {
              i18n: {
                locale: 'all',
              },
            },
            queryParams: {
              populate: {
                MetaData: {
                  populate: '*',
                },
                PricingHeader: {
                  populate: '*',
                },
                GreenStrip: {
                  populate: '*',
                },
                Tiers: {
                  populate: '*',
                },
              },
            },
          },
          {
            singularName: 'rsi-div-page',
            pluginOptions: {
              i18n: {
                locale: 'all',
              },
            },
            queryParams: {
              populate: {
                MetaData: {
                  populate: '*',
                },
                Main: {
                  populate: '*',
                },
                OfferParagraph: {
                  populate: '*',
                },
                WarningParagraph: {
                  populate: '*',
                },
                DetailsParagraph: {
                  populate: '*',
                },
                ExplanationParagraph: {
                  populate: '*',
                },
              },
            },
          },
          {
            singularName: 'traders-page',
            pluginOptions: {
              i18n: {
                locale: 'all',
              },
            },
            queryParams: {
              populate: {
                MetaData: {
                  populate: '*',
                },
                NewTraders: {
                  populate: '*',
                },
                ExperiencedTraders: {
                  populate: '*',
                },
                FreeTrialButton: {
                  populate: '*',
                },
              },
            },
          },
          {
            singularName: 'volume-alerts-page',
            pluginOptions: {
              i18n: {
                locale: 'all',
              },
            },
            queryParams: {
              populate: {
                MetaData: {
                  populate: '*',
                },
                Main: {
                  populate: '*',
                },
                Stripe: {
                  populate: '*',
                },
                TimeframesSection: {
                  populate: '*',
                },
                SummaryParagraphs: {
                  populate: '*',
                },
                FinalSection: {
                  populate: '*',
                },
              },
            },
          },
          {
            singularName: 'where-to-trade',
            pluginOptions: {
              i18n: {
                locale: 'all',
              },
            },
            queryParams: {
              populate: {
                MetaData: {
                  populate: '*',
                },
                WhereToTrade: {
                  populate: '*',
                },
              },
            },
          },
        ],
        accessToken: process.env.GATSBY_STRAPI_TOKEN,
      },
    },
    `gatsby-plugin-tsconfig-paths`,
    {
      resolve: `gatsby-plugin-graphql-codegen`,
      options: {
        fileName: `gatsby-graphql.ts`,
        codegenConfig: {
          maybeValue: 'T',
          avoidOptionals: true,
        },
      },
    },
    {
      resolve: `gatsby-theme-material-ui`,
      options: {
        webFontsConfig: {
          fonts: {
            google: [
              {
                family: `Cairo`,
                variants: [`300`, `400`, `600`, `700`],
              },
            ],
          },
        },
      },
    },
    'gatsby-plugin-react-svg',
  ],
}
