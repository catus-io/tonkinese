export default {
  calculateDate: function(date) {
    const seconds = (Date.now() - date.getTime()) / 1000
    const minutes = seconds / 60
    const hours = minutes / 60
    const days = hours / 24
    let result = '';
    if(seconds < 60) result = Math.floor(seconds) + '초 전'
    else if(minutes < 60) result = Math.floor(minutes) + '분 전'
    else if(hours < 24) result = Math.floor(hours) + '시간 전'
    else if(days < 8) result = Math.floor(days) + '일 전'
    else result = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDay()}`
    return result
  }
}