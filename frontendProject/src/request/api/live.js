import axios from '../index.js'
// 获取所有班级数据
export function getClassInfo () {
  return axios({
    method: 'GET',
    url: '/classrooms'
  })
}
export function postClassInfo (id, students) {
  return axios({
    method: 'POST',
    url: '/students',
    data: {
      classGradeId: id,
      students
    }
  })
}
// {
//   class_id: Number,
//   student: [{
//     id: string,
//     name: string
//   }]
// }
export function postSeatsInfo (data) {
  return axios({
    method: 'POST',
    url: '/seats',
    data
  })
}
// {
//   class_id: Number,
//   startDay: String, 'yyyy/m/d',
//   startScheduleNum: Number,
//   endDay: String, 'yyyy/m/d',
//   endScheduleNum: Number,
//   seats: String[][],'字符串二维数组，空字符串代表没有人'
// }
export function getStudents (id) {
  return axios({
    method: 'GET',
    url: '/students',
    params: {
      classGradeId: id
    }
  })
}
export function getSeats (id, day) {
  return axios({
    method: 'GET',
    url: '/dailyOccupancy',
    params: {
      classGradeId: id,
      day
    }
  })
}
// {
//   seats: Number[][],
//   scheduleNums:{
//     1:{
//       img:'url',
//       monitorId:Number,
//       dailyOccupancy:[[1,1,1,1,1,1],...]
//     }
//   }
// }
export function getDetailSeats (monitorId) {
  return axios({
    method: 'GET',
    url: '/lessonOccupancy',
    params: {
      monitorId
    }
  })
}
export function updateSeats (id, day, monitorId, source, target) {
  return axios({
    method: 'POST',
    url: '/modifyOccupancy',
    data: {
      classGradeId: id,
      day,
      monitorId,
      source,
      target
    }
  })
}
