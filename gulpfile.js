const      gulp = require( 'gulp' )
     ,     data = require( 'gulp-data' )
     , favicons = require( 'favicons' ).stream
     ,       fs = require( 'fs' )
	 , nunjucks = require( 'gulp-nunjucks' )
	 ,     sass = require( 'gulp-sass' )
;

sass.compiler = require( 'node-sass' );

gulp.task( 'build:sass', function() {

	return gulp.src( './src/assets/sass/**/*.scss' )
		.pipe( sass( {
			includePaths: [ 'node_modules' ],
			// outputStyle: 'compressed',
		} ).on( 'error', sass.logError ) )
		.pipe( gulp.dest( './docs/assets/css/' ) );

} );

gulp.task( 'build:html', function() {

	return gulp.src( './src/index.html' )
	    .pipe( data( function() {
	    	return JSON.parse( fs.readFileSync( './src/manifest.json' ) );
	    } ) )
		.pipe( nunjucks.compile() )
		.pipe( gulp.dest( './docs' ) );

} );

gulp.task( 'build:favicons', function() {

    return gulp.src( './docs/assets/img/lifterlms_icon.png' )
    	.pipe( favicons( {
			appName: 'LifterLMS Brand and Style Guide',
			appShortName: 'LLMS',
			appDescription: 'This is my application',
			developerName: 'Team LifterLMS',
			developerURL: 'https://lifterlms.com/',
			path: './assets/favicons/',
			html: '../../../src/_favicons.html',
			pipeHTML: true,
			replace: true
    	} ) )
    	.pipe( gulp.dest( './docs/assets/favicons' ) );

} );

gulp.task ( 'build', gulp.series( gulp.parallel( 'build:sass', 'build:favicons' ), 'build:html' ) );

gulp.task( 'watch', function() {

	gulp.watch( './src/assets/sass/**/*.scss', gulp.parallel( 'build:sass' ) );
	gulp.watch( './src/**/*.html', gulp.parallel( 'build:html' ) );
	gulp.watch( './src/manifest.json', gulp.parallel( 'build:html' ) );

} );
