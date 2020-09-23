<template>
  <a-layout class="LibSitSearch">
    <a-descriptions>
      <a-descriptions-item>{{info_string}}</a-descriptions-item>
    </a-descriptions>
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <a-date-picker v-model="selected_date" placeholder="选择日期" :defaultValue="moment()"></a-date-picker>
    <div>
      <a-row type="flex" justify="space-around">
        <a-time-picker
          v-model="start_time"
          format="HH:mm"
          placeholder="开始时间"
          :defaultValue="moment()"
        ></a-time-picker>
        <a-time-picker
          v-model="end_time"
          format="HH:mm"
          placeholder="结束时间"
          :defaultValue="moment()"
        ></a-time-picker>
      </a-row>
    </div>
    <a-button type="primary" :loading="loading" @click="enterLoading">查找可用座位</a-button>
    <hr />
    <!-- <h2>查找结果</h2> -->
    <a-list :grid="{ gutter: 16, column: 2 }" :data-source="search_result">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-card :title="item"></a-card>
      </a-list-item>
    </a-list>
    <a-row type="flex" justify="end">
      <a-col v-if="link_enabled">
        <router-link to="/LibPageWarp">
          <a-button type="primary">
            图书馆选座系统连接
            <a-icon type="right" />
          </a-button>
        </router-link>
      </a-col>
    </a-row>
  </a-layout>
</template>

<script>
const axios = require("axios");
import moment from "moment";

export default {
  name: "LibSitSearch",
  components: {},
  data() {
    return {
      selected_date: moment(),
      start_time: moment(),
      end_time: moment("22:40", "HH:mm"),
      loading: false,
      link_enabled: false,
      moment,
      info_string: "请注意必须在校园网内才可使用",
      search_result: [],
      room_ids: [
        100496019,
        100496021,
        100496023,
        100496271,
        100496278,
        100496280,
        100496282,
        100496284,
        100496276,
        100496300,
        100496302,
        100496304,
        100496306,
        100496308,
      ],
    };
  },
  methods: {
    async enterLoading() {
      let self = this;
      self.loading = true;
      let result_promise = self.room_ids.map(async (room_id) => {
        let rsp = await this.get_sit_info(room_id, self.selected_date);
        return rsp;
      });
      let rooms = await Promise.all(result_promise);
      console.log(rooms);
      let results = rooms.map((room_obj) => {
        return this.find_sit(room_obj, self.start_time, self.end_time);
      });
      console.log(results);
      let filtered_result = results.filter(function (el) {
        return el != null;
      });
      // console.log(filtered_result);
      if (filtered_result === undefined || filtered_result.length == 0) {
        // array empty or does not exist
        self.info_string = "抱歉没有找到可用座位";
      } else {
        self.link_enabled = true;
      }
      self.search_result = filtered_result;
      self.loading = false;
    },
    async get_sit_info(room_id, date) {
      let payload = {
        byType: "devcls",
        classkind: "8",
        display: "fp",
        md: "d",
        room_id: room_id,
        purpose: "",
        selectOpenAty: "",
        cld_name: "default",
        date: date.format("YYYY-MM-DD"), //# "2020-09-18",
        fr_start: "7:00", // time_start.format('HH:mm'), //# "22:00",
        fr_end: "23:00", // time_end.format('HH:mm'), // "23:00",
        act: "get_rsv_sta",
        // "_": "1600436808071",
      };
      let response = await axios.get(
        "http://10.12.162.31/ClientWeb/pro/ajax/device.aspx",
        {
          params: payload,
        }
      );
      // .then(function (response) {
      //   console.log(response);
      // })
      // .catch(function (error) {
      //   console.log(error);
      // })
      // .then(function () {
      //   // always executed
      // });
      self.loading = false;
      return response;
    },
    find_sit(room_obj, start_time, end_time) {
      start_time = moment(
        this.selected_date.format("YYYY-MM-DD ") + start_time.format("HH:mm"),
        "YYYY-MM-DD HH:mm"
      );
      end_time = moment(
        this.selected_date.format("YYYY-MM-DD ") + end_time.format("HH:mm"),
        "YYYY-MM-DD HH:mm"
      );
      let all_sits = room_obj.data.data;
      for (let index = 0; index < all_sits.length; index++) {
        const sit_obj = all_sits[index];
        if (sit_obj.state == null && "ts" in sit_obj) {
          let found = true;
          for (let index = 0; index < sit_obj.ts.length; index++) {
            const req = sit_obj.ts[index];
            let start = moment(req.start, "YYYY-MM-DD HH:mm");
            let end = moment(req.end, "YYYY-MM-DD HH:mm");
            if (!(end_time < start || start_time > end)) {
              found = false;
              break;
            }
          }
          if (found) {
            return sit_obj.name;
          }
        }
      }
      return null;
    },
  },
};
</script>
