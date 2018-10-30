var gulp			= require('gulp'),
	postcss 		= require('gulp-postcss'), // Библиотека PostCSS
	cssnext			= require('cssnext'), // Библиотека c элементами CSS4
	autoprefixer	= require('autoprefixer'), // Автопрификсер
	imagemin		= require('gulp-imagemin'), // Оптимизация изображения
	pngquant   		= require('imagemin-pngquant'), //Оптимизация png картинок
	browserSync 	= require('browser-sync'), //Подключаем Browser Sync
	cache			= require('gulp-cache'),// Библиотека кеширования
	notify 			= require('gulp-notify');
//-------------------//
//--------CSS--------//
//-------------------//
gulp.task('css',function(){
	var processors = [
		autoprefixer({browsres: ['last 3 version']}),
		cssnext
	];
	return gulp.src('src/css/*.css')
		.pipe(postcss(processors))
		.pipe(gulp.dest('dest/css'))
		.pipe(browserSync.reload({stream:true}))
});
//------------------//
//---Local Server---//
//------------------//
gulp.task('browser-sync',function(){
	browserSync({
		server: {
			baseDir: "./"
		}
	});
});
//------------------//
//-------Images-----//
//------------------//
gulp.task('images',function(){
	return gulp.src('src/img/**/*')//Папка источник изображений
		.pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dest/img')) // Выгружаем на продакшен
		.pipe(notify({ message: 'Images task complete' }));
});
//------------------//
//-------Watch-----//
//-----------------//
gulp.task('watch', ['browser-sync'], function(){
	gulp.watch('src/css/**/*.css', ['css']);
	gulp.watch('*.html', browserSync.reload);
	gulp.watch('src/img/**/*', ['images']);
})

gulp.task('default',['css', 'browser-sync', 'watch']);
