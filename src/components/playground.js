function myCar() {
    this.fuel = 0
    this.reFuel = function() {
        this.fuel = 100
        console.log(this)

        // setTimeout(function() {
        //     // console.log(this)
        //     this.fuel += 100
        //     // console.log(this)
        //     console.log('Rfueld')
        // }, 1000)
    }
}

const platform = 'ios'
const kind = 'audio'
const type =  (platform === 'android')? 'video/mp4' : 'audio/m4a'  ;
if (platform === 'android') { 
    if (kind === 'audio') { }
    else if (kind === 'video') {}
    else { console.error(kind + ' not supported.')}
}
else if (platform === 'ios') { // ios
    if (kind === 'audio') { }
    else if (kind === 'video') { }
    else { console.error(kind + ' not supported.')}
}
console.log(type)
// const type = ( (platform === 'android') && (kind === 'video) ? ( kind === 'video' ? 'video/mp4' : 'audio/m4a') : ( kind === 'video' ? 'video/wav' : 'audio/x-wav')

const Bugatti = new myCar()
console.log(Bugatti)