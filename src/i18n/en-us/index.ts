// This is just an example,
// so you can safely delete all default props below

import {Icon} from 'src/main';
import {AnnettePrincipal, MultiLanguageText} from 'src/shared/model';

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
        noResults:'No results',
        updatedAt: 'Updated At',
        updatedBy: 'Updated By'
      },
      filter: {
        filter: 'Filter',
        apply: 'Apply',
        clear: 'Clear'
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
          translations: 'translations',
          backendUrl: 'Backend URL',
          frontendUrl: 'Frontend URL',
        },
        deleteQuestion: 'Please confirm delete application.',
        translationNotAssigned: 'Translations not assigned'
      },
      translation: {
        title: 'Translation',
        titlePl: 'Translations',
      }
    }
  }
};
