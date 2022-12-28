<template>
  <q-dialog :model-value="show">
    <q-card style="width: 500px">
      <q-card-section>
        <div v-if="action === 'edit'" class="text-h6">Edit home page assignment</div>
        <div v-if="action === 'create'" class="text-h6">Create home page assignment</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="row q-pb-md">
          <application-selector v-model="homePage.applicationId" :readonly="action === 'edit'" />
        </div>
        <div class="row q-pb-md">
          <q-field borderless label="Principal" stack-label class="full-width">
            <template v-slot:control>
             <principal-view-item class="q-mt-sm" :principal="homePage.principal"/>
            </template>
            <template v-slot:append v-if="action !== 'edit'">
              <q-btn flat round icon="search" color="primary"
                     @click="selectPrincipal"/>
              <principal-selector-dialog ref="principalSelectorDialog"/>
            </template>
          </q-field>

        </div>
        <div class="row q-pb-md">
          <q-input class="col-md-12 col-sm-12 col-xs-12 "
                   v-model="homePage.priority"
                   type="number"
                   label="Priority"/>
        </div>
        <div class="row q-pb-md">
          <page-selector v-model="homePage.pageId"/>
        </div>
      </q-card-section>


      <q-card-actions align="right">
        <q-btn flat label="Cancel" outline color="primary" @click="close"/>
        <q-btn label="Save" color="primary" @click="save" :disable="!canSave"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import {computed, defineComponent, ref, toRefs, watch} from 'vue';
import {extend} from 'quasar';
import {AssignHomePagePayloadDto, useHomePageStore} from 'src/modules/cms';
import {Ref} from '@vue/reactivity';
import ApplicationSelector from 'src/modules/application/ui/application/components/ApplicationSelector.vue';
import PageSelector from 'src/modules/cms/ui/page/components/PageSelector.vue';
import PrincipalViewItem from 'src/shared/components/principal-view/PrincipalViewItem.vue';
import PrincipalSelectorDialog from 'src/shared/components/principal-selector/PrinciplaSelectorDialog.vue';

export default defineComponent({
  name: 'HomePageFormDialog',
  components: {PrincipalSelectorDialog, ApplicationSelector,  PageSelector, PrincipalViewItem},
  props: {
    show: {
      type: Boolean,
      required: true
    },
    action: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: false
    }
  },
  emits: ['close'],
  setup(props, {emit}) {

    const store = useHomePageStore()

    const {show, action, id} = toRefs(props)
    const homePage: Ref<AssignHomePagePayloadDto | null> = ref(null)

    const loadEntity = async () => {
      console.log('loadEntity:', id.value, action.value)
      if (show.value && action.value === 'create') {
        homePage.value = {
          applicationId: '',
          priority: 0,
          pageId: '',
          principal: {
            principalType: '',
            principalId: ''
          },
        }
      } else if (show.value && action.value === 'edit') {
        homePage.value = {
          applicationId: '',
          priority: 0,
          pageId: '',
          principal: {
            principalType: '',
            principalId: ''
          },
        }
        const page = await store.getEntityForEdit(id.value as string)
        homePage.value = extend(true, {}, page)
      } else {
        homePage.value = null
      }
    }

    const save = async () => {
      if (homePage.value) {
        const payload = {...homePage.value}
        payload.priority = +payload.priority
        homePage.value = await store.assignHomePage(payload)
        emit('close')
      }
    }

    const canSave = computed(() => {
      return homePage.value &&
        homePage.value.applicationId.trim() !== '' &&
        homePage.value.principal.principalType.trim() !== '' &&
        homePage.value.principal.principalId.trim() !== '' &&
        homePage.value.pageId.trim() !== ''
    })

    const close = () => {
      emit('close')
    }

    const principalSelectorDialog = ref()
    const selectPrincipal = async () => {
      if (homePage.value) {
        homePage.value.principal = await principalSelectorDialog.value.showDialog()
      }
    }

    watch(show, loadEntity)

    return {
      homePage,
      canSave,
      save,
      close,
      principalSelectorDialog,
      selectPrincipal,
    }
  }
});
</script>
