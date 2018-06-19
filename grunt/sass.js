module.exports = function(){
	return {
		dist: {
			files: [
				{
					expand: true,
					cwd:    'src/sass/',
					src:    ['**/*.scss'],
					dest:   'tmp/css/',
					ext:    '.css'
				}
			]
		}
	};
};