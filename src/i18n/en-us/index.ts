// This is just an example,
// so you can safely delete all default props below

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
  }
};
