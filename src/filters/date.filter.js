export default function dateFilter(value, format="date"){
    const options = {}
    if(format.includes('date')){
        options.dat='2-digit'
        options.month='long'
        options.year='numeric'
    }

    if(format.includes('time')){
        options.hour='2-digit'
        options.minute='2-digit'
        options.second='2-digit'
    }
    return new Intl.Dateformat('ru-RU',options).format(new Date(value))
}