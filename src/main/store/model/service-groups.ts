import {ServiceGroup} from 'src/main/store/model/main'

export function serviceGroups(): ServiceGroup[] {
  return [
    {
      id: 'APP_GROUP',
      order: 10,
      icon: 'apps',
      title: 'Application ',
      subtitle: 'Maintain languages, translations and applications',
      services: [
        {
          id: 'LANGUAGES',
          order: 10,
          icon: 'language',
          title: 'Languages',
          // subtitle: string,
          action: {name: 'application.languages'},
        },
        {
          id: 'TRANSLATIONS',
          order: 20,
          icon: 'translate',
          title: 'Translations',
          // subtitle: string,
          action: {name: 'application.translations'},
        },
        {
          id: 'APPLICATIONS',
          order: 20,
          icon: 'apps',
          title: 'Applications',
          // subtitle: string,
          action: {name: 'application.applications'},
        }
      ]
    },
    {
      id: 'PERSON_GROUP',
      order: 20,
      icon: 'people',
      title: 'Person ',
      subtitle: 'Maintain person repository',
      services: [
        {
          id: 'PERSON',
          order: 10,
          icon: 'people',
          title: 'Persons',
          subtitle: 'View person list, create, update and delete persons',
          action: {name: 'person.persons'},
        },
        {
          id: 'PERSON_CATEGORIES',
          order: 20,
          icon: 'local_offer',
          title: 'Person categories',
          subtitle: 'Maintain person categories',
          action: {name: 'person.categories'},
        },

        // {
        //   id: 'PROFILE',
        //   order: 20,
        //   icon: 'account_circle',
        //   title: 'My profile',
        //   subtitle: 'View my profile',
        //   action: '/person/profile',
        //   actionName: 'View'
        // }
      ]
    },
    {
      id: 'ORG_STRUCTURE_GROUP',
      order: 30,
      icon: 'account_balance',
      title: 'Organizational Structure ',
      subtitle: 'Maintain organizational structures and roles',
      services: [
        {
          id: 'HIERARCHY',
          order: 10,
          icon: 'account_balance',
          title: 'Organizations',
          subtitle: 'Maintain organizations, hierarchies, person assignments to positions',
          action: {name: 'orgStructure.organizations'},
        },

        {
          id: 'ORG_CATEGORIES',
          order: 20,
          icon: 'local_offer',
          title: 'Org. categories',
          subtitle: 'Maintain org. categories',
          action: {name: 'orgStructure.categories'},
        },
        {
          id: 'ORG_ROLES',
          order: 30,
          icon: 'category',
          title: 'Organizational roles',
          subtitle: 'Maintain organizational roles',
          action: {name: 'orgStructure.roles'},
          actionName: 'View'
        },
      ]
    },
    {
      id: 'AUTHORIZATION_GROUP',
      order: 40,
      icon: 'admin_panel_settings',
      title: 'Authorization ',
      subtitle: 'Maintain authorization roles and assign permissions',
      services: [
        {
          id: 'AUTH_ROLES',
          order: 10,
          icon: 'admin_panel_settings',
          title: 'Authorization roles',
          subtitle: 'Maintain authorization roles, assign principals to roles',
          action: {name: 'authorization.roles'},
        },
        {
          id: 'PERMISSIONS',
          order: 20,
          icon: 'policy',
          title: 'Permission assignments',
          subtitle: 'View permission assignments to principals',
          action: {name: 'authorization.permissionAssignments'},
        }
      ]
    },

    {
      id: 'PRINCIPAL_GROUP',
      order: 50,
      icon: 'groups',
      title: 'Principal Group',
      subtitle: 'Maintain principal groups',
      services: [
        {
          id: 'PRINCIPAL_GROUPS',
          order: 10,
          icon: 'groups',
          title: 'Principal groups',
          subtitle: 'View principal group list, create, update and delete groups',
          action: {name: 'principalGroup.groups'},
        },
        {
          id: 'PRINCIPAL_GROUP_CATEGORIES',
          order: 20,
          icon: 'local_offer',
          title: 'Group categories',
          subtitle: 'Maintain principal group categories',
          action: {name: 'principalGroup.categories'},
        },
      ]
    },

    {
      id: 'BLOG',
      order: 60,
      icon: 'inventory',
      title: 'Blog Administration ',
      subtitle: '',
      services: [
        {
          id: 'BLOG_CATEGORIES',
          order: 10,
          icon: 'local_offer',
          title: 'Blog categories',
          subtitle: 'Maintain blog categories',
          action: {name: 'cms.blogCategories'},
          actionName: 'View'
        },
        {
          id: 'BLOGS',
          order: 20,
          icon: 'inventory',
          title: 'Blogs',
          subtitle: 'View list of blogs',
          action: {name: 'cms.blogs'},
          actionName: 'View'
        },
        {
          id: 'POSTS',
          order: 30,
          icon: 'feed',
          title: 'Posts',
          subtitle: 'View list of posts',
          action: {name: 'cms.posts'},
          actionName: 'View'
        }
      ]
    },
    {
      id: 'BLOG-VIEW',
      order: 70,
      icon: 'feed',
      title: 'Blog View ',
      subtitle: '',
      services: [
        {
          id: 'POST-VIEW',
          order: 10,
          icon: 'feed',
          title: 'Blog posts',
          subtitle: 'View blog posts',
          action: {name: 'cms.postViews'},
          actionName: 'Open'
        },
        {
          id: 'BLOGS',
          order: 20,
          icon: 'inventory',
          title: 'Blogs',
          subtitle: 'View list of blogs',
          action: {name: 'cms.blogViews'},
          actionName: 'View'
        }
      ]
    },
  ]
}
