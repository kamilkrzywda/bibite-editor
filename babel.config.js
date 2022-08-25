const plugins = [
    [
        'babel-plugin-import',
        {
            libraryName: '@mui/system',
            libraryDirectory: '',
            camel2DashComponentName: false,
        },
        'core',
    ],
    [
        'babel-plugin-import',
        {
            libraryName: '@mui/icons-material',
            libraryDirectory: '',
            camel2DashComponentName: false,
        },
        'icons',
    ],
    [
        'formatjs',
        {
            idInterpolationPattern: '[sha512:contenthash:base64:6]',
            ast: true,
        },
    ],
    ['babel-plugin-transform-vite-meta-env'],
];

const presets = [
    [
        '@babel/preset-env',
        {
            targets: {
                node: 'current',
            },
        },
    ],
    ['@babel/preset-react', { runtime: 'automatic' }], // https://github.com/facebook/jest/issues/11045
    '@babel/preset-typescript',
];

module.exports = {
    presets,
    plugins,
};
