module.exports = {
    plugins: [
        [
            'module-resolver',
            {
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
                root: ['./src'],
            },
        ],
        'react-native-reanimated/plugin', // needs to be last
    ],
    presets: ['module:@react-native/babel-preset'],
};
