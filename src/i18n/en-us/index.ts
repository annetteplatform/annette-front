// This is just an example,
// so you can safely delete all default props below

import {AnnettePrincipal} from 'src/shared/model';

export default {
  annetteConsole: {
    toolbar: {
      title: 'Annette Console',
      searchTooltip: 'Search',
      servicesTooltip: 'Services',
      notificationsTooltip: 'Notifications',
      profileMenu: {
        profile: 'Profile',
        language: 'Language',
        settings: 'Settings',
        signIn: 'Sign In',
        signOut: 'Sign Out'

      }
    },
    mainMenu: {
      action: 'Open'
    },
    notAuthenticatedHome: {
      title: 'Annette Console',
      descriptionHtml: 'In Annette Console you can manage the following entities:\n<ul>\n<li>Languages, translations and applications</li>\n<li>Person catalog</li>\n<li>Organizational structures and roles</li>\n<li>Authorization roles and assign permissions</li>\n<li>Content management system (CMS)</li>\n<li>Business process management system (BPMS)</li>\n</ul>',
      signInDescription: 'Please sign in to get access to Annette Console',
      signIn: 'Sign In'
    },

  },
  debug: {
    error: 'Error with param1 = {param1}'
  },
  annette: {
    shared: {
      crud: {
        create: 'Create',
        copy: 'Copy',
        edit: 'Edit',
        view: 'View',
        del: 'Delete',
        refresh: 'Refresh',
        filter: 'Filter',
        save: 'Save',
        cancel: 'Cancel',
        changed: 'Changed',
        saved: 'Saved',
        fieldRequired: 'Field is required',
        noResults: 'No results',
        updatedAt: 'Updated At',
        updatedBy: 'Updated By'
      },
      filter: {
        filter: 'Filter',
        apply: 'Apply',
        clear: 'Clear'
      },
      attribute: {
        titlePl: 'Attributes'
      }
    },
    application: {
      application: {
        title: 'Application',
        titlePl: 'Applications',
        field: {
          id: 'Id',
          name: 'Name',
          icon: 'Icon',
          label: 'Label',
          labelDescription: 'Label Description',
          translations: 'Translations',
          backendUrl: 'Backend URL',
          frontendUrl: 'Frontend URL',
        },
        deleteQuestion: 'Please confirm delete application.',
        translationNotAssigned: 'Translations not assigned'
      },
      translation: {
        title: 'Translation',
        titlePl: 'Translations',
        field: {
          id: 'Id',
          name: 'Name',
          translations: 'Translations',
        },
        translationLanguages: {
          title: 'Translation JSON for {language}',
          deleteQuestion: 'Please confirm delete language.',
        },
        deleteQuestion: 'Please confirm delete translation.',
      },
      language: {
        title: 'Language',
        titlePl: 'Languages',
        field: {
          id: 'Id',
          name: 'Name',
        },
        deleteQuestion: 'Please confirm delete language.',
      },
    },
    person: {
      person: {
        title: 'Person',
        titlePl: 'Persons',
        field: {
          id: 'Id',
          lastname: 'Last name',
          firstname: 'First name',
          middlename: 'Middle name',
          categoryId: 'Category',
          phone: 'Phone',
          email: 'Email',
          source: 'Source',
          externalId: 'External Id'
        },
        deleteQuestion: 'Please confirm delete person.',
      },
      category: {
        title: 'Category',
        titlePl: 'Categories',
        field: {
          id: 'Id',
          name: 'Name',
        },
        deleteQuestion: 'Please confirm delete category.',
      },
    },

    orgStructure: {
      category: {
        title: 'Category',
        titlePl: 'Categories',
        field: {
          id: 'Id',
          name: 'Name',
          forOrganization: 'For organization',
          forUnit: 'For unit',
          forPosition: 'For position'
        },
        allowedOrgItems: 'Allowed organizational items',
        deleteQuestion: 'Please confirm delete category.',
        organization: 'Organization',
        unit: 'Unit',
        position: 'Position'
      },

      orgItem: {
        field: {
          id: 'Id',
          name: 'Name',
          orgId: 'Organization Id',
          parentId: 'Parent Id',
          rootPath: 'Root path',
          level: 'Level',
          itemType: 'Item type',
          categoryId: 'Category',
          source: 'Source',
          externalId: 'External Id',
        },
      },
      organization: {
        editTitle: 'Edit organization',
        viewTitle: 'View organization',
        title: 'Organization',
        titlePl: 'Organizations',
        deleteQuestion: 'Please confirm delete organization.',
        deleteOrgItemQuestion: 'Please confirm delete org. item.',
      },
      orgRole: {
        title: 'Org. Role',
        titlePl: 'Org. Roles',
        field: {
          id: 'Id',
          name: 'Name',
          description: 'Description',
        },
        deleteQuestion: 'Please confirm delete organization role.',
      },
    }
  }
};
