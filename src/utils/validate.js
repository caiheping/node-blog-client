export const rules = {
  validPwd: (rule, value, callback) => {
    if (!value) {
      callback(new Error('密码不能为空'))
    } else if (!(/^(?![^a-zA-Z]+$)(?!\D+$)/.test(value))) {
      callback(new Error('密码格式必须是字母和数字组合'))
    } else {
      callback()
    }
  },
  email: (rule, value, callback) => {
    const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
    if (!reg.test(value)) {
      callback(new Error('非法的邮箱格式'))
    } else {
      callback()
    }
  },
  moblie: (rule, value, callback) => {
    if (!(/^1[34578]\d{9}$/.test(value))) {
      callback(new Error('不合格的手机号码'))
    } else {
      callback()
    }
  },
  checkTel (rule, value, callback) {
    if ((/^1[34578]\d{9}$/.test(value)) || /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(value)) {
      callback()
    } else {
      callback(new Error('请填写合法的手机号码或者固话号码'))
    }
  },
  number: (rule, value, callback) => {
    const reg = /^[0-9]*$/
    if (!reg.test(value)) {
      callback(new Error('请填纯数字'))
    } else {
      callback()
    }
  },
  auth: (rule, value, callback) => {
    if (JSON.stringify(value) === '{}' || (value.menuLists && value.menuLists.length === 0)) {
      callback(new Error('请选择权限'))
    } else {
      callback()
    }
  },
  string: (rule, value, callback) => {
    if (!value.replace(/^(\s*)|(\s*)$/g, '')) {
      callback(new Error('请填字符串'))
    } else {
      callback()
    }
  },
  username: (rule, value, callback) => {
    const reg = /^[\u4e00-\u9fa5_a-zA-Z0-9.·]+$/
    if (!reg.test(value)) {
      callback(new Error('登录名只能包含字母数字下划线'))
    } else {
      callback()
    }
  },
  time: (rule, value, callback) => {
    const nowTime = new Date().getTime()
    const currentTime = new Date(value).getTime()
    if (!value) {
      callback(new Error('时间不能为空'))
    }
    if (currentTime < nowTime) {
      callback(new Error('不能选择过去时间'))
    } else {
      callback()
    }
  },
  timerange: (rule, value, callback) => {
    const nowTime = new Date().getTime()
    const startTime = new Date(value[0]).getTime()
    const endTime = new Date(value[1]).getTime()
    if (!value) {
      callback(new Error('时间不能为空'))
    }
    if (startTime < nowTime || endTime < nowTime) {
      callback(new Error('不能选择过去时间'))
    } else {
      callback()
    }
  },
  year: (rule, value, callback) => {
    const nowTime = new Date().getFullYear()
    if (!value) {
      callback(new Error('时间不能为空'))
    }
    if (value < nowTime) {
      callback(new Error('不能选择过去年份'))
    } else {
      callback()
    }
  },
  name: (rule, value, callback) => {
    const reg = /^[\w\u4E00-\u9FA5\uF900-\uFA2D]*$/
    if (!reg.test(value)) {
      callback(new Error('含有非法字符'))
    } else {
      callback()
    }
  },
  idCard (rule, value, callback) {
    const reg = new RegExp(/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/)
    if (!reg.test(value)) {
      callback(new Error('请输入正确身份证'))
    } else {
      callback()
    }
  }
}
