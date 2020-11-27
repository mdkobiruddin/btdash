<template>
  <div class="d-flex flex-grow-1 flex-column">
    <v-row class="flex-grow-0" dense>
      <v-col cols="12">
        <column-card
          class="h-full"
          style="min-height: 380px"
          :value="1837.32"
          :percentage="3.2"
          :loading="isLoading1"
          :percentage-label="$t('dashboard.lastweek')"
          :action-label="$t('dashboard.viewReport')"
        ></column-card>
      </v-col>
    </v-row>
    <v-container
    class="px-0"
    fluid
  >

  </v-container>
  <template>
    <v-row>
    <v-switch
    inset
      v-model="mode"
      color="red"
      :label="`Mode: ${chartType.toString()}`"
      @change="toggleChartType($event)"
    ></v-switch>
  </v-row>
  </template>
          <v-row>
            <v-form  v-show="mode" transition="scroll-y-transition" ref="form" v-model="form">
              <v-col class="d-inline-flex">
                <v-text-field
                  v-model="email"
                  filled
                  label='Email Address'
                  type='email'
                ></v-text-field>
                <v-btn
                  @click="searchUsersByEmail"
                  :disabled="!form"
                  large
                  color="Primary"
                  class="ml-2 mt-2"
                >
                  Search
                </v-btn>
              </v-col>
            </v-form>
          </v-row>
      <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="dates"
        persistent
        width="290px"
      >

        <template v-slot:activator="{ on, attrs }">
          <v-text-field

            v-model="dates"
            label="Picker in dialog"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="dates"
          range
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="modal = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.dialog.save(dates); dateChangedChecker()"

          >
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>
    <v-btn
      text
      color="primary"
      @click="getGroupData('challenge', false)"
    >
      OK
    </v-btn>
   <v-row class="flex-grow-0" dense>
      <v-col cols="6">
        <v-card
          class="pa-2"
          outlined
          color="blue lighten-4"
          elevation="3"
        >
          <h1 class="text-center">SOS</h1>
          <v-row class="flex-grow-0" dense>
          <v-col cols="6">
            <v-checkbox
              v-model="challengeCheck"
              label="Confront"
              color="primary"
              v-on:change="checkBoxTest('challenge')"
              hide-details
            ></v-checkbox>

            <v-checkbox
              v-model="challengeSMSCheck"
              label="Confront SMS"
              color="primary"
              v-on:change="checkBoxTest('challenge-sms')"
              hide-details
            ></v-checkbox>

            <v-checkbox
              v-model="userSMSCheck"
              label="User SMS"
              color="primary"
              v-on:change="checkBoxTest('user-sms')"
              hide-details
            ></v-checkbox>
          </v-col>

          <v-col cols="6">
            <v-checkbox
              v-model="alarmCheck"
              label="Alarm"
              color="primary"
              v-on:change="checkBoxTest('alarm')"
              hide-details
            ></v-checkbox>

            <v-checkbox
              v-model="secretCheck"
              label="Secret"
              color="primary"
              v-on:change="checkBoxTest('secret')"
              hide-details
            ></v-checkbox>

            <v-checkbox
              v-model="secretSMSCheck"
              label="Secret SMS"
              color="primary"
              v-on:change="checkBoxTest('secret-sms')"
              hide-details
            ></v-checkbox>
          </v-col>
        </v-row>
        </v-card>
      </v-col>

      <v-col cols="3">
        <v-card
          class="pa-3"
          outlined
          color="blue lighten-4"
          elevation="3"
        >
        <h1>Travel</h1>
        <v-checkbox
              v-model="zoneCheck"
              label="Zone"
              color="primary"
              v-on:change="checkBoxTest('zone')"
              hide-details
            ></v-checkbox>

            <v-checkbox
              v-model="zoneSMSCheck"
              label="Zone SMS"
              color="primary"
              v-on:change="checkBoxTest('zones-sms')"
              hide-details
            ></v-checkbox>
        </v-card>
      </v-col>

      <v-col cols="3">
        <v-card
          class="pa-3"
          outlined
          color="blue lighten-4"
          elevation="3"
        >
        <h1>Reminder</h1>
        <v-checkbox
              v-model="timerCheck"
              label="Reminder"
              color="primary"
              v-on:change="checkBoxTest('timer')"
              hide-details
            ></v-checkbox>

            <v-checkbox
              v-model="timerSMSCheck"
              label="Reminder SMS"
              color="primary"
               v-on:change="checkBoxTest('timer-sms')"
              hide-details
            ></v-checkbox>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// DEMO Cards for dashboard
//import SalesCard from '../../components/dashboard/InboxCard'
import ColumnCard from '../../pages/ui/charts/_examples/apex-charts/simple/column'
import { db } from '../../main'
import moment from 'moment'
const query = db.collection('users')
export default {
  components: {
    ColumnCard
  },
  data() {
    return {
      form: false,
      mode:false,
      chartType:'Group',
      loadingInterval: null,
      email: '',
      foundUser: null,
      isLoading1: true,
      fromDateMenu: false,
      fromDateVal: null,
      dates:[],
      modal: false,
      minDate: '2019-07-04',
      maxDate: '2030-08-30',
      allSearchDates: [],
      allResults: [],
      challengeList:[],
      challengeSMSList:[],
      secretList:[],
      secretSMSList:[],
      timerList:[],
      timerSMSList:[],
      userSMSList:[],
      zoneList:[],
      zoneSMSList:[],
      alarmList:[],
      sendBarData: [],
      selectChallenge: true,
      selectChallengeSMS:true,
      selectSecret:true,
      selectSecretSMS:false,
      selectTimer:true,
      selectTimerSMS:true,
      selectZone:false,
      selectZoneSMS:false,
      selectUserSMS:true,
      selectAlarm:true,

      groupChallengeCount:0,
      groupChallengeSMSCount:0,
      groupSecretCount:0,
      groupSecretSMSCount:0,
      groupTimerCount:0,
      groupTimerSMSCount:0,
      groupZoneCount:0,
      groupZoneSMSCount:0,
      groupUserSMSCount:0,
      groupAlarmCount:0,

      challengeCheck:false,
      challengeSMSCheck:false,
      secretCheck:false,
      secretSMSCheck:false,
      timerCheck:false,
      timerSMSCheck:false,
      zoneCheck:false,
      zoneSMSCheck:false,
      userSMSCheck:false,
      alarmCheck:false,

      activeCheckBoxes:[]


    }
  },
  mounted() {
    let count = 0

    // DEMO delay for loading graphics
    this.loadingInterval = setInterval(() => {
      this[`isLoading${count++}`] = false
      if (count === 4) this.clear()
    }, 400)
  },
  beforeDestroy() {
    this.clear()
  },
  methods: {
    clearAllCriteria(){
      this.challengeList = []
      this.challengeSMSList = []
      this.secreList = []
      this.secreSMSList = []
      this.timerList = []
      this.timerSMSList = []
      this.userSMSList = []
      this.zoneList = []
      this.zoneSMSList = []
      this.alarmList = []
      this.sendBarData = []

      this.challengeCheck = false
      this.challengeSMSCheck = false
      this.secretCheck = false
      this.secretSMSCheck = false
      this.timerCheck = false
      this.timerSMSCheck = false
      this.zoneCheck = false
      this.zoneSMSCheck = false
      this.userSMSCheck = false
      this.alarmCheck = false

      this.activeCheckBoxes=[]

      this.$store.dispatch('queryuser/setNewBarChartData',Object.values(this.sendBarData))
    },
    toggleChartType(event){
      console.log(event)
      this.clearAllCriteria()
      if (event==true){
        this.chartType='Individual'
      }else{
        this.chartType='Group'
      }
    },
    clear() {
      clearInterval(this.loadingInterval)
    },
    checkBoxTest(type){
      console.log(type+' '+this.challengeCheck)
      if (this.activeCheckBoxes.includes(type)){
        this.activeCheckBoxes.splice(this.activeCheckBoxes.indexOf(type), 1);
      }else{
        this.activeCheckBoxes.push(type)
      }
      console.log (this.activeCheckBoxes)

    if (this.chartType=='Group'){
      this.getGroupData(type, false)
    }else{
      this.selectChartColumns()
    }

    },
    dateChangedChecker(){
      this.sendBarData=[]

    if (this.chartType=='Group'){

      for (var d=0; d<this.activeCheckBoxes.length; d++){
        this.getGroupData(this.activeCheckBoxes[d], true)
      }

    }else{
      this.searchUsersByEmail()
    }
    },
    changeData() {

    if (this.chartType=='Group'){
       this.selectChallengeSMS = false
       this.selectChartColumns()
    }else{
      this.searchUsersByEmail()
    }






      //this.$store.dispatch('user/setNewData',[14,104,7,9,10])
    },

    async setTimeUserEventsDocs() {

      let userIdList=[]
      await db.collection("users").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {

        userIdList.push(doc.ref.id)
      })
      })

       console.log(userIdList)

      for (var l=0; l<userIdList.length; l++){

      db.collection("users").doc(userIdList[l]).collection('events').get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {

      const splitTime=doc.ref.id.split(' ')[0];
      console.log(splitTime)
      var pushTime = Date.parse(splitTime)
        doc.ref.update({
          createdAt: pushTime
        });
        console.log(moment(pushTime).format('MMM Do YY'))

      })

      })
      }

    },

    setTimeAllDocs(){
      db.collection("alarm").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      const splitTime=doc.ref.id.split(' ')[0];
      console.log(splitTime)
      var pushTime = Date.parse(splitTime)
        doc.ref.update({
          createdAt: pushTime
        });
        console.log(moment(pushTime).format('MMM Do YY'))
    });
    });
    },



    async getGroupData(category, fromDate){

      console.log(this.dates[0] + ' 00:00:00.000')

      const fullDate1 = Date.parse(this.dates[0])
      const fullDate2 = Date.parse(this.dates[1])

      const useDates = []


      if (fullDate1 < fullDate2) {
        useDates.push(fullDate1)
        useDates.push(fullDate2)
      } else {
        useDates.push(fullDate2)
        useDates.push(fullDate1)
      }
      console.log (useDates)

      this.allSearchDates  = this.getDates(useDates[0], useDates[1])

      console.log(useDates[1])

      this.$store.dispatch('queryuser/setDates',this.allSearchDates )

        const testCollection = []
      //context.commit("SET_MATCHES", categories)

      if (!fromDate){
      for (var b=0; b<this.sendBarData.length; b++){
        if (this.sendBarData[b]['name']==category){
          console.log('remove it')
          //this.sendBarData = []
          this.sendBarData.splice(b, 1);
          this.$store.dispatch('queryuser/setNewBarChartData',Object.values(this.sendBarData))
            return
        }else{
          console.log('add it')
        }
      }
      }

      await db.collection(category)
        .orderBy('createdAt').startAt(useDates[0]).endAt(useDates[1])
        // .where('createdAt'
        //   , '==', Date.parse('2020-11-17 00:00:00.000'))
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
          // eslint-disable-next-line no-console
            console.log('cannot find')
            //this.$router.push('/HelloWorld')
          }else{
              querySnapshot.forEach((doc) => {
              const coll = []
              const { id } = doc
               const usingDate = moment(id).format('MMM Do YY')

              doc.data()['events'].forEach((doc) => {
                coll.push({ doc })
              })

              testCollection.push({ [usingDate]: coll })

            })

            //this.allResults = testCollection
            //console.log (this.allResults)
            //this.createArrays()

          }

        })



      await this.fillGroupChartArray(testCollection, category)

         console.log(this.sendBarData)
       this.$store.dispatch('queryuser/setNewBarChartData',Object.values(this.sendBarData))

    },

    async searchUsersByEmail() {
      this.isLoading = true
      this.message = ''
      this.foundUser = null

      this.challengeList = []
      this.challengeSMSList = []
      this.secreList = []
      this.secreSMSList = []
      this.timerList = [],
      this.timerSMSList = [],
      this.userSMSList = [],
      this.zoneList = [],
      this.zoneSMSList = [],
      this.alarmList = [],
      this.sendBarData = []

      const snapshot = await db
        .collection('users')
        .where('email', '==', this.email.toLowerCase())
        .get()

      if (!snapshot.empty) {
        const userId = snapshot.docs[0].id
        const userData = snapshot.docs[0].data()

        this.foundUser = {
          id: userId,
          ...userData
        }

        const dbUser = await db.collection('users').doc(userId).get()

        if (dbUser !== null) {

          const queryUserData = dbUser.data()

          await this.$store.dispatch('queryuser/setUserData', {
            id: dbUser.id,
            name: queryUserData.username,
            email: queryUserData.email

          })

          this.searchUserAndDate(userId)

        } else {
          console.log('NO USER')
        }
      } else {
        this.message = 'No user with that email found.'
      }
      this.isLoading = false
    },

    getDates(startDate, stopDate) {
      var dateArray = [];
      var currentDate = moment(startDate);
      var stopDate = moment(stopDate);
      while (currentDate <= stopDate) {
          dateArray.push( moment(currentDate).format('MMM Do YY') )
          currentDate = moment(currentDate).add(1, 'days');
      }
      return dateArray;
    },
    async searchUserAndDate(uid) {
     // console.log(this.dates[0] + ' 00:00:00.000')

      const fullDate1 = Date.parse(this.dates[0])
      const fullDate2 = Date.parse(this.dates[1])

      console.log(fullDate1)
      console.log(fullDate2)

      const useDates = []

      if (fullDate1 < fullDate2) {
        useDates.push(fullDate1)
        useDates.push(fullDate2)
      } else {
        useDates.push(fullDate2)
        useDates.push(fullDate1)
      }
      console.log (useDates)

      this.allSearchDates  = this.getDates(useDates[0], useDates[1])


      this.$store.dispatch('queryuser/setDates',this.allSearchDates )



      const testCollection = []
      //context.commit("SET_MATCHES", categories)

      db.collection('users').doc(uid)
        .collection('events')
        .orderBy('createdAt').startAt(useDates[0]).endAt(useDates[1])
        // .where('createdAt'
        //   , '==', Date.parse('2020-11-17 00:00:00.000'))
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
          // eslint-disable-next-line no-console
            console.log('cannot find')
            //this.$router.push('/HelloWorld')
          } else {

            querySnapshot.forEach((doc) => {
              const coll = []
              const { id } = doc

              doc.data()['events'].forEach((doc) => {
                coll.push({ doc })
              })

              testCollection.push({ [id]: coll })

            })

            this.allResults = testCollection
            this.createArrays()
          }
        })

    },
    async createArrays(){

    this.allResults.forEach(doc=>{
      for (const [key, value] of Object.entries(doc)) {
          console.log(`NEW ${key}: ${value}`)

            var theKey=key

            for (const [akey, avalue] of Object.entries(doc[theKey])) {
                console.log(`${akey}: ${avalue}`)
                const usingDate = moment(avalue['doc']['time'].toDate()).format('MMM Do YY')


                console.log(usingDate);

                switch (avalue['doc']['category']) {
                    case 'challenge':
                        this.challengeList.push({ [usingDate] :avalue['doc']})
                        //this.challengeList.push(avalue['doc'])
                        break;
                    case 'challenge-sms':
                        this.challengeSMSList.push({ [usingDate] :avalue['doc']})
                        break;
                    case 'secret':
                        this.secretList.push({ [usingDate] :avalue['doc']})
                        break;
                    case 'secret-sms':
                        this.secretSMSList.push({ [usingDate] :avalue['doc']})
                        break;
                    case 'timer':
                        this.timerList.push({ [usingDate] :avalue['doc']})
                        break;
                    case 'timer-sms':
                        this.timerSMSList.push({ [usingDate] :avalue['doc']})
                        break;
                    case 'user-sms':
                        this.userSMSList.push({ [usingDate] :avalue['doc']})
                        break;
                    case 'zone':
                        this.zoneList.push({ [usingDate] :avalue['doc']})
                        break;
                    case 'zones-sms':
                        this.zoneSMSList.push({ [usingDate] :avalue['doc']})
                        break;
                    case 'alarm':
                        this.alarmList.push({ [usingDate] :avalue['doc']})
                        break;
                    default:
                        break;
                }
             }

            }
    })

    this.selectChartColumns()

  },

  async selectChartColumns(){

    this.sendBarData=[]

    console.log(this.alarmList)

 if (this.challengeList.length>0 && this.challengeCheck){
      await this.fillChartArray(this.challengeList, 'Challenge')
    }

    if (this.challengeSMSList.length>0 && this.challengeSMSCheck){
      await this.fillChartArray(this.challengeSMSList, 'Challenge SMS')
    }

    if (this.secretList.length>0 && this.secretCheck){
      await this.fillChartArray(this.secretList, 'Secret')
    }

    if (this.secretSMSList.length>0 && this.secretSMSCheck){
      await this.fillChartArray(this.secretSMSList, 'Secret SMS')
    }

    if (this.timerList.length>0 && this.timerCheck){
      await this.fillChartArray(this.timerList, 'Timer')
    }

    if (this.timerSMSList.length>0 && this.timerSMSCheck){
      await this.fillChartArray(this.timerSMSList, 'Timer SMS')
    }

    if (this.zoneList.length>0 && this.zoneCheck){
      await this.fillChartArray(this.zoneList, 'Zone')
    }

    if (this.zoneSMSList.length>0 && this. zoneSMSCheck){
      await this.fillChartArray(this.zoneSMSList, 'Zone SMS')
    }

    if (this.userSMSList.length>0 && this.userSMSCheck){
      await this.fillChartArray(this.userSMSList, 'User SMS')
    }

    if (this.alarmList.length>0 && this.alarmCheck){
      await this.fillChartArray(this.alarmList, 'Alarm')
    }

     this.$store.dispatch('queryuser/setNewBarChartData',Object.values(this.sendBarData))

  },

  async fillChartArray(createdList, category){

    var tabulatedList = {}

    for (var t=0; t<this.allSearchDates.length; t++){
      Object.assign(tabulatedList, {[this.allSearchDates[t]]: 0});
    }

    for (var i=0; i<createdList.length; i++){
    for (const [key, value] of Object.entries(createdList[i])) {
          console.log(`NEW ${key}: ${value}`)
          tabulatedList[key]++
          //tabulatedList[key] = value.length
        }
    }

  console.log(tabulatedList)

    await this.sendBarData.push({name: category, data: Object.values(tabulatedList)})

    return
  },

  async fillGroupChartArray(createdList, category){

    var tabulatedList = {}

    for (var t=0; t<this.allSearchDates.length; t++){
      Object.assign(tabulatedList, {[this.allSearchDates[t]]: 0});
    }

    for (var i=0; i<createdList.length; i++){
    for (const [key, value] of Object.entries(createdList[i])) {
          console.log(`NEW ${key}: ${value}`)

          tabulatedList[key] = value.length

          //get values below e.g. map locations

          // for (var v=0; v<value.length; v++){
          //   console.log (value[v]['doc']['eventId'])
          // }

        }
    }

  //console.log(tabulatedList)

    await this.sendBarData.push({name: category, data: Object.values(tabulatedList)})

    return
  }



  }
}
</script>
