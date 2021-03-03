const data = [
	{
		key:'/content/dgfgfg/dgfg/file'
	},
	{
		key:'/content/dgfgfg/dgfg/file'
	},
	{
		key:'/content/dgfgfg/dgfg/file'
	}
]


data.forEach(obj =>{
	obj.key = obj.key.split('/').pop()
	console.log(obj.key)
})
console.log(data)