import axios from 'axios';
import {PersonProfile} from './model';

export const authService = {
  async profile () {
    return await axios.get<PersonProfile>('/api/annette/v1/person/profile')
      .then(result => convertPersonProfile(result.data))
  },
}

function convertPersonProfile(person: PersonProfile): PersonProfile {
  return  {
    ...person,
    fullname: `${person.lastname}, ${person.firstname} ${person.middlename || ''}`
  }
}
