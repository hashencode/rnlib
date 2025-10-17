module.exports = {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
        [
            'module-resolver',
            {
                root: ['./src'],
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
            },
        ],
        'react-native-worklets/plugin', // needs to be last
    ],
};
