import {OrgItem, OrgUnit} from 'src/modules/org-structure';

export interface OnCreatedEvent {
  parent: OrgUnit,
  child: OrgItem
}
