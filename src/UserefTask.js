import gulpIgnore from 'gulp-ignore';
import gulpif from 'gulp-if';
import isArray from 'lodash/isArray';
import mergeWith from 'lodash/mergeWith';
import minifyCss from 'gulp-clean-css';
import uglify from 'gulp-uglify';

let gulpUseref;

class UserefTask extends Elixir.Task {
  constructor(name, paths, options) {
    super(name, null, paths);

    this.options = options;
  }

  loadDependencies() {
    gulpUseref = require('gulp-useref');
  }

  gulpTask() {
    return (
      gulp
        .src(this.src.path)
        .pipe(this.useref())
        .on('error', this.onError())
        .pipe(gulpIgnore('*.php'))
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .on('error', this.onError())
        .pipe(this.saveAs(gulp))
        .pipe(this.onSuccess())
    );
  }

  useref() {
    this.recordStep('Parsing php file');

    return gulpUseref(this.options);
  }
}

export default UserefTask;
