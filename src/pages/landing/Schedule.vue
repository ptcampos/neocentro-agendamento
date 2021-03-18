<template>
  <div class="row q-col-gutter-sm">
    <div class="col-xs-12">
      <div class="row flex flex-center">
        <div class="text-h5">Selecione a melhor data e hora:</div>
      </div>
    </div>
    <div class="col-xs-12">
      <div class="row flex flex-center">
        <div class="col-xs-12">
          <SelectInput
            label="Local da Aplicação"
            :options="driversLocations"
            v-model="currentDriver"
            @input="availableDateHoursFromDrive"
            class="q-mb-md"
          />
        </div>
        <q-option-group
          :options="availableDateHours"
          label="Notifications"
          type="radio"
          v-model="selectedDateHour"
        />
      </div>
    </div>
    <div class="col-xs-12 col-md-4 offset-md-4">
      <div class="column flex flex-center">
        <q-btn @click="schedule" icon="eva-calendar" :disable="!selectedDateHour" label="Agendar Vacinação" color="primary" class="q-mt-md" no-caps />
      </div>
    </div>
  </div>
</template>

<script>
import { getUser } from '../../services/User'
import SelectInput from 'components/SelectInput'

export default {
  components: {
    SelectInput
  },

  data() {
    return {
      availableDateHours: [],
      driversLocations: [],
      selectedDateHour: null,
      currentDriver: '',
      currentUser: {}
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    async init() {
      this.currentUser = getUser()
      const { pt } = this.$route.query
      if (!pt) {
        this.$router.push('/')
        this.$q.notify({
          message: 'Pagamento inválido',
          color: 'negative'
        })
      }
      // get drivers locations
      this.$q.loading.show({
        message: 'Carregando os locais dos drives'
      })
      try {
        this.driversLocations = await this.$axios.get('drivers-locations', {
          params: {
            pt,
            unidade: this.currentUser.unidade
          }
        }).then(r => r.data.map((drive) => ({
          label: drive.name,
          value: drive.value
        })))
      } catch (error) {
        console.log(error)
        this.$q.notify({
          message: 'Erro ao carregar os drives',
          color: 'negative'
        })
      } finally {
        this.$q.loading.hide()
      }
    },
    async availableDateHoursFromDrive(driveVal) {
      const { pt } = this.$route.query
      if (!pt) {
        this.$router.push('/')
        this.$q.notify({
          message: 'Pagamento inválido',
          color: 'negative'
        })
      }
      // validate payment token
      this.$q.loading.show({
        message: 'Carregando os horários disponíveis'
      })
      try {
        const hours = await this.$axios
          .get('/available-hours', {
            params: {
              pt,
              driveVal
            }
          })
          .then(r => r.data);
        this.availableDateHours = hours
        // { label: '15/03/2021 (Segunda-Feira) - 08:00', value: '15/03/2021 - 08:00' }
      } catch (error) {
        console.log(error)
        this.$q.notify({
          message: 'Erro ao carregar os horários disponíveis',
          color: 'negative'
        })
      } finally {
        this.$q.loading.hide()
      }
    },
    async schedule() {
      if (!this.selectedDateHour) {
        return this.$q.notify({
          message: 'Selecione uma data e horário para agendar',
          color: 'negative'
        })
      }
      const selectedDateHour = this.availableDateHours.find(h => h.value === this.selectedDateHour)
      if (confirm(`Você confirma o agendamento na data - hora ${selectedDateHour.label}?`)) {
        this.$q.loading.show()
        try {
          await this.$axios
            .post('/schedule', {
              label: selectedDateHour.label,
              value: selectedDateHour.value,
              datetime: selectedDateHour.date,
              userId: this.currentUser.id,
              userEmail: this.currentUser.email,
              locationVal: this.currentDriver,
              userUnidade: this.currentUser.unidade
            })
          this.$q.dialog({
            title: 'Tudo certo!',
            message: 'Seu agendamento foi realizado com sucesso. Você receberá no seu e-mail o seu código. Compareça no dia e hora marcados para realizar a aplicação da vacina. A Neocentro agradece a preferência'
          })
          this.$store.dispatch('general/clearCart')
          this.$router.push('/')
        } catch (error) {
          console.log(error)
          this.$q.notify({
            message: 'Erro ao realizar o agendamento, tente novamente mais tarde',
            color: 'negative'
          })
        } finally {
          this.$q.loading.hide()
        }
      }
    }
  }
}
</script>

<style>

</style>
