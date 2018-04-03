'use strict';
module.exports = function(grunt){

	let copyright = '/**\n'+
					' * @version v<%= pkg.version %>\n'+
					' * @link https://github.com/MrWook/mw-alert\n'+
					' * @license MIT\n'+
					' * Copyright (c) '+(new Date()).getFullYear()+' MrWook\n'+
					' */\n\r';

	// Load all grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long grunt task take. Can help when optimizing build times
	require('time-grunt')(grunt);

	//Configure grunt
	grunt.initConfig({
						 pkg:        grunt.file.readJSON('package.json'),
						 sass:       {
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
						 },
						 minifyHtml: {
							 options: {
								 cdata:  false,
								 empty:  false,
								 quotes: true
							 },
							 dist:    {
								 files: [
									 {
										 expand: true,
										 cwd:    'src/templates',
										 src:    ['**/*.html'],
										 dest:   'tmp/templates_min/'
									 }
								 ]
							 }
						 },
						 html2js:    {
							 dist:    {
								 options: {
									 base:         'tmp/templates_min',
									 module:       'mw-alert-template',
								 },
								 src:  ['tmp/templates_min/**/*.html'],
								 dest: 'tmp/templates.js'
							 },
							 options: {
								 indentString: '	',
								 singleModule: true
							 }
						 },
						 babel: {
							 options: {
								 sourceMap: true,
								 presets: ['env']
							 },
							 dist: {
								 files: [
									 {
										 expand: true,
										 cwd: 'src/modules/',
										 src: ['**/*.js'],
										 dest: 'tmp/modules',
									 }
								 ]
							 }
						 },
						 concat:     {
							 options: {
								 sourceMap: true,
								 banner:    copyright,
							 },
							 modules: {
								 options: {
									 banner:    copyright+"'use strict';\n",
									 process: function(src, filepath) {
										 return src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
									 },
								 },
								 src:  [
									 'src/extra/.prefix',
									 'src/mw-alert.js',
									 'tmp/modules/**/*.js',
									 'tmp/templates.js',
									 'src/extra/.suffix'
								 ],
								 dest: 'dist/js/mw-alert.js'
							 },
							 css:     {
								 src:  ['tmp/css/**/*.css'],
								 dest: 'dist/css/mw-alert.css'
							 }
						 },
						 uglify: {
							 build: {
								 options: {
									 sourceMap: true,
									 banner:    copyright,
								 },
								 files:[
									 {
										 src: ['dist/js/mw-alert.js'],
										 dest: 'dist/js/mw-alert.min.js'
									 }
								 ]
							 }
						 },
						 cssmin: {
							 build: {
								 options: {
									 sourceMap: true,
									 banner:    copyright,
								 },
								 files:[
									 {
										 src: ['dist/css/mw-alert.css'],
										 dest: 'dist/css/mw-alert.min.css'
									 }
								 ]
							 }
						 },
						 clean:      ['tmp/'],
					 });


	// Build distribution files
	grunt.registerTask('build', [
		'sass',
		'minifyHtml',
		'html2js',
		'babel',
		'concat',
		'uglify',
		'cssmin',
		'clean'
	]);
};