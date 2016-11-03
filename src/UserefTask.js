import CleanCss from 'clean-css';
import gulpIgnore from 'gulp-ignore';
import gulpif from 'gulp-if';
import map from 'vinyl-map';

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
        .pipe(gulpif('*.js', this.minifyJS()))
        .pipe(gulpif('*.css', this.minifyCss()))
        .on('error', this.onError())
        .pipe(this.saveAs(gulp))
        .pipe(this.onSuccess())
    );
  }

  useref() {
    this.recordStep('Parsing PHP file');

    return gulpUseref(this.options);
  }

  minifyCss() {
    this.recordStep('Minify CSS File');

    return map(function (buff, filename) {
      return new CleanCss(
        Elixir.config.css.minifier.pluginOptions
      )
      .minify(buff.toString())
      .styles;
    });
  }

  minifyJS() {
    this.recordStep('Minify JS File');
    return Elixir.Plugins.uglify(
      Elixir.config.js.uglify.options
    );
  }
}

export default UserefTask;
