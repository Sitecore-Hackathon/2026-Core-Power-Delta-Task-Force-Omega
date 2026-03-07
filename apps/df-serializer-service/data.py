competencies = [   {   'description': 'Covers data templates, template inheritance, standard values, insert options, data sources, '
                       'site collections, content editor items, and workflow configuration. Underpins GraphQL schema '
                       'shape and publishing dependency graphs.',
        'id': 'C4',
        'name': 'Sitecore Content Modeling',
        'urls': {   'community_resources': [],
                    'official_docs': [   'https://doc.sitecore.com/sai/en/developers/sitecoreai/data-templates.html',
                                         'https://doc.sitecore.com/sai/en/developers/sitecoreai/standard-values.html',
                                         'https://doc.sitecore.com/sai/en/developers/sitecoreai/data-sources.html',
                                         'https://doc.sitecore.com/sai/en/developers/sitecoreai/site-collections.html',
                                         'https://doc.sitecore.com/sai/en/developers/sitecoreai/content-editor-items.html',
                                         'https://doc.sitecore.com/sai/en/developers/sitecoreai/content-authoring-concepts-for-developers-new-to-sitecore.html',
                                         'https://doc.sitecore.com/sai/en/developers/sitecoreai/workflow.html']},
        'weight_components': {   'community_pain_max': 10,
                                 'community_pain_rationale': 'Very high community pain. Scalable content architecture '
                                                             'is one of the most-discussed topics in the Sitecore '
                                                             'community. Common pitfalls include template bloat, poor '
                                                             'base template inheritance, over-copying fields across '
                                                             'templates, and misuse of data sources. DEV Community, '
                                                             'Medium, and Sitecore Accelerate recipes all extensively '
                                                             'address content modeling mistakes. Template design '
                                                             'decisions have downstream effects on GraphQL query shape '
                                                             'and publishing performance.',
                                 'community_pain_score': 9,
                                 'documentation_page_count': 7,
                                 'exam_percentage': 17,
                                 'exam_questions': 10},
        'weight_pct': 14.9},
    {   'description': 'Covers renderings, layouts, page designs, partial designs, placeholder settings, integrated '
                       'GraphQL on renderings, and the relationship between layout data and Experience Edge '
                       'publishing. Includes content resolver limitations.',
        'id': 'C5',
        'name': 'Renderings and Layouts',
        'urls': {   'community_resources': [   'https://dev.to/sebasab/understanding-partial-designs-and-page-designs-in-sitecore-xm-cloud-476l',
                                               'https://dev.to/kmac23va/sitecore-xm-cloud-the-final-word-on-content-resolvers-3k80'],
                    'official_docs': [   'https://doc.sitecore.com/sai/en/developers/sitecoreai/content-modeling-and-presentation.html',
                                         'https://developers.sitecore.com/learn/accelerate/xm-cloud/pre-development/project-architecture/layout-routing',
                                         'https://developers.sitecore.com/learn/accelerate/xm-cloud/pre-development/information-architecture/publishing-to-edge',
                                         'https://doc.sitecore.com/sai/en/developers/sitecoreai/content-authoring-concepts-for-developers-new-to-sitecore.html']},
        'weight_components': {   'community_pain_max': 10,
                                 'community_pain_rationale': 'Highest community pain score. Content resolvers breaking '
                                                             'Edge publishing (v1 vs v2 publishing model), layout '
                                                             'routing complexity, partial design configuration, '
                                                             'publishing dependency graph performance, and integrated '
                                                             'GraphQL on renderings are among the most blogged-about '
                                                             'and support-ticketed topics in the entire Sitecore '
                                                             'community. Multiple Sitecore MVP blog series and DEV '
                                                             'Community posts specifically document these as unsolved '
                                                             'or recently resolved pain points.',
                                 'community_pain_score': 10,
                                 'documentation_page_count': 6,
                                 'exam_percentage': 17,
                                 'exam_questions': 10},
        'weight_pct': 14.8},
    {   'description': 'Covers the GraphQL Authoring and Management API, Experience Edge GraphQL Delivery API, Pages '
                       'API, Sites API, Publishing API, Deploy REST API, and webhooks for publish and entity change '
                       'events.',
        'id': 'C3',
        'name': 'Sitecore APIs and Webhooks',
        'urls': {   'community_resources': [],
                    'official_docs': [   'https://doc.sitecore.com/sai/en/developers/sitecoreai/graphql-authoring-management-api.html',
                                         'https://doc.sitecore.com/sai/en/developers/sitecoreai/experience-edge.html',
                                         'https://doc.sitecore.com/sai/en/developers/sitecoreai/webhooks.html',
                                         'https://doc.sitecore.com/sai/en/developers/sitecoreai/pages-api.html',
                                         'https://doc.sitecore.com/sai/en/developers/sitecoreai/sites-api.html',
                                         'https://doc.sitecore.com/sai/en/developers/sitecoreai/publishing-api.html',
                                         'https://doc.sitecore.com/sai/en/developers/sitecoreai/deploy-rest-api.html',
                                         'https://developers.sitecore.com/learn/accelerate/xm-cloud/pre-development/information-architecture/publishing-to-edge']},
        'weight_components': {   'community_pain_max': 10,
                                 'community_pain_rationale': 'Very high community pain. GraphQL query complexity '
                                                             'errors on the preview endpoint vs Edge, automation '
                                                             'client permission scoping gaps, custom content resolver '
                                                             'limitations on Edge, Edge rate limiting for large '
                                                             'builds, and webhook configuration misunderstandings are '
                                                             'all heavily discussed in Sitecore MVP blogs, Medium '
                                                             'posts, and the community forum. This is one of the most '
                                                             'technically nuanced areas.',
                                 'community_pain_score': 9,
                                 'documentation_page_count': 8,
                                 'exam_percentage': 15,
                                 'exam_questions': 8},
        'weight_pct': 14.7},
    {   'description': 'Covers the Content SDK (Next.js), JSS SDK (Next.js/Angular), ASP.NET Core SDK, SitecoreClient '
                       'API, and Sitecore Cloud SDK. Includes component development, multisite setup, personalization, '
                       'A/B testing, and connecting to Experience Edge.',
        'id': 'C7',
        'name': 'Web Development with SitecoreAI CMS',
        'urls': {   'community_resources': [],
                    'official_docs': [   'https://doc.sitecore.com/sai/en/developers/content-sdk/sitecore-content-sdk-for-sitecoreai.html',
                                         'https://doc.sitecore.com/sai/en/developers/jss/22/jss-sai/sitecore-javascript-services-sdk--jss--for-sitecoreai.html',
                                         'https://doc.sitecore.com/sai/en/developers/asp-net/latest/asp-net-core-sdk/sitecore-asp-net-core-sdk.html',
                                         'https://doc.sitecore.com/sai/en/developers/content-sdk/the-sitecoreclient-api.html',
                                         'https://doc.sitecore.com/sai/en/developers/sitecoreai/sitecore-cloud-sdk.html',
                                         'https://doc.sitecore.com/sai/en/developers/sitecoreai/set-up-your-local-development-environment.html']},
        'weight_components': {   'community_pain_max': 10,
                                 'community_pain_rationale': 'High community pain. SDK version compatibility, Next.js '
                                                             'multisite configuration, SitecoreClient API usage for '
                                                             'personalization and static paths, and GraphQL complexity '
                                                             'limits on the preview endpoint are consistently raised. '
                                                             'Developers transitioning from JSS SDK to Content SDK '
                                                             'also report significant churn. The Cloud SDK integration '
                                                             'with analytics adds complexity.',
                                 'community_pain_score': 8,
                                 'documentation_page_count': 6,
                                 'exam_percentage': 17,
                                 'exam_questions': 10},
        'weight_pct': 13.8},
    {   'description': 'Covers creating and managing projects and environments via the Deploy app and Deploy REST API, '
                       'configuring source control (GitHub/Azure DevOps), environment variables, CI/CD integration, '
                       'and deployment pipeline management.',
        'id': 'C2',
        'name': 'Deployment of SitecoreAI CMS Projects',
        'urls': {   'community_resources': [],
                    'official_docs': [   'https://doc.sitecore.com/sai/en/developers/sitecoreai/deploy-app.html',
                                         'https://doc.sitecore.com/sai/en/developers/sitecoreai/deploy-rest-api.html',
                                         'https://doc.sitecore.com/sai/en/developers/sitecoreai/create-a-project-and-environment.html',
                                         'https://doc.sitecore.com/sai/en/developers/sitecoreai/getting-started-with-sitecoreai.html',
                                         'https://developers.sitecore.com/learn/accelerate/xm-cloud/pre-development/developer-considerations',
                                         'https://doc.sitecore.com/sai/en/developers/sitecoreai/sitecore-command-line-interface.html',
                                         'https://doc.sitecore.com/sai/en/developers/sitecoreai/serialization.html']},
        'weight_components': {   'community_pain_max': 10,
                                 'community_pain_rationale': 'Higher community pain. Developers frequently report '
                                                             'issues with CI/CD pipeline configuration, environment '
                                                             'variable management, rendering host item drift after '
                                                             'deployment, and IAR (Include As Resource) serialization '
                                                             'behavior during builds. Sitecore MVP blogs and DEV '
                                                             'Community posts confirm these as recurring friction '
                                                             'points.',
                                 'community_pain_score': 7,
                                 'documentation_page_count': 7,
                                 'exam_percentage': 10,
                                 'exam_questions': 6},
        'weight_pct': 11.3},
    {   'description': 'Covers user and role management in the Cloud Portal and CM instance, predefined security '
                       'roles, site collection security setup, GraphQL API authorization, Experience Edge security '
                       'model, and API key/client credential management.',
        'id': 'C9',
        'name': 'Security for Developers',
        'urls': {   'community_resources': [   'https://blogs.perficient.com/2025/04/16/security-best-practices-in-sitecore-xm-cloud/',
                                               'https://sitecoreandmore.blogspot.com/2023/10/security-permissions-with-headless.html'],
                    'official_docs': [   'https://doc.sitecore.com/sai/en/developers/sitecoreai/the-security-roles.html',
                                         'https://doc.sitecore.com/sai/en/developers/sitecoreai/set-up-security-for-a-site-collection-and-a-site.html']},
        'weight_components': {   'community_pain_max': 10,
                                 'community_pain_rationale': 'High community pain relative to exam weight. The '
                                                             'headless security model introduces a significant '
                                                             'disconnect between IDP-assigned roles and Sitecore '
                                                             'content permissions that has no out-of-the-box '
                                                             'resolution. Experience Edge not enforcing Sitecore '
                                                             'content security permissions is a well-documented '
                                                             'gotcha. API key management and automation client scoping '
                                                             'gaps are also recurring topics in community blogs and '
                                                             'support.',
                                 'community_pain_score': 8,
                                 'documentation_page_count': 4,
                                 'exam_percentage': 6,
                                 'exam_questions': 4},
        'weight_pct': 8.5},
    {   'description': 'Covers the SitecoreAI cloud-native architecture, the headless CMS model, the Content '
                       'Management (CM) instance, rendering host separation, the Cloud Portal, and the overall '
                       'developer workflow from local setup to deployment.',
        'id': 'C1',
        'name': 'SitecoreAI CMS Architecture and Developer Workflow',
        'urls': {   'community_resources': [],
                    'official_docs': [   'https://doc.sitecore.com/sai/en/developers/sitecoreai/sitecoreai-for-developers.html',
                                         'https://doc.sitecore.com/sai/en/developers/sitecoreai/getting-started-with-sitecoreai.html',
                                         'https://doc.sitecore.com/sai/en/developers/sitecoreai/set-up-your-local-development-environment.html',
                                         'https://developers.sitecore.com/learn/accelerate/xm-cloud/pre-development/developer-considerations',
                                         'https://doc.sitecore.com/sai/en/developers/sitecoreai/deploy-app.html']},
        'weight_components': {   'community_pain_max': 10,
                                 'community_pain_rationale': 'Moderate community concern. Developers transitioning '
                                                             'from XP/XM to the cloud-native headless model report an '
                                                             'initial learning curve, particularly around the '
                                                             'separation of CM and rendering host. However, the '
                                                             'architecture is well-documented and community blog '
                                                             'coverage is broad.',
                                 'community_pain_score': 6,
                                 'documentation_page_count': 5,
                                 'exam_percentage': 6,
                                 'exam_questions': 4},
        'weight_pct': 8.1},
    {   'description': 'Covers Sitecore CLI-based serialization, sitecore.json and module.json configuration, '
                       'serialization paths/rules/scopes, push/pull commands, and use of serialization packages in '
                       'CI/CD pipelines.',
        'id': 'C8',
        'name': 'Sitecore Content Serialization',
        'urls': {   'community_resources': [   'https://www.rightpoint.com/thought/article/getting-to-know-sitecore-xm-cloud-development-part-one'],
                    'official_docs': [   'https://doc.sitecore.com/sai/en/developers/sitecoreai/serialization.html',
                                         'https://doc.sitecore.com/sai/en/developers/sitecoreai/sitecore-command-line-interface.html']},
        'weight_components': {   'community_pain_max': 10,
                                 'community_pain_rationale': 'Fairly high community pain relative to its exam weight. '
                                                             'Serialization module configuration (module.json paths, '
                                                             'scope, rules), IAR (Include As Resource) packaging '
                                                             'behavior during builds, and deciding what to serialize '
                                                             'vs leave as content are frequently discussed. Community '
                                                             'blog posts confirm these as gotchas, especially for '
                                                             'developers new to the Sitecore CLI-based serialization '
                                                             'workflow.',
                                 'community_pain_score': 7,
                                 'documentation_page_count': 3,
                                 'exam_percentage': 6,
                                 'exam_questions': 4},
        'weight_pct': 7.4},
    {   'description': 'Covers the Pages visual builder interface, creating and publishing page designs and components '
                       'via Pages, the editing host configuration, and the Pages REST API for programmatic page '
                       'management.',
        'id': 'C6',
        'name': 'SitecoreAI CMS Pages',
        'urls': {   'community_resources': [],
                    'official_docs': [   'https://doc.sitecore.com/sai/en/developers/sitecoreai/pages-api.html',
                                         'https://doc.sitecore.com/sai/en/developers/sitecoreai/create-a-site-and-page.html',
                                         'https://doc.sitecore.com/sai/en/developers/sitecoreai/content-modeling-and-presentation.html']},
        'weight_components': {   'community_pain_max': 10,
                                 'community_pain_rationale': 'Lower community pain. Pages (the visual builder) is '
                                                             'generally praised as intuitive. Minor community issues '
                                                             'include editing host URL drift after deployments and '
                                                             'confusion around which items are editable in Pages vs '
                                                             'Content Editor. Not a primary pain point compared to '
                                                             'APIs or content modeling.',
                                 'community_pain_score': 5,
                                 'documentation_page_count': 3,
                                 'exam_percentage': 6,
                                 'exam_questions': 4},
        'weight_pct': 6.4}]