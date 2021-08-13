class Parent {
	constructor(name){
		this.name = name
	}

	intro(){
		return `hello my name is ${this.name}`
	}
}

class Child extends Parent {
	intro(){
		return `hhhhhh`
	}
}


console.log(new Child('syamil').intro())