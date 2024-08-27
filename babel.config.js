module.exports = {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
        [
            'module-resolver',
            {
                root: ['./src'],
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
                alias: {
                    '@': './src',
                },
            },
        ],
        'react-native-reanimated/plugin', // needs to be last
    ],
};
