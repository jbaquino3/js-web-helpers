module.exports = {
    formatDate: function (date) { // Convert date from YYYY-MM-DD to mm/dd/yyyy
        var regEx = /^\d{4}-\d{2}-\d{2}$/
        if(date && date.match(regEx)) {
            const [year, month, day] = date.split('-')
            return `${month}/${day}/${year}`
        } else {
            return null
        }
    },
    
    parseDate: function (date) { // Convert date from mm/dd/yyyy to YYYY-MM-DD
        var regEx = /^\d{2}\/\d{2}\/\d{4}$/
        if(date && date.match(regEx)) {
            const [month, day, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        } else {
            return null;
        }
    },
    
    isValidDate: function (date) {
        var regEx = /^\d{4}-\d{2}-\d{2}$/
        if(typeof date === 'string') {
            if(date && date.match(regEx)) {
                var d = new Date(date);
                var dNum = d.getTime();
                if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
                return d.toISOString().slice(0,10) === date;
            } else {
                return false;
            }
        } else if (Array.isArray(date)) {
            for(let i=0; i<date.length; i++) {
                var newDate = true;
                if(date[i] && date[i].match(regEx)) {
                    var d = new Date(date[i]);
                    var dNum = d.getTime();
                    if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
                    newDate = newDate && d.toISOString().slice(0,10) === date[i]
                }
            }
            return newDate
        } else {
            return false
        }
    },
    
    isDatePast: function (date) {
        var regEx = /^\d{4}-\d{2}-\d{2}$/;
        if(date && date.match(regEx)) {
            var selectedDate = new Date(date);
            var now = today();
            now.setHours(0,0,0,0);
            return selectedDate <= now;
        } else {
            return false;
        }
    },
    
    today: function () {
        var dt = new Date();
        dt.setHours(dt.getHours() + 8);
        return dt
    },
    
    isToday: function (someDate) {
        const tod = new Date()
        someDate = new Date(someDate)
        return someDate.getDate() == tod.getDate() &&
          someDate.getMonth() == tod.getMonth() &&
          someDate.getFullYear() == tod.getFullYear()
    },
    
    formatTime: function (d, isDate = true) {
        var time = isDate ? d.substring(11, 16) : d;
        // Check correct time format and split into components
        time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    
        if (time.length > 1) { // If time format correct
            time = time.slice (1);  // Remove full string match value
            time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
            time[0] = time[0].toString().padStart(2, '0'); // Pad hours digit
        }
        return time.join (''); // return adjusted time or original string
    },
    
    stringtifyDate: function (d) { // Convert date from YYYY-MM-dd to mmm dd yyyy (www)
        if(!d) return null
        var date = new Date(d);
    
        var month = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        var week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    
        var day = date.getDate();
    
        var retdate = month[date.getMonth()] +" "+day + " " + date.getFullYear() + " (" + week[date.getDay()] + ")"
        if(d.length > 10) {
            retdate += " " + formatTime(d)
        }
        return retdate
    },
    
    calculateAge: function (dob) {
        //calculate month difference from current date in time
        var month_diff = Date.now() - new Date(dob).getTime();
        
        //convert the calculated difference in date format
        var age_dt = new Date(month_diff); 
        
        //extract year from date    
        var year = age_dt.getUTCFullYear();
        
        //now calculate the age of the user
        return Math.abs(year - 1970);
    },
    
    currentDateToIsoString: function () {
        return today().toISOString().substring(0,10)
    },
    
    currentTimeToIsoString: function () {
        return today().toISOString().substring(11,16)
    },
    
    currentDateTimeToIsoString: function () {
        return today().toISOString().substring(0,16)
    },
    
    addDays: function (date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result.toISOString().substring(0,10);
    },
    
    tConvert: function (time) {
        // Check correct time format and split into components
        time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    
        if (time.length > 1) { // If time format correct
            time = time.slice (1);  // Remove full string match value
            time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
            time[0] = time[0].toString().padStart(2, '0'); // Pad hours digit
        }
        return time.join (''); // return adjusted time or original string
    },
    
    reverse_tConvert: function (time) {
        var hours = Number(time.match(/^(\d+)/)[1]);
        var minutes = Number(time.match(/:(\d+)/)[1]);
        var AMPM = time.match(/\s(.*)$/)[1];
        if(AMPM == "PM" && hours<12) hours = hours+12;
        if(AMPM == "AM" && hours==12) hours = hours-12;
        var sHours = hours.toString();
        var sMinutes = minutes.toString();
        if(hours<10) sHours = "0" + sHours;
        if(minutes<10) sMinutes = "0" + sMinutes;
        return sHours + ":" + sMinutes;
    },
      
    timeSince: function (date) {
        if (typeof date !== 'object') {
            date = new Date(date);
        }
    
        const intervals = [
            { label: 'year', seconds: 31536000 },
            { label: 'month', seconds: 2592000 },
            { label: 'day', seconds: 86400 },
            { label: 'hour', seconds: 3600 },
            { label: 'minute', seconds: 60 },
            { label: 'second', seconds: 1 }
        ];
    
        const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
        const interval = intervals.find(i => i.seconds < seconds)
    
        if(interval) {
            const count = Math.floor(seconds / interval.seconds);
            return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
        } else {
            return null
        }
    },

    toBase64: function (file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        })
    },
    
    capitalizeTheFirstLetterOfEachWord: function (words) {
        if(!words) {
            return "";
        }
    
        var separateWord = words.toLowerCase().split(' ');
        for (var i = 0; i < separateWord.length; i++) {
            separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
            separateWord[i].substring(1);
        }
        return separateWord.join(' ');
    }
}