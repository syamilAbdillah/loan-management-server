class SistemWaktu{
	#jadwalNum // private field have to declare outside constructor func
	#waktuKosongNum = []

	constructor(jadwal = []){
		this.jadwal = jadwal
		this.#jadwalNum = this.#initJadwalNum()
		this.#initWaktuKosongNum()
	}

	#initJadwalNum(){
		return this.jadwal.map(elm => {				
			let start = this.#stringClockToMinute(elm.waktu[0])
			let stop = this.#stringClockToMinute(elm.waktu[1])

			return [start, stop]		
		})
	}

	#initWaktuKosongNum(){
		this.#jadwalNum.map((elm, index, arr) => {
			if(index === 0) {
				if(elm[0] > 0){ 
					this.#waktuKosongNum.push([0, elm[0]])
				}
			}
			else if((arr.length - 1) === index) {
				let gap = elm[0] - arr[index - 1][1]
				if(gap > 0){ 
					this.#waktuKosongNum.push([arr[index - 1][1], elm[0]])
				}
				if(elm[1] < 1440){
					this.#waktuKosongNum.push([elm[1], 1440])
				}
			} else {
				let gap = elm[0] - arr[index - 1][1]

				if(gap > 0){
					[arr[index - 1][1], elm[0]]
				}
			}
		})
	}

	#stringClockToMinute(stringClock = '00.00'){
		let minute = parseInt(stringClock.split('.')[1])
		let hour = parseInt(stringClock.split('.')[0])
		minute +=  (hour*60)
		
		return minute
	}

	#minuteToStringClock(minute = 0){
		const hourString = (Math.floor(minute / 60)).toString().padStart(2,0)
		const minuteString = (minute % 60).toString().padStart(2,0)

		return `${hourString}.${minuteString}`
	}

	getWaktuLuang(){
		return this.#waktuKosongNum.map((elm, index, arr) => {
			let start = this.#minuteToStringClock(elm[0])
			let stop = this.#minuteToStringClock(elm[1])

			return `${start} - ${stop}`
		})
	}

	#getDurasiString([start, stop], durasi){
		return `${this.#minuteToStringClock(start - durasi)} - ${this.#minuteToStringClock(start)}`
	}

	#getResult(namaKegiatan, elm, durasi){
		return `anda boleh ${namaKegiatan} pada pukul ${this.#getDurasiString(elm, durasi)}`
	}

	setJadwal(namaKegiatan, durasi = 0){
		this.#jadwalNum.map((elm, index, arr) => {
			if(index === 0){
				if(elm[0] >= durasi){
					console.log(this.#getResult(namaKegiatan, elm, durasi))
					return
				}
			} else if(arr.length === (index + 1)) {
				if(elm[0] - (arr[index - 1][1]) >= durasi){
					console.log(this.#getResult(namaKegiatan, elm, durasi))

					if(1440 - elm[1] >= durasi){
						const interval = `${this.#minuteToStringClock(elm[1])} - ${this.#minuteToStringClock(elm[1] + durasi)}`
						console.log(`anda boleh ${namaKegiatan} pada pukul ${interval}`)
					} 
				} else {
					console.log('anda tidak punya cukup waktu luang')
				}
			}else{
				if((elm[0] - arr[index - 1][1]) >= durasi) {
					console.log(this.#getResult(namaKegiatan, elm, durasi))
					return
				}
			}
		})
	}
}

class A {
	constructor(name){
		this.name = name
	}
}

class B extends A{
	test(){
		return super.name
	}

	test2(){
		return this.name
	}
}

const b = new B('john')

console.log('test 1', b.test())
console.log('test 2', b.test2())