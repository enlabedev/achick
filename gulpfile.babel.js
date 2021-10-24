/* ========================================= *
 *           D E F I N I T I O N S           *
 * ========================================= */

const gulp = require('gulp');
const $ = require('gulp-load-plugins')({
    
    postRequireTransforms: {
        sass: function(sass) {
          return sass(require('sass'));
        }
      }
});

const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const resolve = require('rollup-plugin-node-resolve');
const del = require('del');
const through2 = require('through2');
const commonjs = require('rollup-plugin-commonjs');

const config = require('./gulpfile.config.js');

/* ========================================= *
 *             F U N C T I O N S             *
 * ========================================= */

const option = o => {
	i = process.argv.indexOf(o);
	if(i>-1){
		return true;
	}else{
		return false;
	}
}

const onError = r => {
	$.notify.onError('\n\n❌  ===> ERROR: <%= error.message %>\n')(r);
};

const browsersync = d => {
	browserSync.init({
		proxy: config.enviroments.browserSync.projectURL,
		open: config.enviroments.browserSync.browserAutoOpen,
		injectChanges: config.enviroments.browserSync.injectChanges,
		watchEvents: config.enviroments.browserSync.watchEvents
	});
	d();
};

const reload = d => {
	browserSync.reload();
	d();
};

const minifyIfNeed = () =>{
	return option("--prod")?'compressed':'expanded'
}

const sourcemapsInitIfNeed = () =>{
	return option("--prod")?through2.obj():$.sourcemaps.init()
}

const sourcemapsWriteIfNeed = () =>{
	return option("--prod")?through2.obj():$.sourcemaps.write("./");
}

const translateModeIfNeed = () => {
	return option("--translate") ? $.wpPot({
		domain: config.enviroments.language.textDomain,
		package: config.enviroments.language.packageName
	}):through2.obj(); 
}
const translateModeWriteIfNeed = () => {
	return option("--translate") ? gulp.dest(config.path.wordpress.translationFile):through2.obj(); 
}

/* ========================================= *
 *                 T A S K S                 *
 * ========================================= */

gulp.task('styles', () => {
	return gulp
		.src(config.path.css.sass, {allowEmpty: true})
		.pipe($.plumber(onError))
		.pipe(sourcemapsInitIfNeed())
		.pipe(
			$.sass({
				includePaths: config.enviroments.includePaths,
				outputStyle: minifyIfNeed()
			})
		)
		.on('error', $.sass.logError)
		.pipe($.autoprefixer(config.enviroments.browser))
		.pipe(sourcemapsWriteIfNeed())
		.pipe($.lineEndingCorrector()) // Consistent Line Endings for non UNIX systems.
		.pipe(gulp.dest(config.path.css.dist))
		.pipe(browserSync.stream()) // Reloads style.min.css if that is enqueued.
		.pipe(
			$.notify({
				message: '\n\n✅  ===> STYLES — completed!\n',
				onLast: true
			})
		);
});


gulp.task('javaScript', () => {
	return gulp
		.src(config.path.js.all)
		.pipe($.plumber(onError))
		.pipe(sourcemapsInitIfNeed())
		.pipe($.betterRollup({ plugins: [resolve(), commonjs()] }, 'umd'))
		.pipe(
			$.babel({
				presets: [
					[
						'@babel/preset-env',
						{
							targets: {browsers: config.enviroments.browser}
						}
					]
				]
			})
		)
		.pipe($.uglify())
		.pipe($.lineEndingCorrector())
		.pipe(sourcemapsWriteIfNeed())
		.pipe(gulp.dest(config.path.js.dist))
		.pipe(
			$.notify({
				message: '\n\n✅  ===> JS — completed!\n',
				onLast: true
			})
		);
});

gulp.task('translate', () => {
	return gulp
		.src(config.path.wordpress.php)
		.pipe(translateModeIfNeed())
		.pipe(translateModeWriteIfNeed())
		.pipe(
			$.notify({
				message: '\n\n✅  ===> TRANSLATE — completed!\n',
				onLast: true
			})
		);
});


gulp.task('images', () => {
	return gulp
		.src(config.path.images.source)
		.pipe(
			$.cache(
				$.imagemin([
					imagemin.gifsicle({interlaced: true}),
					imagemin.mozjpeg({quality: 80, progressive: true}),
					imagemin.optipng({optimizationLevel: 3}),
					imagemin.svgo({
						plugins: [{removeViewBox: true}, {cleanupIDs: false}]
					})
				])
			)
		)
		.pipe(gulp.dest(config.path.images.dist))
		.pipe(
			$.notify({
				message: '\n\n✅  ===> IMAGES — completed!\n',
				onLast: true
			})
		);
});

gulp.task('favicon', function () {
    return gulp.src(config.path.favicon.source)
        .pipe(gulp.dest(config.path.favicon.dist))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('fonts', function(){
    return gulp.src(config.path.fonts.source)
        .pipe(gulp.dest(config.directory.dist + "/fonts"))
        .pipe(browserSync.stream());
});

gulp.task('clearCache', function (done) {
	return $.cache.clearAll(done);
});

gulp.task('clean', function () {
    return del([
        config.directory.dist + '/**/*'
    ], {force: true});
});


gulp.task(
	'default',
	gulp.parallel('translate', 'styles','javaScript','favicon','fonts','images', browsersync, () => {
		gulp.watch(config.path.wordpress.php, gulp.series('translate', reload)); 
		gulp.watch(config.path.css.sass, gulp.parallel('styles'));
		gulp.watch(config.path.js.all, gulp.series('javaScript', reload));
		gulp.watch(config.path.favicon.source, gulp.series('favicon'));
    	gulp.watch(config.path.fonts.source, gulp.series('fonts'));
		gulp.watch(config.path.images.source, gulp.series('images', reload));
	})
);