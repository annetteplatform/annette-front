export enum Action {
  Create = 'create',
  Edit = 'edit',
  View = 'view',
}

export function toAction(s: string): Action  {
  switch (s) {
    case 'create': {
      return Action.Create
    }
    case 'edit': {
      return Action.Edit
    }
    default: {
      return Action.View
    }
  }
}
