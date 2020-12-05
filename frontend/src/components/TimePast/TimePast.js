export const TimePast = (date)=>{
        var seconds = Math.floor((new Date() - date) / 1000);
      
        var interval = seconds / 31536000;
      
        if (interval > 1) {
          return Math.floor(interval) + " m.";
        }
        if (interval > 1) {
          return Math.floor(interval) + " mėn.";
        }
        interval = seconds / 86400;
        if (interval > 1) {
          return Math.floor(interval) + " d.";
        }
        interval = seconds / 3600;
        if (interval > 1) {
          return Math.floor(interval) + " val.";
        }
        interval = seconds / 60;
        if (interval > 1) {
          return Math.floor(interval) + " min.";
        }
        return Math.floor(seconds) + " sek.";
}