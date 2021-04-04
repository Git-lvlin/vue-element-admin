import moment from 'moment'

//data：要转换的时间搓    format:转换成什么格式
function timeRepalce(date,format){ 
    return moment(date).format(format)
}

export default{
    timeRepalce
}