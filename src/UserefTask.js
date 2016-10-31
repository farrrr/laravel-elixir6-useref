import isArray from 'lodash/isArray';
import mergeWith from 'lodash/mergeWith';

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
        .pipe(gulp.dest(this.output.path))
        .on('error', this.onError())
    );
  }

  useref() {
    return gulpUseref(this.mergeConfig());
  }

  mergeConfig() {
    return mergeWith(
      Elixir.useref.config,
      this.options,
      (objValue, srcValue) => {
        if (isArray(objValue)) {
          return objValue.concat(srcValue);
        }
      }
    );
  }
}

export default UserefTask;
