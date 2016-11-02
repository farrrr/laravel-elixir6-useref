import UserefTask from './UserefTask';

Elixir.extend(
  'useref',
  function(src, outputDir, baseDir, options = {}) {

    new UserefTask(
      'useref', getPaths(src, baseDir, outputDir), options
    );
  }
);

/**
 * Prep the Gulp src and output paths
 *
 * @param  {string|Array} src
 * @param  {string|null}  basDir
 * @param  {string|null}  output
 * @return {GulpPath}
 */
 function getPaths(src, baseDir, output) {
   return new Elixir.GulpPaths()
    .src(src, baseDir || Elixir.config.viewPath)
    .output(output || Elixir.config.publicPath);
 }
