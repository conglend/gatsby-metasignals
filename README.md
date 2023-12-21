# Jedi Signals Website

## Seeding data & cloning repo

It is best to copy the entire project directory from someone else's machine. That is because it contains both postgres data, as well as images. The later is especially important, as strapi stores image files in the filesystem, and the database contains filenames only

## Adding a new page (with single type)

This process is theoritically pretty easy. It involves following steps:

1. Add new single type to strapi
2. Fill in data & save
3. Publish
4. Create new file for gatsby in `/front/src/templates`
5. Add new item in Strapi to `PageList#StandardPageList`
6. Update permissions in settings (both in `users & permissions plugins` and in `administration panel`)
7. Add new type for gatsby frontend to `gatsby-source-strapi` section of `gatsby-config.js`
8. Add query to template
9. Run `yarn clean`
10. Run `yarn develop`
11. Check the graphql schema at `localhost:8000/__graphql`

If you see a new query in your gatsby graphql schema, you have succeded.

### What to do if it doesn't work?

1. First, check strapi graphql schema `http://localhost:1337/graphql`. If you don't see the new single type here, than probably there was some error in steps described above. If you can't find the error - just try restarting, updating in strapi, addind other queries and removing them - eventually it always works, but can take 2-3h
2. If the new single type is visable in strapi graphql schema, than it gets more tricky. In my experience, the best thing to do here is to remove `/front/yarn.lock` and `/front/node_modules` . Install dependencies and run `yarn dev` again.
3. Sometimes it helps to add "populate": '\*' to gatsby-config's 'gatsby-source-strapi' section. It will throw an error, but when you revert those changes gatsby may have updated the schema
4. Try changing some options in config for `gatsby-plugin-graphql-codegen`
5. Try using different Node versions

## CI/CD ( Jenkins )

CI/CD is done through a [Jenkins server](https://jenkins.jdsignals.com/job/40_WEBSITE_JOBS) hosted by the client - access needs to be granted.

There are jobs set up in Jenkins to automate deployments.

1. main folder: https://jenkins.jdsignals.com/job/40_WEBSITE_JOBS/
2. build_strapi_uat - https://jenkins.jdsignals.com/job/40_WEBSITE_JOBS/job/build_strapi_uat/

   Description: Rebuilds the container automatically via webhook from github on each push to /uat branch of https://github.com/JediSignals/website_metasignals_io_strapi repo

3. uat_pipeline https://jenkins.jdsignals.com/job/40_WEBSITE_JOBS/job/uat_pipeline/

   Description: manually trigger the rebuild of the UAT website (https://uat.metasignals.io) This is also triggered via webhook in strapi when user clicks "SAVE" button.

4. prod_pipeline https://jenkins.jdsignals.com/job/40_WEBSITE_JOBS/job/prod_pipeline/

   Description: manually trigger the rebuild of the PROD website (https://metasignals.io)

### uat_pipeline:

1. https://jenkins.jdsignals.com/job/40_WEBSITE_JOBS/job/uat_pipeline/job/website_pipeline_UAT/

   Description: main pipeline to be triggered manually

2. https://jenkins.jdsignals.com/job/40_WEBSITE_JOBS/job/uat_pipeline/job/meta_zendesk_lambda_updater_uat/

   Description: rebuild the lambda function for zendesk and push to AWS. (code is pulled from https://github.com/JediSignals/website_metasignals_io_zendesk_lambda repo)

3. https://jenkins.jdsignals.com/job/40_WEBSITE_JOBS/job/uat_pipeline/job/build_website_UAT/

   Description: build gatsby website

4. https://jenkins.jdsignals.com/job/40_WEBSITE_JOBS/job/uat_pipeline/job/invalidate_CF_cache_UAT/

   Description: invalidate Cloudfront cache for all resources

### prod_pipeline:

1. https://jenkins.jdsignals.com/job/40_WEBSITE_JOBS/job/prod_pipeline/job/website_git_sync/

   Description: sync of the github branches for website code (uat <> prod)

2. https://jenkins.jdsignals.com/job/40_WEBSITE_JOBS/job/prod_pipeline/job/strapi_git_sync/

   Description: sync of the github branches for strapi service (uat <> prod)

3. https://jenkins.jdsignals.com/job/40_WEBSITE_JOBS/job/prod_pipeline/job/zendesk_lambda_git_sync/

   Description: sync of the github branches for lambda function (uat <> prod)

4. https://jenkins.jdsignals.com/job/40_WEBSITE_JOBS/job/prod_pipeline/job/meta_zendesk_lambda_updater_prod/

   Description: fetch code from GH and push to AWS lambda

5. https://jenkins.jdsignals.com/job/40_WEBSITE_JOBS/job/prod_pipeline/job/stop_strapi-uat_container/

   Description: shutdown of strapi-uat container to synchronise to prod

6. https://jenkins.jdsignals.com/job/40_WEBSITE_JOBS/job/prod_pipeline/job/stop_strapi-prod_container/

   Description: shutdown of strapi-prod container to synchronise from uat

7. https://jenkins.jdsignals.com/job/40_WEBSITE_JOBS/job/prod_pipeline/job/check_site_status/

   Description: http check to both uat and prod strapi containers on jd-p-levant after initial shutdown to make sure they are down (30s caddy timeout)

8. https://jenkins.jdsignals.com/job/40_WEBSITE_JOBS/job/prod_pipeline/job/archive_strapi-prod_copy_uat/

   Description: archive strapi-prod directory content and copy current uat version

9. https://jenkins.jdsignals.com/job/40_WEBSITE_JOBS/job/prod_pipeline/job/start_strapi-prod_container/

   Description: re-start of strapi-prod container with new directory content

10. https://jenkins.jdsignals.com/job/40_WEBSITE_JOBS/job/prod_pipeline/job/start_strapi-uat_container/  
    Description: re-start of strapi-uat container

11. https://jenkins.jdsignals.com/job/40_WEBSITE_JOBS/job/prod_pipeline/job/build_website_prod/

    Description: fetch code from GH, build locally, push to S3

12. https://jenkins.jdsignals.com/job/40_WEBSITE_JOBS/job/prod_pipeline/job/invalidate_CF_cache_PROD/

    Description: mark current CloudFront cache invalid so new website code can be cached

## Links to deployed environments

You need VPN on to access the Strapi Admin Dashboard, Jenkins and other internal assets.

[Strapi Admin dashboard](https://strapi-uat.metasignals.internal/admin)

[UAT Site](https://uat.metasignals.io/)

[Production Site](https://metasignals.io/)
