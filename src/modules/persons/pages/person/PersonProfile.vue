<template>
  <div class="narrow-layout">

    <div class="q-pa-md full-width ">
      <h6>Person Profile</h6>

      <div class="q-gutter-md">

        <div class="row">
          <q-input
            class="col-md-4 col-sm-12 col-xs-12 q-pr-md"
            v-model="profile.id"
            label="Person ID"
            :readonly="readonly"
          />
        </div>

        <div class="row">
          <q-input
            class="col-md-4 col-sm-12 col-xs-12 q-pr-md"
            v-model="profile.lastname"
            label="Lastname"
            :readonly="readonly"
          />
          <q-input
            class="col-md-4 col-sm-12 col-xs-12 q-pr-md"
            v-model="profile.firstname"
            label="Firstname"
            :readonly="readonly"
          />
          <q-input
            class="col-md-4 col-sm-12 col-xs-12  q-pr-md"
            v-model="profile.middlename"
            label="Middlename"
            stack-label
            :readonly="readonly"
          />
        </div>

        <div class="row">
          <q-input
            class="col-md-5 col-sm-12 col-xs-12 q-pr-md "
            type="email"
            v-model="profile.email"
            stack-label
            label="Email"
            :readonly="readonly"
          />

          <q-input
            class="col-md-4 col-sm-12 col-xs-12 q-pr-md "
            v-model="profile.phone"
            label="Phone number "
            mask="+# (###) ###-####" fill-mask="#" unmasked-value
            :readonly="readonly"
          />
        </div>

        <updated-fields
          v-if="profile.updatedAt && profile.updatedBy"
          :updated-at="profile.updatedAt"
          :updated-by="profile.updatedBy" />

      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import UpdatedFields from 'src/lib/components/UpdatedFields.vue'

const appNamespace = 'app'

@Component({
  components: { UpdatedFields }
})
export default class PersonProfile extends Vue {
  @Getter('profile', { namespace: appNamespace }) profile

  readonly = true
}

</script>
