<template>
  <div class="train-ticket" v-if="tickets">
    <div class="train-ticket-t">
      出行人员<span>（共{{tickets.length}}人）</span>
    </div>
    <div class="train-ticket-c">
      <div class="train-ticket-item"
        v-for="ticket in tickets"
        :key="ticket.id"
      >
        <h3 @click="toggleDetail(ticket)">
          <i class="one" :class="ticket._openDetail ? 'one-arrow-down' : 'one-arrow-right'"></i>{{ ticket.username }}
        </h3>

        <div class="train-ticket-simple" v-if="!ticket._openDetail">
          <div v-if="ticket.airlineCompany">
            <span>
              {{ ticket.airlineCompany }}
            </span>
            -
            <span>
              {{ ticket.flightNumber }}
            </span>
            -
            <span>
              {{ ticket.planeType }}
            </span>
            -
            <span>
              {{ ticket.classType }}
            </span>
          </div>
          <div>
            <span class="label">出发时间：</span>
            <span>{{ ticket.startTime | dateAllFilter}}</span>
          </div>
        </div>
        <div class="train-ticket-all" v-else>
          <user-info :item="ticket" />
          <div class="train-ticket-tt">
            车票信息
            <a v-if="rowData.auditStatus === 4 && rowData.artificial === 1" @click="beginEdit(ticket)">编辑</a>
          </div>
          <train-ticket-display v-if="!ticket._editing" :ticket="ticket" />
          <train-ticket-editor v-else
            :ticket="ticket"
            :order-data="orderData"
            @ok="handleEditOk(tickets)"
            @cancel="handleCancelEdit(ticket)"
          ></train-ticket-editor>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserInfo from '@/components/UserInfo'
import TrainTicketDisplay from './ticket-display'
import TrainTicketEditor from './ticket-editor'

export default {
  name: 'TrainTicket',
  components: {
    UserInfo,
    TrainTicketDisplay,
    TrainTicketEditor
  },
  props: {
    tickets: {
      type: Array,
      default: () => []
    },
    rowData: {
      type: Object,
      default: () => {}
    },
    orderData: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    toggleDetail (ticket) {
      this.$set(ticket, '_openDetail', !ticket._openDetail)
    },
    beginEdit (ticket) {
      this.$set(ticket, '_editing', true)
    },
    handleCancelEdit (ticket) {
      this.$set(ticket, '_editing', false)
    },
    handleEditOk (ticket) {
      this.$set(ticket, '_editing', false)
      this.$emit('refresh')
    }
  }
}
</script>

<style lang="scss">
.train-ticket {
  margin-top: 50px;
  &-t {
    font-size: 14px;
    color: #4a4a4a;
    margin: 0 0 10px 20px;
    span {
      color: #737373;
      font-size: 12px;
    }
  }
  &-c {
    background: #fff;
    padding: 0 20px;
  }
  &-item {
    padding-bottom: 20px;
    h3 {
      margin: 0;
      cursor: pointer;
      font-size: 20px;
      padding: 10px 0;
      margin-left: -10px;
      i {
        position: relative;
        top: 2px;
      }
    }
    .label {
      color: #676767;
    }
  }
  &-simple {
    div {
      margin-top: 5px;
    }
  }
  &-tt {
    margin: 10px 0;
    font-weight: 500;
    a {
      float: right;
    }
  }
}
</style>
