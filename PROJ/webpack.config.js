var Encore = require('@symfony/webpack-encore');

if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

    Encore
    .setOutputPath('public/build/')
    .setPublicPath('/build')
    .addEntry('app', './assets/js/App.js')
    .addEntry('admin', './assets/js/admin.js')
    .splitEntryChunks()
    .enableSingleRuntimeChunk()
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())
    .enableSassLoader()
    .enableReactPreset()
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = 3;
    })
        .configureBabel(function(babelConfig) {
            babelConfig.plugins.push('@babel/plugin-proposal-class-properties')
        })
    //.enableTypeScriptLoader()
    //.enableIntegrityHashes(Encore.isProduction())
    //.autoProvidejQuery()
    //.setManifestKeyPrefix('build/')
;

module.exports = Encore.getWebpackConfig();
