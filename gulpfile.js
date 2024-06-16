import {src, dest, watch, series} from 'gulp';

import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';

const sass = gulpSass(dartSass);

export function css(done) {
    src('src/sass/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('build/css'))
    done();
}

export function imagenes(done) {
    src('src/images/**/*.svg')
        .pipe(dest('build/images'))
    done();
}

export function js(done) {
    src('src/js/**/*.js')
        .pipe(dest('build/js'))
    done();
}

export function dev(done) {
    watch('src/sass/**/*.scss', css)
    watch('src/js/**/*.js', js)
    done();
}

export default series(css, js, imagenes, dev);