/**
 * 
 * @description dynamic import module
 * 
 * */
const fs 	= require('fs')
const modules = {}

fs.readdirSync(__dirname).map(file => {
	const splitedFile = file.split('.')
	const isJsFile 	= splitedFile[splitedFile.length - 1] === 'js'
	const isIndexFile = file === 'index.js'
	const isValidFile = isJsFile && !isIndexFile

	if(isValidFile){
		const fileName 		= splitedFile[0]
		const fileWithoutExt = [...splitedFile]
		fileWithoutExt.pop()

		modules[fileName] 	= require(`./${fileWithoutExt.join('.')}`)
	}
})

module.exports = modules


